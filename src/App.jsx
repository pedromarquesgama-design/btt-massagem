import { useState } from 'react'
import { UtensilsCrossed, Clock, PersonStanding, ShowerHead, CalendarDays, GlassWater, Star, MapPin, MessageCircle } from 'lucide-react'

const WHATS_URL = 'https://wa.me/5573999917430'

const IMG = {
  logo: 'https://images.squarespace-cdn.com/content/v1/67a13f0483b7027ff4a8b2d2/f661e27b-da93-49fc-96a7-69bb4f88157f/EirIntegrative_Website-NavLogo.png?format=1500w',
  hero: '/massagem-na-praia.jpg',
  heroFg: 'https://images.squarespace-cdn.com/content/v1/67a13f0483b7027ff4a8b2d2/05e7a4ad-1e6e-43db-bfda-954108b8cab2/Massage+therapy+and+scalp+therapy',
  massage: 'https://images.squarespace-cdn.com/content/v1/67a13f0483b7027ff4a8b2d2/eb931637-3aaa-4e26-b0a1-cf76478e6f02/Therapeutic+massage+session+for+chronic+pain+in+Southern+Maine',
  cupping: 'https://images.squarespace-cdn.com/content/v1/67a13f0483b7027ff4a8b2d2/64c11f18-3fed-4824-b252-d29f79796c4e/Cupping+therapy+for+muscle+tension+and+detoxification+at+EIR+Integrative+in+New+Gloucester%2C+Maine',
  coach: 'https://images.squarespace-cdn.com/content/v1/67a13f0483b7027ff4a8b2d2/2d7d10c1-f4ae-4716-9cb5-6d5031c1bcb9/EirIntegrative_LogoAssets_Web.png',
  edit: 'https://images.squarespace-cdn.com/content/v1/67a13f0483b7027ff4a8b2d2/346aa4a7-630c-42b7-86b7-48aa201ee097/EIREDIT.jpg',
  ferns: 'https://images.squarespace-cdn.com/content/v1/67a13f0483b7027ff4a8b2d2/ffd59c2f-a22b-4ced-b061-1d5658b0857a/FernsMain.jpg',
  elaina: 'https://images.squarespace-cdn.com/content/v1/67a13f0483b7027ff4a8b2d2/de30e382-e949-419b-a061-40e5a5d81093/Meet+Elaina+Photo+Option.jpg',
  rune: 'https://images.squarespace-cdn.com/content/v1/67a13f0483b7027ff4a8b2d2/9fc825b7-2b23-457e-b0c0-3b91cc835f18/EirIntegrative_LogoAssets_WebRune.png',
  wolf: 'https://images.squarespace-cdn.com/content/v1/67a13f0483b7027ff4a8b2d2/196cd993-0e63-483a-a8cb-1ef8363dc65b/EirIntegrative_LogoAssets_wolfwoman.png',
  eir: 'https://images.squarespace-cdn.com/content/v1/67a13f0483b7027ff4a8b2d2/db6cb623-f73e-45c2-9706-6e2c37901cf0/EirIntegrative_LogoAssets-eir.png',
  oils: 'https://images.squarespace-cdn.com/content/v1/67a13f0483b7027ff4a8b2d2/074811f2-47d7-4330-8a42-bf6417dacf8d/EirIntegrative_LogoAssets.png',
  icon10a: 'https://images.squarespace-cdn.com/content/v1/67a13f0483b7027ff4a8b2d2/cb715a33-2827-47da-998e-0a903724f819/EirIntegrative_LogoAssets_Icons_Web-10.png',
  icon08: 'https://images.squarespace-cdn.com/content/v1/67a13f0483b7027ff4a8b2d2/fe3ea428-416d-4ee1-8215-ed9c09f8422a/EirIntegrative_LogoAssets_Icons_Web-08.png',
  icon07: 'https://images.squarespace-cdn.com/content/v1/67a13f0483b7027ff4a8b2d2/e0571f76-f248-4095-964e-b074bdad031d/EirIntegrative_LogoAssets_Icons_Web-07.png',
  icon11: 'https://images.squarespace-cdn.com/content/v1/67a13f0483b7027ff4a8b2d2/b2047dd5-1db0-451b-a0ae-4e83d5ece3f2/EirIntegrative_LogoAssets_Icons_Web-11.png',
  icon07b: 'https://images.squarespace-cdn.com/content/v1/67a13f0483b7027ff4a8b2d2/0bb71a4d-de33-4ad3-87d9-606de5135b03/EirIntegrative_LogoAssets_Icons_Web-07.png',
  icon10b: 'https://images.squarespace-cdn.com/content/v1/67a13f0483b7027ff4a8b2d2/0124a048-ad3a-4434-937b-68e968eb4ff3/EirIntegrative_LogoAssets_Icons_Web-10.png',
  icon11b: 'https://images.squarespace-cdn.com/content/v1/67a13f0483b7027ff4a8b2d2/58321bfb-fb45-475a-8b69-9fc0cd80eef1/EirIntegrative_LogoAssets_Icons_Web-11.png',
}

