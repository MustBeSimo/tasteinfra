# CLAUDE.md - AI Assistant Guide

This document provides context for AI assistants working with this repository.

## Project Overview

**Taste Infrastructure Manifesto** - A high-fidelity web presentation advocating for AI evaluation and quality gates as a competitive advantage.

**Core Thesis:** "Generation is Commoditizing. Evaluation is Scarce." As AI generation becomes cheap and abundant, differentiation shifts to evaluation (quality gates, accuracy, safety, compliance, brand quality).

**Author:** Simone Leonelli (Studio W230)
**License:** CC-BY-NC-4.0 (Creative Commons Attribution-NonCommercial 4.0)

## Repository Structure

```
/tasteinfra/
├── index.html              # Main presentation (single-file, ~1100 lines)
├── src/
│   ├── lib/
│   │   └── animations.js   # GSAP animation logic (~300 lines)
│   └── styles/
│       └── main.css        # Styling and layout (~650 lines)
├── scripts/
│   ├── init.sh             # Environment initialization
│   └── check.sh            # Project validation
├── README.md               # Project documentation
├── LICENSE                 # CC-BY-NC-4.0
└── NOTICE                  # Terms of use and attribution
```

## Technology Stack

- **HTML5** - Semantic markup, Open Graph meta tags
- **CSS3** - Flexbox, Grid, custom animations, media queries
- **Vanilla JavaScript** - ES6+ syntax, no frameworks
- **GSAP 3.12.2** - Animation engine with ScrollTrigger plugin (loaded from CDN)
- **Google Fonts** - Fraunces (headings), Inter (body text)

**No build system** - This is a static web project. No npm, webpack, or transpilation.

## Key Files

### index.html
- Single-file web presentation with 15+ slide sections
- Each slide is a `<section class="slide">` with unique ID for navigation
- Contains Open Graph/Twitter meta tags for social sharing
- Semantic HTML5 structure with accessibility considerations

### src/lib/animations.js
- GSAP animation configuration and scroll triggers
- Text reveal system (word/character splitting)
- Keyboard navigation (Arrow keys, Space bar)
- Slide counter system (updates on scroll: "01/15")
- Path animations for SVG diagrams

### src/styles/main.css
- Utility-based styling approach (Tailwind-like)
- Color palette: Accent amber (#f59e0b), dark backgrounds (#000/#1a1a1a)
- Component classes: `.slide`, `.box`, `.callout`, `.reveal`, `.stagger-item`
- Dark/light mode variants: `.slide-dark`, `.box-light`, `.box-dark`
- Responsive breakpoint at 768px

## Code Conventions

### HTML
- BEM-like class naming: `.slide-dark`, `.box-light`, `.nav-counter`
- Semantic elements: `<section>`, `<header>`, `<nav>`, `<article>`
- Each slide has a unique ID for anchor navigation (e.g., `id="thesis"`)

### CSS
- Mobile-first responsive design
- Hardcoded color values (no CSS custom properties)
- Animation states via class toggling (`.animate-rule`)
- Consistent 8px spacing rhythm

### JavaScript
- Vanilla JS with ES6+ features (const/let, arrow functions)
- Modular function approach for animations
- Event listeners for scroll and keyboard
- Sequential initialization pattern

## Development Workflow

### Setup
```bash
./scripts/init.sh    # Initialize (prints success message)
# Open index.html in any modern browser
```

### Validation
```bash
./scripts/check.sh   # Verifies core files exist
```

### Testing Changes
No build step required. Simply refresh the browser after editing files.

## Common Tasks

### Adding a New Slide
1. Add a new `<section class="slide" id="unique-id">` in index.html
2. Use existing patterns for content structure
3. Add any new animations in animations.js if needed
4. Update the slide counter total if applicable

### Modifying Animations
- Edit `src/lib/animations.js`
- GSAP ScrollTrigger controls scroll-based animations
- Text reveals use `SplitText` patterns

### Updating Styles
- Edit `src/styles/main.css`
- Follow existing class naming conventions
- Test on both light and dark slides

## Important Notes

1. **No Dependencies to Install** - All libraries loaded via CDN
2. **Static Hosting Ready** - Can deploy to GitHub Pages or any static host
3. **Browser Compatibility** - Requires modern browsers with ES6 and CSS Grid support
4. **JavaScript Required** - Animations and navigation need JS enabled

## License Considerations

- **Non-commercial use allowed** with attribution
- **Commercial use requires explicit permission** - Contact simone@w230.net
- Attribution must include: author name, repository URL, license, date

## File Size Reference

- index.html: ~80KB, ~1,100 lines
- animations.js: ~10KB, ~300 lines
- main.css: ~20KB, ~650 lines
- Total repository: ~3.2MB (including .git)

## External Resources

- **Live Site:** mustbesimo.github.io/tasteinfra/
- **GSAP Docs:** https://gsap.com/docs/
- **Author Contact:** simone@w230.net
