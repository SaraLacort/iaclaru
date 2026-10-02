import type { ReactNode } from 'react'
import { site, type RoutePath } from './config/site'
import { faqItems } from './faq'
import { ReferralLink } from './components/ReferralLink'

const contributorUrl = 'https://claru.ai/pt-br/for-annotators'
const jobsUrl = 'https://claru.ai/pt-br/jobs'
const legalUrl = 'https://claru.ai/legal'
const termsUrl = 'https://claru.ai/terms'
const privacyUrl = 'https://claru.ai/privacy'
const referralTermsUrl = 'https://claru.ai/referral-affiliate-agreement'

function SourceLink({ href, children }: { href: string; children: ReactNode }) {
  return <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>
}

function PageIntro({ eyebrow, title, children }: { eyebrow: string; title: string; children: ReactNode }) {
  return (
    <header className="page-intro">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <div className="page-intro-copy">{children}</div>
    </header>
  )
}

function Panel({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`panel ${className}`}>{children}</div>
}

function HomePage() {
  return (
    <main id="main-content">
      <section className="hero-section">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-mark" /> PROJETOS DE DADOS PARA IA · GUIA INDEPENDENTE</p>
            <h1>Grave tarefas do mundo real e ajude no treinamento de inteligência artificial.</h1>
            <p className="hero-lede">
              Use seu celular para gravar tarefas do dia a dia seguindo as instruções da plataforma e receba por gravações aprovadas.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="/como-funciona/">Entender como funciona <span aria-hidden="true">→</span></a>
              <ReferralLink className="button button-outline">Ver o perfil na Claru <span aria-hidden="true">↗</span></ReferralLink>
            </div>
            <p className="microcopy">O link externo é de indicação e leva à plataforma da Claru. Criar um perfil não garante projeto.</p>
          </div>

          <div className="hero-visual" aria-label="Ilustração conceitual: tarefas do mundo real fornecem contexto para sistemas de IA" role="img">
            <div className="visual-orbit orbit-one" />
            <div className="visual-orbit orbit-two" />
            <div className="visual-label visual-label-top"><span className="visual-dot" /> CONTEXTO REAL</div>
            <div className="visual-card visual-card-main">
              <div className="visual-card-top"><span>AMOSTRA DE BRIEFING</span><span className="visual-index">01 / 04</span></div>
              <div className="visual-frame">
                <div className="frame-window window-one"><span className="window-sun" /><span className="window-horizon" /><span className="window-person" /></div>
                <div className="frame-window window-two"><span className="window-counter" /><span className="window-object" /></div>
                <div className="frame-window window-three"><span className="window-shelf" /><span className="window-box" /></div>
              </div>
              <div className="visual-card-bottom"><span>Tarefa definida</span><span className="status-pill">Exemplo visual</span></div>
            </div>
            <div className="visual-note note-left"><span className="note-symbol">↗</span><span><strong>Ação humana</strong><small>em contexto</small></span></div>
            <div className="visual-note note-right"><span className="note-symbol note-symbol-green">◎</span><span><strong>Briefing</strong><small>com critérios</small></span></div>
            <p className="visual-caption">Composição ilustrativa criada para este guia; não representa a interface da Claru.</p>
          </div>
        </div>
      </section>

      <section className="quick-facts" aria-label="Resumo do guia">
        <div className="container quick-facts-inner">
          <span><strong>Perfil</strong> considerado para projetos compatíveis</span>
          <span><strong>Briefing</strong> informa requisitos e critérios</span>
          <span><strong>Condições</strong> variam por projeto</span>
        </div>
      </section>

      <section className="section section-intro" id="o-que-e-a-claru">
        <div className="container two-column">
          <div>
            <p className="eyebrow">01 — A PLATAFORMA</p>
            <h2>O que é a Claru?</h2>
          </div>
          <div className="section-copy">
            <p>
              A Claru, uma empresa da Reka AI, apresenta projetos ligados à criação e organização de
              dados para treinamento de inteligência artificial. Na página para colaboradores, alguns
              projetos pedem a captura estruturada de ações, objetos ou ambientes do mundo real, por
              exemplo com vídeo em primeira pessoa.
            </p>
            <p>
              O tipo de contribuição, os equipamentos, os critérios de aceitação e a remuneração são
              definidos por cada projeto. Este guia resume o que a Claru publica; a fonte oficial deve
              ser consultada para as condições atuais.
            </p>
            <SourceLink href={contributorUrl}>Consultar a página oficial para colaboradores ↗</SourceLink>
          </div>
        </div>
      </section>

      <section className="section section-muted" data-track-visible="view_how_it_works">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">02 — O PROCESSO</p>
              <h2>Do perfil ao briefing do projeto</h2>
            </div>
            <a className="text-link" href="/como-funciona/">Ver todas as etapas <span aria-hidden="true">→</span></a>
          </div>
          <div className="steps-grid">
            <article className="step-card"><span className="step-number">01</span><h3>Crie um perfil</h3><p>Informe localização, equipamento, experiência e outros dados solicitados pela plataforma.</p></article>
            <article className="step-card"><span className="step-number">02</span><h3>Aguarde a compatibilidade</h3><p>A Claru pode considerar o perfil conforme os critérios e a disponibilidade dos projetos.</p></article>
            <article className="step-card"><span className="step-number">03</span><h3>Leia as condições</h3><p>Se houver correspondência, revise tarefa, requisitos, critérios de aceitação e remuneração.</p></article>
            <article className="step-card"><span className="step-number">04</span><h3>Decida e envie</h3><p>Participe apenas se as condições fizerem sentido e siga o briefing específico.</p></article>
          </div>
          <p className="section-footnote">Um perfil não garante oportunidade, data de início, volume de trabalho ou pagamento.</p>
        </div>
      </section>

      <section className="section" data-track-visible="view_projects">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">03 — EXEMPLOS PUBLICADOS</p>
              <h2>Que atividades podem aparecer?</h2>
              <p className="heading-copy">A página oficial para colaboradores apresenta exemplos como estes. A lista não indica disponibilidade garantida.</p>
            </div>
            <SourceLink href={jobsUrl}>Ver projetos publicados pela Claru ↗</SourceLink>
          </div>
          <div className="project-grid">
            <article className="project-card project-card-mint"><span className="project-icon" aria-hidden="true">↗</span><h3>Movimento cotidiano</h3><p>Trajetos a pé ou ações simples capturadas em primeira pessoa, conforme o enquadramento do projeto.</p></article>
            <article className="project-card project-card-peach"><span className="project-icon" aria-hidden="true">⌂</span><h3>Rotinas em casa</h3><p>Exemplos incluem cozinha, roupas e tarefas de limpeza descritas em um briefing.</p></article>
            <article className="project-card project-card-lilac"><span className="project-icon" aria-hidden="true">⌁</span><h3>Ambientes e tarefas</h3><p>Alguns briefings mostram atividades ao ar livre, jardim, compras ou ambientes de trabalho.</p></article>
            <article className="project-card project-card-sand"><span className="project-icon" aria-hidden="true">＋</span><h3>Trabalho manual</h3><p>A página também ilustra tarefas como montagem de peças e costura, quando um projeto compatível existe.</p></article>
          </div>
          <p className="source-note">Exemplos resumidos da página oficial da Claru; não são promessas de abertura, seleção ou remuneração.</p>
        </div>
      </section>

      <section className="section section-dark" aria-labelledby="human-context-title">
        <div className="container two-column dark-grid">
          <div>
            <p className="eyebrow">04 — CONTEXTO HUMANO</p>
            <h2 id="human-context-title">Por que sistemas de IA precisam de exemplos do mundo real?</h2>
          </div>
          <div className="section-copy">
            <p>
              Um objeto ou uma tarefa muda conforme o ambiente, o ângulo e a sequência de ações. Para
              sistemas que precisam interpretar cenas físicas, registros contextualizados podem ajudar
              a representar essas variações de forma mais concreta do que uma descrição isolada.
            </p>
            <p>
              Por isso, alguns projetos descrevem com precisão o que gravar, como enquadrar a cena e o
              que não deve aparecer. O briefing e os critérios de aceitação definem o objetivo de cada
              contribuição; não existe uma única tarefa universal.
            </p>
            <a className="text-link text-link-light" href="/como-funciona/">Veja o que revisar antes de aceitar um projeto →</a>
          </div>
        </div>
      </section>

      <section className="section section-checklist" data-track-visible="view_requirements">
        <div className="container checklist-layout">
          <div className="checklist-intro">
            <p className="eyebrow">05 — ANTES DE SE CADASTRAR</p>
            <h2>Uma pausa para conferir os detalhes</h2>
            <p>Use esta lista como apoio. As regras oficiais do briefing e da plataforma sempre prevalecem.</p>
            <a className="text-link" href="/faq/">Tire dúvidas frequentes <span aria-hidden="true">→</span></a>
          </div>
          <ul className="checklist-list">
            <li><span aria-hidden="true">✓</span><span><strong>Compatibilidade:</strong> região, idade ou capacidade legal, experiência, ambiente e disponibilidade podem importar.</span></li>
            <li><span aria-hidden="true">✓</span><span><strong>Equipamento:</strong> confirme modelo, acessórios, conexão e enquadramento antes de começar.</span></li>
            <li><span aria-hidden="true">✓</span><span><strong>Aceitação e pagamento:</strong> leia os critérios e as condições do projeto antes de decidir.</span></li>
            <li><span aria-hidden="true">✓</span><span><strong>Privacidade e consentimento:</strong> siga as regras sobre direitos, autorizações e pessoas que possam aparecer na gravação.</span></li>
            <li><span aria-hidden="true">✓</span><span><strong>Disponibilidade:</strong> cadastro não significa projeto disponível nem pagamento garantido.</span></li>
          </ul>
        </div>
      </section>

      <section className="section section-faq-preview">
        <div className="container faq-preview-grid">
          <div>
            <p className="eyebrow">06 — RESPOSTAS DIRETAS</p>
            <h2>O que é importante saber</h2>
            <p>Veja respostas cuidadosas sobre projetos, região, remuneração e indicação.</p>
            <a className="text-link" href="/faq/">Abrir todas as perguntas frequentes →</a>
          </div>
          <div className="faq-snippets">
            <div><h3>O cadastro garante um projeto?</h3><p>Não. A Claru informa que o perfil serve para considerar compatibilidade; não garante oportunidade.</p></div>
            <div><h3>As condições são iguais em todos os projetos?</h3><p>Não. Requisitos, critérios de aceitação, remuneração e disponibilidade podem variar.</p></div>
            <div><h3>Este site pertence à Claru?</h3><p>Não. É um site informativo independente e usa link de indicação em alguns CTAs.</p></div>
          </div>
        </div>
      </section>

      <section className="closing-cta">
        <div className="container closing-cta-inner">
          <div><p className="eyebrow">PRÓXIMO PASSO</p><h2>Confira os detalhes na fonte oficial.</h2><p>O perfil e a página de projetos da Claru mostram as informações atuais e os requisitos de cada oportunidade.</p></div>
          <div className="closing-cta-actions"><ReferralLink className="button button-light">Abrir cadastro de colaborador <span aria-hidden="true">↗</span></ReferralLink><small>Link de indicação · sem redirecionamento automático</small></div>
        </div>
      </section>
    </main>
  )
}

