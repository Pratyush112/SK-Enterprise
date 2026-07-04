# Reverse-Engineering Report
### Cargokite.com & join.ames-foundation.com/en

**Methodology note (read this first):** I fetched both sites' live content and asset manifests (image/video filenames, section order, copy) and cross-checked visual identity against public screenshots/awards write-ups. I do **not** have a live DOM/CSS inspector or JS profiler running against these pages, so I cannot literally read computed `transform` values, exact hex codes, or confirm library imports from source. Every number below is either:

- **[Observed]** — taken directly from the fetched markup/asset names (filenames, section structure, copy, image counts), or
- **[Estimated]** — a professional estimate based on the visual genre these sites belong to (German maritime-tech / awwwards "premium narrative" sites typically built on Next.js + GSAP + Lenis; African-conservation editorial-collage sites typically built on Webflow/Next.js + GSAP ScrollTrigger).

Treat every `[Estimated]` value as a strong, defensible starting point for implementation — not a measured fact. If you need pixel-exact accuracy, the fastest path is opening DevTools → Elements/Computed on the live site and cross-referencing against this document's structure, which will save you 80% of the archaeology.

---

## SITE 1 — CARGOKITE.COM

### PART 1 — First Impression

**Visual personality:** Engineering gravitas dressed as a consumer product launch. This is a hard-tech startup (autonomous wind-powered cargo ships) borrowing the visual grammar of Apple product pages and automotive reveals — full-bleed hero video of a ship at sea, a percentage counter loader, dark cinematic color grading — to make "maritime decarbonization infrastructure" feel as desirable as a new iPhone.

**Emotional response:** Confidence, scale, quiet urgency. Nothing about the site is playful; every choice (autoplay ocean video, monospaced-feeling number counter, terse "Low Emission Ocean Transportation" headline) is engineered to say *this team is serious and this is real hardware, not a slide deck.*

**Brand perception:** Deep-tech / Y Combinator-adjacent hardware startup speaking to two audiences simultaneously — investors (logo walls: Bayern Kapital, SOSV, Lowercarbon, ESA, TUM) and enterprise shipping customers (FAQ answers written for "I'm a shipping company…"). The design has to read as credible to both a VC partner and a fleet operations director, which is why it leans institutional rather than trendy.

**Storytelling / design philosophy:** Classic five-act structure for deep-tech landing pages: **Hook (hero) → Company (who) → Problem (5 pain points) → Solution (the ship) → Technology (specs) → Why Us (moat) → Social proof (partners/investors) → FAQ → Convert (contact/newsletter).** This is the same narrative skeleton used by climate-hardware and space-tech startups (cf. Varda, Helsing, Isar Aerospace sites) — establish the crisis, then reveal the singular technical answer.

**Why it feels premium:**
1. Full-bleed video hero with a still-frame poster image (`home-hero-video-ph.jpeg`) prevents layout flash before the `.mp4` loads.
2. A percentage-based preloader (`00 %`) — a device borrowed directly from Apple/automotive microsites — manufactures anticipation before content is shown.
3. Generous negative space between numbered problem statements and single-sentence paragraphs (no walls of text).
4. Restrained color palette (near-black/navy + white + one accent) rather than "startup gradient soup."
5. Every section has a one-word eyebrow label (*Company / Problem / Solution / Technology / Why us / Investors & Supporters / FAQ*) — an editorial convention that makes a marketing page feel like a structured technical document.

---

### PART 2 — Layout System

| Property | Value | Basis |
|---|---|---|
| Max content width | ~1280–1320px | [Estimated] — standard for this genre of German B2B/deep-tech site |
| Grid | 12-column CSS Grid, ~24px gutters | [Estimated] |
| Section vertical padding | 120–160px desktop, 64–80px mobile | [Estimated] |
| Horizontal page margin | 64–96px desktop, 20–24px mobile | [Estimated] |
| Problem-section card grid | 5 items, likely responsive `repeat(auto-fit, minmax(220px, 1fr))` collapsing to horizontal scroll or 2-col on tablet | [Estimated from 5 problem cards observed] |
| Breakpoints | ~480 / 768 / 1024 / 1440 | [Estimated, standard Tailwind-like scale] |
| Reading flow | Strict single-column vertical scroll, no split-screen sections except the "shift from big ship → small ship" comparison block | [Observed from section order] |
| Visual rhythm | Alternating full-width imagery sections and text-only sections, each anchored by an eyebrow label + H2 pair | [Observed] |

The "shifting the paradigm" section (large ship SVG → repeated small-ship SVGs ×8) is a deliberate scale-contrast layout: one big asset on the left/top, a *cluster* of small identical assets on the right/bottom — a classic "one-to-many" visual argument for the fleet-of-small-ships thesis.

