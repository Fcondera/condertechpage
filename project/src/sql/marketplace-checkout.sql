-- Apply after marketplace.sql, including on existing installations.
alter table public.marketplace_listings drop constraint if exists marketplace_listings_category_check;
alter table public.marketplace_listings add constraint marketplace_listings_category_check
  check (category in ('PDV', 'Ponto', 'NFC', 'Software', 'Redes', 'Infraestrutura', 'Energia', 'Outros'));
alter table public.marketplace_quotes add column if not exists checkout jsonb;
-- Checkout is a purchase inquiry, never evidence of payment or a stock reservation.
-- Existing RLS and server-only writes continue to apply.
