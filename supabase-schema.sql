-- DECIDE FOR ME — BUILD 01.1 HOSTED FOUNDATION
-- Run in Supabase SQL Editor. This is additive where possible.

create extension if not exists pgcrypto;

create table if not exists public.profiles (
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
  id uuid primary key default gen_random_uuid(),
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
-- BUILD 01.1.7 — ROBUST HOSTED DAILY FATE ATTEMPT RPC
-- ============================================================
-- The browser sends only the Mission ID. PostgreSQL resolves the Mission
-- record and atomically consumes one of the user's 10 daily attempts.
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
begin
  if auth.uid() is null then
    raise exception 'Authentication required';
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
    'allowed', v_used < v_limit
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

  select count(*)::integer
    into v_used
  from public.challenge_history
  where user_id = v_user_id
    and status = 'accepted'
    and created_at >= date_trunc('day', v_now at time zone 'UTC') at time zone 'UTC'
    and created_at <  (date_trunc('day', v_now at time zone 'UTC') + interval '1 day') at time zone 'UTC';

  if v_used >= v_limit then
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
    'remaining', v_limit - v_used,
    'limit', v_limit,
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
create or replace function public.complete_mission(
  p_challenge_id text,
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
  v_mission public.missions%rowtype;
  v_streak integer;
  v_history_id uuid := gen_random_uuid();
  v_position integer;
  v_number text;
  v_category_label text;
begin
  if v_user_id is null then raise exception 'Authentication required'; end if;
  if p_total_xp < 0 then raise exception 'Invalid XP value'; end if;

  select * into v_mission from public.missions where id::text = p_challenge_id and active = true;
  if not found then raise exception 'Mission not found or inactive'; end if;

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

  v_position := ((nullif(regexp_replace(v_mission.id::text, '\D', '', 'g'), '')::integer - 1) % 200) + 1;
  v_number := case v_mission.category
    when 'relationships' then '10' when 'finance' then '20' when 'work' then '30'
    when 'entertainment' then '40' when 'life-admin' then '50' when 'chores' then '60'
    else '00' end || '.' || lpad(v_position::text, 6, '0');
  v_category_label := case v_mission.category
    when 'relationships' then 'Relationships' when 'finance' then 'Finance' when 'work' then 'Work'
    when 'entertainment' then 'Entertainment' when 'life-admin' then 'Life Admin' when 'chores' then 'Chores'
    else v_mission.category end;

  insert into public.challenge_history(
    id,user_id,challenge_id,challenge_number,challenge_name,category,category_label,difficulty,status,created_at
  ) values (
    v_history_id,v_user_id,v_mission.id::text,v_number,v_mission.text,v_mission.category,v_category_label,
    v_mission.difficulty,'completed',v_now
  );

  update public.profiles
  set xp = coalesce(v_profile.xp,0) + p_total_xp,
      streak = v_streak,
      last_complete_date = v_today,
      updated_at = v_now
  where id = v_user_id;

  return jsonb_build_object('ok',true,'history_id',v_history_id,'xp',coalesce(v_profile.xp,0)+p_total_xp,'streak',v_streak);
end;
$$;

grant execute on function public.complete_mission(text, integer) to authenticated;


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
