# Jannah Academy — Vite + React

Landing page for Jannah Academy built with Vite, React, and CSS Modules.

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Build for production
npm run build

# 4. Preview production build
npm run preview
```

## 📁 Project Structure

```
jannah-academy/
├── index.html
├── vite.config.js
├── package.json
├── public/
│   └── favicon.svg
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── App.css
    ├── index.css
    └── components/
        ├── Navbar.jsx / Navbar.module.css
        ├── Hero.jsx / Hero.module.css
        ├── Features.jsx / Features.module.css
        ├── Courses.jsx / Courses.module.css
        ├── Scholars.jsx / Scholars.module.css
        ├── CTABanner.jsx / CTABanner.module.css
        └── Footer.jsx / Footer.module.css
```

## 🎨 Sections

- **Navbar** — Sticky with scroll blur effect + mobile responsive menu
- **Hero** — Animated fade-in, headline, stats bar
- **Features** — 6 feature cards with hover effects
- **Courses** — Filterable course grid by category
- **Scholars** — Scholar cards with ratings & stats
- **CTA Banner** — Call-to-action with glow effect
- **Footer** — Brand, links, socials

## ✏️ Customization

Edit the data arrays at the top of each component:
- `Courses.jsx` → `COURSES` array
- `Scholars.jsx` → `SCHOLARS` array
- `Features.jsx` → `FEATURES` array

Colors are defined as CSS variables in `src/index.css`:
```css
--purple: #7c6af7;
--purple-light: #a29bfe;
--purple-dark: #5a4fcf;
--bg: #0b0918;
```
