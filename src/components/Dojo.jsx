import { useInView } from '../hooks/useInView.js'

const FEATURES = [
  { k: '柔', t: '160 m² de tatamis',  s: 'Deux zones indépendantes pour drilling et sparring simultanés.' },
  { k: '術', t: 'Vestiaires séparés', s: 'Hommes, femmes, kids. Douches chaudes, casiers sécurisés.' },
  { k: '絞', t: 'Matériel fourni',    s: 'Gis de prêt pour le cours d\u2019essai. Dummies, medicine balls, focus mitts.' },
]

function Feature({ k, t, s, delay }) {
  const [ref, inView] = useInView()
  return (
    <div
      ref={ref}
      className={`as-feature ${inView ? 'is-in' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="as-feature__kanji" aria-hidden>{k}</div>
      <h3 className="as-h3">{t}</h3>
      <p className="as-p">{s}</p>
    </div>
  )
}

export default function Dojo() {
  return (
    <section className="as-section" id="dojo" data-screen-label="04 Dojo">
      <div className="as-section__header">
        <div className="as-eyebrow">04 — Le dojo</div>
        <h2 className="as-h2">RUE DE LA GARE · LE HAVRE</h2>
        <p className="as-lead">
          Une salle dédiée, ouverte sept jours sur sept aux membres à jour de licence.
          Parking gratuit devant l'entrée.
        </p>
      </div>
      <div className="as-grid as-grid--3">
        {FEATURES.map((f, i) => (
          <Feature key={f.k} {...f} delay={i * 120} />
        ))}
      </div>
    </section>
  )
}