function HowItWorksPage() {
  const steps = [
    ['Crie seu perfil', 'A página oficial orienta a informar localização, equipamento, experiência e interesses para a Claru avaliar possíveis compatibilidades.'],
    ['Aguarde uma possível correspondência', 'O perfil pode ser considerado conforme os critérios de projetos disponíveis. A Claru diz que o cadastro não garante oportunidade, início ou quantidade de trabalho.'],
    ['Leia o briefing antes de decidir', 'Se houver compatibilidade, a Claru informa que o briefing mostra tarefa, configuração, requisitos, critérios de aceitação e remuneração antes da decisão de participar.'],
    ['Faça e envie a tarefa', 'Siga as instruções, incluindo requisitos de segurança, direitos e consentimento, e envie o material para análise.'],
    ['Aguarde a análise', 'A Claru analisa o envio conforme os critérios informados. O trabalho aceito é pago nos termos específicos daquele projeto.'],
  ]

  return (
    <main id="main-content" className="page-main">
      <div className="container page-container">
        <PageIntro eyebrow="COMO FUNCIONA" title="Passo a passo">
          <p>Este resumo segue o fluxo que a Claru publica para colaboradores. Os passos, requisitos e condições podem mudar; confirme tudo no briefing oficial.</p>
        </PageIntro>
        <section className="timeline" data-track-visible="view_how_it_works" aria-label="Etapas descritas pela Claru">
          {steps.map(([title, description], index) => (
            <article className="timeline-item" key={title}>
              <span className="timeline-number">0{index + 1}</span>
              <div><h2>{title}</h2><p>{description}</p></div>
            </article>
          ))}
        </section>
        <Panel className="briefing-panel" >
          <p className="eyebrow">ANTES DE ACEITAR</p>
          <h2>O briefing é a referência do projeto.</h2>
          <p>Confira a região, o equipamento e o ambiente necessários, o que será considerado aceitável, as condições de remuneração e as regras para gravar pessoas, locais ou informações identificáveis.</p>
          <SourceLink href={contributorUrl}>Ler as orientações oficiais para colaboradores ↗</SourceLink>
        </Panel>
        <div className="page-cta-row">
          <ReferralLink className="button button-primary">Ver o perfil na Claru <span aria-hidden="true">↗</span></ReferralLink>
          <span>Você vai para a plataforma oficial por um link de indicação.</span>
        </div>
      </div>
    </main>
  )
}

