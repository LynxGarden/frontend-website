# Lynx Studio — launch TODO

Everything below is **placeholder or provisional** and should be replaced before
going live. Most edits happen in `src/content.mjs`; after any change run
`node build.mjs` to regenerate the HTML.

## 1. Business data (critical for local SEO / AEO)
All of this drives the on-page copy **and** the `LocalBusiness` structured data
(`src/template.mjs → jsonLd`). Search engines and AI answer engines read it, so
it must be accurate. Edit `site` in `src/content.mjs`:

- [ ] **Studio name / legal name** — currently `Lynx Studio`.
- [ ] **Address** — `Trg republike 3, 1000 Ljubljana` is a placeholder.
- [ ] **Geo coordinates** — `latitude`/`longitude` are approximate Ljubljana centre.
      Get the exact values from Google Maps (right-click → coordinates).
- [ ] **Phone** — `+386 1 234 5678` (update both `phone` and `phoneHref`).
- [ ] **Email** — `hello@lynxstudio.si`.
- [ ] **Opening hours** — keep `site.openingHours` (machine-readable) in sync with
      the human `hours1`/`hours2` strings in `en` and `sl`.
- [ ] **Social profiles** (`site.social`) — real Instagram/Facebook/Google Business
      URLs, or remove the array. These become `sameAs` in schema.
- [ ] **Founding year** — `foundingYear` (also used in the footer © line).
- [ ] **priceRange** — currently `€€`.

## 2. Copy & people
- [ ] **Coach names & roles** (`team`) — real staff. Placeholder: Maja Vidmar,
      Eva Kralj, Tomaž Rus, Rok Petrič.
- [ ] **Prices & plan features** (`plans`) — €49 / €89 / €129 are invented.
- [ ] **Testimonials** (`testimonials`) — currently invented quotes. ⚠️ We deliberately
      did **not** add Review/AggregateRating structured data, because Google penalises
      self-serving/fake review markup. Once you have **real, verifiable** reviews,
      add `Review` + `aggregateRating` to the business schema in `src/template.mjs`.
- [ ] **FAQ answers** (`faq`) — confirm they match your real policies.
- [ ] Proofread the SL translations end-to-end.

## 3. Media (replace placeholders)
- [ ] **Coach portraits, testimonial photos, map image** — currently dashed
      placeholder boxes (`.slot`). Add real images to `assets/img/` and swap the
      placeholder markup in `src/template.mjs` (`team`, `testimonials`, `contact`).
- [ ] **Story-carousel clips** — only `fitness / step 1` has a real video
      (`assets/media/lynx-warmup.mp4`). The other 14 steps are placeholder boxes.
      Add clips and register their paths in `JOURNEY_VIDEOS` in `src/content.mjs`.
- [ ] **Compress the video** — `lynx-warmup.mp4` is ~20 MB, too heavy. With ffmpeg:
      `ffmpeg -i lynx-warmup.mp4 -vf scale=-2:1280 -c:v libx264 -crf 28 -movflags +faststart -an lynx-warmup.mp4`
      (drops audio; it's muted). Also export a real WebM for smaller size.
- [ ] **Video poster** — `assets/img/poster.svg` is a flat gradient; export a real
      first-frame JPG for a better loading state.
- [ ] **Open Graph image** — `assets/img/og-image.svg` is a generated SVG. Most
      social scrapers need a **raster 1200×630 PNG/JPG**. Export one, save as
      `assets/img/og-image.png`, and update the `ogImage` references in
      `src/template.mjs` + `build.mjs`.
- [ ] **Favicon** — `assets/img/favicon.svg` is a simple mark; replace with the real
      logo (add a 180×180 PNG apple-touch-icon and a .ico for old browsers).

## 4. Domain & hosting
Current canonical base is `https://lynxgarden.github.io/frontend-app/`
(set in `site.baseUrl` + `site.basePath`).

- [ ] **Enable GitHub Pages**: repo → Settings → Pages → Source = "Deploy from a
      branch", Branch = `main`, folder = `/ (root)`. Site goes live at the URL above.
- [ ] **Custom domain (recommended for SEO)** — when ready:
  1. Add a `CNAME` file at the repo root containing just the domain (e.g. `lynxstudio.si`).
  2. Point DNS at GitHub Pages (A/ALIAS records per GitHub docs).
  3. In `src/content.mjs`, set `baseUrl: "https://lynxstudio.si"` and `basePath: "/"`.
  4. Run `node build.mjs`, commit. This fixes canonical URLs, hreflang, sitemap,
     robots and the manifest scope.
  5. Enable "Enforce HTTPS" in Pages settings.

## 5. SEO / AEO follow-ups after launch
- [ ] Verify the property in **Google Search Console** and submit
      `https://<domain>/sitemap.xml`.
- [ ] Create/claim the **Google Business Profile** (huge for local + AI answers);
      keep NAP identical to the site.
- [ ] Test structured data: <https://search.google.com/test/rich-results>.
- [ ] Test social cards: Facebook Sharing Debugger, X Card Validator.
- [ ] Run **Lighthouse** (target 90+ on all four). Biggest lever = compressing the video.
- [ ] Consider self-hosting the Google Fonts (Bricolage Grotesque + Geist) as woff2
      for performance and EU/GDPR (no request to Google servers). Currently loaded
      from Google Fonts CDN.
- [ ] Add a booking link/system and point the "Book a visit" / CTA buttons at it
      (they currently jump to the contact section / `mailto:`).
- [ ] Add a Privacy Policy + Cookie notice if you introduce analytics or embeds
      (required in the EU).

## 6. Nice-to-have
- [ ] Analytics (privacy-friendly, e.g. Plausible/Umami) — no cookie banner needed.
- [ ] A mobile hamburger menu (nav links are hidden below 900px on purpose for now).
- [ ] Real embedded Google Map in the contact section instead of the placeholder link.
