# 🚀 Advanced Portfolio — Week 5

> A modern, responsive portfolio website built with CSS Grid, Flexbox, CSS Variables, and smooth animations as part of Week 5: Advanced CSS & Modern Layouts.

---

## 📋 Project Overview

This portfolio showcases advanced CSS techniques learned in Week 5 of the web development course. The goal was to redesign a portfolio using CSS Grid for layout, CSS custom properties for theming, Flexbox for component-level alignment, and smooth animations to enhance the user experience.



---

## 🛠️ Setup Instructions

### Prerequisites
- A modern browser (Chrome, Firefox, Edge, Safari)
- A code editor (VS Code recommended)
- Git installed on your machine

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sarla92784/portfolio
   cd portfolio
   ```

2. **Open the project**
   ```bash
   # Option 1 — Open directly in browser
   open index.html

   # Option 2 — Use VS Code Live Server extension
   code .
   # Then right-click index.html → "Open with Live Server"
   ```

3. **Customise your content**
   - Replace `Your Name` in `index.html`
   - Add your profile photo at `images/profile.jpg`
   - Update project descriptions and links
   - Update contact email and social links

---

## 📁 Code Structure

```
Portfolio/
│
├── index.html              # Main HTML file (semantic structure)
│
├── css/
│   ├── main.css            # CSS variables, base styles, BEM components
│   ├── layout.css          # CSS Grid & Flexbox layouts, responsive breakpoints
│   └── animations.css      # Keyframes, transitions, scroll reveal, hover effects
│
├── js/
│   └── theme-switcher.js   # Dark/light theme toggle with localStorage persistence
│
├── images/
│   ├── profile.jpg         # Profile photo
│   ├── certificates.png    # Certificate image
│   ├── Validation.png      # Validation certificate
│   ├── desktop-view-projects.png
│   └── desktop-view-skills.png
│
├── screenshots/            # Project screenshots for documentation
│   ├── desktop-view-hero.png
│   ├── desktop-view-about.png
│   ├── mobile-view.png
│   └── hover-effect.png
│
├── script.js               # Main JS: scroll effects, hamburger, contact form
├── style.css               # Legacy styles (if kept from Week 4)
└── README.md               # This file
```

---

## ✨ Advanced CSS Techniques Used

### 1. CSS Grid — Main Layout System
CSS Grid is used throughout the portfolio to create complex, responsive layouts:

```css
/* Auto-fit project grid — adapts columns based on available space */
.projects__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--space-xl);
}

/* Asymmetric contact section */
.contact__grid {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: var(--space-2xl);
}

/* Image gallery with spanning items */
.gallery__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 200px);
  gap: var(--space-sm);
}
.gallery__item--featured {
  grid-column: span 2;
  grid-row: span 2;
}
```

### 2. Flexbox — Component Alignment
Flexbox is used for navigation, hero layout, CTA buttons, and form controls:

```css
/* Horizontal nav bar */
.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* Vertical form layout */
.contact__form {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}
```

### 3. CSS Variables — Theme System
A complete token system with dark and light theme support:

```css
:root {
  --color-bg:      #0d0d1a;
  --color-primary: #7c6ff7;
  --color-accent:  #f72585;
  --space-md:      1rem;
  --radius-md:     12px;
  --transition-normal: 300ms ease;
}

[data-theme="light"] {
  --color-bg:   #f5f5ff;
  --color-text: #1a1a2e;
}
```

Variables are referenced throughout all CSS files, allowing the entire theme to change by toggling a single attribute on `<html>`.

### 4. CSS Animations & Transitions
Smooth entrance animations and interactive transitions:

```css
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-12px); }
}

/* Scroll-triggered reveal via IntersectionObserver */
.scroll-reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.scroll-reveal.visible {
  opacity: 1;
  transform: translateY(0);
}
```

### 5. Advanced Selectors & Pseudo-elements
```css
/* Animated underline on nav links */
.nav__link::after {
  content: '';
  position: absolute;
  bottom: -4px; left: 0;
  width: 0; height: 2px;
  background: var(--color-primary);
  transition: width 300ms ease;
}
.nav__link:hover::after { width: 100%; }

/* Decorative eyebrow prefix */
.hero__eyebrow::before {
  content: '▹ ';
  color: var(--color-accent);
}

