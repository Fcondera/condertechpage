-- Run in the Supabase SQL editor before enabling quote submission.
-- Public marketplace accounts must not inherit the legacy access to sales leads.
do $$
begin
  if to_regclass('public.leads') is not null then
    execute 'drop policy if exists "Allow authenticated select leads" on public.leads';
    execute 'drop policy if exists "Allow authenticated update leads" on public.leads';
    execute 'drop policy if exists "Allow authenticated delete leads" on public.leads';
  end if;
end $$;

create table if not exists public.marketplace_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  name text not null check (length(name) between 5 and 100),
  phone text not null check (phone ~ '^[1-9]{2}9[0-9]{8}$'),
  cpf text not null check (cpf ~ '^[0-9]{11}$'),
  cep text not null check (cep ~ '^[0-9]{8}$'),
  street text not null check (length(street) between 2 and 160),
  number text not null check (length(number) between 1 and 20),
  complement text not null default '' check (length(complement) <= 100),
  neighborhood text not null check (length(neighborhood) between 2 and 100),
  city text not null check (length(city) between 2 and 100),
  state text not null check (state in ('AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO')),
  company text not null default '' check (length(company) <= 160),
  terms_accepted_at timestamptz not null,
  phone_verified_at timestamptz,
  updated_at timestamptz not null default now()
);
alter table public.marketplace_profiles enable row level security;
revoke all on public.marketplace_profiles from anon, authenticated;
grant all on public.marketplace_profiles to service_role;
create index if not exists marketplace_profiles_phone on public.marketplace_profiles (phone);

create table if not exists public.marketplace_quotes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  request_id uuid not null,
  items jsonb not null check (jsonb_typeof(items) = 'array' and jsonb_array_length(items) between 1 and 50),
  customer_contact jsonb not null default '{}'::jsonb,
  notes text not null default '' check (length(notes) <= 2000),
  status text not null default 'solicitado' check (status in ('solicitado', 'em_atendimento', 'respondido', 'cancelado')),
  created_at timestamptz not null default now(),
  unique (user_id, request_id)
);
create index if not exists marketplace_quotes_user_date on public.marketplace_quotes (user_id, created_at desc);
alter table public.marketplace_quotes enable row level security;
revoke all on public.marketplace_quotes from anon, authenticated;
grant select on public.marketplace_quotes to authenticated;
grant all on public.marketplace_quotes to service_role;
drop policy if exists "Customers read their own quotes" on public.marketplace_quotes;
create policy "Customers read their own quotes" on public.marketplace_quotes
for select to authenticated using ((select auth.uid()) = user_id);
-- Writes are performed by the server after validating the authenticated user,
-- product IDs and quantities. Clients cannot set prices or change quote status.

create table if not exists public.marketplace_sellers (
  user_id uuid primary key references auth.users(id) on delete cascade,
  name text not null check (length(name) between 3 and 80),
  city text not null check (length(city) between 2 and 100),
  description text not null default '' check (length(description) <= 1000),
  created_at timestamptz not null default now()
);
create table if not exists public.marketplace_listings (
  id uuid primary key default gen_random_uuid(),
  seller_id uuid not null references public.marketplace_sellers(user_id) on delete cascade,
  title text not null check (length(title) between 5 and 100),
  description text not null check (length(description) between 20 and 4000),
  category text not null check (category in ('PDV', 'Ponto', 'NFC', 'Software', 'Outros')),
  price_cents integer not null check (price_cents between 100 and 100000000),
  stock integer not null check (stock between 0 and 99999),
  image_path text not null,
  status text not null default 'pendente' check (status in ('pendente', 'aprovado', 'pausado', 'rejeitado')),
  created_at timestamptz not null default now()
);
create index if not exists marketplace_listings_status on public.marketplace_listings (status, created_at desc);
create index if not exists marketplace_listings_seller on public.marketplace_listings (seller_id);
alter table public.marketplace_sellers enable row level security;
alter table public.marketplace_listings enable row level security;
revoke all on public.marketplace_sellers, public.marketplace_listings from anon, authenticated;
grant all on public.marketplace_sellers, public.marketplace_listings to service_role;
-- Only the server accesses these tables. Public endpoints return approved
-- listings and public seller names, never authentication or private user data.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('marketplace-products', 'marketplace-products', false, 5242880, array['image/jpeg','image/png','image/webp'])
on conflict (id) do nothing;
