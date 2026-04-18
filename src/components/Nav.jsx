import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import logo from '../assets/logo-akatsu-shime.svg'
import { useScrollY } from '../hooks/useScrollY.js'

const LINKS = [
  { id: 'accueil', label: 'Le club' },
  { id: 'horaires', label: 'Horaires' },
  { id: 'meute', label: 'La meute' },
  { id: 'dojo', label: 'Le dojo' },
  { id: 'contact', label: 'Contact' },
]

export default function Nav({ active = 'accueil', onNav }) {
  const listRef = useRef(null)
  const linkRefs = useRef({})
  const [indicator, setIndicator] = useState({ x: 0, w: 0, on: false })
  const [menuOpen, setMenuOpen] = useState(false)
  const y = useScrollY()
  const scrolled = y > 16

  // Lock body scroll when mobile menu is open; close on Escape.
  useEffect(() => {
    if (!menuOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [menuOpen])

  // Close mobile menu when viewport grows past the breakpoint.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 721px)')
    const onChange = (e) => {
      if (e.matches) setMenuOpen(false)
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const goAndClose = (id) => {
    setMenuOpen(false)
    onNav?.(id)
  }

  useLayoutEffect(() => {
    const anchor = linkRefs.current[active]
    const host = listRef.current
    if (!anchor || !host) {
      setIndicator((s) => ({ ...s, on: false }))
      return
    }
    const a = anchor.getBoundingClientRect()
    const h = host.getBoundingClientRect()
    setIndicator({ x: a.left - h.left, w: a.width, on: true })
  }, [active])

  // Recompute on resize
  useEffect(() => {
    const onResize = () => {
      const anchor = linkRefs.current[active]
      const host = listRef.current
      if (!anchor || !host) return
      const a = anchor.getBoundingClientRect()
      const h = host.getBoundingClientRect()
      setIndicator({ x: a.left - h.left, w: a.width, on: true })
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [active])

  const handleHover = (id) => {
    const anchor = linkRefs.current[id]
    const host = listRef.current
    if (!anchor || !host) return
    const a = anchor.getBoundingClientRect()
    const h = host.getBoundingClientRect()
    setIndicator({ x: a.left - h.left, w: a.width, on: true })
  }

  const handleLeave = () => {
    // snap back to active
    const anchor = linkRefs.current[active]
    const host = listRef.current
    if (!anchor || !host) {
      setIndicator((s) => ({ ...s, on: false }))
      return
    }
    const a = anchor.getBoundingClientRect()
    const h = host.getBoundingClientRect()
    setIndicator({ x: a.left - h.left, w: a.width, on: true })
  }

  return (
    <header className={`as-nav ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="as-nav__inner">
        <a
          className="as-nav__brand"
          href="#"
          onClick={(e) => {
            e.preventDefault()
            onNav?.('accueil')
          }}
          aria-label="Akatsu Shime JJB · retour en haut"
        >
          <img src={logo} alt="" />
          <span>AKATSU SHIME</span>
          <em>LE HAVRE · JJB</em>
        </a>
        <nav className="as-nav__links" ref={listRef} onMouseLeave={handleLeave} aria-label="Navigation principale">
          {LINKS.map((l) => (
            <a
              key={l.id}
              ref={(el) => {
                linkRefs.current[l.id] = el
              }}
              href={`#${l.id}`}
              className={active === l.id ? 'is-active' : ''}
              aria-current={active === l.id ? 'page' : undefined}
              onMouseEnter={() => handleHover(l.id)}
              onFocus={() => handleHover(l.id)}
              onClick={(e) => {
                e.preventDefault()
                onNav?.(l.id)
              }}
            >
              {l.label}
            </a>
          ))}
          <span
            className={`as-nav__indicator ${indicator.on ? 'is-on' : ''}`}
            style={{ transform: `translateX(${indicator.x}px)`, width: `${indicator.w}px` }}
            aria-hidden
          />
        </nav>
        <a
          href="#essai"
          className="as-btn as-btn--primary as-btn--sm"
          onClick={(e) => {
            e.preventDefault()
            onNav?.('essai')
          }}
        >
          Cours d'essai
        </a>
        <button
          type="button"
          className="as-nav__toggle"
          aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={menuOpen}
          aria-controls="as-mobile-menu"
          onClick={() => setMenuOpen((o) => !o)}
        >
          {menuOpen ? (
            <svg viewBox="0 0 24 24" aria-hidden>
              <path d="M6 6l12 12M6 18L18 6" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" aria-hidden>
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          )}
        </button>
      </div>

      <div
        id="as-mobile-menu"
        className={`as-mobile-menu ${menuOpen ? 'is-open' : ''}`}
        aria-hidden={!menuOpen}
      >
        {LINKS.map((l) => (
          <a
            key={l.id}
            href={`#${l.id}`}
            className="as-mobile-menu__link"
            aria-current={active === l.id ? 'page' : undefined}
            onClick={(e) => {
              e.preventDefault()
              goAndClose(l.id)
            }}
          >
            {l.label}
          </a>
        ))}
        <div className="as-mobile-menu__kanji" aria-hidden>柔 · 術 · 絞</div>
        <a
          href="#essai"
          className="as-btn as-btn--primary as-btn--block"
          onClick={(e) => {
            e.preventDefault()
            goAndClose('essai')
          }}
        >
          Réserve ton cours d'essai
        </a>
      </div>
    </header>
  )
}
