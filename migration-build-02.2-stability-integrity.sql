-- DECIDE FOR ME — BUILD 02.2 STABILITY & INTEGRITY
-- Run once in Supabase SQL Editor before deploying the matching frontend.
-- This migration hardens permissions, makes lifecycle/XP authoritative,
-- fixes Mission ID consistency, and provides an atomic Mission reset RPC.

create extension if not exists pgcrypto;

-- ============================================================
-- 1. MISSION ID CONSISTENCY
-- ============================================================
-- The application uses stable IDs such as c0001. Keep missions.id as text.
-- If an older hosted database still has UUID IDs, convert them to text first.
do $$
declare
  v_type text;
  r record;
begin
  select data_type into v_type
  from information_schema.columns
  where table_schema='public' and table_name='missions' and column_name='id';

  if v_type = 'uuid' then
    for r in
      select tc.constraint_name
      from information_schema.table_constraints tc
      join information_schema.key_column_usage kcu
        on kcu.constraint_name = tc.constraint_name
       and kcu.table_schema = tc.table_schema
      where tc.table_schema='public'
        and tc.table_name='challenge_history'
        and tc.constraint_type='FOREIGN KEY'
        and kcu.column_name='challenge_id'
    loop
      execute format('alter table public.challenge_history drop constraint if exists %I', r.constraint_name);
    end loop;

    execute 'alter table public.missions alter column id drop default';
    execute 'alter table public.missions alter column id type text using id::text';

    begin
      execute 'alter table public.challenge_history add constraint challenge_history_challenge_id_fkey foreign key (challenge_id) references public.missions(id) on delete set null';
    exception when duplicate_object then null;
    end;

    begin
      execute 'alter table public.wall_posts add constraint wall_posts_mission_id_fkey foreign key (mission_id) references public.missions(id) on delete set null';
    exception when duplicate_object then null;
    end;
  end if;
end $$;

-- Make the canonical schema self-consistent for future installations.
-- Existing installations are handled above.

-- ============================================================
-- 2. PROFILE CREATION / READ ACCESS
-- ============================================================
drop function if exists public.ensure_my_profile();
create or replace function public.ensure_my_profile()
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user_id uuid := auth.uid();
  v_profile public.profiles%rowtype;
begin
  if v_user_id is null then raise exception 'Authentication required'; end if;

  insert into public.profiles(id)
  values (v_user_id)
  on conflict (id) do nothing;

  select * into v_profile from public.profiles where id=v_user_id;

  return to_jsonb(v_profile);
end;
$$;
grant execute on function public.ensure_my_profile() to authenticated;

-- Users may read their profile but may only mutate it through controlled RPCs.
revoke insert, update, delete on public.profiles from authenticated;

drop policy if exists "profiles own insert" on public.profiles;
drop policy if exists "profiles own update" on public.profiles;
drop policy if exists "profiles own delete" on public.profiles;

