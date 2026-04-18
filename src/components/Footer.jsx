import logo from '../assets/logo-akatsu-shime.svg'

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden>
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1C5.12 19.54 12 19.54 12 19.54s6.88 0 8.6-.44a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z" />
      <path d="M10 15.02L15.19 12 10 8.98v6.04z" fill="currentColor" stroke="none" />
    </svg>
  )
}

export default function Footer() {
  return (
    <footer className="as-footer" id="contact">
      <div className="as-footer__inner">
        <div className="as-footer__brand">
          <img src={logo} alt="" />
          <div>
            <div className="as-footer__name">AKATSU SHIME JJB</div>
            <div className="as-footer__sub">Association loi 1901 · SIRET 842 000 000 00019</div>
          </div>
        </div>
        <div className="as-footer__cols">
          <div>
            <div className="as-eyebrow">Le dojo</div>
            <p>
              14 rue de la Gare<br />
              76600 Le Havre
            </p>
          </div>
          <div>
            <div className="as-eyebrow">Contact</div>
            <p>
              <a href="mailto:contact@akatsushime.fr">contact@akatsushime.fr</a>
              <br />
              <a href="tel:+33235000000">+33&#8239;2&#8239;35&#8239;00&#8239;00&#8239;00</a>
            </p>
          </div>
          <div>
            <div className="as-eyebrow">Suivre</div>
            <div className="as-footer__socials">
              <a className="as-footer__social" href="#" aria-label="Instagram">
                <InstagramIcon />
              </a>
              <a className="as-footer__social" href="#" aria-label="Facebook">
                <FacebookIcon />
              </a>
              <a className="as-footer__social" href="#" aria-label="YouTube">
                <YouTubeIcon />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="as-footer__base">
        <span>© {new Date().getFullYear()} Akatsu Shime JJB · Tous droits réservés</span>
        <span className="as-footer__kanji">柔 · 術 · 絞</span>
      </div>
    </footer>
  )
}
