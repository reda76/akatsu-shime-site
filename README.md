# Akatsu Shime JJB — Site web

Site marketing du club **Akatsu Shime JJB** — académie de jiu-jitsu brésilien au Havre.

## Stack

- Vite + React 19
- Design system Akatsu Shime (tokens, kanji stamps, combat aesthetic)
- Pas de dépendances runtime au-delà de React

## Développement

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # sortie dans dist/
npm run preview    # sert dist/ en local
npm run lint
```

## Structure

```
src/
  App.jsx              · layout, loader, scroll progress, active section
  main.jsx
  styles/
    tokens.css         · design tokens (colors, type, spacing, motion)
    site.css           · composants + animations
  components/
    Nav, Hero, Schedule, Meute, Dojo, Essai, Footer, ScrollReveal
  hooks/
    useInView, useCountUp, useReducedMotion, useScrollY, useScrollProgress
  assets/              · logo, kanji 柔 術 絞, grain texture
public/
  favicon.svg          · logo
  texture-grain.svg    · servi depuis /texture-grain.svg
```

## Déploiement

Site statique — compatible avec Cloudflare Pages, Vercel, Netlify, GitHub Pages.

Build command : `npm run build`
Output directory : `dist`

## Données placeholder

À remplacer avant mise en prod : SIRET, adresse, téléphone, noms des coachs,
palmarès, horaires précis. Cherchez `Pereira`, `14 rue de la Gare`, `842 000 000`.
