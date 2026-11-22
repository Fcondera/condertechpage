# ConderTech Marketplace

## Estado do checkout

O fluxo disponível é carrinho → revisão e entrega → confirmação dos valores e frete pela equipe → pagamento no Mercado Pago → acompanhamento. Produtos sob consulta precisam de preço aprovado; não existe cálculo automático de frete. A revisão identifica a conta compradora, e o acompanhamento atualiza ao voltar à aba.

- Validação local sem credenciais: `npm run test:marketplace`.
- O teste de OAuth usa o SDK real do Supabase com respostas simuladas para verificar que o cookie PKCE sobrevive ao redirecionamento e é consumido no retorno. O armazenamento OAuth aceita apenas esse verificador; a sessão do marketplace continua nos cookies HttpOnly próprios. O login real ainda depende da configuração do Google e das URLs autorizadas no Supabase.
- Validação das migrações em PostgreSQL isolado: `npm run test:marketplace:db` (requer o motor opcional descrito em `docs/mercadopago.md`).
- Com o site iniciado: `npm run test:marketplace:smoke -- http://localhost:3100`.
- Publicação: `npm run build`, seguida de `npm start`.

Para afirmar que falta somente o Mercado Pago, confirme antes as quatro migrações abaixo, login Google, cadastro com SMS e permissões administrativas no Supabase publicado. Os testes isolados não confirmam essa configuração externa. Nunca simule aprovação de pagamento para contornar credenciais ausentes.

Ordem das migrações: `src/sql/marketplace.sql` → `src/sql/marketplace-checkout.sql` → `src/sql/marketplace-chat.sql` → `src/sql/marketplace-payments.sql`. Depois, siga `docs/mercadopago.md` para credenciais, webhook e validação com contas de teste.

## Implemented

- Separate dark storefront at `/marketplace`, red/black/white branding, responsive search and category filters.
- Ten ConderTech products, including switches, corporate Wi-Fi, racks/cabling and UPS equipment, approved third-party listings, product pages, favorites and a persistent cart. Infrastructure specifications and prices remain subject to a real quote; the SVG illustrations do not represent a particular model.
- `/marketplace/checkout`: authenticated server-side product review, saved delivery address, payment preference, explicit conditions acceptance and confirmation linked to account history. The cart clears only after successful submission. Prices, seller IDs and availability are resolved again on submission; changed prices or delivery address require a fresh review. Repeated submissions use a unique request ID.
- `/marketplace/entrar` and `/cadastro`: Google OAuth only, using PKCE and HttpOnly session cookies. Password login, password reset and email/password signup are not used.
- `/marketplace/conta`: private customer profile, Google email, CPF, Brazilian address, terms acceptance, SMS phone verification and quote history. Favorites and cart are stored in the current browser, not synced across devices.
- `/marketplace/vender`: store registration, image upload, listing submission, pause/resubmission and incoming customer inquiries.
- Quotes are purchase inquiries, not paid orders. Approved quotes can now become fixed-price orders paid through Mercado Pago Checkout Pro, with server-side confirmation. Integration activation and operation are documented in `docs/mercadopago.md`. Commission, split payments and automated shipping rates are not implemented; ConderTech receives payments and manages repasses. The server validates listing status, prices, ownership and quantities.

## Activation

1. Copy `.env.example` to `.env.local` and fill `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, and `MARKETPLACE_SITE_URL`. Keep all values out of Git and client-side `NEXT_PUBLIC_*` variables. The anon key is used only by server-side OAuth/SMS code; the service-role key remains server-only.
2. Apply `src/sql/marketplace.sql`, then `src/sql/marketplace-checkout.sql` in the project's Supabase SQL editor, including for existing installations. The second migration adds infrastructure categories and a private checkout snapshot to quotes. It does not migrate quotes into paid orders. Verify that the bucket `marketplace-products` is private with a 5 MB limit and only JPEG/PNG/WebP allowed.
3. In Supabase Authentication, enable Google and configure its Google Client ID/Secret. In Google Cloud Console, register Supabase's callback URL (`https://<project-ref>.supabase.co/auth/v1/callback`) as the authorized redirect URI. In Supabase URL Configuration, set the Site URL and allow the app callback `https://<site>/api/marketplace/auth/callback`; add `http://localhost:3000/api/marketplace/auth/callback` for development. Set `MARKETPLACE_SITE_URL` to the matching app origin without a trailing slash.
4. Configure an SMS provider in Supabase Auth Phone settings and rate limits, and set the phone OTP length to 6 digits. Phone verification is needed before quotes, store creation, uploads or listing management. The app sends the OTP only after the customer saves a valid Brazilian phone number and profile.
5. The migration removes the three legacy policies that grant every authenticated user read/update/delete access to leads. Keep internal lead access restricted to authorized staff or the service role. Do not reapply the broad policies in `create_leads_table.sql` after activating public marketplace accounts. The new marketplace tables do not grant public writes.
6. Review a seller listing in the Supabase dashboard, then change `marketplace_listings.status` from `pendente` to `aprovado` to publish. Sellers cannot self-approve. Moderation is currently done in the database dashboard, not an in-app admin page.
7. Quote statuses (`solicitado`, `em_atendimento`, `respondido`, `cancelado`) are managed by the ConderTech team in the database. Sellers receive only the items belonging to their store and the contact details shared by the requesting customer.

