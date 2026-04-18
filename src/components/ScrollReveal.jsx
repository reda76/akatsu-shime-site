import { useInView } from '../hooks/useInView.js'

export default function ScrollReveal({ children, delay = 0, className = '', style }) {
  const [ref, inView] = useInView()
  const combined = `reveal ${inView ? 'is-in' : ''} ${className}`.trim()
  const merged = { transitionDelay: `${delay}ms`, ...style }
  return (
    <div ref={ref} className={combined} style={merged}>
      {children}
    </div>
  )
}