const BOOK_URL = 'https://eirintegrative.as.me'

const GUIA_TIPS = [
  { icon: UtensilsCrossed, title: 'NÃO VÁ COM FOME', text: 'Aconselhável não chegar à sessão de massagem com o estômago vazio.' },
  { icon: PersonStanding, title: 'AVALIAR CORPO E MENTE', text: 'Reserve alguns momentos para se conectar com você antes da massagem.' },
  { icon: ShowerHead, title: 'TOME UM BANHO ANTES DA SESSÃO', text: 'Um banho quente ajuda a relaxar os músculos e prepara o corpo.' },
  { icon: Clock, title: 'CHEGUE CEDO', text: 'Chegar ao spa um pouco mais cedo ajuda na transição para um estado relaxado.' },
  { icon: CalendarDays, title: 'PLANEJE COM ANTECEDÊNCIA', text: 'Procure ter um tempo de descanso após a sessão para relaxar totalmente.' },
  { icon: GlassWater, title: 'MANTENHA A HIDRATAÇÃO', text: 'A hidratação adequada é essencial para uma massagem eficaz.' },
]

const TESTIMONIALS = [
  { name: 'Josenai Ferreira Reis', quote: 'Acredito que todas as pessoas deveriam conhecer alguém como Eliandro nessa jornada, chamada ‘vida’. Ele é um ser humano incrível, um profissional que trabalha com muita excelência, eu tinha dores que persistiam por muito tempo, e fui curada, graças à Deus e ao seu trabalho.' },
  { name: 'Luciana Ferreira', badge: 'Local Guide', quote: 'Muito bom atendimento! Respeito e acolhimento, e a aplicação da técnica realmente efetiva, estava com dores há muito tempo e ele me ajudou muito, foi um prazer conhecer o Eliandro, recomendo.' },
  { name: 'Raul', quote: 'Massagista nota 10, ajudou muito na minha lesão da lombar.' },
  { name: 'Arthur Moraes', quote: 'Ambiente confortável, profissional super qualificado, deixa qualquer um zerado.' },
  { name: 'Luan Santos', quote: 'Trabalho de excelência! Senti um relaxamento mental e uma sensação de alívio.' },
  { name: 'Anna Colibri', quote: 'Eu amo as massagens modeladoras e as relaxantes. Vejo resultados. Bom demaaais!' },
  { name: 'Jennifer Vinhas', quote: 'Qualidade e responsabilidade, um grande profissional e respeitador 👏👏👏' },
  { name: 'Leonardo Matias', quote: 'Top, o melhor de Porto Seguro e região!' },
]

function InstaOutline({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  )
}

function TikTokOutline({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 12a4 4 0 1 0 4 4V4c.7 2.8 2.7 4.8 5.5 5.2" />
    </svg>
  )
}

function WhatsOutline({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" />
      <path d="M9 9.5c.5 2.5 2.5 4.5 5 5l1.5-1.5 2 2c-.5 1.5-2 2-3.5 1.5-3-1-6-4-7-7-.5-1.5 0-3 1.5-3.5l2 2L9 9.5Z" />
    </svg>
  )
}

