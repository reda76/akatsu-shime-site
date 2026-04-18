import { useState } from 'react'
import ScrollReveal from './ScrollReveal.jsx'

export default function Essai() {
  const [form, setForm] = useState({
    prenom: '',
    nom: '',
    email: '',
    cours: 'Mardi · 19h30 — Tous niveaux',
    cgu: false,
  })
  const [sent, setSent] = useState(false)

  const set = (k) => (e) =>
    setForm((prev) => ({
      ...prev,
      [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
    }))

  const submit = (e) => {
    e.preventDefault()
    if (!form.prenom || !form.email || !form.cgu) return
    setSent(true)
  }

  const reset = () => {
    setSent(false)
    setForm({ prenom: '', nom: '', email: '', cours: 'Mardi · 19h30 — Tous niveaux', cgu: false })
  }

  return (
    <section className="as-section as-section--alt" id="essai" data-screen-label="05 Essai">
      <div className="as-essai">
        <ScrollReveal className="as-essai__left">
          <div className="as-eyebrow">05 — Essai gratuit</div>
          <h2 className="as-h2">
            RÉSERVE TA<br />PREMIÈRE SÉANCE
          </h2>
          <p className="as-lead">
            Un créneau, une tenue, l'envie de transpirer. On s'occupe du reste —
            kimono de prêt, accueil par un coach, pas d'engagement.
          </p>
          <ul className="as-bullet">
            <li>Gratuit, sans engagement</li>
            <li>Kimono et ceinture blanche fournis</li>
            <li>
              Certificat médical non nécessaire pour le 1<sup>er</sup> cours
            </li>
          </ul>
        </ScrollReveal>

        <form className="as-essai__form" onSubmit={submit} noValidate>
          {sent ? (
            <div className="as-essai__ok">
              <div className="stamp" aria-hidden>了</div>
              <div className="as-h3">Bienvenue sur le tatami.</div>
              <p className="as-p">
                On te contacte sous 24&#8239;h pour confirmer le créneau, {form.prenom}.
              </p>
              <button type="button" className="as-btn as-btn--secondary" onClick={reset}>
                Réserver un autre créneau
              </button>
            </div>
          ) : (
            <>
              <div className="as-field as-field--2">
                <label>
                  Prénom
                  <input value={form.prenom} onChange={set('prenom')} placeholder="Fabien" autoComplete="given-name" required />
                </label>
                <label>
                  Nom
                  <input value={form.nom} onChange={set('nom')} placeholder="Pereira" autoComplete="family-name" />
                </label>
              </div>
              <label className="as-field">
                Email
                <input
                  type="email"
                  value={form.email}
                  onChange={set('email')}
                  placeholder="tu@exemple.fr"
                  autoComplete="email"
                  required
                />
              </label>
              <label className="as-field">
                Créneau souhaité
                <select value={form.cours} onChange={set('cours')}>
                  <option>Mardi · 19h30 — Tous niveaux</option>
                  <option>Mercredi · 17h30 — Kids 6–12</option>
                  <option>Jeudi · 20h00 — Avancé</option>
                  <option>Samedi · 10h00 — Open mat</option>
                </select>
              </label>
              <label className={`as-check ${form.cgu ? 'is-on' : ''}`}>
                <input type="checkbox" checked={form.cgu} onChange={set('cgu')} />
                <span className="as-check__box" aria-hidden>
                  {form.cgu ? '✓' : ''}
                </span>
                <span>J'accepte les conditions d'accueil du club</span>
              </label>
              <button
                type="submit"
                className="as-btn as-btn--primary as-btn--block"
                disabled={!form.prenom || !form.email || !form.cgu}
              >
                Envoyer la demande
              </button>
            </>
          )}
        </form>
      </div>
    </section>
  )
}
