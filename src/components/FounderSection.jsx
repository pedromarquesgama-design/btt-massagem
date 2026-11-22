import { EditorialReveal, ParallaxMedia, ParallaxOffset } from './MotionPrimitives'

export function FounderSection() {
  return (
    <section className="section founder-section" id="about">
      <div className="wrap founder-grid">
        <div className="founder-copy">
          <EditorialReveal>
            <p className="editorial-kicker">O Terapeuta</p>
            <h2 className="section-heading">
              <em>Conheça</em> Eliandro Rodrigues
            </h2>
            <p className="founder-credentials">
              Massoterapeuta · Instrutor de Jiu-Jitsu, Boxe e MMA
            </p>
          </EditorialReveal>

          <EditorialReveal delay={0.12}>
            <div className="founder-prose">
              <p>
                Eliandro Rodrigues, 47 anos, é massoterapeuta em Porto Seguro,
                BA, especialista em massagem relaxante, massagem terapêutica e
                massagem desportiva para moradores e visitantes do Centro,
                Arraial d’Ajuda, Trancoso e Caraíva.
              </p>
              <p>
                Sua trajetória nas artes marciais — Jiu-Jitsu, Boxe e MMA —
                moldou uma leitura precisa da anatomia em movimento, tornando o
                estúdio referência em massagem para jiu-jitsu, recuperação
                muscular e alívio real das tensões. Também realizamos protocolos
                complementares como reflexologia podal, massagem com pedras
                quentes e atendimento como massagista a domicílio em Porto
                Seguro sob consulta.
              </p>
            </div>
          </EditorialReveal>

          <EditorialReveal delay={0.22}>
            <dl className="founder-pillars">
              <div className="founder-pillar">
                <dt>Atuação</dt>
                <dd>Porto Seguro, BA</dd>
              </div>
              <div className="founder-pillar">
                <dt>Abordagem</dt>
                <dd>Clínica &amp; Sensorial</dd>
              </div>
              <div className="founder-pillar">
                <dt>Avaliação</dt>
                <dd className="tabular-nums">5,0 · 21 avaliações</dd>
              </div>
            </dl>
          </EditorialReveal>
        </div>

        <div className="founder-visuals">
          <ParallaxMedia
            src="/eliandro-retrato.png"
            alt="Retrato de Eliandro Rodrigues ao pôr do sol em Porto Seguro"
            className="founder-portrait-frame"
            offset={10}
            scaleFrom={1.12}
            scaleTo={1.01}
            fallbackTitle="Eliandro Rodrigues"
          />

          <ParallaxOffset range={44} className="founder-inset-wrap">
            <figure className="founder-inset-card">
              <img
                src="/massagem-na-praia.jpg"
                alt="Eliandro Rodrigues realizando atendimento de massoterapia à beira-mar em Porto Seguro"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              <figcaption>
                Atendimento em estúdio climatizado e sessões exclusivas em Porto Seguro.
              </figcaption>
            </figure>
          </ParallaxOffset>
        </div>
      </div>
    </section>
  )
}
