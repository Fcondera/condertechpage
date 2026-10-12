# ConderTech Marketplace

## Implemented

- Separate dark storefront at `/marketplace`, red/black/white branding, responsive search and category filters.
- Six ConderTech products, approved third-party listings, product pages, favorites and a persistent cart.
- `/marketplace/entrar`, `/cadastro`, `/recuperar`, `/redefinir-senha`: Supabase signup, password login, confirmation and recovery.
- `/marketplace/conta`: authenticated profile editing and quote history. Favorites and cart are stored in the current browser, not synced across devices.
- `/marketplace/vender`: store registration, image upload, listing submission, pause/resubmission and incoming customer inquiries.
- Quotes are purchase inquiries, not paid orders. No gateway, commission, split payments or shipping calculation is configured. The server validates listing status, current prices, ownership and quantities; the browser cannot choose prices or seller IDs.

## Activation

1. Keep `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` server-only, as in the existing project. No service key is sent to the browser. Every request gets a fresh client; never share an authenticated client between users.
2. Apply `src/sql/marketplace.sql` in the project's Supabase SQL editor. It creates sellers, listings, quotes, indexes, RLS and a private image bucket. This migration has not been applied by the coding agent.
3. Set `MARKETPLACE_SITE_URL` to the deployed origin (without a trailing slash). In Supabase Authentication, enable email/password, email confirmation, rate limits and configure production SMTP. Add the production URL and allowed redirects `/marketplace/entrar` and `/marketplace/redefinir-senha`. Configure equivalent localhost URLs for development.
4. The migration removes the three legacy policies that grant every authenticated user read/update/delete access to leads. Keep internal lead access restricted to authorized staff or the service role. Do not reapply the broad policies in `create_leads_table.sql` after activating public marketplace accounts. The new marketplace tables do not grant public writes.
5. Review a seller listing in the Supabase dashboard, then change `marketplace_listings.status` from `pendente` to `aprovado` to publish. Sellers cannot self-approve. Moderation is currently done in the database dashboard, not an in-app admin page.
6. Quote statuses (`solicitado`, `em_atendimento`, `respondido`, `cancelado`) are managed by the ConderTech team in the database. Sellers receive only the items belonging to their store and the contact details shared by the requesting customer.

## Validation before launch

Use separate test buyer and seller accounts: verify email confirmation; login/logout/recovery; verify one user cannot read another user's quotes or modify another seller's listing; upload JPG/PNG/WebP under 5 MB; submit, approve and pause a listing; submit an inquiry; confirm the seller sees only their own items. Check SMTP delivery and redirects in the deployed environment. These flows need the configured Supabase project and are not validated by TypeScript or the build.

Do not show fake reviews, orders, prices, discounts or seller verification badges. Empty account states are intentional. Existing ConderTech images are illustrative.

Supabase API references: https://supabase.com/docs/reference/javascript/auth-signup, https://supabase.com/docs/reference/javascript/auth-getuser, https://supabase.com/docs/reference/javascript/auth-refreshsession.
