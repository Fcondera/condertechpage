-- Apply after marketplace.sql and marketplace-checkout.sql.
-- Single collector: ConderTech receives funds and handles seller repasses.
create table if not exists public.marketplace_orders (
  id uuid primary key default gen_random_uuid(),
  quote_id uuid not null unique references public.marketplace_quotes(id),
  user_id uuid not null references auth.users(id),
  approved_by uuid not null references auth.users(id),
  items jsonb not null,
  address jsonb not null,
  shipping_cents integer not null check (shipping_cents >= 0),
  total_cents integer not null check (total_cents between 100 and 100000000),
  collector_id text not null,
  live_mode boolean not null,
  status text not null default 'ready' check (status in ('ready','creating','awaiting_payment','paid','refunded','charged_back','payment_review','cancelled')),
  preference_id text unique,
  checkout_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists marketplace_orders_user on public.marketplace_orders(user_id, created_at desc);
create table if not exists public.marketplace_payment_events (
  payment_id text primary key,
  order_id uuid not null references public.marketplace_orders(id),
  status text not null,
  refunded_cents integer not null default 0,
  provider_updated_at timestamptz not null,
  received_at timestamptz not null default now()
);
alter table public.marketplace_orders enable row level security;
alter table public.marketplace_payment_events enable row level security;
revoke all on public.marketplace_orders, public.marketplace_payment_events from anon, authenticated;
grant all on public.marketplace_orders, public.marketplace_payment_events to service_role;

-- Freeze the approved quote and reserve partner inventory in the same transaction.
create or replace function public.marketplace_approve_order(p_quote uuid, p_admin uuid, p_prices jsonb, p_shipping integer, p_collector text, p_live boolean)
returns uuid language plpgsql set search_path = public as $$
declare q marketplace_quotes; existing uuid; item jsonb; price jsonb; frozen jsonb := '[]'; total bigint := p_shipping; qty integer; unit integer; addr jsonb;
begin
  if not exists(select 1 from auth.users where id=p_admin and raw_app_meta_data->>'marketplace_role'='admin') then raise exception 'ADMIN_REQUIRED'; end if;
  select * into q from marketplace_quotes where id=p_quote for update;
  if not found or q.status='cancelado' then raise exception 'QUOTE_UNAVAILABLE'; end if;
  select id into existing from marketplace_orders where quote_id=p_quote;
  if existing is not null then return existing; end if;
  if p_shipping is null or p_shipping<0 or jsonb_typeof(p_prices)<>'array' or jsonb_array_length(p_prices)<>jsonb_array_length(q.items) then raise exception 'INVALID_PRICES'; end if;
  for item in select value from jsonb_array_elements(q.items) order by value->>'id' loop
    select value into price from jsonb_array_elements(p_prices) where value->>'id'=item->>'id';
    unit := (price->>'price_cents')::integer; qty := (item->>'quantity')::integer;
    if unit is null or unit<100 or unit>100000000 or qty<1 or qty>999 then raise exception 'INVALID_PRICES'; end if;
    if item->>'seller_id' is not null then
      update marketplace_listings set stock=stock-qty where id=(item->>'id')::uuid and seller_id=(item->>'seller_id')::uuid and status='aprovado' and stock>=qty;
      if not found then raise exception 'STOCK_UNAVAILABLE'; end if;
    end if;
    frozen := frozen || jsonb_build_array(item || jsonb_build_object('price_cents',unit));
    total := total + unit::bigint * qty;
  end loop;
  if total<100 or total>100000000 then raise exception 'INVALID_TOTAL'; end if;
  addr := q.checkout->'address';
  if addr is null then select jsonb_build_object('name',name,'cep',cep,'street',street,'number',number,'complement',complement,'neighborhood',neighborhood,'city',city,'state',state) into addr from marketplace_profiles where user_id=q.user_id; end if;
  if addr is null then raise exception 'ADDRESS_REQUIRED'; end if;
  insert into marketplace_orders(quote_id,user_id,approved_by,items,address,shipping_cents,total_cents,collector_id,live_mode)
  values(q.id,q.user_id,p_admin,frozen,addr,p_shipping,total,p_collector,p_live) returning id into existing;
  return existing;
end $$;

-- Serialize webhook reconciliation on each order and reject older provider states.
create or replace function public.marketplace_reconcile_payment(p_order uuid,p_payment text,p_status text,p_refunded integer,p_updated timestamptz)
returns void language plpgsql set search_path = public as $$
declare state text; approved integer; refunds integer; contested integer; partials integer; mediation integer;
begin
  perform 1 from marketplace_orders where id=p_order for update;
  if not found then raise exception 'ORDER_NOT_FOUND'; end if;
  if exists(select 1 from marketplace_payment_events where payment_id=p_payment and order_id<>p_order) then raise exception 'PAYMENT_CONFLICT'; end if;
  insert into marketplace_payment_events(payment_id,order_id,status,refunded_cents,provider_updated_at)
  values(p_payment,p_order,p_status,p_refunded,p_updated)
  on conflict(payment_id) do update set status=excluded.status,refunded_cents=excluded.refunded_cents,provider_updated_at=excluded.provider_updated_at,received_at=now()
    where excluded.provider_updated_at > marketplace_payment_events.provider_updated_at;
  select count(*) filter(where status='approved'),count(*) filter(where status='refunded'),count(*) filter(where status='charged_back'),count(*) filter(where refunded_cents>0 and status<>'refunded'),count(*) filter(where status='in_mediation')
  into approved,refunds,contested,partials,mediation from marketplace_payment_events where order_id=p_order;
  state := case when contested>0 then 'charged_back' when approved>1 or partials>0 or mediation>0 or (approved>0 and refunds>0) then 'payment_review' when approved=1 then 'paid' when refunds>0 then 'refunded' else 'awaiting_payment' end;
  update marketplace_orders set status=state,updated_at=now() where id=p_order;
end $$;
revoke all on function public.marketplace_approve_order(uuid,uuid,jsonb,integer,text,boolean) from public,anon,authenticated;
revoke all on function public.marketplace_reconcile_payment(uuid,text,text,integer,timestamptz) from public,anon,authenticated;
grant execute on function public.marketplace_approve_order(uuid,uuid,jsonb,integer,text,boolean) to service_role;
grant execute on function public.marketplace_reconcile_payment(uuid,text,text,integer,timestamptz) to service_role;

-- Only a checkout that has never been created can be cancelled and released locally.
create or replace function public.marketplace_cancel_unstarted_order(p_order uuid,p_admin uuid)
returns void language plpgsql set search_path = public as $$
declare o marketplace_orders; item jsonb;
begin
  if not exists(select 1 from auth.users where id=p_admin and raw_app_meta_data->>'marketplace_role'='admin') then raise exception 'ADMIN_REQUIRED'; end if;
  select * into o from marketplace_orders where id=p_order for update;
  if not found then raise exception 'ORDER_NOT_FOUND'; end if;
  if o.status='cancelled' then return; end if;
  if o.status<>'ready' or o.preference_id is not null then raise exception 'PAYMENT_ALREADY_STARTED'; end if;
  for item in select value from jsonb_array_elements(o.items) order by value->>'id' loop
    if item->>'seller_id' is not null then
      update marketplace_listings set stock=stock+(item->>'quantity')::integer where id=(item->>'id')::uuid;
    end if;
  end loop;
  update marketplace_orders set status='cancelled',updated_at=now() where id=o.id;
end $$;
revoke all on function public.marketplace_cancel_unstarted_order(uuid,uuid) from public,anon,authenticated;
grant execute on function public.marketplace_cancel_unstarted_order(uuid,uuid) to service_role;
