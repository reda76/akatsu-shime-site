import { useEffect, useState } from 'react'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Schedule from './components/Schedule.jsx'
import Meute from './components/Meute.jsx'
import Dojo from './components/Dojo.jsx'
import Essai from './components/Essai.jsx'
import Footer from './components/Footer.jsx'
import { useScrollProgress } from './hooks/useScrollProgress.js'
import { useReducedMotion } from './hooks/useReducedMotion.js'
import logo from './assets/logo-akatsu-shime.svg'

const SECTION_TO_NAV = {
  accueil: 'accueil',
  horaires: 'horaires',
  meute: 'meute',
  dojo: 'dojo',
  essai: 'contact',
  contact: 'contact',
}

export default function App() {
  const [active, setActive] = useState('accueil')
  const reduced = useReducedMotion()
  const [loaded, setLoaded] = useState(() => reduced)
  const progress = useScrollProgress()

  useEffect(() => {
    if (reduced) return
    if (typeof window !== 'undefined' && window.location.hash === '#freeze-loader') return
    const t = setTimeout(() => setLoaded(true), 2600)
    return () => clearTimeout(t)
  }, [reduced])

  // Active section tracking
  useEffect(() => {
    const ids = ['accueil', 'horaires', 'meute', 'dojo', 'essai']
    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean)
    if (!elements.length) return
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(SECTION_TO_NAV[visible.target.id] || visible.target.id)
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.25, 0.5, 1] },
    )
    elements.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  const go = (navId) => {
    const sectionId = navId === 'contact' ? 'essai' : navId
    setActive(navId)
    const el = document.getElementById(sectionId)
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 64
      window.scrollTo({ top, behavior: reduced ? 'auto' : 'smooth' })
    }
  }

  return (
    <>
      {!reduced && (
        <div className={`as-loader ${loaded ? 'is-done' : ''}`} aria-hidden>
          <div className="as-loader__center">
            <img className="as-loader__mark" src={logo} alt="" />
            <span className="as-loader__sparkle" />
          </div>
        </div>
      )}
      <div className="as-progress" aria-hidden>
        <div className="as-progress__bar" style={{ transform: `scaleX(${progress})` }} />
      </div>
      <Nav active={active} onNav={go} />
      <main>
        <Hero onCta={() => go('contact')} />
        <Schedule />
        <Meute />
        <Dojo />
        <Essai />
      </main>
      <Footer />
    </>
  )
}