function AboutPage() {
  return (
    <main id="main-content" className="page-main">
      <div className="container page-container">
        <PageIntro eyebrow="SOBRE ESTE SITE" title="Informação independente, com fontes e limites claros.">
          <p>TreinandoIA explica informações públicas sobre a Claru sem se apresentar como parte da plataforma.</p>
        </PageIntro>
        <div className="content-narrow prose">
          <h2>O propósito do guia</h2>
          <p>Este site organiza, em português, informações públicas que ajudam uma pessoa a entender como a Claru apresenta projetos para colaboradores e quais detalhes devem ser verificados antes de criar um perfil.</p>
          <h2>O que este guia não faz</h2>
          <p>Não somos a Claru, não avaliamos candidatos, não aprovamos perfis, não controlamos projetos ou requisitos e não definimos remuneração. Também não garantimos que haja um projeto adequado para qualquer pessoa.</p>
          <h2>Como revisamos as informações</h2>
          <p>As afirmações sobre o fluxo de participação foram conferidas em páginas e documentos oficiais da Claru em 30 de setembro de 2026. Projetos e condições podem mudar; por isso, as páginas oficiais e os briefings atuais prevalecem.</p>
          <ul>
            <li><SourceLink href={contributorUrl}>Página para colaboradores da Claru</SourceLink></li>
            <li><SourceLink href={jobsUrl}>Projetos e posições publicados pela Claru</SourceLink></li>
            <li><SourceLink href={termsUrl}>Termos de Serviço da Claru</SourceLink></li>
            <li><SourceLink href={privacyUrl}>Política de Privacidade da Claru</SourceLink></li>
            <li><SourceLink href={legalUrl}>Central de documentos legais da Claru</SourceLink></li>
          </ul>
          <h2>Atualizações</h2>
          <p>Este projeto não importa automaticamente os projetos da Claru. Antes de agir, confira se os exemplos, requisitos, remuneração, disponibilidade e termos ainda estão atuais na fonte oficial.</p>
          <h2>Responsabilidade editorial</h2>
          <p>O nome de quem mantém o guia e o endereço de contato público são definidos em <code>src/config/site.ts</code> antes da publicação. A página de contato não coleta dados por formulário.</p>
        </div>
      </div>
    </main>
  )
}

