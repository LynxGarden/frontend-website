# Lynx Studio website

Static, bilingual (EN/SL), SEO/AEO-optimised marketing site for the Lynx fitness,
pilates & physiotherapy studio in Ljubljana. No framework, no runtime — plain HTML,
CSS and a little vanilla JS, generated from a small Node build and served straight
from GitHub Pages.

## How it works

Content and copy live in **`src/`** and the final HTML is **generated** — never edit
`index.html` / `sl/index.html` by hand.

```
src/content.mjs    All copy + business data (EN & SL) — the source of truth
src/icons.mjs      Inline SVG icons (no external icon dependency)
src/template.mjs   HTML template + JSON-LD structured data
build.mjs          Generates the site
assets/            css / js / media / img (styles.css, app.js, video, placeholders)
index.html         Generated — English (site root)
sl/index.html      Generated — Slovenian
sitemap.xml, robots.txt, site.webmanifest, 404.html, .nojekyll   Generated / config
docs/todo.md       Launch checklist (placeholders to replace, domain setup)
```

## Build

```bash
node build.mjs      # regenerates all HTML + SEO files
```

Run this after any change in `src/`. Commit the generated files.

## Preview locally

```bash
python3 -m http.server 8765
# EN → http://localhost:8765/    SL → http://localhost:8765/sl/
```

## Deploy (GitHub Pages)

Repo → **Settings → Pages → Deploy from a branch → `main` / root**.
Live at `https://lynxgarden.github.io/frontend-app/`. See `docs/todo.md` for moving
to a custom domain (which improves SEO).

## SEO / AEO features

- Separate crawlable URLs per language with `hreflang` (en, sl, x-default) + canonical.
- JSON-LD: `LocalBusiness`/`HealthClub`, `WebPage`, `FAQPage`, `BreadcrumbList`, membership `Offer`s.
- Semantic HTML5, one `<h1>`, clean heading hierarchy, all carousel copy present in the DOM.
- Open Graph + Twitter cards, `sitemap.xml`, `robots.txt`, web manifest, theme-color.

⚠️ Business data, prices, people, testimonials and most media are **placeholders** —
see `docs/todo.md` before launch.
