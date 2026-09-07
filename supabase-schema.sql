-- Decide For Me V5 — Supabase schema
create table if not exists public.challenge_history (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  challenge_id text not null,
  challenge_number text not null,
  challenge_name text not null,
  category text not null,
  category_label text,
  difficulty text not null,
  status text not null check (status in ('accepted','completed','declined','passed','failed')),
  created_at timestamptz not null default now()
);

alter table public.challenge_history enable row level security;

create policy "Users can read own challenge history"
on public.challenge_history for select
using (auth.uid() = user_id);

create policy "Users can insert own challenge history"
on public.challenge_history for insert
with check (auth.uid() = user_id);

create index if not exists challenge_history_user_created_idx
on public.challenge_history(user_id, created_at desc);
