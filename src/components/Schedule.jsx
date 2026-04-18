import { Fragment, useEffect, useState } from 'react'
import ScrollReveal from './ScrollReveal.jsx'

const DAYS = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']
const START_HOUR = 10
const END_HOUR = 22
const HOURS = Array.from({ length: END_HOUR - START_HOUR + 1 }, (_, i) => START_HOUR + i)
// 2 rows per hour (30 min slots). Row 1 is header.
const ROW_FOR = (h, m) => 2 + (h - START_HOUR) * 2 + (m >= 30 ? 1 : 0)

const SESSIONS = [
  { day: 1, type: 'Tous niveaux',        startH: 19, startM: 30, endH: 21, endM: 30, spots: 'Ouvert',  coach: 'Fabien P.',      status: 'ok'   },
  { day: 2, type: 'Kids · 6–12',         startH: 17, startM: 30, endH: 18, endM: 45, spots: '8 / 14',  coach: 'Thomas R.',      status: 'ok'   },
  { day: 3, type: 'Avancé · bleue+',     startH: 20, startM:  0, endH: 22, endM:  0, spots: 'Complet', coach: 'Fabien P.',      status: 'full' },
  { day: 5, type: 'Open mat · sparring', startH: 10, startM:  0, endH: 12, endM:  0, spots: 'Libre',   coach: 'Karim D.',       status: 'ok'   },
]

function fmt(h, m) {
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
}

function getNextSession(now = new Date()) {
  const curDay = (now.getDay() + 6) % 7 // Mon=0
  const minutesNow = now.getHours() * 60 + now.getMinutes()
  const candidates = SESSIONS
    .filter((s) => s.status !== 'full')
    .map((s) => {
      const startMin = s.startH * 60 + s.startM
      let diff = (s.day - curDay) * 1440 + (startMin - minutesNow)
      if (diff < 0) diff += 7 * 1440
      return { s, diff }
    })
    .sort((a, b) => a.diff - b.diff)
  return candidates[0]
}

function formatCountdown(totalMin) {
  const d = Math.floor(totalMin / 1440)
  const h = Math.floor((totalMin % 1440) / 60)
  const m = totalMin % 60
  if (d > 0) return `${d}j ${h}h ${m}min`
  if (h > 0) return `${h}h ${m.toString().padStart(2, '0')}`
  return `${m} min`
}

export default function Schedule() {
  const [next, setNext] = useState(() => getNextSession())

  useEffect(() => {
    const id = setInterval(() => setNext(getNextSession()), 60_000)
    return () => clearInterval(id)
  }, [])

  const today = (new Date().getDay() + 6) % 7

  return (
    <section className="as-section" id="horaires" data-screen-label="02 Horaires">
      <div className="as-section__header">
        <div className="as-eyebrow">02 — Horaires</div>
        <h2 className="as-h2">LES COURS DE LA SEMAINE</h2>
        <p className="as-lead">
          Quatre séances hebdomadaires au dojo du port. Les cours d'essai sont gratuits —
          ramène une tenue de sport et une bouteille d'eau.
        </p>
      </div>

      {next && (
        <div className="as-sched__next" role="status" aria-live="polite">
          <span className="dot" aria-hidden />
          <span>
            Prochain cours · {DAYS[next.s.day]} {fmt(next.s.startH, next.s.startM)} —{' '}
            <strong>{next.s.type}</strong> · dans {formatCountdown(next.diff)}
          </span>
        </div>
      )}

      <div className="as-sched__hint" aria-hidden>Glisse pour voir la semaine</div>
      <ScrollReveal>
        <div className="as-sched" role="table" aria-label="Planning hebdomadaire des cours">
          <div className="as-sched__corner" aria-hidden />
          {DAYS.map((d, i) => (
            <div
              key={d}
              className={`as-sched__head ${i === today ? 'as-sched__head--today' : ''}`}
              role="columnheader"
            >
              {d}
            </div>
          ))}

          {HOURS.map((h, hi) => (
            <Fragment key={h}>
              <div className="as-sched__hour" style={{ gridRow: 2 + hi * 2, gridRowEnd: 'span 2' }}>
                {String(h).padStart(2, '0')}:00
              </div>
              {DAYS.map((_, di) => (
                <Fragment key={`${h}-${di}`}>
                  <div
                    className="as-sched__cell as-sched__cell--hour"
                    style={{ gridRow: 2 + hi * 2, gridColumn: 2 + di }}
                    aria-hidden
                  />
                  <div
                    className="as-sched__cell"
                    style={{ gridRow: 3 + hi * 2, gridColumn: 2 + di }}
                    aria-hidden
                  />
                </Fragment>
              ))}
            </Fragment>
          ))}

          {SESSIONS.map((s, i) => {
            const startRow = ROW_FOR(s.startH, s.startM)
            const endRow = ROW_FOR(s.endH, s.endM)
            return (
              <div
                key={i}
                className={`as-sched__block ${s.status === 'full' ? 'is-full' : ''}`}
                style={{ gridRow: `${startRow} / ${endRow}`, gridColumn: 2 + s.day }}
                role="cell"
                title={`${s.type} · ${s.coach}`}
                tabIndex={0}
              >
                <span className="type">{s.type}</span>
                <span className="time">{fmt(s.startH, s.startM)} — {fmt(s.endH, s.endM)}</span>
                <span className="spots">{s.spots}</span>
              </div>
            )
          })}
        </div>
      </ScrollReveal>

      <div className="as-sched__legend" aria-hidden>
        <span><i /> Ouvert</span>
        <span><i className="muted" /> Complet</span>
      </div>
    </section>
  )
}
