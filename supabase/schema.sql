-- Secret Chess initial schema. Run in a dedicated Supabase project.
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text not null unique check (char_length(username) between 3 and 20),
  rating integer not null default 1200 check (rating >= 0),
  wins integer not null default 0,
  losses integer not null default 0,
  draws integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
create policy "Profiles are publicly readable" on public.profiles
  for select to anon, authenticated using (true);
create policy "Players can update their own display name" on public.profiles
  for update to authenticated using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = ''
as $$
declare requested_name text;
begin
  requested_name := coalesce(new.raw_user_meta_data ->> 'username', split_part(new.email, '@', 1));
  insert into public.profiles (id, username)
  values (new.id, left(requested_name, 20))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
  for each row execute procedure public.handle_new_user();

create table if not exists public.matches (
  id uuid primary key default gen_random_uuid(),
  white_player uuid not null references public.profiles(id),
  black_player uuid not null references public.profiles(id),
  status text not null default 'waiting' check (status in ('waiting','deploying','active','finished','cancelled')),
  result text check (result in ('white_win','black_win','draw')),
  created_at timestamptz not null default now(),
  finished_at timestamptz,
  check (white_player <> black_player)
);
alter table public.matches enable row level security;
create policy "Players can view their own matches" on public.matches
  for select to authenticated
  using ((select auth.uid()) = white_player or (select auth.uid()) = black_player);

-- Match setup and rating updates must be performed by trusted server-side game logic.
-- Do not expose hidden piece positions in public tables or Realtime channels.