/* Gallery hover overlay */
.gallery__item::after {
  content: '🔍';
  position: absolute;
  inset: 0;
  background: rgba(124, 111, 247, 0.5);
  opacity: 0;
  transition: opacity 300ms ease;
}
.gallery__item:hover::after { opacity: 1; }
```

### 6. BEM Methodology
All CSS classes follow the BEM (Block__Element--Modifier) naming convention:

```
.nav                    → Block
.nav__logo              → Element
.nav__link              → Element
.nav--scrolled          → Modifier

.project-card           → Block
.project-card__body     → Element
.project-card__title    → Element

.btn                    → Block
.btn--primary           → Modifier
.btn--outline           → Modifier
.btn--small             → Modifier
```

---

## 📱 Responsive Design — Mobile-First Approach

| Breakpoint  | Width    | Changes Applied                              |
|-------------|----------|----------------------------------------------|
| Mobile      | ≤ 600px  | Single-column grids, stacked hero, hamburger nav |
| Tablet      | ≤ 900px  | 2-column grids, stacked about & contact sections |
| Desktop     | > 900px  | Full multi-column CSS Grid layouts           |
| Large       | ≥ 1200px | Larger avatar, max-width container           |

---

## ⚡ Performance Optimizations

- **CSS Custom Properties** avoid code duplication and enable instant theme switching
- **`auto-fit` + `minmax()`** creates fluid grids without JavaScript
- **`IntersectionObserver`** runs scroll animations efficiently without scroll event listeners
- **`{ passive: true }`** on scroll event for smooth scrolling performance
- **`prefers-reduced-motion`** media query respects user accessibility settings
- **`clamp()`** for fluid typography without breakpoints
- **`will-change: transform`** can be added to animated elements for GPU compositing
- External fonts loaded via Google Fonts with `display=swap` to prevent FOIT

---

## 🧪 Testing Evidence

### Cross-Browser Testing
| Browser         | Version  | Result |
|----------------|----------|--------|
| Chrome          | 120+     | ✅ Pass |
| Firefox         | 121+     | ✅ Pass |
| Safari          | 17+      | ✅ Pass |
| Edge            | 120+     | ✅ Pass |

### Validation
- **HTML:** Validated with [W3C Markup Validator](https://validator.w3.org/) — 0 errors
- **CSS:** Validated with [W3C CSS Validator](https://jigsaw.w3.org/css-validator/) — 0 errors

### Accessibility
- Semantic HTML5 elements (`<nav>`, `<section>`, `<article>`, `<footer>`)
- All interactive elements have `aria-label` attributes
- Keyboard navigation fully supported
- `:focus-visible` styles for keyboard users
- Colour contrast ratio ≥ 4.5:1 in both themes

---

## 📸 Screenshots

| View               | Screenshot                              |
|--------------------|-----------------------------------------|
| Desktop — Hero     | `screenshots/desktop-view-hero.png`     |
| Desktop — About    | `screenshots/desktop-view-about.png`    |
| Mobile View        | `screenshots/mobile-view.png`           |
| Hover Effects      | `screenshots/hover-effect.png`          |

---

## 💡 Layout Decisions

**Why CSS Grid for the outer layout?**
Grid gives precise two-dimensional control over rows and columns. The `repeat(auto-fit, minmax())` pattern means the layout adapts to any screen width without a single breakpoint for the grid itself.

**Why Flexbox for components?**
Flexbox excels at one-dimensional alignment (nav bar, button groups, form fields). Using both together — Grid for the page shell, Flexbox for components — follows the "right tool for the job" principle.

**Why CSS Variables for everything?**
Using a token system (spacing, colours, radii, transitions) as variables keeps the entire design consistent. Changing `--color-primary` in one place updates 30+ elements instantly, and theme switching requires just one attribute change on `<html>`.

---

## 📚 Resources

- [CSS Grid Guide — CSS Tricks](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [Flexbox Guide — CSS Tricks](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [CSS Grid Garden](https://cssgridgarden.com/) — Interactive CSS Grid practice
- [BEM Methodology](https://getbem.com/)
- [MDN: CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [Web.dev: Animation Performance](https://web.dev/animations-guide/)

---



