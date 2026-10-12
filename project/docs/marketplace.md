# ConderTech Marketplace

## Implemented

- Separate dark storefront at `/marketplace`, red/black/white branding, responsive search and category filters.
- Six ConderTech products, approved third-party listings, product pages, favorites and a persistent cart.
- `/marketplace/entrar` and `/cadastro`: Google OAuth only, using PKCE and HttpOnly session cookies. Password login, password reset and email/password signup are not used.
- `/marketplace/conta`: private customer profile, Google email, CPF, Brazilian address, terms acceptance, SMS phone verification and quote history. Favorites and cart are stored in the current browser, not synced across devices.
- `/marketplace/vender`: store registration, image upload, listing submission, pause/resubmission and incoming customer inquiries.
- Quotes are purchase inquiries, not paid orders. No gateway, commission, split payments or shipping calculation is configured. The server validates listing status, current prices, ownership and quantities; the browser cannot choose prices or seller IDs.

## Activation

1. Copy `.env.example` to `.env.local` and fill `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, and `MARKETPLACE_SITE_URL`. Keep all values out of Git and client-side `NEXT_PUBLIC_*` variables. The anon key is used only by server-side OAuth/SMS code; the service-role key remains server-only.
2. Apply `src/sql/marketplace.sql` in the project's Supabase SQL editor. It creates private profiles, sellers, listings, quotes, indexes, RLS and a private image bucket. Verify that the bucket `marketplace-products` is private with a 5 MB limit and only JPEG/PNG/WebP allowed.
3. In Supabase Authentication, enable Google and configure its Google Client ID/Secret. In Google Cloud Console, register Supabase's callback URL (`https://<project-ref>.supabase.co/auth/v1/callback`) as the authorized redirect URI. In Supabase URL Configuration, set the Site URL and allow the app callback `https://<site>/api/marketplace/auth/callback`; add `http://localhost:3000/api/marketplace/auth/callback` for development. Set `MARKETPLACE_SITE_URL` to the matching app origin without a trailing slash.
4. Configure an SMS provider in Supabase Auth Phone settings and rate limits, and set the phone OTP length to 6 digits. Phone verification is needed before quotes, store creation, uploads or listing management. The app sends the OTP only after the customer saves a valid Brazilian phone number and profile.
5. The migration removes the three legacy policies that grant every authenticated user read/update/delete access to leads. Keep internal lead access restricted to authorized staff or the service role. Do not reapply the broad policies in `create_leads_table.sql` after activating public marketplace accounts. The new marketplace tables do not grant public writes.
6. Review a seller listing in the Supabase dashboard, then change `marketplace_listings.status` from `pendente` to `aprovado` to publish. Sellers cannot self-approve. Moderation is currently done in the database dashboard, not an in-app admin page.
7. Quote statuses (`solicitado`, `em_atendimento`, `respondido`, `cancelado`) are managed by the ConderTech team in the database. Sellers receive only the items belonging to their store and the contact details shared by the requesting customer.

## Validation before launch

Use separate Google buyer and seller accounts: verify OAuth callback and logout; complete profile and terms; verify SMS delivery; verify one user cannot read another user's quotes or modify another seller's listing; upload JPG/PNG/WebP under 5 MB; submit, approve and pause a listing; submit an inquiry; confirm the seller sees only their own items. Check Google redirects and SMS delivery in the deployed environment. These external flows need configured Supabase/Google/SMS credentials and cannot be validated by TypeScript or the build alone.

Do not show fake reviews, orders, prices, discounts or seller verification badges. Empty account states are intentional. Existing ConderTech images are illustrative.

Supabase API references: https://supabase.com/docs/reference/javascript/auth-signinwithoauth, https://supabase.com/docs/reference/javascript/auth-exchangecodeforsession, https://supabase.com/docs/reference/javascript/auth-updateuser, https://supabase.com/docs/reference/javascript/auth-verifyotp.
