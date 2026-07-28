-- Run this once in the Supabase SQL editor (Project > SQL Editor > New query)

create table if not exists registrations (
  id uuid primary key default gen_random_uuid(),
  category text not null,
  team_name text not null,
  contact_name text not null,
  email text not null,
  phone text not null,
  players int,
  notes text,
  screenshot_url text not null,
  created_at timestamptz not null default now()
);

-- Enable Row Level Security. No public policies are added on purpose —
-- all reads/writes go through the API route using the service role key,
-- which bypasses RLS. This keeps the table locked down from direct
-- client access.
alter table registrations enable row level security;

-- Create the storage bucket for payment screenshots.
-- (You can also do this via Supabase dashboard: Storage > New bucket > "payment-screenshots", private)
insert into storage.buckets (id, name, public)
values ('payment-screenshots', 'payment-screenshots', false)
on conflict (id) do nothing;
