-- DECIDE FOR ME — BUILD 01.1 HOSTED FOUNDATION
-- Run in Supabase SQL Editor. This is additive where possible.

create extension if not exists pgcrypto;

create table if not exists public.profiles (
  username text unique,
  avatar_url text,
  id uuid primary key references auth.users(id) on delete cascade,
  xp integer not null default 0 check (xp >= 0),
  streak integer not null default 0 check (streak >= 0),
  refusal_count integer not null default 0 check (refusal_count >= 0),
  forced_acceptances integer not null default 0 check (forced_acceptances >= 0),
  last_complete_date date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create or replace function public.is_admin() returns boolean language sql security definer stable set search_path=public as $$
  select exists (select 1 from public.admins where user_id = auth.uid());
$$;

create table if not exists public.missions (
  id text primary key,
  category text not null,
  difficulty text not null check (difficulty in ('easy','normal','challenge','brutal','wild')),
  text text not null,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists idx_missions_active_category_difficulty on public.missions(active, category, difficulty);

create table if not exists public.challenge_history (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  challenge_id text references public.missions(id) on delete set null,
  challenge_number text,
  challenge_name text not null,
  category text not null,
  category_label text,
  difficulty text not null,
  status text not null,
  created_at timestamptz not null default now()
);
create index if not exists idx_history_user_created on public.challenge_history(user_id, created_at desc);
alter table public.challenge_history add column if not exists deleted_at timestamptz;
alter table public.challenge_history add column if not exists xp_earned integer not null default 0;
create index if not exists idx_history_user_visible on public.challenge_history(user_id, deleted_at, created_at desc);

create table if not exists public.wall_posts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  mission_id text references public.missions(id) on delete set null,
  category text not null,
  difficulty text not null,
  mission_text text not null,
  proof_type text,
  proof_content jsonb,
  created_at timestamptz not null default now(),
  deleted_at timestamptz
);
create index if not exists idx_wall_posts_created on public.wall_posts(created_at desc);

create table if not exists public.wall_validations (
  post_id uuid not null references public.wall_posts(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key(post_id, user_id)
);

create or replace function public.prevent_self_validation() returns trigger language plpgsql security definer set search_path=public as $$
begin
  if exists (select 1 from public.wall_posts where id = new.post_id and user_id = new.user_id) then
    raise exception 'Users cannot validate their own Wall post';
  end if;
  return new;
end; $$;
drop trigger if exists trg_prevent_self_validation on public.wall_validations;
create trigger trg_prevent_self_validation before insert on public.wall_validations for each row execute function public.prevent_self_validation();

create or replace view public.wall_posts_with_validations with (security_invoker = true) as
select p.*, count(v.user_id)::int as validation_count, coalesce(array_agg(v.user_id) filter (where v.user_id is not null), '{}') as validated_by
from public.wall_posts p left join public.wall_validations v on v.post_id=p.id
group by p.id;

alter table public.profiles enable row level security;
alter table public.admins enable row level security;
alter table public.missions enable row level security;
alter table public.challenge_history enable row level security;
alter table public.wall_posts enable row level security;
alter table public.wall_validations enable row level security;

-- BUILD 01.1.9 — align an existing Wall table with the live hosted schema.
-- This is intentionally additive: it does not delete existing Wall posts.
alter table public.wall_posts add column if not exists mission_text text;
alter table public.wall_posts add column if not exists deleted_at timestamptz;


-- Drop known policies so this script can be rerun safely.
drop policy if exists "profiles own select" on public.profiles;
drop policy if exists "profiles own insert" on public.profiles;
drop policy if exists "profiles own update" on public.profiles;
drop policy if exists "missions read authenticated" on public.missions;
drop policy if exists "admins insert missions" on public.missions;
drop policy if exists "admins update missions" on public.missions;
drop policy if exists "admins delete missions" on public.missions;
drop policy if exists "history own" on public.challenge_history;
drop policy if exists "wall read authenticated" on public.wall_posts;
drop policy if exists "wall create own" on public.wall_posts;
drop policy if exists "wall delete own_or_admin" on public.wall_posts;
drop policy if exists "validations read authenticated" on public.wall_validations;
drop policy if exists "validations create own" on public.wall_validations;

create policy "profiles own select" on public.profiles for select to authenticated using (id=auth.uid());
create policy "profiles own insert" on public.profiles for insert to authenticated with check (id=auth.uid());
create policy "profiles own update" on public.profiles for update to authenticated using (id=auth.uid()) with check (id=auth.uid());
create policy "missions read authenticated" on public.missions for select to authenticated using (true);
create policy "admins insert missions" on public.missions for insert to authenticated with check (public.is_admin());
create policy "admins update missions" on public.missions for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "admins delete missions" on public.missions for delete to authenticated using (public.is_admin());
create policy "history own" on public.challenge_history for all to authenticated using (user_id=auth.uid()) with check (user_id=auth.uid());
create policy "wall read authenticated" on public.wall_posts for select to authenticated using (true);
create policy "wall create own" on public.wall_posts for insert to authenticated with check (user_id=auth.uid());
create policy "wall delete own_or_admin" on public.wall_posts for delete to authenticated using (user_id=auth.uid() or public.is_admin());
create policy "validations read authenticated" on public.wall_validations for select to authenticated using (true);
create policy "validations create own" on public.wall_validations for insert to authenticated with check (user_id=auth.uid());

-- BUILD 01.1.11 — SINGLE ADMIN ACCOUNT
-- The Admin Console is restricted to this exact account.
insert into public.admins(user_id)
select id
from auth.users
where lower(email) = lower('tom.ellery@gmail.com')
on conflict (user_id) do nothing;




-- ============================================================
-- BUILD 01.1.18 — PERSISTENT DAILY ATTEMPT LIMIT SETTING
-- ============================================================
create table if not exists public.app_settings (
  key text primary key,
  value text not null,
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users(id) on delete set null
);

insert into public.app_settings(key, value)
values ('daily_attempt_limit_mode', 'limited')
on conflict (key) do nothing;

alter table public.app_settings enable row level security;
drop policy if exists "admins read app settings" on public.app_settings;
drop policy if exists "admins update app settings" on public.app_settings;
create policy "admins read app settings" on public.app_settings
for select to authenticated using (public.is_admin());
create policy "admins update app settings" on public.app_settings
for update to authenticated using (public.is_admin()) with check (public.is_admin());

grant select, update on public.app_settings to authenticated;

create or replace function public.get_attempt_limit_setting()
returns jsonb
language plpgsql
security definer
stable
set search_path = public
as $$
declare
  v_mode text;
begin
  select value
  into v_mode
  from public.app_settings
  where key = 'daily_attempt_limit_mode';

  v_mode := case
    when v_mode in ('limited','unlimited') then v_mode
    else 'limited'
  end;

  return jsonb_build_object(
    'mode', v_mode,
    'limit', case when v_mode='unlimited' then null else 10 end
  );
end;
$$;

create or replace function public.set_attempt_limit_mode(p_mode text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_mode text := lower(trim(p_mode));
begin
  if not public.is_admin() then raise exception 'Administrator access required'; end if;
  if v_mode not in ('limited','unlimited') then raise exception 'Invalid attempt limit mode'; end if;
  update public.app_settings
  set value = v_mode, updated_at = now(), updated_by = auth.uid()
  where key = 'daily_attempt_limit_mode';
  if not found then
    insert into public.app_settings(key, value, updated_at, updated_by)
    values ('daily_attempt_limit_mode', v_mode, now(), auth.uid());
  end if;
  return jsonb_build_object('mode', v_mode, 'limit', case when v_mode = 'unlimited' then null else 10 end);
end;
$$;

grant execute on function public.get_attempt_limit_setting() to authenticated;
grant execute on function public.set_attempt_limit_mode(text) to authenticated;

-- ============================================================
-- BUILD 01.1.19 — DAILY ATTEMPT LIMIT ENFORCEMENT
-- ============================================================
-- The browser sends only the Mission ID. PostgreSQL resolves the Mission
-- record and atomically consumes one of the user's daily attempts according to the persistent admin setting.
-- Dropping both known signatures prevents stale PostgREST overloads.

drop function if exists public.consume_daily_attempt(text, text, text, text, text, text);
drop function if exists public.consume_daily_attempt(text);
drop function if exists public.get_daily_attempt_status();

create index if not exists idx_history_user_status_created
on public.challenge_history(user_id, status, created_at desc);

create or replace function public.get_daily_attempt_status()
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_used integer;
  v_limit integer := 10;
  v_mode text := 'limited';
begin
  if auth.uid() is null then
    raise exception 'Authentication required';
  end if;

  select value into v_mode from public.app_settings where key = 'daily_attempt_limit_mode';
  if v_mode is null then v_mode := 'limited'; end if;
  if v_mode = 'unlimited' then
    select count(*)::integer into v_used
    from public.challenge_history
    where user_id = auth.uid()
      and status = 'accepted'
      and created_at >= date_trunc('day', now() at time zone 'UTC') at time zone 'UTC'
      and created_at <  (date_trunc('day', now() at time zone 'UTC') + interval '1 day') at time zone 'UTC';
    return jsonb_build_object('used', v_used, 'remaining', null, 'limit', null, 'allowed', true, 'mode', 'unlimited');
  end if;

  select count(*)::integer
    into v_used
  from public.challenge_history
  where user_id = auth.uid()
    and status = 'accepted'
    and created_at >= date_trunc('day', now() at time zone 'UTC') at time zone 'UTC'
    and created_at <  (date_trunc('day', now() at time zone 'UTC') + interval '1 day') at time zone 'UTC';

  return jsonb_build_object(
    'used', v_used,
    'remaining', greatest(v_limit - v_used, 0),
    'limit', v_limit,
    'allowed', v_used < v_limit,
    'mode', v_mode
  );
end;
$$;

create or replace function public.consume_daily_attempt(
  p_challenge_id text
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user_id uuid := auth.uid();
  v_used integer;
  v_limit integer := 10;
  v_mode text := 'limited';
  v_id uuid := gen_random_uuid();
  v_now timestamptz := now();
  v_mission public.missions%rowtype;
  v_position integer;
  v_number text;
  v_category_label text;
begin
  if v_user_id is null then
    raise exception 'Authentication required';
  end if;

  select *
    into v_mission
  from public.missions
  where id = p_challenge_id
    and active = true;

  if not found then
    raise exception 'Mission not found or inactive';
  end if;

  -- Serialize concurrent attempts from the same user.
  perform pg_advisory_xact_lock(hashtext(v_user_id::text));

  select value into v_mode from public.app_settings where key = 'daily_attempt_limit_mode';
  if v_mode not in ('limited', 'unlimited') then
    v_mode := 'limited';
  end if;

  if v_mode = 'unlimited' then
    v_limit := null;
  end if;

  select count(*)::integer
    into v_used
  from public.challenge_history
  where user_id = v_user_id
    and status = 'accepted'
    and created_at >= date_trunc('day', v_now at time zone 'UTC') at time zone 'UTC'
    and created_at <  (date_trunc('day', v_now at time zone 'UTC') + interval '1 day') at time zone 'UTC';

  if v_mode <> 'unlimited' and v_used >= v_limit then
    return jsonb_build_object(
      'allowed', false,
      'used', v_used,
      'remaining', 0,
      'limit', v_limit
    );
  end if;

  -- Mission IDs are c0001-c1200, grouped in blocks of 200 per category.
  -- Keep the public number stable even if mission rows are edited.
  v_position := ((nullif(regexp_replace(v_mission.id, '\D', '', 'g'), '')::integer - 1) % 200) + 1;
  v_number :=
    case v_mission.category
      when 'relationships' then '10'
      when 'finance' then '20'
      when 'work' then '30'
      when 'entertainment' then '40'
      when 'life-admin' then '50'
      when 'chores' then '60'
      else '00'
    end || '.' || lpad(v_position::text, 6, '0');

  v_category_label :=
    case v_mission.category
      when 'relationships' then 'Relationships'
      when 'finance' then 'Finance'
      when 'work' then 'Work'
      when 'entertainment' then 'Entertainment'
      when 'life-admin' then 'Life Admin'
      when 'chores' then 'Chores'
      else v_mission.category
    end;

  insert into public.challenge_history (
    id, user_id, challenge_id, challenge_number, challenge_name,
    category, category_label, difficulty, status, created_at
  )
  values (
    v_id, v_user_id, v_mission.id, v_number, v_mission.text,
    v_mission.category, v_category_label, v_mission.difficulty, 'accepted', v_now
  );

  v_used := v_used + 1;

  return jsonb_build_object(
    'allowed', true,
    'used', v_used,
    'remaining', case when v_mode = 'unlimited' then null else greatest(v_limit - v_used, 0) end,
    'limit', v_limit,
    'mode', v_mode,
    'history_id', v_id
  );
end;
$$;

-- Explicit Data API privileges. RLS still controls row access.
grant select on public.missions to anon, authenticated;
grant select, insert, update on public.profiles to authenticated;
grant select, insert, update, delete on public.missions to authenticated;
grant select, insert, update on public.challenge_history to authenticated;
grant select, insert, delete on public.wall_posts to authenticated;
grant select, insert on public.wall_validations to authenticated;
grant execute on function public.get_daily_attempt_status() to authenticated;
grant execute on function public.consume_daily_attempt(text) to authenticated;


-- ============================================================
-- BUILD 01.1.4 — PUBLIC MISSION LIBRARY ACCESS
-- ============================================================
-- Missions are public gameplay content. Visitors may roll, choose
-- category/difficulty and spin before signing in. Authentication begins
-- only when a user accepts Fate.

alter table public.missions enable row level security;

drop policy if exists "Public can view active missions" on public.missions;
drop policy if exists "Anyone can view active missions" on public.missions;
drop policy if exists "Authenticated users can view active missions" on public.missions;

create policy "Public can view active missions"
on public.missions
for select
to anon, authenticated
using (active = true);


-- ============================================================
-- BUILD 01.1.8 — HOSTED COMPLETION + PUBLIC PROOF
-- ============================================================
-- Reconcile expected profile columns with existing hosted databases.
alter table public.profiles add column if not exists xp integer not null default 0;
alter table public.profiles add column if not exists streak integer not null default 0;
alter table public.profiles add column if not exists refusal_count integer not null default 0;
alter table public.profiles add column if not exists forced_acceptances integer not null default 0;
alter table public.profiles add column if not exists last_complete_date date;
alter table public.profiles add column if not exists created_at timestamptz not null default now();
alter table public.profiles add column if not exists updated_at timestamptz not null default now();

-- Public proof media lives in Storage, not JSON/base64.
insert into storage.buckets (id, name, public)
values ('public-proofs', 'public-proofs', true)
on conflict (id) do update set public = true;

drop policy if exists "public proofs read" on storage.objects;
drop policy if exists "authenticated proofs upload own folder" on storage.objects;
drop policy if exists "authenticated proofs delete own folder" on storage.objects;
create policy "public proofs read"
on storage.objects for select
to public
using (bucket_id = 'public-proofs');
create policy "authenticated proofs upload own folder"
on storage.objects for insert
to authenticated
with check (bucket_id = 'public-proofs' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "authenticated proofs delete own folder"
on storage.objects for delete
to authenticated
using (bucket_id = 'public-proofs' and (storage.foldername(name))[1] = auth.uid()::text);

-- Completion transaction: XP, streak and completion history are committed together.
drop function if exists public.complete_mission(text, integer);
drop function if exists public.complete_mission(uuid, integer);
create or replace function public.complete_mission(
  p_history_id uuid,
  p_total_xp integer
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user_id uuid := auth.uid();
  v_now timestamptz := now();
  v_today date := (v_now at time zone 'UTC')::date;
  v_yesterday date := v_today - 1;
  v_profile public.profiles%rowtype;
  v_history public.challenge_history%rowtype;
  v_streak integer;
begin
  if v_user_id is null then raise exception 'Authentication required'; end if;
  if p_history_id is null then raise exception 'Mission history record is required'; end if;
  if p_total_xp < 0 then raise exception 'Invalid XP value'; end if;

  select *
    into v_history
  from public.challenge_history
  where id = p_history_id
    and user_id = v_user_id
  for update;

  if not found then raise exception 'Mission history record not found'; end if;
  if v_history.status <> 'accepted' then
    raise exception 'This Mission has already been resolved';
  end if;
  if v_history.deleted_at is not null then
    raise exception 'This Mission is no longer available';
  end if;

  select * into v_profile from public.profiles where id = v_user_id for update;
  if not found then
    insert into public.profiles(id) values (v_user_id) returning * into v_profile;
  end if;

  if v_profile.last_complete_date = v_today then
    v_streak := coalesce(v_profile.streak, 0);
  elsif v_profile.last_complete_date = v_yesterday then
    v_streak := coalesce(v_profile.streak, 0) + 1;
  else
    v_streak := 1;
  end if;

  update public.challenge_history
  set status = 'completed',
      xp_earned = p_total_xp
  where id = p_history_id
    and user_id = v_user_id;

  update public.profiles
  set xp = coalesce(v_profile.xp,0) + p_total_xp,
      streak = v_streak,
      last_complete_date = v_today,
      updated_at = v_now
  where id = v_user_id;

  return jsonb_build_object(
    'ok',true,
    'history_id',p_history_id,
    'xp',coalesce(v_profile.xp,0)+p_total_xp,
    'streak',v_streak
  );
end;
$$;

grant execute on function public.complete_mission(uuid, integer) to authenticated;


-- Resolve an accepted Mission as failed without creating a second history row.
drop function if exists public.fail_mission(uuid);
create or replace function public.fail_mission(
  p_history_id uuid
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user_id uuid := auth.uid();
  v_updated integer;
begin
  if v_user_id is null then raise exception 'Authentication required'; end if;
  if p_history_id is null then raise exception 'Mission history record is required'; end if;

  update public.challenge_history
  set status = 'failed'
  where id = p_history_id
    and user_id = v_user_id
    and status = 'accepted'
    and deleted_at is null;

  get diagnostics v_updated = row_count;

  if v_updated = 0 then
    raise exception 'This Mission has already been resolved or could not be found';
  end if;

  return jsonb_build_object('ok', true, 'history_id', p_history_id, 'status', 'failed');
end;
$$;

grant execute on function public.fail_mission(uuid) to authenticated;

-- Personal Mission history is intentionally permanent. Users cannot delete
-- individual history records; this preserves lifetime statistics and XP integrity.
drop function if exists public.remove_history_item(uuid);


-- Public Wall is intentionally readable without authentication.
drop policy if exists "wall read public" on public.wall_posts;
create policy "wall read public" on public.wall_posts for select to anon, authenticated using (true);

-- The public Wall view is readable by guests as well as signed-in users.
drop policy if exists "validations read public" on public.wall_validations;
create policy "validations read public" on public.wall_validations for select to anon, authenticated using (true);

-- ============================================================
-- BUILD 01.1.10 — HOSTED ADMIN WALL DELETION
-- ============================================================
-- Wall deletion is performed directly against the hosted table.
-- RLS permits the post owner or an authenticated admin to delete.
-- No localStorage Wall persistence is used.
grant delete on table public.wall_posts to authenticated;


-- Build 02.1: User Profile
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
begin
  if v_user_id is null then
    raise exception 'Authentication required';
  end if;

  if v_username is null then
    raise exception 'Username is required';
  end if;

  if length(v_username) > 24 then
    raise exception 'Username must be 24 characters or fewer';
  end if;

  update public.profiles
  set username = v_username,
      avatar_url = v_avatar_url
  where id = v_user_id;

  if not found then
    raise exception 'Profile not found';
  end if;

  return jsonb_build_object(
    'username', v_username,
    'avatar_url', v_avatar_url
  );
end;
$$;

grant execute on function public.update_my_profile(text, text) to authenticated;

-- Build 02.1: Profile avatar storage
insert into storage.buckets (id, name, public)
values ('profile-avatars', 'profile-avatars', true)
on conflict (id) do update set public = true;

drop policy if exists "Users can view own profile avatar" on storage.objects;
drop policy if exists "Users can upload own profile avatar" on storage.objects;
drop policy if exists "Users can update own profile avatar" on storage.objects;
drop policy if exists "Users can delete own profile avatar" on storage.objects;

create policy "Users can view own profile avatar"
on storage.objects
for select
to authenticated
using (
  bucket_id = 'profile-avatars'
  and (storage.foldername(name))[1] = auth.uid()::text
);

create policy "Users can upload own profile avatar"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'profile-avatars'
  and (storage.foldername(name))[1] = auth.uid()::text
);

create policy "Users can update own profile avatar"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'profile-avatars'
  and (storage.foldername(name))[1] = auth.uid()::text
)
with check (
  bucket_id = 'profile-avatars'
  and (storage.foldername(name))[1] = auth.uid()::text
);

create policy "Users can delete own profile avatar"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'profile-avatars'
  and (storage.foldername(name))[1] = auth.uid()::text
);





-- ============================================================
-- BUILD 02.2 — FINAL STABILITY & INTEGRITY HARDENING
-- ============================================================
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
-- BUILD 02.3 — 24-HOUR MISSION TIMER / ACTIVE MISSION LIFECYCLE
-- ============================================================
-- The browser displays the countdown, but Supabase owns the deadline.

alter table public.challenge_history
  add column if not exists accepted_at timestamptz,
  add column if not exists expires_at timestamptz,
  add column if not exists completed_at timestamptz,
  add column if not exists failed_at timestamptz;

create index if not exists idx_history_active_mission
  on public.challenge_history(user_id, status, expires_at)
  where status='accepted';

create or replace function public.expire_overdue_missions()
returns integer language plpgsql security definer set search_path=public as $$
declare v_count integer; v_now timestamptz:=now();
begin
  update public.challenge_history set status='failed', failed_at=v_now
  where status='accepted' and deleted_at is null and expires_at is not null and expires_at<=v_now;
  get diagnostics v_count=row_count;
  return v_count;
end; $$;
revoke execute on function public.expire_overdue_missions() from anon, authenticated;

drop function if exists public.get_active_mission();
create or replace function public.get_active_mission()
returns jsonb language plpgsql security definer set search_path=public as $$
declare v_user_id uuid:=auth.uid(); v_history public.challenge_history%rowtype; v_now timestamptz:=now();
begin
  if v_user_id is null then raise exception 'Authentication required'; end if;
  perform public.expire_overdue_missions();
  select * into v_history from public.challenge_history where user_id=v_user_id and status='accepted' and deleted_at is null order by created_at desc limit 1;
  if not found then return jsonb_build_object('active',false); end if;
  return jsonb_build_object('active',true,'history_id',v_history.id,'challenge_id',v_history.challenge_id,'challenge_number',v_history.challenge_number,'challenge_name',v_history.challenge_name,'category',v_history.category,'category_label',v_history.category_label,'difficulty',v_history.difficulty,'accepted_at',v_history.accepted_at,'expires_at',v_history.expires_at,'remaining_ms',greatest(0,extract(epoch from (coalesce(v_history.expires_at,v_history.created_at+interval '24 hours')-v_now))*1000)::bigint);
end; $$;
grant execute on function public.get_active_mission() to authenticated;

create extension if not exists pg_cron;
select cron.unschedule(jobid) from cron.job where jobname='decide-for-me-expire-missions';
select cron.schedule('decide-for-me-expire-missions','* * * * *','select public.expire_overdue_missions();');
