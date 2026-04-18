import { useState } from 'react'
import ScrollReveal from './ScrollReveal.jsx'

const TEAM = [
  {
    initials: 'FP',
    name: 'Fabien Pereira',
    role: 'Entraîneur principal',
    belt: 'Noire · 2 dan',
    since: '2018',
    kanji: '柔',
    palmares: [
      'Champion régional Normandie 2022',
      'Lignée Gracie Humaitá',
      'Instructeur diplômé FFJDA',
    ],
  },
  {
    initials: 'KD',
    name: 'Karim Daoudi',
    role: 'Assistant technique',
    belt: 'Marron',
    since: '2019',
    kanji: '術',
    palmares: [
      'Médaille d\u2019argent Open Paris 2023',
      'Spécialiste leg locks & guard',
      'Sparring coach depuis 4 ans',
    ],
  },
  {
    initials: 'LM',
    name: 'Léa Marchand',
    role: 'Compétition féminine',
    belt: 'Violette',
    since: '2020',
    kanji: '絞',
    palmares: [
      'Championne de France féminine −64 kg',
      'Bronze European Open 2024',
      'Référente compétition féminine',
    ],
  },
  {
    initials: 'TR',
    name: 'Thomas Ruiz',
    role: 'Kids & ados',
    belt: 'Marron',
    since: '2021',
    kanji: '柔',
    palmares: [
      'Diplôme d\u2019éducateur sportif',
      '30+ jeunes formés au club',
      'Responsable pédagogie enfants',
    ],
  },
]

function MemberCard({ m }) {
  const [flipped, setFlipped] = useState(false)
  const beltClass = m.belt.split(' ')[0].toLowerCase()
  return (
    <article
      className={`as-member-card ${flipped ? 'is-flipped' : ''}`}
      onClick={() => setFlipped((f) => !f)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          setFlipped((f) => !f)
        }
      }}
      role="button"
      tabIndex={0}
      aria-pressed={flipped}
      aria-label={`${m.name}, ${m.role}. Appuyer pour voir le palmarès.`}
    >
      <div className="as-member-card__inner">
        <div className="as-member-card__face">
          <div className="as-member-card__kanji" aria-hidden>{m.kanji}</div>
          <span className="as-member-card__cue">+ Palmarès</span>
          <div className="as-member-card__av" aria-hidden>{m.initials}</div>
          <div className="as-member-card__name">{m.name}</div>
          <div className="as-member-card__role">{m.role}</div>
          <div className="as-member-card__belt">
            <i className={`as-belt as-belt--${beltClass}`} aria-hidden />
            <span>{m.belt}</span>
          </div>
          <div className="as-member-card__since">Au club depuis {m.since}</div>
        </div>
        <div className="as-member-card__face as-member-card__face--back">
          <div className="as-member-card__back-title">{m.name.split(' ')[0]} · Palmarès</div>
          <ul className="as-member-card__palmares">
            {m.palmares.map((p) => <li key={p}>{p}</li>)}
          </ul>
          <div className="as-member-card__since">Ceinture {m.belt}</div>
        </div>
      </div>
    </article>
  )
}

export default function Meute() {
  return (
    <section className="as-section as-section--alt" id="meute" data-screen-label="03 Meute">
      <div className="as-section__header">
        <div className="as-eyebrow">03 — L'équipe</div>
        <h2 className="as-h2">LA MEUTE</h2>
        <p className="as-lead">
          Quatre instructeurs, une même exigence&#8239;: technique propre, intensité mesurée,
          respect du partenaire. Tous formés en lignée Gracie Humaitá.
        </p>
      </div>

      <ScrollReveal>
        <div className="as-grid as-grid--4">
          {TEAM.map((m, i) => (
            <div key={m.initials} style={{ transitionDelay: `${i * 80}ms` }}>
              <MemberCard m={m} />
            </div>
          ))}
        </div>
      </ScrollReveal>

      <div className="as-marquee" aria-hidden>
        <div className="as-marquee__track">
          {Array.from({ length: 2 }).map((_, k) => (
            <div className="as-marquee__item" key={k}>
              <span>LIGNÉE GRACIE HUMAITÁ</span>
              <em>柔</em>
              <span>CEINTURE NOIRE IBJJF</span>
              <em>術</em>
              <span>ACADÉMIE LE HAVRE</span>
              <em>絞</em>
              <span>DEPUIS 2018</span>
              <em>柔</em>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
