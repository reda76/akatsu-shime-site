import { useEffect, useRef } from 'react'
import { useInView } from '../hooks/useInView.js'
import { useCountUp } from '../hooks/useCountUp.js'
import { useReducedMotion } from '../hooks/useReducedMotion.js'
import logo from '../assets/logo-akatsu-shime.svg'

const LINES = [
  ['ACADÉMIE', 'DE'],
  ['JIU-JITSU'],
  ['BRÉSILIEN'],
]

export default function Hero({ onCta }) {
  const heroRef = useRef(null)
  const logoRef = useRef(null)
  const [statsRef, statsIn] = useInView({ threshold: 0.4 })
  const reduced = useReducedMotion()

  const members = useCountUp(80, { start: statsIn, duration: 1800 })
  const classes = useCountUp(4, { start: statsIn, duration: 1200 })
  const year = useCountUp(2018, { start: statsIn, duration: 1600 })

  // Cursor-tracked vars: --mx/--my on hero drive the ambient red spotlight.
  useEffect(() => {
    if (reduced) return
    const el = heroRef.current
    if (!el) return
    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      el.style.setProperty('--mx', `${e.clientX - r.left}px`)
      el.style.setProperty('--my', `${e.clientY - r.top}px`)
    }
    el.addEventListener('mousemove', onMove)
    return () => el.removeEventListener('mousemove', onMove)
  }, [reduced])

  // Scroll parallax on logo
  useEffect(() => {
    if (reduced) return
    const el = heroRef.current
    if (!el) return
    let raf = 0
    const update = () => {
      const y = window.scrollY
      const amount = Math.min(160, y * 0.2)
      el.style.setProperty('--hero-parallax', `${amount}px`)
      raf = 0
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [reduced])

  let wordIndex = 0
  const renderLine = (words, lineIdx) => (
    <span className="line" key={lineIdx}>
      {words.map((w, i) => {
        const idx = wordIndex++
        const isAccent = w === 'BRÉSILIEN'
        return (
          <span
            key={`${lineIdx}-${i}`}
            className={isAccent ? 'word as-hero__accent' : 'word'}
            style={{ animationDelay: `${600 + idx * 140}ms` }}
          >
            {w}
            {i < words.length - 1 ? '\u00a0' : ''}
          </span>
        )
      })}
    </span>
  )

  return (
    <section id="accueil" className="as-hero" ref={heroRef} data-screen-label="01 Hero">
      <div className="as-hero__spotlight" aria-hidden />
      <div className="as-hero__grain" aria-hidden />
      <div className="as-hero__slash" aria-hidden />
      <div className="as-hero__logo" ref={logoRef} aria-hidden>
        <img className="as-hero__logo-img" src={logo} alt="" />
      </div>
      <div className="as-hero__scanlines" aria-hidden />

      <div className="as-hero__content">
        <div className="as-eyebrow">Le Havre · Seine-Maritime · Depuis 2018</div>
        <h1 className="as-h-display as-hero__headline" aria-label="Académie de jiu-jitsu brésilien">
          {LINES.map((words, i) => renderLine(words, i))}
        </h1>
        <p className="as-lead as-hero__lead">
          Sur le tatami quatre soirs par semaine. Du débutant à la ceinture noire —
          une meute, un dojo, une discipline.
        </p>
        <div className="as-hero__ctas">
          <button className="as-btn as-btn--primary" onClick={onCta}>
            Réserve ton cours d'essai
          </button>
          <a
            href="#horaires"
            className="as-btn as-btn--ghost"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById('horaires')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }}
          >
            Voir les horaires →
          </a>
        </div>
        <div className="as-hero__stats" ref={statsRef}>
          <div>
            <em>
              {members}
              <span>+</span>
            </em>
            <span className="stat-label">Membres actifs</span>
          </div>
          <div>
            <em>{classes}</em>
            <span className="stat-label">Cours / semaine</span>
          </div>
          <div>
            <em>{year}</em>
            <span className="stat-label">Fondé en</span>
          </div>
        </div>
      </div>
    </section>
  )
}