function FaqPage() {
  return (
    <main id="main-content" className="page-main">
      <div className="container page-container">
        <PageIntro eyebrow="PERGUNTAS FREQUENTES" title="Dúvidas sobre a Claru, perfil e projetos.">
          <p>As respostas resumem o que aparece nas fontes oficiais consultadas. Confira cada briefing e os termos atuais antes de enviar dados ou aceitar uma atividade.</p>
        </PageIntro>
        <section className="faq-list" aria-label="Perguntas e respostas">
          {faqItems.map((item) => (
            <details className="faq-item" key={item.question}>
              <summary>{item.question}<span aria-hidden="true">+</span></summary>
              <div className="faq-answer"><p>{item.answer}</p></div>
            </details>
          ))}
        </section>
        <Panel className="source-callout">
          <h2>Confirme condições na fonte oficial</h2>
          <p>Este site não substitui instruções, acordos ou informações atuais da Claru.</p>
          <SourceLink href={contributorUrl}>Abrir página oficial para colaboradores ↗</SourceLink>
        </Panel>
      </div>
    </main>
  )
}

function ReferralPage() {
  return (
    <main id="main-content" className="page-main">
      <div className="container page-container">
        <PageIntro eyebrow="TRANSPARÊNCIA" title="Como funciona o link de indicação.">
          <p>Alguns botões deste site levam à criação de perfil na Claru usando um link de indicação.</p>
        </PageIntro>
        <div className="content-narrow prose">
          <Panel className="disclosure-panel">
            <p className="eyebrow">AVISO DE INDICAÇÃO</p>
            <p><strong>Este site informativo é independente e não é o site oficial da Claru. Alguns links para o cadastro da Claru são links de indicação.</strong></p>
          </Panel>
          <h2>O que o link pode registrar</h2>
          <p>Ao abrir o cadastro por um link de indicação, a plataforma pode identificar de onde veio a visita conforme seus próprios sistemas e termos. O operador deste site pode receber um benefício de indicação se os requisitos e termos aplicáveis da Claru forem atendidos. Este site não publica nem promete comissão, valor, prazo ou elegibilidade comercial.</p>
          <h2>O que a indicação não significa</h2>
          <ul>
            <li>Não significa parceria oficial, representação ou emprego pela Claru.</li>
            <li>Não garante que seu perfil será aprovado ou considerado compatível.</li>
            <li>Não garante projeto disponível, quantidade de trabalho ou remuneração.</li>
            <li>Não altera as regras, critérios de aceitação ou pagamentos definidos pela Claru.</li>
          </ul>
          <h2>Leia os termos do programa</h2>
          <p>A Claru publica um acordo de indicação cujos termos comerciais específicos podem ser apresentados separadamente e alterados pela plataforma. Consulte a versão atual antes de tirar conclusões sobre qualquer benefício.</p>
          <SourceLink href={referralTermsUrl}>Consultar o acordo oficial de indicação e afiliados ↗</SourceLink>
          <p className="source-note">A Claru mantém o cadastro e decide os termos do programa. Este site não recebe o formulário de cadastro nem processa candidaturas.</p>
        </div>
      </div>
    </main>
  )
}

