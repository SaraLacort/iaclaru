# Checklist de revisão do Google Ads

**Políticas consultadas em 30/09/2026.** Esta revisão prepara o destino; não garante aprovação. A revisão final depende do domínio publicado, do anúncio, da configuração real e do estado atual das políticas.

## Identidade e representação

- [x] O site se identifica como guia independente e diz que não é o site oficial da Claru.
- [x] Não afirma ser funcionária, recrutadora, selecionadora, parceira oficial ou representante da Claru.
- [x] Não usa “Claru Oficial”, “Claru Brasil Oficial” ou nomes semelhantes.
- [ ] Preencher o nome real do operador em `src/config/site.ts` e conferir que ele aparece corretamente no footer, Contato, Privacidade e Termos.
- [ ] Publicar o domínio final e confirmar que título, anúncio e domínio do destino correspondem.
- [ ] Revisar a política de marcas do Google e qualquer autorização antes de usar “Claru” no texto do anúncio.

## Conteúdo original e valor da página

- [x] Há explicação própria sobre a Claru, etapas, tipos de atividade apresentados na fonte e critérios de decisão.
- [x] Inclui checklist original sobre briefing, equipamento, consentimento, critérios de aceitação e disponibilidade.
- [x] Inclui FAQ, páginas de privacidade, termos, contato e disclosure de indicação.
- [x] O destino não existe apenas para encaminhar o clique: possui conteúdo educativo que pode ser lido sem seguir o referral.
- [x] O texto foi redigido para este guia; não é espelhamento, scraping ou cópia de páginas da Claru.
- [ ] Antes de publicar, revalidar exemplos, regiões, condições e links oficiais, pois a Claru pode alterar seus projetos.

## Claims, projeto e remuneração

- [x] Não promete renda, emprego, aprovação, trabalho imediato, quantidade de projeto ou remuneração.
- [x] Explica que requisitos e condições variam e que perfil não garante oportunidade.
- [x] Não afirma que todos os projetos aceitam pessoas no Brasil.
- [x] Não apresenta moeda, valor ou frequência de pagamento como condição universal.
- [x] Não afirma que o referral aumenta chances, remuneração ou aprovação.
- [x] Não há avaliações, depoimentos, contadores de participantes, urgência ou escassez fabricados.
- [ ] Conferir que qualquer copy de anúncio preserve essas mesmas limitações.

## Destino e experiência

- [x] Os links externos são links clicáveis; não há auto redirect, meta refresh, popup, download automático, fake chat ou bloqueio do botão voltar.
- [x] O destino do anúncio deve ser a landing publicada no domínio próprio, nunca o cadastro da Claru como URL final do anúncio.
- [x] O referral abre apenas após ação explícita do usuário.
- [x] Rotas têm HTML próprio para carregamento e atualização direta no Cloudflare Pages.
- [x] `robots.txt` permite Googlebot, AdsBot-Google e os assets públicos.
- [ ] No domínio publicado, testar cada rota via HTTPS sem login, em navegador comum e com AdsBot capaz de carregar o conteúdo.
- [ ] Manter a URL de exibição do anúncio no mesmo domínio usado como URL final.
- [ ] Verificar que a página publicada não devolve 4xx/5xx, não redireciona para outro domínio e não tem conteúdo bloqueado por geolocalização.

## Mobile, navegação e links

- [x] Layout CSS mobile-first com foco visível, links identificáveis, HTML semântico e menu operável por botão.
- [x] CTAs informam que levam à plataforma Claru por link de indicação.
- [ ] Conferir no celular real que nenhum texto, menu ou CTA fica cortado.
- [ ] Depois de publicar, testar todos os links internos, o contato e a saída para a Claru.

## Privacidade, tracking e contato

- [x] Política e termos são deste guia e não são cópias da Claru.
- [x] Não há formulário falso ou coleta própria de candidatura.
- [x] IDs de medição estão vazios por padrão; sem ID não há tags nem banner.
- [x] Com IDs, consentimento oferece Aceitar e Rejeitar; tags só são carregadas após aceite e a preferência pode ser alterada no footer.
- [x] Eventos não chamam clique de signup concluído, purchase, hired ou approved.
- [ ] Preencher um e-mail público real e monitorado antes de publicar.
- [ ] Se ativar tags, revisar a política e testar Accept/Reject com IDs reais e modo de depuração antes de anunciar.
- [ ] Se usar GTM, criar dentro do container os acionadores e tags para os eventos; o código não consegue configurar seu container.
- [ ] Para uma conversão Google Ads, criar/importar uma ação real. O evento disponível `click_claru_signup` mede clique, não cadastro concluído.

## Copy de anúncio recomendada

**Títulos candidatos**

- Conheça a Claru AI
- Entenda Como Funciona
- Projetos de Dados para IA
- Veja Etapas e Requisitos

**Descrição candidata**

“Guia independente sobre projetos e perfil de colaborador na Claru AI. Consulte requisitos e condições atuais na plataforma oficial.”

Evite linguagem de vaga/emprego, dinheiro garantido, remuneração ou aprovação sem confirmação específica do projeto.

## Políticas oficiais consultadas

- Conteúdo original insuficiente: <https://support.google.com/adspolicy/answer/16427718?hl=pt-BR>
- Requisitos do destino: <https://support.google.com/adspolicy/answer/6368661?hl=pt-BR>
- Experiência no destino: <https://support.google.com/adspolicy/answer/16427615?hl=pt-BR>
- Representação enganosa: <https://support.google.com/adspolicy/answer/15936666?hl=pt-BR>
- Destino incompatível: <https://support.google.com/adspolicy/answer/16428020?hl=pt-BR>