---

### PART 3 — Typography

| Attribute | Value |
|---|---|
| Likely typeface | A grotesque/neo-grotesque sans (e.g. **Inter, Suisse Int'l, Neue Montreal, or a custom variable font**) — [Estimated]. German hard-tech startups very frequently license Neue Montreal or use Inter for this exact "engineering-premium" tone. |
| H1 (hero) | ~64–88px desktop / ~32–40px mobile, weight 500–600, tight leading ~1.05, letter-spacing -0.01 to -0.02em [Estimated] |
| H2 (section) | ~36–48px desktop / ~24–28px mobile, weight 500 [Estimated] |
| H3 (problem/solution card titles) | ~20–24px, weight 600 [Estimated] |
| Body copy | ~16–18px desktop, line-height 1.5–1.6, max paragraph width ~60–65ch [Estimated] |
| Eyebrow labels ("Company", "Problem") | ~12–14px, uppercase or small-caps, letter-spacing +0.08–0.12em, likely a muted accent color [Estimated] |
| Percentage counter (loader) | Large tabular/monospace-feeling numerals so digits don't jitter in width while counting [Estimated — tabular-nums is required for a smooth counter] |
| Text reveal technique | Likely word-or-line-based mask reveal (`overflow:hidden` wrapper + `translateY` on inner span) rather than character-by-character, consistent with the editorial/serious tone — a bouncy character-stagger would clash with the brand voice [Estimated] |

---

### PART 4 — Color System

| Token | Estimated Hex | Usage |
|---|---|---|
| Background primary | `#0A0E14` – `#0B1220` (near-black navy) | Hero, dark sections |
| Background secondary | `#F5F6F7` – `#FFFFFF` | Company/Problem/FAQ light sections |
| Text on dark | `#F2F4F7` | Headlines on hero |
| Text on light | `#12151A` | Body copy in light sections |
| Muted/secondary text | `#8A93A6` | Eyebrow labels, captions |
| Accent | A single cool accent — likely a **cyan/teal or steel-blue** (`#3AA0FF`–`#4FD1C5` range) tying to "ocean/wind" branding | Links, hover states, percentage counter, active FAQ chevron |
| Border/divider | `rgba(255,255,255,0.08)` on dark, `rgba(0,0,0,0.08)` on light | Card outlines, FAQ dividers |
| Video overlay gradient | `linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.65) 100%)` | Ensures hero text/nav legibility over the ocean footage |

No glassmorphism observed in the content structure; a frosted/blurred nav bar on scroll is plausible but unconfirmed [Estimated]. Shadows are likely minimal/flat — deep-tech sites in this category tend to use borders over drop-shadows for a more "engineered" than "soft SaaS" feel.

---

### PART 5 — Design System Components

**Buttons** — Two variants observed by function:
- Primary CTA ("Get in touch", "Let's discuss today!", "Partner with us today"): pill or slightly rounded rect (~6–10px radius), solid accent or white-on-dark fill, ~14–16px medium-weight label, ~14px vertical / 24–28px horizontal padding [Estimated]. Hover likely a subtle background lighten + 150–200ms ease.
- Secondary/inline links ("More about us", "Explore CargoKite Technology"): underline-on-hover or arrow-suffix text links, no container.

**Nav** — Sticky top bar; logo + 6 text links + pill CTA button, right-aligned. On scroll, likely transitions from transparent (over hero video) to a solid/blurred dark bar [Estimated].

**FAQ accordion** — Text question rows with a rotate-on-open indicator (`+` → `×`, 200–250ms rotate 45°), answer panel expands via `max-height` or Framer Motion `AnimatePresence` height auto-animation.

**Modal (contact form)** — Centered card, dark overlay backdrop (~`rgba(0,0,0,0.6)`), close via "×" top-right, confirmation state swaps form for a thank-you message ("Thank Kenny... Your message has been sent") — note the copy literally contains a placeholder name token (`{{firstName}}` → "Kenny"), confirming this is a **dynamically personalized confirmation string**, not static copy. [Observed]

**Cards (Problem/Solution)** — Image on top (~16:10 or 4:3 crop), numbered/eyebrow-free heading below, 1–2 sentence body, likely 12–16px radius on the image only [Estimated].

**Logo wall (partners/investors)** — Horizontal auto-scrolling marquee (infinite loop, duplicated logo set — confirmed by the *exact duplicated sequence* of 9 logos appearing twice in the fetched markup) [Observed]. This is the single strongest animation signal in the whole page: a **CSS `@keyframes translateX(-50%)` infinite marquee**, not a JS carousel, because the logo array is literally doubled in the DOM.

---

### PART 6 — Animation Analysis (priority section)

| # | Animation | Trigger | Duration | Delay | Ease | Transform/Opacity | Implementation guess |
|---|---|---|---|---|---|---|---|
| 1 | Preloader counter 0→100% | Page load | ~1200–1800ms total | 0 | linear or easeOutQuad | Text content increments; page content `opacity 0→1` on complete | JS `requestAnimationFrame` counter + GSAP fade-out of loader overlay |
| 2 | Hero video fade-in | After loader completes | 600–900ms | 0–100ms | easeOut | `opacity 0→1`, poster image swapped for `<video>` once buffered | Native `<video autoplay muted loop playsinline>` with poster fallback |
| 3 | Hero H1 reveal | Load, after loader | 700–900ms | 150–300ms | easeOutExpo/cubic | `translateY(24–40px) → 0`, `opacity 0→1`, masked by `overflow:hidden` wrapper | GSAP `.from()` or CSS animation |
| 4 | Investor logo strip fade-in | Load | 500ms | 400–500ms (staggered ~60–80ms/logo) | easeOut | `opacity 0→1`, slight `translateY(8px)→0` | GSAP stagger |
| 5 | Scroll-cue text ("Scroll down to discover...•") | Load, loops | 1500–2000ms loop | — | easeInOut | `opacity` pulse 0.4↔1, or bullet `translateX` shuttle | CSS `@keyframes` infinite alternate |
| 6 | Section eyebrow + H2 reveal | Scroll into view (~20% viewport threshold) | 600–800ms | 0–100ms | easeOutQuad | `translateY(20–30px)→0`, `opacity 0→1` | GSAP ScrollTrigger `.from()`, `once` |
| 7 | Problem-card image reveal | Scroll into view | 700–900ms | staggered 80–120ms per card | easeOutCubic | `scale(1.05)→1` + `opacity 0→1`, or clip-path wipe | ScrollTrigger + stagger |
| 8 | "Shift from big ship → small ships" comparison | Scroll into view | 800–1200ms | sequential (big ship first, then 8 small ships stagger 60–90ms) | easeOutBack (slight overshoot suits the "reveal of a fleet" beat) | `scale(0.8)→1`, `opacity 0→1` | GSAP timeline, staggered |
| 9 | Technology stat callouts ("Up to 100%…", "Up to 70%…") | Scroll into view | 600ms | staggered ~100ms | easeOutQuad | `translateY(16px)→0`, `opacity 0→1` | ScrollTrigger stagger |
| 10 | Partner/investor logo marquee | Load, continuous | ~20–30s per full loop | — | linear | `translateX(0 → -50%)` infinite | CSS keyframes, `will-change: transform` |
| 11 | FAQ accordion open/close | Click | 250–350ms | 0 | easeInOut | `max-height 0→auto` (or `height: auto` via Framer Motion), chevron `rotate(0→45deg)` | Framer Motion `AnimatePresence` or CSS grid-rows trick |
| 12 | Nav bar background on scroll | Scroll past ~80–120px | 200–300ms | 0 | ease | `background rgba(0,0,0,0)→rgba(10,14,20,0.8)`, optional `backdrop-filter: blur(12px)` | scroll listener + CSS transition |
| 13 | CTA button hover | Hover | 150–200ms | 0 | ease | Background lighten/darken 8–12%, optional `translateY(-1px)` | CSS transition |
| 14 | Modal open (contact form) | Click "Get in touch" | 300–400ms | 0 | easeOutCubic | Overlay `opacity 0→1`; card `scale(0.96)→1` + `opacity 0→1` | Framer Motion or GSAP |
| 15 | Modal → success state swap | Form submit | 300ms crossfade | 0 | ease | Form `opacity 1→0` / message `opacity 0→1`, likely a height crossfade | Framer Motion `AnimatePresence` |
| 16 | Sticky "Are you interested? Let's discuss today!" footer prompt | Scroll (appears after passing hero, persists) | 400ms entrance | — | easeOut | `translateY(100%)→0` (slides up from bottom) | position:fixed + IntersectionObserver-triggered class |

**Overall animation philosophy:** Scroll-triggered, one-shot reveals (fire once, no re-trigger on scroll-up) with restrained easing curves (`easeOutQuad/Cubic`, no bounce except possibly the fleet-reveal beat). This is a **Linear/Stripe-style "confidence" motion language** — everything moves exactly once, with intent, and settles quickly (<1s) rather than lingering. No parallax layering was evident in the content structure (no duplicated background/foreground asset pairs beyond the hero video+poster), so I'd guess this site is **animation-light and typography/timing-heavy** rather than a heavy WebGL/Three.js experience — consistent with a hardware startup that wants to look serious, not gimmicky.

---

### PART 7 — Scroll Experience

- **Smooth scrolling:** Near-certain use of **Lenis** or GSAP `ScrollSmoother` — this is the default choice for any awwwards-nominated Next.js/GSAP site in 2023–2025 [Estimated].
- **Sticky nav:** Yes, transitions background on scroll (see Part 6 #12).
- **Sticky bottom CTA bar:** The "Are you interested? Let's discuss today!" element behaves like a persistent bottom banner across pages — appears to be a global sticky footer prompt, not scroll-triggered per-section.
- **No scroll-snapping** — content reads like continuous long-form scroll, not full-viewport panel snapping (no evidence of `scroll-snap-type` sectioning; too much variable-height content per section for that).
- **Section transitions:** Simple opacity/translateY reveals per section, not big page-transition wipes between routes (site is server-rendered multi-page: `/about`, `/tech`, `/news`).

---

### PART 8 — Navigation

- **Desktop:** Logo left, 6 links center/right (Home / About us / Technology / Career / News & Media / Event), pill CTA far right. Trailing periods after each label ("Home.", "About us.") — a deliberate typographic quirk/brand signature. [Observed]
- **Mobile:** Hamburger menu revealing a full-screen or slide-in list matching the same 6 links + CTA (duplicate nav list found in markup confirms a mobile drawer with its own independent list rendering) [Observed].
- **Current-page indicator:** Likely an underline or accent-colored label for the active route [Estimated].
- **Anchor links:** "/about#job" and "/about#event" show in-page anchor navigation from the global nav — smooth-scroll-to-anchor behavior expected.

---

### PART 9 — Hero Section

- **Layout:** Full-bleed video background, centered/left-aligned headline overlay, dark gradient scrim for legibility, small "backed by" investor logo row beneath the H1, scroll-cue at the bottom.
- **Two hero variants observed in markup**: an initial compact version (before scroll/load settles) and a "full" hero with the actual `.mp4` (`home-hero-ocean-3.mp4`) plus fallback poster + a static ship PNG (`home-hero-ship-2.png`) — suggesting a **progressive enhancement**: static ship image → poster frame → looping video, likely swapped based on connection speed / `prefers-reduced-motion` / viewport [Estimated but structurally supported by having 3 distinct hero assets].
- **CTA:** No explicit hero CTA button — the hero's job is pure brand statement; conversion happens via the persistent sticky bottom bar instead. Smart hierarchy: don't ask for the click before you've earned trust.

---

### PART 10 — Cards

Problem cards (5) and solution cards (4) share a template: image → heading → 1–2 sentence body. Estimated spec: 12–16px image radius, 24–32px internal padding on text block, 24–32px gap between cards in grid, no visible shadow (flat, bordered aesthetic), no hover-scale confirmed but plausible subtle `scale(1.02)` + image `scale(1.05)` on hover for interactivity signaling [Estimated].

### PART 11 — Images

- Photography is documentary/engineering-render hybrid (team photos + ship renders + problem-illustration photography).
- Ship renders (`ship-color.png`, `ship-dark.png`) suggest a **light/dark contextual swap** — likely the ship render inverts or changes treatment depending on section background (dark ship on light bg, light/glowing ship on dark bg).
- SVG assets used for schematic diagrams (big-ship vs. small-ship comparison) — vector for crispness at any scale, consistent with an engineering-credibility brand.
- Lazy loading near-certain on all below-fold imagery [Estimated, standard practice].

### PART 12 — Motion Design Philosophy

Closest to **Linear/Stripe**: restrained, purposeful, single-fire reveals, no springy/bouncy personality except possibly one "reveal of the fleet" moment. Not Apple-style scroll-scrubbed 3D (no evidence of pinned/scrubbed hero sequences), not Framer-template bounce.

### PART 13 — Interaction Design
Hover states on nav links/buttons (color or background shift), click-to-expand FAQ, click-to-open modal, scroll-triggered reveals, no drag/swipe interactions detected (not a carousel-heavy page), keyboard focus should be present on all links/buttons/form fields for accessibility.

### PART 14 — Mobile Experience
Hamburger nav, stacked single-column cards, hero video likely swapped for a lighter-weight poster image or shorter loop to save mobile bandwidth, sticky bottom CTA likely persists but shrinks, touch targets ≥44px expected on nav and buttons.

### PART 15 — Technical Implementation (best-guess stack)
- **Framework:** Next.js or Nuxt (hashed asset filenames like `home-hero-ocean-3.c091f11f.mp4` are the classic Webpack/Vite content-hash pattern) — [Observed pattern, framework inferred]
- **Animation:** GSAP + ScrollTrigger (industry standard for this exact genre of scroll-reveal site), possibly Framer Motion for the modal/FAQ
- **Smooth scroll:** Lenis
- **Styling:** Tailwind CSS or CSS Modules with design tokens
- **Video:** native `<video>`, not a JS player

### PART 16 — Performance
Poster-image fallback for hero video (prevents blank flash), hashed/fingerprinted asset filenames (enables aggressive CDN caching), SVGs for diagrams (resolution-independent + tiny payload), likely `next/image`-style responsive image serving for JPEGs.

### PART 17 — Accessibility
Risk areas to verify manually: contrast of white text over variable-brightness ocean video (scrim gradient is doing load-bearing work here), `prefers-reduced-motion` handling for the counter/marquee/scroll-reveals, focus-visible states on the FAQ accordion and modal (modal should trap focus and return it on close).

---

## SITE 2 — JOIN.AMES-FOUNDATION.COM/EN

### PART 1 — First Impression

**Visual personality:** Editorial safari scrapbook — torn-paper photo edges, black-and-white halftone print textures, hand-stamped seal graphics ("deemed fit for campfires"), sketched outline overlays on photos. This reads like a **field journal / expedition dossier**, not a typical nonprofit donation page.

**Emotional response:** Belonging and exclusivity rather than guilt-based charity appeal. The copy ("Do you have what it takes to become a Guardian?", "campfire Gin & Tonics are best shared with friends, not acquaintances") sells **membership and identity**, closer to a private club application than a donation form.

**Brand perception:** A curated, high-trust network for wealthy/entrepreneurial donors ("Guardians," €3,000/year minimum, "178 Guardians," two interview rounds) — the aesthetic has to justify a premium membership fee, so it borrows luxury-travel and heritage-brand visual cues (halftone print, torn paper, stamps) rather than generic NGO stock-photo blue-and-green.

**Storytelling / design philosophy:** A **numbered five-chapter narrative** (01 What is AMES → 02 The Mission → 03 Being a Part of AMES → 04 Selection Process → 05 Become a Part of AMES) — literally structured like a printed booklet/manifesto with chapter numbers, reinforcing the "field journal" concept mechanically as well as visually.

**Why it feels premium:** Mixed media collage (real photography + halftone illustration + hand-drawn sketch overlays + paper-texture backgrounds) signals bespoke art direction rather than templated design; a scroll-progress "index finger" indicator turns the scrollbar itself into branded content; direct member testimonial with named attribution and tenure ("Constantin Schwaab – Guardian since 2020") builds social proof through specificity rather than generic quotes.

---

### PART 2 — Layout System

| Property | Value | Basis |
|---|---|---|
| Max content width | ~1200–1280px, but likely broken deliberately by full-bleed photo sections | [Estimated] |
| Grid | Asymmetric/collage grid rather than strict 12-col — torn-paper photo elements are probably absolutely positioned with slight rotation (`rotate(-2deg to 3deg)`) for the scrapbook effect | [Estimated] |
| Section padding | 100–140px desktop / 56–72px mobile | [Estimated] |
| The mission section | 3-item vertical or horizontal list (Habitat / Conservation Tech / Community) with a scroll-position "index finger" indicator tracking progress through the three — this is a **pinned/stepped scroll section** | [Observed structurally from "Scroll position index finger indicator" text] |
| Photo gallery (member photos) | 5-image asymmetric collage row, mixed aspect ratios (portrait + landscape mixed) | [Observed: 5 distinct images described] |

---

### PART 3 — Typography

| Attribute | Value |
|---|---|
| Likely typeface pairing | A **serif or slab-serif display face** for chapter headlines (evoking old field-journal/typewriter heritage) + a clean grotesque sans for body copy [Estimated] — this pairing is near-universal for "heritage/expedition" brand positioning |
| Chapter numbers ("01", "02"...) | Large, likely a distinct monospace or serif numeral, treated almost like a stamp/print-run marker, positioned beside/above the section heading [Estimated] |
| H1/manifesto lines ("Making wildlife conservation profitable + scalable.") | Large display serif, ~48–72px desktop, tight leading, likely with the "+" treated as a distinct visual/color accent given it's isolated in its own line in the copy | [Observed line-break structure] |
| Body copy | ~17–18px, generous line-height ~1.6–1.7 for a "read like a magazine" feel [Estimated] |
| Pull-quote (testimonial) | Large italic serif, ~24–32px, likely with a hand-drawn quote mark asset rather than a typographic `"` character, given the torn-paper/hand-stamped visual language elsewhere [Estimated] |

---

### PART 4 — Color System

| Token | Estimated Hex | Usage |
|---|---|---|
| Background | Warm off-white / aged paper `#F4EFE6`–`#EDE7DA` | Page background, torn-paper cards |
| Ink/text | Near-black `#1C1A16` | Body copy, headings |
| Halftone accent | Pure black `#000000` on cream, true duotone (no color) for illustration elements | Branch illustrations, member portrait stamps |
| Accent (brand) | An earthy tone — likely a **burnt-orange, ochre, or safari-khaki** (`#B5622B`–`#C99A4B` range) | CTA buttons, stamp graphics, "+" accent in headline |
| Photo treatment | Full-color photography contrasted against black & white halftone illustration — deliberate two-register color system (real world = color, brand graphic = mono) | Member photos vs. branch/animal illustrations |

This is a **duotone-plus-photography** system rather than a flat UI palette — the brand color story is really "black & white print texture vs. full-color reality," which is a much more art-directed choice than a typical SaaS color token set.

### PART 5 — Design System Components

- **Stamp/seal graphics** ("deemed fit for campfires") — bespoke SVG illustrations functioning as badges; likely rotated slightly and placed overlapping photo edges.
- **Torn-paper image frames** — photos are masked with a torn-edge PNG/SVG mask rather than a clean rectangle or rounded corner; this is the single most distinctive visual signature of the brand and would need a reusable `<TornPhotoFrame>` component wrapping any `<img>`.
- **Membership stat cards** ("Biggest Benefit / Current members / Membership fee") — three-column stat block, likely large numeral + small label, minimal borders, paper-textured background.
- **CTA buttons** ("Meet them!", "Join the guardians") — likely a stamped/underlined text-link treatment rather than a boxed SaaS button, to stay consistent with the print/journal metaphor. [Estimated]

### PART 6 — Animation Analysis (priority section)

| # | Animation | Trigger | Duration | Delay | Ease | Transform | Implementation guess |
|---|---|---|---|---|---|---|---|
| 1 | Hero "Scroll to experience" button | Load, loops | ~1.5–2s loop | — | easeInOut | Background pulse or icon `translateY` bob | CSS keyframes |
| 2 | Torn-paper photo entrance | Scroll into view | 700–900ms | staggered per photo (80–150ms) | easeOutCubic | `translateY(30–50px) + rotate(0→final tilt) + opacity 0→1` | GSAP ScrollTrigger, since the tilt itself is likely animated in alongside position |
| 3 | Halftone illustration reveal (branches, animals) | Scroll into view | 800ms | 0–100ms | easeOut | `opacity 0→1`, possible `clip-path` ink-bleed wipe rather than plain fade, to sell the "print" concept | ScrollTrigger + clip-path animation |
| 4 | "Scroll position index finger" progress indicator | Continuous scroll within the Mission section | Tied 1:1 to scroll position (scrubbed, not time-based) | — | linear (scrubbed) | `translateY` or `translateX` mapped directly to scroll progress within a pinned section | GSAP ScrollTrigger with `scrub: true` — this is the clearest "pinned + scrubbed" section on the whole site |
| 5 | Mission 3-item list (Habitat/Tech/Community) | Scroll through pinned section | Section pinned for duration of 3 sub-reveals | — | ease | Each item fades/slides in as the finger indicator passes its marker; likely old item fades out as new one fades in (crossfade, not accumulate) | GSAP ScrollTrigger timeline with pin:true |
| 6 | Stamp/seal graphic pop-in | Scroll into view | 400–500ms | 0 | easeOutBack (slight overshoot suits a "stamp" impact metaphor) | `scale(0.7→1.05→1)`, maybe paired with a subtle rotate | GSAP `.from()` with overshoot ease |
| 7 | Chapter number reveal ("01", "02"...) | Scroll into view | 500–600ms | 0 | easeOut | `opacity 0→1` + `translateX(-20px)→0` | ScrollTrigger |
| 8 | Testimonial pull-quote | Scroll into view | 700ms | 0 | easeOut | `opacity 0→1`, `translateY(20px)→0` | ScrollTrigger |
| 9 | Member photo collage row | Scroll into view | 900ms total, staggered 100–150ms per image | 0 | easeOutCubic | Each photo `translateY` + `opacity`, offsetting stagger creates a "photos being laid down" feel | GSAP stagger |
| 10 | Nav / header on scroll | Scroll | 250ms | 0 | ease | Background opacity shift, possibly logo mark simplification | CSS transition |

**Overall animation philosophy:** This site is far more **scroll-scrubbed and tactile** than Cargokite — the explicit "scroll position index finger indicator" is a strong, unusual signal that at least one section is a **pinned, scrubbed scrollytelling sequence** (GSAP ScrollTrigger `pin` + `scrub`), which is a materially different (and harder to build) pattern than Cargokite's simple one-shot reveals. Expect **overshoot/back easing** on stamp and seal elements (print/impact metaphor) versus smoother cubic/expo easing on photo and text reveals.

### PART 7 — Scroll Experience
Smooth scroll library near-certain (Lenis/GSAP ScrollSmoother) given the scrubbed section. The Mission section is very likely **pinned** (viewport locks while the finger indicator travels and the 3 sub-items crossfade) — this is the site's signature scroll moment and the one section worth prototyping first if recreating.

### PART 8 — Navigation
Minimal — likely a small fixed logo mark + a single "Join"/menu toggle rather than a full link bar, consistent with the single-long-scroll-page structure (this is a one-pager, not a multi-route site like Cargokite).

### PART 9 — Hero Section
Full-bleed black-and-white halftone photography (branch + team-in-front-of-jeep with sketch overlay), a looping "scroll to experience" prompt, and a short mission statement as overlay copy. No nav clutter — the hero's entire job is atmosphere-setting before the numbered chapters begin.

### PART 10 — Cards
Stat cards (Biggest Benefit / Current members / Membership fee) are minimal — big numeral, short label, no heavy container styling, letting the paper-texture background do the visual work instead of card borders/shadows.

### PART 11 — Images
Two-register system: color documentary photography (safari trucks, member gatherings, wildlife) vs. black & white halftone print illustration (branches, sketched figure outlines) vs. torn-paper masking applied to some but not all photos. This mixed-media layering is the single most labor-intensive part to recreate — expect it to require custom SVG mask assets per photo rather than a generic CSS filter.

### PART 12 — Motion Design Philosophy
Closest to a **bespoke editorial/scrollytelling** approach (think Pitchfork or National Geographic long-form feature pages) rather than a SaaS motion system — overshoot easing on "stamp" elements, scrubbed pinned sections, and mixed-media reveal all point to a site built by a motion/creative studio doing one-off scroll storytelling, not a reusable component library.

### PART 13 — Interaction Design
Primarily scroll-driven; minimal click/hover surface area (this is a brand/story page, not an app). The main interactive decision point is the final CTA ("Join the guardians").

### PART 14 — Mobile Experience
The pinned/scrubbed Mission section is the highest-risk element for mobile — pinned scroll sections need careful height/viewport math on mobile Safari (dynamic toolbar height changes). Expect the mobile version to either simplify this to a straightforward stacked/unpinned reveal or handle it with `100dvh`-aware pinning.

### PART 15 — Technical Implementation (best-guess stack)
Webflow or Next.js + GSAP ScrollTrigger (the pinned scrub section is GSAP's signature move — very few other libraries do pin+scrub this cleanly), custom SVG masks for torn-paper frames, likely Framer Motion for simpler in-view fades layered on top.

### PART 16 — Performance
Halftone/textured images are likely pre-processed static assets (not live CSS filters) for performance and print-fidelity reasons; pinned scroll sections need `will-change: transform` and careful GPU-layer promotion to avoid jank during scrub.

### PART 17 — Accessibility
Pinned/scrubbed sections are the biggest accessibility risk on this site — must implement `prefers-reduced-motion` fallback that simply unpins and reveals content in normal flow; ensure the "index finger" scroll indicator isn't the *only* way a screen-reader user can perceive progress through the 3 mission items (it should be decorative + supplemented by real semantic headings).

---

## PART 18 — Recreation Roadmap (both sites)

**Shared architecture:**
```
/app (Next.js 14+, App Router)
  /components
    /ui         → Button, Badge, Accordion, Modal, StatBlock
    /motion      → RevealOnScroll, Marquee, PinnedScrubSection, TornPhotoFrame
    /sections    → Hero, ProblemGrid (Cargokite) | ChapterSection (AMES)
  /lib
    gsap.ts      → ScrollTrigger + ScrollSmoother/Lenis registration
  /styles
    tokens.css   → colors, spacing, radius, easing as CSS variables
```

**Build order (fastest path to a convincing prototype):**
1. Design tokens file (Part 20 below) → Tailwind config or CSS variables.
2. Static layout for every section, no animation — get spacing/typography right first.
3. Wrap section headings/cards in a generic `<RevealOnScroll>` component (IntersectionObserver-driven `opacity/translateY`) — this alone recreates ~70% of Cargokite's motion.
4. Build the marquee (`Marquee.tsx`: duplicate children, CSS `translateX` keyframe, `animation-play-state: paused` on hover).
5. Build the accordion (Framer Motion `AnimatePresence` + `layout`).
6. **For AMES only:** build `<PinnedScrubSection>` using GSAP ScrollTrigger `pin:true, scrub:true` — prototype this in isolation before integrating; it's the highest-risk/highest-payoff component.
7. **For AMES only:** build `<TornPhotoFrame>` — an SVG `<mask>` or `clip-path` with an irregular torn edge, reusable around any `<img>`.
8. Layer in Lenis for smooth scroll last, after all ScrollTrigger sections work with native scroll (Lenis integration is where most bugs hide).

**Libraries:** GSAP (core + ScrollTrigger, licensed for commercial use), Framer Motion (React component-level transitions), Lenis (smooth scroll), Tailwind CSS (utility layer over the token system).

---

## PART 19 — Consolidated Animation Inventory

| Animation | Site | Trigger | Duration | Delay | Ease | Purpose |
|---|---|---|---|---|---|---|
| Preloader counter | Cargokite | Load | 1200–1800ms | 0 | linear | Manufacture anticipation, mask asset load |
| Hero text reveal | Both | Load | 700–900ms | 150–300ms | easeOutExpo | Establish headline hierarchy |
| Scroll-cue loop | Both | Load, looping | 1.5–2s | — | easeInOut | Affordance: "scroll to continue" |
| Section reveal (fade+rise) | Both | Scroll into view | 600–900ms | 0–150ms, staggered | easeOutCubic/Quad | Pace the narrative, one beat per scroll |
| Logo marquee | Cargokite | Load, continuous | ~20–30s/loop | — | linear | Social proof without taking vertical space |
| FAQ accordion | Cargokite | Click | 250–350ms | 0 | easeInOut | Progressive disclosure |
| Modal open/close | Cargokite | Click | 300–400ms | 0 | easeOutCubic | Focused conversion moment |
| Pinned scrub sequence | AMES | Scroll (pinned) | Scroll-linked | — | linear (scrubbed) | Turn 3 mission pillars into one continuous "journey" beat |
| Stamp/seal pop-in | AMES | Scroll into view | 400–500ms | 0 | easeOutBack | Reinforce print/impact brand metaphor |
| Torn-photo stagger | AMES | Scroll into view | 700–900ms | 80–150ms/item | easeOutCubic | Scrapbook-assembly feeling |

---

## PART 20 — CSS Design Tokens (estimated starting point for both)

```css
/* Cargokite-leaning token set */
:root {
  --color-bg-dark: #0A0E14;
  --color-bg-light: #F5F6F7;
  --color-text-dark-bg: #F2F4F7;
  --color-text-light-bg: #12151A;
  --color-muted: #8A93A6;
  --color-accent: #3AA0FF;
  --radius-sm: 6px;
  --radius-md: 12px;
  --radius-lg: 20px;
  --space-1: 8px;  --space-2: 16px; --space-3: 24px;
  --space-4: 32px; --space-5: 48px; --space-6: 64px; --space-7: 96px; --space-8: 128px;
  --font-size-h1: clamp(2.25rem, 5vw, 5.5rem);
  --font-size-h2: clamp(1.5rem, 3vw, 3rem);
  --font-size-body: clamp(1rem, 1.2vw, 1.125rem);
  --ease-out-cubic: cubic-bezier(0.33, 1, 0.68, 1);
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --duration-fast: 200ms;
  --duration-base: 600ms;
  --duration-slow: 900ms;
  --container-max: 1280px;
  --bp-sm: 480px; --bp-md: 768px; --bp-lg: 1024px; --bp-xl: 1440px;
}

/* AMES-leaning token set */
:root {
  --color-bg-paper: #F4EFE6;
  --color-ink: #1C1A16;
  --color-accent-ochre: #B5622B;
  --ease-out-back: cubic-bezier(0.34, 1.56, 0.64, 1);
  --duration-stamp: 450ms;
}
```

---

## PART 21 — Design System Summary (Figma-doc style)

**Cargokite** — a *reveal-once, confidence-paced* system. Components: Button (primary/secondary), Nav (transparent→solid), Accordion, Modal, Marquee, Stat callout, Card (image+heading+body). Motion principle: *"Move once, mean it."* Every element enters with intent and settles fast; nothing loops except the ambient scroll-cue and the logo marquee. Accessibility must-fix: verify contrast against video background at every scroll position, not just the first frame.

**AMES Foundation** — a *scroll-as-narrative* system. Components: TornPhotoFrame, Stamp/Seal badge, Chapter header (numbered), Stat block (numeral+label), Pull-quote, Pinned scrub section. Motion principle: *"The scroll IS the story."* The pinned Mission section is the load-bearing interaction of the entire page — treat it as a mini-app within the site, prototype and test it independently of everything else, and build its `prefers-reduced-motion` fallback before anything else on the page.

---

### Where to go from here
If you tell me **which of the two you're actually rebuilding** (or if it's a third site inspired by both), I can turn Part 18 into real starter code — the `<RevealOnScroll>` / `<Marquee>` / `<PinnedScrubSection>` components in React + GSAP, ready to drop into a Next.js project — rather than leaving it as spec.