function PrivacyPage() {
  return (
    <main id="main-content" className="page-main">
      <div className="container page-container">
        <PageIntro eyebrow="PRIVACIDADE" title="Como este site trata informações.">
          <p>Política deste guia independente. Ela não substitui a política da Claru quando você sai deste site.</p>
        </PageIntro>
        <div className="content-narrow prose">
          <p><strong>Última revisão: 30 de setembro de 2026.</strong></p>
          <h2>Quem mantém este site</h2>
          <p>Responsável: {site.operatorName || 'nome a configurar em src/config/site.ts antes do lançamento'}{site.contactEmail ? <>. Contato: <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>.</> : '. O e-mail público deve ser configurado antes do lançamento.'}</p>
          <h2>Dados coletados diretamente</h2>
          <p>Este projeto é um site estático: não oferece criação de conta, formulário de contato, comentários, banco de dados ou envio de candidatura. Se você enviar um e-mail usando seu próprio aplicativo, os dados do contato serão tratados pelo serviço de e-mail que você escolher.</p>
          <h2>Métricas opcionais e consentimento</h2>
          <p>Os campos de GA4, Google Tag Manager e Google Ads começam vazios. Enquanto não forem preenchidos, este projeto não carrega essas tags nem mostra um aviso de cookies. Se alguma tag for configurada, o banner oferece opções reais de aceitar ou rejeitar: as tags só são carregadas após consentimento, e a escolha fica salva no armazenamento local do navegador. É possível mudar a opção pelo rodapé.</p>
          <p>Após aceitar, eventos de navegação e cliques de saída podem ser enviados às ferramentas configuradas. O evento de clique indica apenas um clique no link; não confirma cadastro concluído, pagamento ou aprovação. As tecnologias e políticas do Google aplicáveis podem receber dados segundo as configurações habilitadas.</p>
          <h2>Links externos</h2>
          <p>Este guia tem links para páginas da Claru e outros domínios oficiais. Ao sair daqui, o tratamento de dados passa a seguir as políticas do site de destino. Leia os documentos oficiais antes de enviar dados pessoais ou conteúdo de vídeo.</p>
          <SourceLink href={privacyUrl}>Ler a Política de Privacidade da Claru ↗</SourceLink>
          <h2>Hospedagem e dados técnicos</h2>
          <p>O projeto foi preparado para hospedagem estática. O provedor de hospedagem pode processar dados técnicos necessários à entrega e segurança do site de acordo com seus próprios termos; a configuração final dependerá do serviço escolhido pelo operador.</p>
          <h2>Contato e atualizações</h2>
          <p>Para solicitações relativas a este site, use o e-mail público indicado nesta página depois de configurado. Esta política pode ser atualizada se a funcionalidade ou os serviços de medição mudarem.</p>
        </div>
      </div>
    </main>
  )
}

