-- DECIDE FOR ME — BUILD 02.1 MISSION LIFECYCLE + XP MIGRATION
-- Run this once in Supabase SQL Editor against the existing hosted database.
-- Do not run the entire supabase-schema.sql if the hosted database is already live.

alter table public.challenge_history
  add column if not exists xp_earned integer not null default 0;

-- Existing completed records pre-date xp_earned. Recover their base Mission XP
-- from the historical difficulty where possible. Proof bonuses cannot be
-- reconstructed from the existing history rows, so they remain unchanged.
update public.challenge_history
set xp_earned = case difficulty
  when 'easy' then 25
  when 'normal' then 50
  when 'challenge' then 75
  when 'mission' then 75
  when 'brutal' then 100
  when 'wild' then 150
  else 0
end
where status = 'completed'
  and coalesce(xp_earned, 0) = 0;

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

  select * into v_history
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

  select * into v_profile
  from public.profiles
  where id = v_user_id
  for update;

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
  set xp = coalesce(v_profile.xp, 0) + p_total_xp,
      streak = v_streak,
      last_complete_date = v_today,
      updated_at = v_now
  where id = v_user_id;

  return jsonb_build_object(
    'ok', true,
    'history_id', p_history_id,
    'xp', coalesce(v_profile.xp, 0) + p_total_xp,
    'streak', v_streak
  );
end;
$$;

grant execute on function public.complete_mission(uuid, integer) to authenticated;

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

drop function if exists public.remove_history_item(uuid);
create or replace function public.remove_history_item(
  p_history_id uuid
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user_id uuid := auth.uid();
  v_history public.challenge_history%rowtype;
  v_profile public.profiles%rowtype;
  v_deduct integer := 0;
  v_new_xp integer;
begin
  if v_user_id is null then raise exception 'Authentication required'; end if;
  if p_history_id is null then raise exception 'Mission history record is required'; end if;

  select * into v_history
  from public.challenge_history
  where id = p_history_id
    and user_id = v_user_id
    and deleted_at is null
  for update;

  if not found then raise exception 'Mission history record not found'; end if;

  select * into v_profile
  from public.profiles
  where id = v_user_id
  for update;

  if not found then raise exception 'Profile not found'; end if;

  if v_history.status = 'completed' then
    v_deduct := coalesce(v_history.xp_earned, 0);
  end if;

  v_new_xp := greatest(coalesce(v_profile.xp, 0) - v_deduct, 0);

  update public.challenge_history
  set deleted_at = now()
  where id = p_history_id
    and user_id = v_user_id
    and deleted_at is null;

  update public.profiles
  set xp = v_new_xp,
      updated_at = now()
  where id = v_user_id;

  return jsonb_build_object(
    'ok', true,
    'history_id', p_history_id,
    'xp', v_new_xp,
    'xp_deducted', v_deduct
  );
end;
$$;

grant execute on function public.remove_history_item(uuid) to authenticated;
