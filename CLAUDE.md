# Ali Clips Studio — Project Context

## What This Is
A single-page barbershop website for **Ali Clips Studio** in Mississauga, Ontario. One HTML file, no build system, no npm, no frameworks.

## The Only File That Matters
- **`index.html`** — entire site lives here. Read it before editing anything.
- **`Images/`** — all images used on the site:
  - `logo.PNG` — brand logo (nav + footer, forced black via `filter: brightness(0)`)
  - `Images/IMG_0202.JPG` — hero full-width image + contact section right column
  - `Images/Eesa.JPG` — barber profile photo (the "Your Barber" section)
  - `Images/IMG_0213.JPG` — gallery
  - `Images/30932d49...booksy.jpeg` — gallery
  - `Images/1ca3aec2...booksy.jpeg` — gallery
  - `Images/6e8df8...booksy.jpeg` — gallery
  - `Images/d7ac45...booksy.jpeg` — gallery
  - `Images/050a23...booksy.jpeg` — gallery
- **`screenshot.js`** — Puppeteer script to capture section screenshots for visual QA

## Tech Stack
- **Tailwind CSS via CDN** — custom config injected as `window.tailwind` before the CDN `<script>` tag. No PostCSS, no build step.
- **Vanilla JS** — all interactivity inline at bottom of `index.html`
- **No dependencies to install** — open `index.html` directly in a browser

## Design System
| Token | Value | Notes |
|-------|-------|-------|
| Background | `#ffffff` (white) | Changed from original `#e8e8e8` |
| Text | `#22211f` | Dark charcoal |
| Border / muted | `#5f5f5a` | Used for dividers |
| Sage gray | `#d2d5ce` | Accents |
| Font | `Supreme, Arial, sans-serif` | Applied globally to `body` |
| Border radius | `0` | `rounded-none` everywhere — no rounded corners |

## Site Sections (top to bottom)
1. **Nav** — hides on scroll down, reappears on scroll up. Mobile: hamburger → dropdown with `max-height` CSS transition. Hamburger animates to X (3 spans, CSS transform).
2. **Hero** — large bold uppercase heading, full-width `IMG_0202.JPG` below
3. **Your Barber** — `Eesa.JPG` left, bio text right (top-aligned)
4. **Pricing** — `<table>` with SERVICE / DURATION / PRICE columns, horizontal `border-b` dividers
5. **Gallery** — auto-scrolling carousel (every 4s, loops). Shows 2 images on desktop, 1 on mobile. JS calculates pixel widths from container `offsetWidth` — do NOT use CSS `%` widths on images (causes stretching). Prev/Next arrows at bottom. Clicking arrows resets the 4s timer.
6. **FAQ** — dark `#22211f` bg, white text, accordion with `max-height` CSS transition
7. **Contact** — address, phone, Instagram, hours stacked in single column; interior image hidden on mobile
8. **Footer** — centered logo, horizontal nav links, copyright
- **Floating "Book Now"** button fixed bottom-right, links to Booksy

## Key JS Patterns
- **Scroll reveal**: `IntersectionObserver` toggles `.visible` class — uses `classList.toggle('visible', entry.isIntersecting)` so it retriggers on scroll up AND down. Never call `unobserve`.
- **Gallery sizing**: `document.getElementById('gallery-overflow').offsetWidth` → compute pixel `imgWidth` → set on each `img.style.width`. Recalculate on `resize`.
- **Nav scroll**: compare `scrollY` to `prevScrollY`; add `transform: translateY(-100%)` when scrolling down.
- **Favicon**: Canvas `globalCompositeOperation: 'source-in'` to recolor logo black for the browser tab.

## Business Info (for content edits)
- **Address**: 844 Preston Manor Dr, Mississauga, ON L5V 2L6
- **Phone**: (647) 675-3254
- **Hours**: Sun–Mon, Wed–Sat 10am–7pm | Tuesday: Closed
- **Instagram**: @aliclips_
- **Booksy**: linked in "Book Now" CTAs throughout

---