## Validation before launch

### Chat between buyers and sellers

Apply `src/sql/marketplace-chat.sql` after the base marketplace migration. `/marketplace/mensagens` is available from the marketplace navigation, customer account and each buyer/seller inquiry. Existing inquiries receive conversations when an authorized participant first opens the inbox. Each inquiry has a separate conversation for each seller; buyers cannot select arbitrary recipients. ConderTech items route to users whose trusted `app_metadata.marketplace_role` is `admin`. Administrators only receive ConderTech conversations and their own purchases, not private partner conversations.

The inbox shows unread counts; the selected conversation refreshes every 5 seconds and the inbox every 15 seconds while the tab is visible. It supports plain text up to 2,000 characters, older-message pagination, sent/read status and retry deduplication. Read receipts cover only messages fetched into the active conversation. Text renders as escaped React content. There are no attachments, email notifications or push notifications. Access to raw chat tables and the unread-count function is restricted to the service role; all server operations authorize the authenticated participant.

Run `node scripts/chat-test.mjs` for route-level access and sender/read protection checks. Before launch, apply the migration and use distinct Google buyer/seller accounts to exchange messages, verify polling/read counts, retry after a network interruption, load over 100 messages, and confirm another seller cannot access the conversation. Also verify a ConderTech admin inbox. These database-backed checks require the configured authentication environment and are not replaced by the isolated tests.

Run `node scripts/checkout-test.mjs` for isolated price, ownership, quantity and availability validation. Run `node scripts/marketplace-smoke.mjs <local-origin>` against the running app for route and API protection checks.

After applying both migrations, verify checkout with an authenticated buyer: mixed priced and unpriced items, insufficient stock, changed price/address after review, payment preference and consent, retries, account history, and each seller's delivery details. A seller receives only their own items and the delivery/payment preference, never the other sellers' subtotal. No stock is reserved during an inquiry.

### Activating actual payments later

The cart checkout records an inquiry. The administration then approves actual item prices and freight, creating an immutable order and reserving partner stock. The buyer pays from `/marketplace/pagamento`; `/marketplace/administracao/pagamentos` handles approval. Apply `marketplace-payments.sql`, configure Mercado Pago credentials and signed payment notifications, and validate the external flow before enabling production. See `docs/mercadopago.md` for activation, recovery and reservation operations. Provider secrets remain server-only; redirects never confirm payment.

Use separate Google buyer and seller accounts: verify OAuth callback and logout; complete profile and terms; verify SMS delivery; verify one user cannot read another user's quotes or modify another seller's listing; upload JPG/PNG/WebP under 5 MB; submit, approve and pause a listing; submit an inquiry; confirm the seller sees only their own items. Check Google redirects and SMS delivery in the deployed environment. These external flows need configured Supabase/Google/SMS credentials and cannot be validated by TypeScript or the build alone.

Do not show fake reviews, orders, prices, discounts or seller verification badges. Empty account states are intentional. Existing ConderTech images are illustrative.

Supabase API references: https://supabase.com/docs/reference/javascript/auth-signinwithoauth, https://supabase.com/docs/reference/javascript/auth-exchangecodeforsession, https://supabase.com/docs/reference/javascript/auth-updateuser, https://supabase.com/docs/reference/javascript/auth-verifyotp.