function TestimonialGrid() {
  return (
    <div className="testi-grid">
      {TESTIMONIALS.map((t) => (
        <div className="testi-card" key={t.name}>
          <div className="testi-stars" aria-label="Avaliação 5 de 5">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star key={i} size={16} fill="#c9a86a" strokeWidth={0} />
            ))}
          </div>
          <p className="testi-quote">“{t.quote}”</p>
          <p className="testi-name">
            {t.name}
            {t.badge && <span className="testi-badge">{t.badge}</span>}
          </p>
        </div>
      ))}
    </div>
  )
}

function Header() {
  return (
    <header className="site-header snipe-header snipe-header-centered" id="header">
      <a className="brand snipe-brand" href="#top">
        <img className="nav-logo" src="/logo-snipe.png" alt="Snipe da Dor" />
        <span className="snipe-brand-text">
          <span className="snipe-brand-name">ELIANDRO RODRIGUES</span>
          <span className="snipe-brand-tag">Massoterapeuta</span>
        </span>
      </a>
    </header>
  )
}

export default function App() {
  return (
    <>
      <Header />

      <section className="hero logo-hero logo-hero-fixed" id="top">
        <div className="hero-videos" aria-hidden="true">
          <video src="/video1.mp4" autoPlay muted loop playsInline />
          <video src="/video2.mp4" autoPlay muted loop playsInline />
        </div>
        <div className="logo-hero-dim" aria-hidden="true" />
        <div className="hero-inner logo-lockup">
          <img className="logo-full" src="/logo-full.png" alt="Eliandro Rodrigues – Massoterapeuta" />
          <div className="hero-btns">
            <a className="btn snipe-btn" href="#services">Serviços</a>
            <a className="btn snipe-btn snipe-btn-gold" href={WHATS_URL} target="_blank" rel="noreferrer">Agendamentos</a>
            <a className="btn snipe-btn" href="#guia">Guia de Pré-Atendimento</a>
          </div>
        </div>
      </section>

      <div className="page-scroll">

      <section className="section bg-dark" id="about">
        <div className="wrap">
          <h1 className="center"><em>Conheça</em> Eliandro Rodrigues</h1>
          <p className="body-caps center" style={{ color: '#5C5145' }}>Massoterapeuta, Instrutor de Jiu Jitsu, Boxe e MMA</p>
          <div className="founder" style={{ marginTop: 30 }}>
            <div>
              <p className="body-caps">Eliandro Rodrigues, 47 anos, é massoterapeuta profissional e especialista em massagens relaxantes e terapêuticas.</p>
              <p className="body-caps">Com técnica apurada e cuidado em cada atendimento, proporciona alívio das tensões, bem-estar profundo e uma experiência única de relaxamento e renovação para cada cliente.</p>
            </div>
            <img className="portrait" src="/eliandro-retrato.png" alt="Eliandro Rodrigues, massoterapeuta" />
          </div>
        </div>
      </section>

      <section className="section bg-dark">
        <div className="wrap split">
          <div>
            <h1>Devolveremos o seu <br />bem-estar</h1>
            <p className="body-caps">Dores musculares, estresse e a rotina acelerada afetam diretamente sua qualidade de vida. Através de técnicas especializadas de massoterapia — como Shiatsu, Ventosaterapia e Liberação Miofascial —, atuamos na causa do seu desconforto para aliviar tensões, melhorar a circulação e recuperar a sua vitalidade.</p>
          </div>
          <img className="cover" src="/bem-estar-1.jpg" alt="Massagem faz bem para a saúde" />
        </div>
      </section>

      <section className="section catalog-section" id="services">
        <div className="wrap">
          <img className="catalog-img" src="/servicos-catalogo.jpg" alt="Catálogo de serviços – Eliandro Rodrigues Massoterapeuta" />
        </div>
      </section>

      <section className="section bg-dark" id="guia">
        <div className="wrap guia-inner">
          <h2 className="guia-title">GUIA DE PRÉ-ATENDIMENTO</h2>
          <p className="guia-intro">Prepare-se para aproveitar ao máximo sua sessão com Eliandro Rodrigues:</p>
          <div className="guia-grid">
            {GUIA_TIPS.map(({ icon: Icon, title, text }) => (
              <div className="guia-card" key={title}>
                <span className="guia-icon"><Icon size={30} strokeWidth={1.5} /></span>
                <h4>{title}</h4>
                <p>{text}</p>
              </div>
            ))}
          </div>
          <a className="btn snipe-btn snipe-btn-gold" href={WHATS_URL} target="_blank" rel="noreferrer">Agendar pelo WhatsApp</a>
        </div>
      </section>

      <section className="section testi-dark center" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,.3),rgba(0,0,0,.3)), url(${IMG.ferns})`, backgroundSize: 'cover', backgroundPosition: '50% 50%' }}>
        <div className="wrap">
          <h2 className="testi-title">Carinho dos clientes</h2>
          <TestimonialGrid />
        </div>
      </section>

      <section className="section bg-dark contact-section" id="contact">
        <div className="wrap contact-inner">
          <h2 className="contact-title">Fale com Eliandro</h2>
          <p className="contact-sub">Fale conosco ou venha conhecer nosso espaço</p>
          <address className="contact-rows">
            <div className="contact-row">
              <span className="contact-tile" aria-hidden="true"><MapPin size={22} strokeWidth={1.8} /></span>
              <div>
                <span className="contact-label">Endereço</span>
                <span className="contact-value">R. Adelar Maria de Andrade, 135<br />Porto Seguro, BA — 45810-000</span>
              </div>
            </div>
            <div className="contact-row">
              <span className="contact-tile" aria-hidden="true"><InstaOutline size={22} /></span>
              <div>
                <span className="contact-label">Instagram</span>
                <a className="contact-value contact-link" href="https://www.instagram.com/massagem_portoseguroba/" target="_blank" rel="noopener noreferrer" aria-label="Instagram @massagem_portoseguroba">@massagem_portoseguroba</a>
              </div>
            </div>
            <div className="contact-row">
              <span className="contact-tile" aria-hidden="true"><TikTokOutline size={22} /></span>
              <div>
                <span className="contact-label">TikTok</span>
                <a className="contact-value contact-link" href="https://www.tiktok.com/@eliandrorodrigues2022" target="_blank" rel="noopener noreferrer" aria-label="TikTok @eliandrorodrigues2022">@eliandrorodrigues2022</a>
              </div>
            </div>
            <div className="contact-row">
              <span className="contact-tile" aria-hidden="true"><MessageCircle size={22} strokeWidth={1.8} /></span>
              <div>
                <span className="contact-label">WhatsApp</span>
                <a className="contact-value contact-link" href="https://wa.me/5573999917430" target="_blank" rel="noopener noreferrer" aria-label="Conversar no WhatsApp">+55 73 99991-7430</a>
              </div>
            </div>
          </address>
          <a className="btn snipe-btn snipe-btn-gold contact-btn" href="https://wa.me/5573999917430" target="_blank" rel="noopener noreferrer">
            <WhatsOutline size={20} /> Fale pelo WhatsApp
          </a>
          <div className="contact-map">
            <iframe
              title="Mapa — R. Adelar Maria de Andrade, 135, Porto Seguro, BA"
              src="https://maps.google.com/maps?q=R.%20Adelar%20Maria%20de%20Andrade%2C%20135%20-%20Porto%20Seguro%2C%20BA%2C%2045810-000&t=&z=16&ie=UTF8&iwloc=&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="wrap foot-grid">
          <a className="foot-brand" href="#top">
            <img src="/logo-snipe.png" alt="Snipe da Dor" />
            <span>
              <strong>ELIANDRO RODRIGUES</strong>
              <small>Massoterapeuta</small>
            </span>
          </a>
          <p className="foot-loc">Porto Seguro - BA</p>
        </div>
        <hr />
        <p className="foot-copy">© 2025-2026 Eliandro Rodrigues — Todos os direitos reservados.</p>
      </footer>
      </div>
    </>
  )
}
