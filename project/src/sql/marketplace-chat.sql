-- Apply after marketplace.sql. All chat access goes through authenticated server routes.
create table if not exists public.marketplace_threads (
  id uuid primary key default gen_random_uuid(),
  quote_id uuid not null references public.marketplace_quotes(id) on delete cascade,
  buyer_id uuid not null references auth.users(id) on delete cascade,
  seller_key text not null,
  subject text not null,
  created_at timestamptz not null default now(),
  unique (quote_id, seller_key)
);
create index if not exists marketplace_threads_buyer on public.marketplace_threads (buyer_id);
create index if not exists marketplace_threads_seller on public.marketplace_threads (seller_key);
create table if not exists public.marketplace_messages (
  id bigint generated always as identity primary key,
  thread_id uuid not null references public.marketplace_threads(id) on delete cascade,
  sender_id uuid not null references auth.users(id),
  sender_side text not null check (sender_side in ('buyer', 'seller')),
  request_id uuid not null,
  body text not null check (length(trim(body)) between 1 and 2000),
  created_at timestamptz not null default now(),
  read_at timestamptz,
  unique (sender_id, request_id)
);
create index if not exists marketplace_messages_thread on public.marketplace_messages (thread_id, id desc);
create index if not exists marketplace_messages_unread on public.marketplace_messages (thread_id, sender_side) where read_at is null;
alter table public.marketplace_threads enable row level security;
alter table public.marketplace_messages enable row level security;
revoke all on public.marketplace_threads, public.marketplace_messages from anon, authenticated;
grant all on public.marketplace_threads, public.marketplace_messages to service_role;
grant usage, select on sequence public.marketplace_messages_id_seq to service_role;

-- Aggregate unread counts in one query; callable only by the server service role.
create or replace function public.marketplace_unread_counts(p_user_id uuid, p_admin boolean)
returns table(thread_id uuid, unread bigint)
language sql stable set search_path = public
as $$
  select t.id, count(m.id)
  from marketplace_threads t
  join marketplace_messages m on m.thread_id = t.id and m.read_at is null
    and m.sender_side <> case when t.buyer_id = p_user_id then 'buyer' else 'seller' end
  where t.buyer_id = p_user_id or t.seller_key = p_user_id::text
    or (p_admin and t.seller_key = 'condertech')
  group by t.id;
$$;
revoke all on function public.marketplace_unread_counts(uuid, boolean) from public, anon, authenticated;
grant execute on function public.marketplace_unread_counts(uuid, boolean) to service_role;
