type Props = {
  open: boolean
  onAccept: () => void
  onReject: () => void
}

export function ConsentBanner({ open, onAccept, onReject }: Props) {
  if (!open) return null

  return (
    <section className="consent-banner" aria-labelledby="consent-title" aria-live="polite">
      <div className="consent-copy">
        <p className="eyebrow">SUAS PREFERÊNCIAS</p>
        <h2 id="consent-title">Você decide sobre métricas opcionais</h2>
        <p>
          Se as ferramentas de análise forem ativadas, elas só serão carregadas depois da sua escolha.
          Aceitar permite medição opcional; rejeitar mantém essas ferramentas desativadas. Você pode
          alterar a escolha em “Preferências de cookies”.
        </p>
        <a href="/privacidade">Leia a política de privacidade</a>
      </div>
      <div className="consent-actions">
        <button type="button" className="button button-primary" onClick={onAccept}>Aceitar</button>
        <button type="button" className="button button-quiet" onClick={onReject}>Rejeitar</button>
      </div>
    </section>
  )
}