function TermsPage() {
  return (
    <main id="main-content" className="page-main">
      <div className="container page-container">
        <PageIntro eyebrow="TERMOS DE USO" title="Um guia, não uma plataforma de candidatura.">
          <p>Ao usar TreinandoIA, você concorda com estes limites de uso e com a natureza informativa deste site.</p>
        </PageIntro>
        <div className="content-narrow prose">
          <p><strong>Última revisão: 30 de setembro de 2026.</strong></p>
          <h2>Responsável e contato</h2>
          <p>Responsável: {site.operatorName || 'nome a configurar em src/config/site.ts antes do lançamento'}. Contato: {site.contactEmail || 'e-mail público a configurar antes do lançamento'}.</p>
          <h2>Conteúdo informativo</h2>
          <p>Este site explica informações públicas sobre a Claru para fins informativos. Não é aconselhamento profissional, não faz seleção de participantes e não oferece emprego, projeto, renda ou remuneração.</p>
          <h2>Informações de terceiros</h2>
          <p>As informações sobre a Claru vêm de páginas e documentos oficiais consultados em 30 de setembro de 2026. Projetos, requisitos, elegibilidade, disponibilidade, pagamentos e termos podem mudar. As informações do briefing e da plataforma oficial prevalecem.</p>
          <h2>Links de indicação</h2>
          <p>Alguns links levam ao cadastro da Claru com código de indicação. O operador pode obter um benefício conforme os termos aplicáveis do programa. O link não garante aprovação, projeto, remuneração ou qualquer vantagem para quem o utiliza.</p>
          <h2>Marcas e propriedade intelectual</h2>
          <p>Claru e outros nomes citados pertencem aos respectivos titulares. Este guia é independente e não reivindica propriedade nem afiliação oficial. Elementos visuais e textos deste guia foram criados para sua própria identidade.</p>
          <h2>Uso aceitável</h2>
          <p>Não use o site para contornar políticas, comprometer sua segurança ou atribuir ao guia promessas que ele não faz. Ao seguir links externos, você passa a se relacionar com os serviços e termos do destino.</p>
          <h2>Atualizações destes termos</h2>
          <p>Os termos podem ser atualizados quando o site ou as suas ferramentas mudarem. A versão em vigor ficará publicada nesta página.</p>
          <p><SourceLink href={termsUrl}>Consultar os Termos de Serviço oficiais da Claru ↗</SourceLink></p>
        </div>
      </div>
    </main>
  )
}

function ContactPage() {
  return (
    <main id="main-content" className="page-main">
      <div className="container page-container">
        <PageIntro eyebrow="CONTATO" title="Fale com quem mantém este guia.">
          <p>Use este canal para corrigir uma informação sobre o guia ou perguntar sobre o conteúdo deste site.</p>
        </PageIntro>
        <Panel className="contact-card">
          <p className="eyebrow">CONTATO DO SITE</p>
          <h2>{site.operatorName || 'Responsável a configurar'}</h2>
          {site.contactEmail ? (
            <p><a className="button button-primary" href={`mailto:${site.contactEmail}`}>Enviar e-mail <span aria-hidden="true">↗</span></a></p>
          ) : (
            <p>O endereço de e-mail público ainda precisa ser configurado em <code>src/config/site.ts</code> antes do lançamento. Este site não tem formulário e não recebe dados de cadastro da Claru.</p>
          )}
          <p className="microcopy">Para questões sobre sua conta, elegibilidade ou um projeto, consulte diretamente a <SourceLink href={contributorUrl}>página oficial da Claru</SourceLink>.</p>
        </Panel>
      </div>
    </main>
  )
}

export function PageContent({ pathname }: { pathname: RoutePath }) {
  switch (pathname) {
    case '/': return <HomePage />
    case '/como-funciona': return <HowItWorksPage />
    case '/sobre': return <AboutPage />
    case '/faq': return <FaqPage />
    case '/indicacao': return <ReferralPage />
    case '/privacidade': return <PrivacyPage />
    case '/termos': return <TermsPage />
    case '/contato': return <ContactPage />
  }
}