-- ============================================================
-- 3. PROFILE UPDATE RPC
-- ============================================================
-- Recreate to retain ownership/security while keeping username/avatar writable.
drop function if exists public.update_my_profile(text,text);
create or replace function public.update_my_profile(
  p_username text,
  p_avatar_url text default null
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user_id uuid := auth.uid();
  v_username text := nullif(trim(p_username), '');
  v_avatar_url text := nullif(trim(p_avatar_url), '');
  v_profile public.profiles%rowtype;
begin
  if v_user_id is null then raise exception 'Authentication required'; end if;
  if v_username is null then raise exception 'Username is required'; end if;
  if length(v_username) > 24 then raise exception 'Username must be 24 characters or fewer'; end if;

  insert into public.profiles(id) values(v_user_id) on conflict(id) do nothing;

  update public.profiles
  set username=v_username,
      avatar_url=v_avatar_url,
      updated_at=now()
  where id=v_user_id
  returning * into v_profile;

  return jsonb_build_object('username',v_profile.username,'avatar_url',v_profile.avatar_url);
exception
  when unique_violation then
    raise exception 'That username is already in use. Please choose another.';
end;
$$;
grant execute on function public.update_my_profile(text,text) to authenticated;

-- ============================================================
-- 4. HISTORY RLS / GRANTS
-- ============================================================
revoke insert, update, delete on public.challenge_history from authenticated;
grant select on public.challenge_history to authenticated;

drop policy if exists "history own" on public.challenge_history;
drop policy if exists "history own select" on public.challenge_history;
create policy "history own select"
on public.challenge_history
for select to authenticated
using (user_id=auth.uid());

-- ============================================================
-- 5. SERVER-AUTHORITATIVE ACCEPT / REFUSAL / COMPLETE / FAIL
-- ============================================================
drop function if exists public.record_refusal(text);
create or replace function public.record_refusal(p_challenge_id text)
returns jsonb
language plpgsql
security definer
set search_path=public
as $$
declare
  v_user_id uuid := auth.uid();
  v_mission public.missions%rowtype;
  v_profile public.profiles%rowtype;
  v_strikes integer;
  v_forced integer;
  v_history_id uuid := gen_random_uuid();
  v_now timestamptz := now();
  v_number text;
begin
  if v_user_id is null then raise exception 'Authentication required'; end if;

  select * into v_mission from public.missions where id=p_challenge_id and active=true;
  if not found then raise exception 'Mission not found or inactive'; end if;

  perform pg_advisory_xact_lock(hashtext(v_user_id::text));

  insert into public.profiles(id) values(v_user_id) on conflict(id) do nothing;
  select * into v_profile from public.profiles where id=v_user_id for update;

  if coalesce(v_profile.forced_acceptances,0)>0 then
    raise exception 'Fate has already decided. You must accept the required Missions.';
  end if;

  v_strikes := coalesce(v_profile.refusal_count,0)+1;
  v_forced := coalesce(v_profile.forced_acceptances,0);
  if v_strikes >= 3 then
    v_forced := 3;
    v_strikes := 0;
  end if;

  v_number :=
    case v_mission.category
      when 'relationships' then '10' when 'finance' then '20' when 'work' then '30'
      when 'entertainment' then '40' when 'life-admin' then '50' when 'chores' then '60'
      else '00' end || '.' ||
    lpad((((nullif(regexp_replace(v_mission.id,'\D','','g'),'')::integer-1)%200)+1)::text,6,'0');

  insert into public.challenge_history(id,user_id,challenge_id,challenge_number,challenge_name,category,category_label,difficulty,status,created_at)
  values(v_history_id,v_user_id,v_mission.id,v_number,v_mission.text,v_mission.category,
    initcap(replace(v_mission.category,'-',' ')),v_mission.difficulty,'declined',v_now);

  update public.profiles set refusal_count=v_strikes, forced_acceptances=v_forced, updated_at=v_now where id=v_user_id;

  return jsonb_build_object('ok',true,'history_id',v_history_id,'refusal_count',v_strikes,'forced_acceptances',v_forced);
end;
$$;
grant execute on function public.record_refusal(text) to authenticated;

-- Replace completion function with a server-derived XP calculation.
drop function if exists public.complete_mission(uuid,integer);
drop function if exists public.complete_mission(uuid,text,integer);
create or replace function public.complete_mission(
  p_history_id uuid,
  p_proof_type text,
  p_bonus_xp integer
)
returns jsonb
language plpgsql
security definer
set search_path=public
as $$
declare
  v_user_id uuid:=auth.uid();
  v_now timestamptz:=now();
  v_today date:=(v_now at time zone 'UTC')::date;
  v_yesterday date:=v_today-1;
  v_history public.challenge_history%rowtype;
  v_profile public.profiles%rowtype;
  v_base integer;
  v_bonus integer;
  v_total integer;
  v_streak integer;
begin
  if v_user_id is null then raise exception 'Authentication required'; end if;
  if p_history_id is null then raise exception 'Mission history record is required'; end if;
  if p_proof_type not in ('text','photo','video') then raise exception 'Invalid proof type'; end if;
  if p_bonus_xp is null then raise exception 'Invalid proof bonus'; end if;

  v_bonus := case p_proof_type when 'text' then 0 when 'photo' then 25 when 'video' then 50 end;
  if p_bonus_xp <> v_bonus then raise exception 'Invalid proof bonus'; end if;

  select * into v_history from public.challenge_history where id=p_history_id and user_id=v_user_id for update;
  if not found then raise exception 'Mission history record not found'; end if;
  if v_history.status <> 'accepted' or v_history.deleted_at is not null then raise exception 'This Mission has already been resolved'; end if;

  v_base := case v_history.difficulty
    when 'easy' then 25 when 'normal' then 50 when 'challenge' then 75 when 'brutal' then 100 when 'wild' then 150
    else null end;
  if v_base is null then raise exception 'Invalid Mission difficulty'; end if;
  v_total := v_base + v_bonus;

  select * into v_profile from public.profiles where id=v_user_id for update;
  if not found then insert into public.profiles(id) values(v_user_id) returning * into v_profile; end if;

  if v_profile.last_complete_date=v_today then v_streak:=coalesce(v_profile.streak,0);
  elsif v_profile.last_complete_date=v_yesterday then v_streak:=coalesce(v_profile.streak,0)+1;
  else v_streak:=1; end if;

  update public.challenge_history set status='completed', xp_earned=v_total where id=p_history_id;
  update public.profiles set xp=coalesce(v_profile.xp,0)+v_total, streak=v_streak, last_complete_date=v_today, updated_at=v_now where id=v_user_id;

  return jsonb_build_object('ok',true,'history_id',p_history_id,'xp_earned',v_total,'xp',coalesce(v_profile.xp,0)+v_total,'streak',v_streak);
end;
$$;
grant execute on function public.complete_mission(uuid,text,integer) to authenticated;

-- Fail remains lifecycle-only.
drop function if exists public.fail_mission(uuid);
create or replace function public.fail_mission(p_history_id uuid)
returns jsonb language plpgsql security definer set search_path=public as $$
declare v_user_id uuid:=auth.uid(); v_updated integer;
begin
  if v_user_id is null then raise exception 'Authentication required'; end if;
  update public.challenge_history set status='failed'
  where id=p_history_id and user_id=v_user_id and status='accepted' and deleted_at is null;
  get diagnostics v_updated=row_count;
  if v_updated=0 then raise exception 'This Mission has already been resolved or could not be found'; end if;
  return jsonb_build_object('ok',true,'history_id',p_history_id,'status','failed');
end; $$;
grant execute on function public.fail_mission(uuid) to authenticated;

-- ============================================================
-- 6. ACCEPT + FORCED ACCEPTANCE ATOMICITY
-- ============================================================
-- Recreate consume_daily_attempt so a forced acceptance is consumed atomically.
drop function if exists public.consume_daily_attempt(text);
create or replace function public.consume_daily_attempt(p_challenge_id text)
returns jsonb language plpgsql security definer set search_path=public as $$
declare
  v_user_id uuid:=auth.uid(); v_used integer; v_limit integer:=10; v_mode text:='limited';
  v_id uuid:=gen_random_uuid(); v_now timestamptz:=now(); v_mission public.missions%rowtype;
  v_profile public.profiles%rowtype; v_position integer; v_number text; v_label text; v_forced integer;
begin
  if v_user_id is null then raise exception 'Authentication required'; end if;
  perform pg_advisory_xact_lock(hashtext(v_user_id::text));
  select * into v_mission from public.missions where id=p_challenge_id and active=true;
  if not found then raise exception 'Mission not found or inactive'; end if;

  insert into public.profiles(id) values(v_user_id) on conflict(id) do nothing;
  select * into v_profile from public.profiles where id=v_user_id for update;
  v_forced:=coalesce(v_profile.forced_acceptances,0);

  select value into v_mode from public.app_settings where key='daily_attempt_limit_mode';
  if v_mode not in ('limited','unlimited') then v_mode:='limited'; end if;
  if v_mode='unlimited' then v_limit:=null; end if;

  select count(*)::integer into v_used from public.challenge_history
  where user_id=v_user_id and status='accepted'
    and created_at >= date_trunc('day',v_now at time zone 'UTC') at time zone 'UTC'
    and created_at < (date_trunc('day',v_now at time zone 'UTC')+interval '1 day') at time zone 'UTC';

  if v_mode<>'unlimited' and v_used>=v_limit then
    return jsonb_build_object('allowed',false,'used',v_used,'remaining',0,'limit',v_limit,'mode',v_mode);
  end if;

  v_position:=((nullif(regexp_replace(v_mission.id,'\D','','g'),'')::integer-1)%200)+1;
  v_number:=case v_mission.category when 'relationships' then '10' when 'finance' then '20' when 'work' then '30' when 'entertainment' then '40' when 'life-admin' then '50' when 'chores' then '60' else '00' end || '.' || lpad(v_position::text,6,'0');
  v_label:=case v_mission.category when 'relationships' then 'Relationships' when 'finance' then 'Finance' when 'work' then 'Work' when 'entertainment' then 'Entertainment' when 'life-admin' then 'Life Admin' when 'chores' then 'Chores' else v_mission.category end;

  insert into public.challenge_history(id,user_id,challenge_id,challenge_number,challenge_name,category,category_label,difficulty,status,created_at)
  values(v_id,v_user_id,v_mission.id,v_number,v_mission.text,v_mission.category,v_label,v_mission.difficulty,'accepted',v_now);

  if v_forced>0 then
    update public.profiles set forced_acceptances=greatest(v_forced-1,0), refusal_count=case when v_forced=1 then 0 else refusal_count end, updated_at=v_now where id=v_user_id;
  end if;

  v_used:=v_used+1;
  return jsonb_build_object('allowed',true,'used',v_used,'remaining',case when v_mode='unlimited' then null else greatest(v_limit-v_used,0) end,'limit',v_limit,'mode',v_mode,'history_id',v_id,'forced_acceptances',greatest(v_forced-1,0));
end; $$;
grant execute on function public.consume_daily_attempt(text) to authenticated;

-- ============================================================
-- 7. ADMIN MISSION RESET — TRANSACTIONAL
-- ============================================================
drop function if exists public.reset_missions(jsonb);
create or replace function public.reset_missions(p_missions jsonb)
returns integer language plpgsql security definer set search_path=public as $$
declare r jsonb; v_count integer:=0;
begin
  if not public.is_admin() then raise exception 'Administrator access required'; end if;
  if jsonb_typeof(p_missions)<>'array' then raise exception 'Mission data must be an array'; end if;

  delete from public.missions;

  for r in select * from jsonb_array_elements(p_missions) loop
    if nullif(trim(r->>'id'),'') is null or nullif(trim(r->>'category'),'') is null or nullif(trim(r->>'difficulty'),'') is null or nullif(trim(r->>'text'),'') is null then
      raise exception 'Mission data contains an incomplete row';
    end if;
    if (r->>'difficulty') not in ('easy','normal','challenge','brutal','wild') then
      raise exception 'Mission data contains an invalid difficulty';
    end if;
    insert into public.missions(id,category,difficulty,text,active)
    values(r->>'id',r->>'category',r->>'difficulty',r->>'text',coalesce((r->>'active')::boolean,true));
    v_count:=v_count+1;
  end loop;
  return v_count;
end; $$;
grant execute on function public.reset_missions(jsonb) to authenticated;

-- ============================================================
-- 8. WALL MODERATION
-- ============================================================
revoke delete on public.wall_posts from authenticated;
grant delete on public.wall_posts to authenticated;
drop policy if exists "wall delete own_or_admin" on public.wall_posts;
drop policy if exists "wall delete admin" on public.wall_posts;
create policy "wall delete admin" on public.wall_posts for delete to authenticated using (public.is_admin());

-- Public feed should never expose rows explicitly soft-deleted.
drop policy if exists "wall read public" on public.wall_posts;
create policy "wall read public" on public.wall_posts for select to anon, authenticated using (deleted_at is null);


-- ============================================================
-- 9. ONE-TIME ADMIN TEST-DATA RESET
-- ============================================================
-- This is intentionally migration-only. It is NOT part of the baseline
-- schema because a fresh install must never unexpectedly delete user data.
-- The reset preserves the account/profile, including username and avatar.
-- If the older 02.1 reset migration already ran successfully, its marker
-- is treated as proof that this reset has already been completed.
do $$
declare
  v_user_id uuid;
  v_rows integer;
  v_new_marker_claimed boolean := false;
begin
  -- Never repeat the consolidated reset.
  if exists (
    select 1
    from public.app_settings
    where key = 'build_02_2_admin_mission_reset_2026_09_09'
  ) then
    raise notice 'Build 02.2 admin Mission reset already completed; no reset performed.';
    return;
  end if;

  -- Backwards-compatible protection for the previous 02.1 migration.
  if exists (
    select 1
    from public.app_settings
    where key = 'build_02_1_admin_mission_reset_2026_09_09'
  ) then
    insert into public.app_settings(key, value, updated_at)
    values ('build_02_2_admin_mission_reset_2026_09_09', 'already_completed_by_02_1', now())
    on conflict (key) do nothing;

    raise notice 'Build 02.1 admin Mission reset marker already exists; no second reset performed.';
    return;
  end if;

  select u.id
  into v_user_id
  from auth.users u
  where lower(u.email) = 'tom.ellery@gmail.com'
  order by u.created_at
  limit 1;

  if v_user_id is null then
    raise exception 'Cannot perform Build 02.2 admin Mission reset: tom.ellery@gmail.com was not found.';
  end if;

  -- Delete Mission activity only. The account and profile row remain intact.
  delete from public.challenge_history
  where user_id = v_user_id;
  get diagnostics v_rows = row_count;

  update public.profiles
  set xp = 0,
      streak = 0,
      last_complete_date = null,
      refusal_count = 0,
      forced_acceptances = 0
  where id = v_user_id;

  if not found then
    raise exception 'Cannot perform Build 02.2 admin Mission reset: profile for tom.ellery@gmail.com was not found.';
  end if;

  insert into public.app_settings(key, value, updated_at)
  values ('build_02_2_admin_mission_reset_2026_09_09', 'completed', now())
  on conflict (key) do nothing;

  raise notice 'Build 02.2 admin Mission reset completed for tom.ellery@gmail.com. % Mission history rows removed; profile identity preserved.', v_rows;
end $$;

-- ============================================================
-- BUILD 02.3 — 24-HOUR MISSION TIMER / ACTIVE MISSION LIFECYCLE
-- ============================================================
-- The browser displays the countdown, but Supabase owns the deadline.
-- An accepted Mission receives a 24-hour expires_at timestamp. Overdue
-- Missions are failed automatically by the scheduled expiry job and are
-- also lazily expired by the application-facing RPCs as a safety net.

alter table public.challenge_history
  add column if not exists accepted_at timestamptz,
  add column if not exists expires_at timestamptz,
  add column if not exists completed_at timestamptz,
  add column if not exists failed_at timestamptz;

create index if not exists idx_history_active_mission
  on public.challenge_history(user_id, status, expires_at)
  where status='accepted';

-- Expire every accepted Mission whose 24-hour window has closed.
drop function if exists public.expire_overdue_missions();
create or replace function public.expire_overdue_missions()
returns integer
language plpgsql
security definer
set search_path=public
as $$
declare
  v_count integer;
  v_now timestamptz := now();
begin
  update public.challenge_history
  set status='failed', failed_at=v_now
  where status='accepted'
    and deleted_at is null
    and expires_at is not null
    and expires_at <= v_now;

  get diagnostics v_count = row_count;
  return v_count;
end;
$$;

-- The function is only intended to be called by the scheduler / trusted RPCs.
revoke execute on function public.expire_overdue_missions() from anon, authenticated;

-- Return the user's one active Mission, if one exists. This also performs
-- lazy expiry so a user returning after the scheduled job has not yet run
-- still gets the correct state.
drop function if exists public.get_active_mission();
create or replace function public.get_active_mission()
returns jsonb
language plpgsql
security definer
set search_path=public
as $$
declare
  v_user_id uuid := auth.uid();
  v_history public.challenge_history%rowtype;
  v_now timestamptz := now();
begin
  if v_user_id is null then
    raise exception 'Authentication required';
  end if;

  perform public.expire_overdue_missions();

  select * into v_history
  from public.challenge_history
  where user_id=v_user_id
    and status='accepted'
    and deleted_at is null
  order by created_at desc
  limit 1;

  if not found then
    return jsonb_build_object('active',false);
  end if;

  return jsonb_build_object(
    'active',true,
    'history_id',v_history.id,
    'challenge_id',v_history.challenge_id,
    'challenge_number',v_history.challenge_number,
    'challenge_name',v_history.challenge_name,
    'category',v_history.category,
    'category_label',v_history.category_label,
    'difficulty',v_history.difficulty,
    'accepted_at',v_history.accepted_at,
    'expires_at',v_history.expires_at,
    'remaining_ms',greatest(0,extract(epoch from (coalesce(v_history.expires_at,v_history.created_at + interval '24 hours')-v_now))*1000)::bigint
  );
end;
$$;
grant execute on function public.get_active_mission() to authenticated;

-- Replace acceptance so only one Mission can be active at a time and the
-- 24-hour deadline is created atomically with the accepted history row.
drop function if exists public.consume_daily_attempt(text);
create or replace function public.consume_daily_attempt(p_challenge_id text)
returns jsonb
language plpgsql
security definer
set search_path=public
as $$
declare
  v_user_id uuid := auth.uid();
  v_used integer;
  v_limit integer := 10;
  v_mode text := 'limited';
  v_id uuid := gen_random_uuid();
  v_now timestamptz := now();
  v_expires timestamptz := v_now + interval '24 hours';
  v_mission public.missions%rowtype;
  v_profile public.profiles%rowtype;
  v_active public.challenge_history%rowtype;
  v_position integer;
  v_number text;
  v_label text;
  v_forced integer;
begin
  if v_user_id is null then raise exception 'Authentication required'; end if;

  perform pg_advisory_xact_lock(hashtext(v_user_id::text));
  perform public.expire_overdue_missions();

  select * into v_mission from public.missions where id=p_challenge_id and active=true;
  if not found then raise exception 'Mission not found or inactive'; end if;

  select * into v_active
  from public.challenge_history
  where user_id=v_user_id
    and status='accepted'
    and deleted_at is null
  order by created_at desc
  limit 1
  for update;

  if found then
    return jsonb_build_object(
      'allowed',false,
      'reason','active_mission',
      'history_id',v_active.id,
      'challenge_id',v_active.challenge_id,
      'challenge_number',v_active.challenge_number,
      'challenge_name',v_active.challenge_name,
      'category',v_active.category,
      'category_label',v_active.category_label,
      'difficulty',v_active.difficulty,
      'accepted_at',v_active.accepted_at,
      'expires_at',v_active.expires_at,
      'remaining_ms',greatest(0,extract(epoch from (coalesce(v_active.expires_at,v_active.created_at + interval '24 hours')-v_now))*1000)::bigint
    );
  end if;

  insert into public.profiles(id) values(v_user_id) on conflict(id) do nothing;
  select * into v_profile from public.profiles where id=v_user_id for update;
  v_forced:=coalesce(v_profile.forced_acceptances,0);

  select value into v_mode from public.app_settings where key='daily_attempt_limit_mode';
  if v_mode not in ('limited','unlimited') then v_mode:='limited'; end if;
  if v_mode='unlimited' then v_limit:=null; end if;

  select count(*)::integer into v_used from public.challenge_history
  where user_id=v_user_id and status='accepted'
    and created_at >= date_trunc('day',v_now at time zone 'UTC') at time zone 'UTC'
    and created_at < (date_trunc('day',v_now at time zone 'UTC')+interval '1 day') at time zone 'UTC';

  if v_mode<>'unlimited' and v_used>=v_limit then
    return jsonb_build_object('allowed',false,'used',v_used,'remaining',0,'limit',v_limit,'mode',v_mode);
  end if;

  v_position:=((nullif(regexp_replace(v_mission.id,'\D','','g'),'')::integer-1)%200)+1;
  v_number:=case v_mission.category when 'relationships' then '10' when 'finance' then '20' when 'work' then '30' when 'entertainment' then '40' when 'life-admin' then '50' when 'chores' then '60' else '00' end || '.' || lpad(v_position::text,6,'0');
  v_label:=case v_mission.category when 'relationships' then 'Relationships' when 'finance' then 'Finance' when 'work' then 'Work' when 'entertainment' then 'Entertainment' when 'life-admin' then 'Life Admin' when 'chores' then 'Chores' else v_mission.category end;

  insert into public.challenge_history(id,user_id,challenge_id,challenge_number,challenge_name,category,category_label,difficulty,status,created_at,accepted_at,expires_at)
  values(v_id,v_user_id,v_mission.id,v_number,v_mission.text,v_mission.category,v_label,v_mission.difficulty,'accepted',v_now,v_now,v_expires);

  if v_forced>0 then
    update public.profiles set forced_acceptances=greatest(v_forced-1,0), refusal_count=case when v_forced=1 then 0 else refusal_count end, updated_at=v_now where id=v_user_id;
  end if;

  v_used:=v_used+1;
  return jsonb_build_object('allowed',true,'used',v_used,'remaining',case when v_mode='unlimited' then null else greatest(v_limit-v_used,0) end,'limit',v_limit,'mode',v_mode,'history_id',v_id,'accepted_at',v_now,'expires_at',v_expires,'forced_acceptances',greatest(v_forced-1,0));
end;
$$;
grant execute on function public.consume_daily_attempt(text) to authenticated;

-- Completion is only valid while the Mission's deadline is still open.
-- If the deadline has passed, resolve the Mission as failed and return a
-- deterministic status for the client instead of awarding XP.
drop function if exists public.complete_mission(uuid,text,integer);
create or replace function public.complete_mission(
  p_history_id uuid,
  p_proof_type text,
  p_bonus_xp integer
)
returns jsonb
language plpgsql
security definer
set search_path=public
as $$
declare
  v_user_id uuid:=auth.uid();
  v_now timestamptz:=now();
  v_today date:=(v_now at time zone 'UTC')::date;
  v_yesterday date:=v_today-1;
  v_history public.challenge_history%rowtype;
  v_profile public.profiles%rowtype;
  v_base integer;
  v_bonus integer;
  v_total integer;
  v_streak integer;
begin
  if v_user_id is null then raise exception 'Authentication required'; end if;
  if p_history_id is null then raise exception 'Mission history record is required'; end if;
  if p_proof_type not in ('text','photo','video') then raise exception 'Invalid proof type'; end if;
  v_bonus:=case p_proof_type when 'text' then 0 when 'photo' then 25 when 'video' then 50 end;
  if p_bonus_xp is distinct from v_bonus then raise exception 'Invalid proof bonus'; end if;

  select * into v_history from public.challenge_history where id=p_history_id and user_id=v_user_id for update;
  if not found then raise exception 'Mission history record not found'; end if;
  if v_history.status <> 'accepted' or v_history.deleted_at is not null then raise exception 'This Mission has already been resolved'; end if;

  if v_history.expires_at is not null and v_history.expires_at <= v_now then
    update public.challenge_history set status='failed', failed_at=v_now where id=p_history_id;
    return jsonb_build_object('ok',false,'status','expired','history_id',p_history_id);
  end if;

  v_base:=case v_history.difficulty when 'easy' then 25 when 'normal' then 50 when 'challenge' then 75 when 'brutal' then 100 when 'wild' then 150 else null end;
  if v_base is null then raise exception 'Invalid Mission difficulty'; end if;
  v_total:=v_base+v_bonus;

  select * into v_profile from public.profiles where id=v_user_id for update;
  if not found then insert into public.profiles(id) values(v_user_id) returning * into v_profile; end if;

  if v_profile.last_complete_date=v_today then v_streak:=coalesce(v_profile.streak,0);
  elsif v_profile.last_complete_date=v_yesterday then v_streak:=coalesce(v_profile.streak,0)+1;
  else v_streak:=1; end if;

  update public.challenge_history set status='completed', xp_earned=v_total, completed_at=v_now where id=p_history_id;
  update public.profiles set xp=coalesce(v_profile.xp,0)+v_total, streak=v_streak, last_complete_date=v_today, updated_at=v_now where id=v_user_id;

  return jsonb_build_object('ok',true,'history_id',p_history_id,'xp_earned',v_total,'xp',coalesce(v_profile.xp,0)+v_total,'streak',v_streak);
end;
$$;
grant execute on function public.complete_mission(uuid,text,integer) to authenticated;

-- Manual failure and automatic expiry share the same lifecycle rule.
drop function if exists public.fail_mission(uuid);
create or replace function public.fail_mission(p_history_id uuid)
returns jsonb
language plpgsql
security definer
set search_path=public
as $$
declare
  v_user_id uuid:=auth.uid();
  v_now timestamptz:=now();
  v_history public.challenge_history%rowtype;
begin
  if v_user_id is null then raise exception 'Authentication required'; end if;
  select * into v_history from public.challenge_history where id=p_history_id and user_id=v_user_id for update;
  if not found then raise exception 'This Mission could not be found'; end if;
  if v_history.status <> 'accepted' or v_history.deleted_at is not null then raise exception 'This Mission has already been resolved'; end if;

  if v_history.expires_at is not null and v_history.expires_at <= v_now then
    update public.challenge_history set status='failed', failed_at=v_now where id=p_history_id;
    return jsonb_build_object('ok',true,'history_id',p_history_id,'status','expired');
  end if;

  update public.challenge_history set status='failed', failed_at=v_now where id=p_history_id;
  return jsonb_build_object('ok',true,'history_id',p_history_id,'status','failed');
end;
$$;
grant execute on function public.fail_mission(uuid) to authenticated;

-- Schedule the server-side expiry sweep once per minute. The application also
-- performs lazy expiry, so a brief scheduler delay cannot grant extra time.
create extension if not exists pg_cron;
select cron.unschedule(jobid) from cron.job where jobname='decide-for-me-expire-missions';
select cron.schedule('decide-for-me-expire-missions','* * * * *','select public.expire_overdue_missions();');

