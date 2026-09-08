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
  id text primary key,
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

create table if not exists public.wall_posts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  mission_id text references public.missions(id) on delete set null,
  mission_number text,
  mission text not null,
  category text not null,
  category_label text,
  category_emoji text,
  difficulty text not null,
  proof_type text,
  proof_content jsonb,
  reward_unlocked boolean not null default false,
  created_at timestamptz not null default now()
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

-- Add your admin separately:
-- insert into public.admins(user_id) values ('YOUR_AUTH_USER_UUID') on conflict do nothing;


-- ============================================================
-- BUILD 01.1.1 — HOSTED DAILY FATE ATTEMPT LIMIT
-- ============================================================
-- 10 accepted Fate attempts per authenticated user per UTC day.
drop function if exists public.consume_daily_attempt(text, text, text, text, text, text);
-- Enforcement happens in PostgreSQL via consume_daily_attempt(), not
-- in browser JavaScript, so the limit cannot be bypassed client-side.

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
  p_challenge_id text,
  p_challenge_number text,
  p_challenge_name text,
  p_category text,
  p_category_label text,
  p_difficulty text
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_used integer;
  v_limit integer := 10;
  v_id text := gen_random_uuid()::text;
  v_now timestamptz := now();
begin
  if auth.uid() is null then
    raise exception 'Authentication required';
  end if;

  -- Serialize concurrent attempts from the same user.
  perform pg_advisory_xact_lock(hashtext(auth.uid()::text));

  select count(*)::integer
    into v_used
  from public.challenge_history
  where user_id = auth.uid()
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

  insert into public.challenge_history (
    id,
    user_id,
    challenge_id,
    challenge_number,
    challenge_name,
    category,
    category_label,
    difficulty,
    status,
    created_at
  )
  values (
    v_id,
    auth.uid(),
    p_challenge_id,
    p_challenge_number,
    p_challenge_name,
    p_category,
    p_category_label,
    p_difficulty,
    'accepted',
    v_now
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

grant execute on function public.get_daily_attempt_status() to authenticated;
grant execute on function public.consume_daily_attempt(text, text, text, text, text, text) to authenticated;


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
