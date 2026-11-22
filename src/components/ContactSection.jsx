import { useState } from 'react'
import { Check, Copy, MapPin, MessageCircle } from 'lucide-react'
import { CONTACT_INFO } from '../data/content'
import { EditorialReveal } from './MotionPrimitives'
import { InstaOutline, TikTokOutline, WhatsOutline } from './SocialIcons'

export function ContactSection() {
  const [copied, setCopied] = useState(false)

  async function handleCopyAddress() {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(CONTACT_INFO.fullAddress)
      }
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2600)
    } catch {
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2600)
    }
  }

  return (
    <section
      className="section contact-section"
      id="contact"
      aria-labelledby="contact-heading"
    >
      <div className="wrap contact-layout">
        <div className="contact-info-col">
          <EditorialReveal>
            <p className="editorial-kicker">Localização &amp; Contato</p>
            <h2 id="contact-heading" className="section-heading">
              Fale com <em>Eliandro</em>
            </h2>
            <p className="section-lead">
              Entre em contato para agendar o seu horário ou venha conhecer
              nosso espaço em Porto Seguro.
            </p>
          </EditorialReveal>

          <EditorialReveal delay={0.1}>
            <address className="contact-list">
              <div className="contact-row">
                <span className="contact-icon-box" aria-hidden="true">
                  <MapPin size={20} strokeWidth={1.6} />
                </span>
                <div className="contact-row-body">
                  <span className="contact-label">Endereço</span>
                  <span className="contact-value">
                    {CONTACT_INFO.addressLine1}
                    <br />
                    {CONTACT_INFO.addressLine2}
                  </span>
                  <button
                    type="button"
                    className="copy-address-btn"
                    onClick={handleCopyAddress}
                  >
                    {copied ? (
                      <>
                        <Check size={13} aria-hidden="true" />
                        <span>Endereço copiado</span>
                      </>
                    ) : (
                      <>
                        <Copy size={13} aria-hidden="true" />
                        <span>Copiar endereço</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="contact-row">
                <span className="contact-icon-box" aria-hidden="true">
                  <InstaOutline size={20} />
                </span>
                <div className="contact-row-body">
                  <span className="contact-label">Instagram</span>
                  <a
                    className="contact-value contact-link"
                    href={CONTACT_INFO.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Instagram ${CONTACT_INFO.instagramHandle}`}
                  >
                    {CONTACT_INFO.instagramHandle}
                  </a>
                </div>
              </div>

              <div className="contact-row">
                <span className="contact-icon-box" aria-hidden="true">
                  <TikTokOutline size={20} />
                </span>
                <div className="contact-row-body">
                  <span className="contact-label">TikTok</span>
                  <a
                    className="contact-value contact-link"
                    href={CONTACT_INFO.tiktokUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`TikTok ${CONTACT_INFO.tiktokHandle}`}
                  >
                    {CONTACT_INFO.tiktokHandle}
                  </a>
                </div>
              </div>

              <div className="contact-row">
                <span className="contact-icon-box" aria-hidden="true">
                  <MessageCircle size={20} strokeWidth={1.6} />
                </span>
                <div className="contact-row-body">
                  <span className="contact-label">WhatsApp</span>
                  <a
                    className="contact-value contact-link tabular-nums"
                    href={CONTACT_INFO.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Conversar no WhatsApp"
                  >
                    {CONTACT_INFO.whatsappDisplay}
                  </a>
                </div>
              </div>
            </address>

            <a
              className="btn btn-gold contact-cta"
              href={CONTACT_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsOutline size={18} />
              <span>Fale pelo WhatsApp</span>
            </a>
          </EditorialReveal>
        </div>

        <EditorialReveal delay={0.16} className="contact-map-col">
          <div className="contact-map-frame">
            <iframe
              title="Mapa — R. Adelar Maria de Andrade, 135, Porto Seguro, BA"
              src={CONTACT_INFO.mapEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </EditorialReveal>
      </div>
    </section>
  )
}
