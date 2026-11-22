# Mercado Pago — ativação e operação

O fluxo implementado é **solicitação → valor e frete aprovados pela equipe → revisão pelo cliente → Checkout Pro → confirmação no servidor**. A ConderTech recebe o pagamento e administra os repasses aos parceiros fora desta integração. Não há split, comissão automática nem transferência bancária automática.

## Configuração

1. Aplique `src/sql/marketplace.sql`, `marketplace-checkout.sql` e `marketplace-payments.sql` no Supabase. A migração de chat continua necessária para as conversas. A migração de pagamentos é reaplicável e mantém as tabelas privadas.
2. No ambiente do servidor, configure:

   ```dotenv
   MARKETPLACE_SITE_URL=https://www.condertech.com.br
   MERCADOPAGO_ACCESS_TOKEN=<access token da conta recebedora>
   MERCADOPAGO_WEBHOOK_SECRET=<assinatura secreta do webhook da aplicação>
   MERCADOPAGO_COLLECTOR_ID=<ID numérico da conta ConderTech>
   MERCADOPAGO_MODE=test
   ```

   Use as credenciais indicadas pelo Mercado Pago para o ambiente de testes. Em produção, altere para `MERCADOPAGO_MODE=production` e use as credenciais reais correspondentes. Nenhuma dessas variáveis deve usar `NEXT_PUBLIC_`. Não cole tokens em chats, tickets ou Git. O frontend não precisa de public key, pois usa redirecionamento ao checkout hospedado.
3. Em Suas integrações no Mercado Pago, configure o evento **Pagamentos** no webhook:

   `https://www.condertech.com.br/api/marketplace/payments/webhook`

   Copie a assinatura secreta para a variável do servidor. O `notification_url` das preferências usa essa mesma rota com `source_news=webhooks`. O domínio deve estar publicado com HTTPS; localhost não recebe notificações externas.
4. Defina `app_metadata.marketplace_role=admin` para as contas Google da equipe por um processo administrativo confiável no Supabase. Não use `user_metadata`. Compradores e vendedores não podem atribuir esse papel a si mesmos.
5. Publique e abra `/marketplace/administracao/pagamentos`. A equipe confirma disponibilidade, especificações, preço unitário de cada item e frete (zero deve ser informado explicitamente quando aplicável). O token é conferido com `/users/me` antes da liberação.
6. O cliente abre **Minha conta → Meus pagamentos**, revisa o endereço e total e clica **Pagar com Mercado Pago**. Cartão, Pix e boleto dependem da disponibilidade na conta, ambiente e regras do Mercado Pago; a aplicação não promete parcelas ou métodos específicos.

## Consistência e estoque

- A aprovação cria um pedido imutável, ligado à solicitação, com preço, quantidade, endereço, frete, conta recebedora e ambiente congelados. A reserva de estoque de anúncios parceiros ocorre na mesma transação. Produtos próprios sob consulta dependem da confirmação de disponibilidade pela equipe.
- Repetir a aprovação retorna o pedido existente e não reserva novamente. Um pedido cancelado não é reaberto: para uma proposta revisada, envie uma nova solicitação.
- Uma única requisição pode iniciar a preferência: a transição `ready → creating` usa atualização condicional. Após criada, o mesmo checkout é reutilizado. Uma falha de rede ambígua mantém `creating` e não cria outra preferência automaticamente.
- Antes de iniciar o checkout, a administração pode cancelar a cobrança e devolver a reserva ao estoque uma única vez. Depois que o checkout foi iniciado, cancelamentos, estornos e eventual reposição física de estoque precisam ser confirmados pela equipe no Mercado Pago. **Reservas de pedidos não pagos não expiram automaticamente**. A equipe deve acompanhar pendências; não libere estoque enquanto ainda existir possibilidade de pagamento.
- O webhook valida HMAC-SHA256 e consulta `/v1/payments/{id}`. Apenas dados consultados no provedor podem atualizar o pedido. São conferidos referência externa, valor bruto em centavos, BRL, recebedor e ambiente. O hash assina o ID da query; o corpo da notificação e os parâmetros do retorno não decidem o estado do pedido.
- A reconciliação transacional ignora estados antigos e notificações repetidas. Recusas de novas tentativas não apagam uma aprovação existente. Reembolso total, contestação, reembolso parcial, mediação ou múltiplas aprovações recebem estados próprios ou revisão. A equipe deve resolver cobranças duplicadas no Mercado Pago antes de concluir atendimento.
- Nenhuma entrega, repasse ou nota fiscal é disparada automaticamente. Use `paid` como confirmação financeira e confira o atendimento; `payment_review` e `charged_back` exigem análise. Não deduza aprovação de um comprovante enviado por mensagem.

## Recuperação de falhas

Se o checkout ficar em `creating`, encontre a preferência já criada no Mercado Pago usando a referência externa (UUID do pedido). Em **Administrar pagamentos**, informe seu ID em **Recuperar checkout existente**. A API busca essa preferência no provedor e confere recebedor, referência e todos os itens antes de associá-la. Não crie outra preferência para contornar um timeout; se não houver preferência recuperável, confirme a situação com o provedor antes de qualquer intervenção administrativa no pedido.

Se o cliente já pagou e o webhook atrasou, use **Já pagou e o status não atualizou? → Consultar pagamento**, com o número do pagamento. A consulta exige acesso ao pedido e passa pelas mesmas verificações do webhook. A consulta por ID também permite validar pagamentos de teste quando o ambiente não emite notificações automáticas. O retorno do checkout apenas abre `/marketplace/pagamento?pedido=<uuid>` e consulta o banco; ele nunca marca um pedido como pago.

Estornos e cancelamentos financeiros são efetuados no painel Mercado Pago. Após a operação, receba o webhook ou sincronize o pagamento para atualizar o pedido local. Os repasses para vendedores são responsabilidade operacional da ConderTech; o sistema não os executa.

## Verificação

```powershell
node scripts/payments-test.mjs
# Motor PostgreSQL temporário opcional, fora das dependências da aplicação:
npm install --prefix "$env:TEMP\condertech-payment-tests" @electric-sql/pglite --no-save --ignore-scripts --no-audit --no-fund
node scripts/payments-db-test.mjs
```

Os testes isolados verificam assinatura, origem/sessão, permissões, remetente do pagamento, valores, preferência, falhas ambíguas e reconciliação. O PostgreSQL em memória executa as migrações reais e verifica reserva/rollback, repetição, estados antigos, reembolsos, contestações e privilégios. Não usam credenciais nem movimentam dinheiro.

Antes de habilitar produção, valide com contas de teste distintas: liberação pela equipe, total com frete, abertura do checkout, pagamento aprovado/pendente/recusado, sincronização e webhook, recuperação após falha de conexão e cancelamento antes do checkout. Simule notificações inválidas e confira a rejeição. Depois, faça a validação de produção conforme o Mercado Pago, com acompanhamento da equipe. A integração externa não foi validada com credenciais reais neste trabalho.

Referências oficiais: [criar preferência](https://www.mercadopago.com.br/developers/en/docs/checkout-pro-preferences/create-payment-preference), [configurar notificações](https://www.mercadopago.com.br/developers/en/docs/checkout-pro-preferences/payment-notifications), [validador oficial de assinatura](https://github.com/mercadopago/sdk-nodejs/blob/master/src/utils/webhook/index.ts).
