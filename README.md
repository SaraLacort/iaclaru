# TreinandoIA — Claru AI

Guia informativo independente em português sobre os projetos de colaboradores apresentados pela Claru. O site tem conteúdo próprio e útil, explica os limites do perfil e usa um link de indicação nos CTAs de cadastro. Não pertence à Claru e não processa candidaturas.

## Instalação

Requer Node.js `20.19` ou superior.

```bash
npm install
```

## Desenvolvimento

```bash
npm run dev
```

O script gera as páginas estáticas antes de iniciar o Vite. As páginas são servidas em rotas como `/como-funciona/`, `/faq/` e `/privacidade/`.

## Verificação de tipos

```bash
npm run typecheck
```

## Build

```bash
npm run build
```

O build verifica os tipos, renderiza o HTML das oito rotas, gera os assets e cria `robots.txt` e `sitemap.xml` dentro de `dist/`. O HTML já contém o conteúdo de cada página; não depende de JavaScript para exibir o texto principal nem de fallback SPA.

## Preview local

Depois do build:

```bash
npm run preview
```

## Configuração

Edite `src/config/site.ts`:

- `siteName`: nome independente do guia;
- `siteUrl`: origem HTTPS final, sem rota, query ou fragmento;
- `operatorName`: pessoa ou organização que mantém o guia;
- `contactEmail`: e-mail público e monitorado;
- `claruOfficialUrl`: fonte oficial principal;
- `claruReferralUrl`: link de indicação usado por todos os CTAs;
- `ga4Id`, `gtmId`, `googleAdsId`: IDs opcionais, vazios por padrão;
- `socialImage`: imagem social original do projeto.

O projeto já contém o link de indicação fornecido. Não é necessário substituí-lo. Ele fica centralizado em `claruReferralUrl`; os botões usam o componente `src/components/ReferralLink.tsx`. UTMs recebidas na página são anexadas ao clique sem remover o parâmetro `ref`.

### Editar conteúdo e SEO

- `src/pages.tsx`: texto das páginas, navegação, rodapé e CTAs;
- `src/faq.ts`: perguntas, respostas e os mesmos dados usados no schema FAQ;
- `src/config/site.ts`: títulos e descrições SEO por rota;
- `src/styles.css`: paleta e layout responsivo;
- `public/favicon.svg` e `public/images/share-card.svg`: artes próprias em SVG, sem hotlink;
- `public/images/share-card.png`: versão PNG 1200×630 usada nos metadados Open Graph e Twitter/X.

`SEO-KEYWORDS.md` é um arquivo interno de planejamento e não é copiado para o site publicado.

## Rotas

- `/`
- `/como-funciona/`
- `/sobre/`
- `/faq/`
- `/indicacao/`
- `/privacidade/`
- `/termos/`
- `/contato/`

Cada rota é gerada como arquivo HTML separado para funcionar ao abrir ou atualizar diretamente no Cloudflare Pages. A versão sem barra final (`/faq`) e com barra (`/faq/`) abre o mesmo conteúdo; a URL canônica usa barra final.

## Métricas, consentimento e eventos

Sem IDs configurados, nenhuma tag do Google é carregada e nenhum banner é exibido. Quando um ID for informado, o visitante verá opções funcionais de **Aceitar** e **Rejeitar**. As tags só são carregadas após consentimento; a escolha é salva localmente e pode ser alterada pelo rodapé. Consent Mode v2 começa com `analytics_storage`, `ad_storage`, `ad_user_data` e `ad_personalization` negados.

O projeto emite, após consentimento:

- `page_view`;
- `view_how_it_works`;
- `view_projects`;
- `view_requirements`;
- `click_claru_signup`;
- `outbound_claru`.

`click_claru_signup` registra um clique para o perfil, não um cadastro concluído, pagamento, contratação ou aprovação. Para usar GTM, configure os eventos e as tags dentro do seu container. Se `gtmId` estiver preenchido, ele tem prioridade; os IDs diretos de GA4/Ads não são carregados para evitar duplicação. Para usar tags diretas, deixe `gtmId` vazio.

O código não inventa IDs nem um rótulo de conversão do Google Ads. Para transformar o evento em conversão no Ads, será necessário configurar uma ação de conversão real (por exemplo, importar um evento GA4 ou criar a ação/tag correspondente) depois de obter os identificadores corretos.

## Cloudflare Pages

- Framework preset: `None`;
- Build command: `npm run build`;
- Build output directory: `dist`;
- Root directory: em branco se a raiz do repositório contiver este `package.json`.

É um build estático. Não requer Worker SSR, backend, banco de dados, login ou variável secreta. As rotas geram seus próprios arquivos HTML; não foi adicionado um redirecionamento SPA amplo.

## Git e GitHub

Na pasta do projeto:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin URL_DO_SEU_REPOSITORIO
git push -u origin main
```

Nenhuma conta ou repositório do GitHub foi acessado por este projeto.

## Fontes e limites

As informações sobre processo, tipos de atividade e condições foram conferidas nas fontes oficiais da Claru em 30/09/2026. A Claru pode alterar projetos, regiões, requisitos, critérios, termos e pagamentos. Confira a fonte oficial e o briefing atual antes de decidir. Este guia não garante aprovação, disponibilidade ou remuneração.

Antes de publicar, preencha os itens de `CONFIGURATION-CHECKLIST.md` e revise `GOOGLE-ADS-CHECKLIST.md`. O checklist prepara o destino, mas não garante aprovação de anúncio nem posicionamento orgânico.
