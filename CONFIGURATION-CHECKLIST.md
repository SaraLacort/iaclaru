# Antes do deploy

## Obrigatório

- [ ] `siteUrl`: domínio final HTTPS que servirá esta landing, sem rota nem query.
- [ ] `operatorName`: nome real da pessoa ou organização responsável pelo guia.
- [ ] `contactEmail`: endereço público real, monitorado e pronto para receber mensagens.
- [ ] Revisar Privacidade e Termos para refletirem o operador, o provedor de hospedagem e as ferramentas que serão ativadas.
- [ ] Conferir o domínio Cloudflare Pages e as rotas no preview de produção.

## Opcional — preencher somente se for usar métricas/anúncios

- [ ] `ga4Id` (formato `G-...`).
- [ ] `gtmId` (formato `GTM-...`); quando configurado, tem prioridade sobre IDs diretos.
- [ ] `googleAdsId` (formato `AW-...`).
- [ ] Criar/importar uma conversão real para `click_claru_signup` se necessário; o evento mede clique no referral, não cadastro concluído.

O endereço de referral já está preenchido em `src/config/site.ts`; não é uma pendência.
