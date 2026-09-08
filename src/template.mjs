import { site, journeyMeta } from './content.mjs';
import { icon } from './icons.mjs';

// --- small helpers ---------------------------------------------------------
const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const escAttr = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
const pad2 = (n) => (n < 10 ? '0' + n : String(n));

const fullBase = site.baseUrl + site.basePath; // e.g. https://host/frontend-app/
const urlFor = (lang) => (lang === 'en' ? fullBase : fullBase + lang + '/');

// --- structured data (JSON-LD) --------------------------------------------
function jsonLd(t) {
  const business = {
    '@context': 'https://schema.org',
    '@type': ['HealthClub', 'SportsActivityLocation'],
    '@id': fullBase + '#business',
    name: site.brand,
    description: t.seoDescription,
    url: urlFor(t.lang),
    telephone: site.phone,
    email: site.email,
    priceRange: site.priceRange,
    currenciesAccepted: site.currency,
    image: fullBase + 'assets/img/og-image.svg',
    logo: fullBase + 'assets/img/favicon.svg',
    foundingDate: site.foundingYear,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.street,
      postalCode: site.postalCode,
      addressLocality: site.city,
      addressRegion: site.region,
      addressCountry: site.country,
    },
    geo: { '@type': 'GeoCoordinates', latitude: site.latitude, longitude: site.longitude },
    openingHoursSpecification: site.openingHours.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    })),
    sameAs: site.social,
    areaServed: { '@type': 'City', name: site.city },
    knowsLanguage: ['sl', 'en'],
    makesOffer: t.plans.map((p) => ({
      '@type': 'Offer',
      name: p.name,
      price: String(p.price),
      priceCurrency: site.currency,
      description: p.desc,
      category: 'Membership',
    })),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: t.priceTitle,
      itemListElement: t.journeys.map((j) => ({
        '@type': 'OfferCatalog',
        name: j.label,
      })),
    },
  };

  const webpage = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': urlFor(t.lang) + '#webpage',
    url: urlFor(t.lang),
    name: t.seoTitle,
    description: t.seoDescription,
    inLanguage: t.lang,
    isPartOf: { '@type': 'WebSite', '@id': fullBase + '#website', name: site.brand, url: fullBase },
    about: { '@id': fullBase + '#business' },
    primaryImageOfPage: fullBase + 'assets/img/og-image.svg',
  };

  const faq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: t.lang,
    mainEntity: t.faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: t.navHome, item: urlFor(t.lang) },
    ],
  };

  return [business, webpage, faq, breadcrumb]
    .map((o) => `<script type="application/ld+json">${JSON.stringify(o)}</script>`)
    .join('\n');
}

// --- section builders ------------------------------------------------------
function nav(t, p, langSwitch) {
  const link = (href, label) => `<a href="${href}">${esc(label)}</a>`;
  return `
  <nav class="nav" aria-label="${escAttr(t.brand)}">
    <a class="nav__brand" href="#top" aria-label="${escAttr(t.brand)}">
      <span class="nav__mark" aria-hidden="true"></span>
      <span class="nav__wordmark">Lynx</span>
    </a>
    <div class="nav__links">
      ${link('#top', t.navHome)}
      ${link('#fitness', t.navFitness)}
      ${link('#pilates', t.navPilates)}
      ${link('#physio', t.navPhysio)}
      ${link('#pricing', t.navPricing)}
      ${link('#contacts', t.navContacts)}
    </div>
    <div class="nav__actions">
      <div class="langtoggle" role="group" aria-label="Language">
        <a class="langtoggle__btn ${t.lang === 'en' ? 'is-active' : ''}" href="${langSwitch.en}" hreflang="en"${t.lang === 'en' ? ' aria-current="true"' : ''}>EN</a>
        <a class="langtoggle__btn ${t.lang === 'sl' ? 'is-active' : ''}" href="${langSwitch.sl}" hreflang="sl"${t.lang === 'sl' ? ' aria-current="true"' : ''}>SL</a>
      </div>
      <a class="btn btn--primary nav__book" href="#contacts">${esc(t.book)}</a>
    </div>
  </nav>`;
}

function hero(t) {
  return `
  <header class="hero" id="top">
    <span class="badge">${esc(t.heroBadge)}</span>
    <h1 class="hero__title">${esc(t.heroTitle)}</h1>
    <p class="hero__body">${esc(t.heroBody)}</p>
    <div class="hero__cta">
      <a class="btn btn--primary" href="#fitness">${esc(t.heroCta)}</a>
      <a class="btn btn--ghost" href="#pilates">${esc(t.navPilates)}</a>
      <a class="btn btn--ghost" href="#physio">${esc(t.navPhysio)}</a>
    </div>
    <div class="hero__scroll" aria-hidden="true">
      <span>${esc(t.scroll)}</span>
      <span class="hero__scrollline"></span>
    </div>
  </header>`;
}

function journeys(t, p) {
  return t.journeys
    .map((j, ji) => {
      const total = j.steps.length;
      const slides = j.steps
        .map((s, si) => {
          const video = journeyMeta.videos[ji][si];
          const media = video
            ? `<video class="slide__media" src="${p}assets/${video}" poster="${p}assets/img/poster.svg" autoplay muted loop playsinline preload="metadata" aria-hidden="true"></video>`
            : `<div class="slide__ph" role="img" aria-label="${escAttr(s.hint)}"><span class="slide__ph-label">${esc(s.hint)}</span></div>`;
          return `
          <article class="slide" data-index="${si}" aria-roledescription="slide" aria-label="${escAttr(t.stepWord + ' ' + (si + 1) + ' ' + t.of + ' ' + total + ': ' + s.title)}">
            ${media}
            <div class="slide__scrim" aria-hidden="true"></div>
            <div class="slide__caption">
              <span class="slide__kicker">${esc(t.stepWord)} ${pad2(si + 1)}</span>
              <h3 class="slide__title">${esc(s.title)}</h3>
              <p class="slide__body">${esc(s.body)}</p>
            </div>
          </article>`;
        })
        .join('');

      const dots = j.steps
        .map((s, si) => {
          const name = journeyMeta.icons[ji][si];
          return `<button class="dot${si === 0 ? ' is-active' : ''}" type="button" data-goto="${si}" aria-label="${escAttr(s.title)}">${icon(name, { cls: 'dot__icon' })}</button>`;
        })
        .join('');

      return `
    <section class="journey" id="${j.id}" data-journey="${ji}" aria-label="${escAttr(j.label)}">
      <div class="journey__rail" data-rail tabindex="0">
        ${slides}
      </div>
      <div class="journey__bar">
        <h2 class="journey__title">${esc(j.label)}</h2>
        <span class="journey__counter" data-counter>${pad2(1)} / ${pad2(total)}</span>
      </div>
      <div class="journey__timeline" aria-hidden="true">
        <div class="journey__track" data-track>
          <div class="journey__line"></div>
          ${dots}
        </div>
      </div>
      <p class="journey__hint">${esc(t.stepHint)}</p>
    </section>`;
    })
    .join('');
}

function loop(t) {
  const card = (title, body) =>
    `<div class="card"><h3>${esc(title)}</h3><p>${esc(body)}</p></div>`;
  return `
  <section class="section loop" aria-labelledby="loop-title">
    <div class="section__inner">
      <div class="section__head">
        <span class="kicker">${esc(t.loopKicker)}</span>
        <h2 id="loop-title">${esc(t.loopTitle)}</h2>
      </div>
      <div class="grid grid--3">
        ${card(t.navFitness, t.loopFitness)}
        ${card(t.navPilates, t.loopPilates)}
        ${card(t.navPhysio, t.loopPhysio)}
      </div>
    </div>
  </section>`;
}

function team(t) {
  const cards = t.team
    .map(
      (m, i) => `
      <article class="teamcard">
        <div class="teamcard__photo slot" role="img" aria-label="${escAttr(t.slotCoach[i])}"><span>${esc(t.slotCoach[i])}</span></div>
        <div class="teamcard__body">
          <h3>${esc(m.name)}</h3>
          <p>${esc(m.role)}</p>
        </div>
      </article>`
    )
    .join('');
  return `
  <section class="section" id="team" aria-labelledby="team-title">
    <div class="section__inner">
      <div class="section__head">
        <span class="kicker">${esc(t.teamKicker)}</span>
        <h2 id="team-title">${esc(t.teamTitle)}</h2>
      </div>
      <div class="grid grid--4">${cards}</div>
    </div>
  </section>`;
}

function pricing(t) {
  const cards = t.plans
    .map((p) => {
      const feats = p.features.map((f) => `<li>${esc(f)}</li>`).join('');
      const badge = p.badge ? `<span class="pricecard__badge">${esc(p.badge)}</span>` : '';
      return `
      <article class="pricecard${p.featured ? ' pricecard--featured' : ''}">
        <div class="pricecard__head">
          ${badge}
          <h3>${esc(p.name)}</h3>
          <p class="pricecard__desc">${esc(p.desc)}</p>
        </div>
        <p class="pricecard__price"><span class="pricecard__amount">€${p.price}</span><span class="pricecard__per">${esc(t.perMonth)}</span></p>
        <ul class="pricecard__features">${feats}</ul>
        <a class="btn ${p.featured ? 'btn--invert' : 'btn--outline'} pricecard__cta" href="#contacts">${esc(p.cta)}</a>
      </article>`;
    })
    .join('');
  return `
  <section class="section" id="pricing" aria-labelledby="pricing-title">
    <div class="section__inner">
      <div class="section__head">
        <span class="kicker">${esc(t.priceKicker)}</span>
        <h2 id="pricing-title">${esc(t.priceTitle)}</h2>
      </div>
      <div class="grid grid--3 grid--stretch">${cards}</div>
    </div>
  </section>`;
}

function testimonials(t) {
  const cards = t.testimonials
    .map(
      (q) => `
      <figure class="quote">
        <blockquote>${esc(q.quote)}</blockquote>
        <figcaption>
          <span class="quote__avatar slot slot--circle" role="img" aria-label="${escAttr(t.slotPhoto)}"></span>
          <span class="quote__who"><span class="quote__name">${esc(q.name)}</span><span class="quote__meta">${esc(q.meta)}</span></span>
        </figcaption>
      </figure>`
    )
    .join('');
  return `
  <section class="section" aria-labelledby="test-title">
    <div class="section__inner">
      <div class="section__head">
        <span class="kicker">${esc(t.testKicker)}</span>
        <h2 id="test-title">${esc(t.testTitle)}</h2>
      </div>
      <div class="grid grid--3">${cards}</div>
    </div>
  </section>`;
}

function faq(t) {
  const items = t.faq
    .map(
      (f, i) => `
      <details class="faq__item"${i === 0 ? ' open' : ''}>
        <summary><span>${esc(f.q)}</span><span class="faq__mark" aria-hidden="true"></span></summary>
        <p>${esc(f.a)}</p>
      </details>`
    )
    .join('');
  return `
  <section class="section faq" id="faq" aria-labelledby="faq-title">
    <div class="section__inner section__inner--narrow">
      <div class="section__head">
        <span class="kicker">${esc(t.faqKicker)}</span>
        <h2 id="faq-title">${esc(t.faqTitle)}</h2>
      </div>
      <div class="faq__list">${items}</div>
    </div>
  </section>`;
}

function contact(t) {
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    site.street + ', ' + site.postalCode + ' ' + site.city + ', ' + site.countryName
  )}`;
  return `
  <section class="section" id="contacts" aria-labelledby="contact-title">
    <div class="section__inner contact">
      <div class="contact__card">
        <div class="section__head">
          <span class="kicker kicker--light">${esc(t.navContacts)}</span>
          <h2 id="contact-title">${esc(t.contactTitle)}</h2>
        </div>
        <address class="contact__details">
          <div>
            <p class="contact__label">${esc(t.studioLabel)}</p>
            <p>${esc(site.street)}<br>${esc(site.postalCode)} ${esc(site.city)}</p>
          </div>
          <div>
            <p class="contact__label">${esc(t.hours)}</p>
            <p>${esc(t.hours1)}<br>${esc(t.hours2)}</p>
          </div>
          <div>
            <p class="contact__label">${esc(t.reach)}</p>
            <p><a href="mailto:${escAttr(site.email)}">${esc(site.email)}</a><br><a href="tel:${escAttr(site.phoneHref)}">${esc(site.phone)}</a></p>
          </div>
        </address>
        <a class="btn btn--invert contact__cta" href="mailto:${escAttr(site.email)}">${esc(t.book)}</a>
      </div>
      <a class="contact__map slot" href="${escAttr(mapsHref)}" target="_blank" rel="noopener" role="img" aria-label="${escAttr(t.slotMap)}"><span>${esc(t.slotMap)}</span></a>
    </div>
  </section>`;
}

function footer(t) {
  return `
  <footer class="footer">
    <div class="footer__inner">
      <span class="footer__brand"><span class="nav__mark nav__mark--sm" aria-hidden="true"></span><span>${esc(site.brand)}</span></span>
      <span>${esc(t.footerLine)}</span>
      <span>© ${site.foundingYear} ${esc(site.brand)}, ${esc(site.city)}</span>
    </div>
  </footer>`;
}

// --- full page -------------------------------------------------------------
export function page(t, p) {
  const canonical = urlFor(t.lang);
  const langSwitch = { en: t.lang === 'en' ? '#top' : '../', sl: t.lang === 'sl' ? '#top' : 'sl/' };
  const ogImage = fullBase + 'assets/img/og-image.svg';

  return `<!DOCTYPE html>
<html lang="${t.lang}" dir="${t.dir}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(t.seoTitle)}</title>
<meta name="description" content="${escAttr(t.seoDescription)}">
<link rel="canonical" href="${canonical}">
<link rel="alternate" hreflang="en" href="${urlFor('en')}">
<link rel="alternate" hreflang="sl" href="${urlFor('sl')}">
<link rel="alternate" hreflang="x-default" href="${urlFor('en')}">
<meta name="theme-color" content="#004225">
<meta name="robots" content="index, follow, max-image-preview:large">
<meta name="author" content="${escAttr(site.brand)}">
<meta name="geo.region" content="SI">
<meta name="geo.placename" content="${escAttr(site.city)}">

<meta property="og:type" content="website">
<meta property="og:site_name" content="${escAttr(site.brand)}">
<meta property="og:locale" content="${t.lang === 'sl' ? 'sl_SI' : 'en_GB'}">
<meta property="og:locale:alternate" content="${t.lang === 'sl' ? 'en_GB' : 'sl_SI'}">
<meta property="og:title" content="${escAttr(t.seoTitle)}">
<meta property="og:description" content="${escAttr(t.seoDescription)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${ogImage}">
<meta property="og:image:alt" content="${escAttr(t.ogImageAlt)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${escAttr(t.seoTitle)}">
<meta name="twitter:description" content="${escAttr(t.seoDescription)}">
<meta name="twitter:image" content="${ogImage}">

<link rel="icon" href="${p}assets/img/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="${p}assets/img/favicon.svg">
<link rel="manifest" href="${p}site.webmanifest">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,600;12..96,700&family=Geist:wght@300;400;500;600&display=swap">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,600;12..96,700&family=Geist:wght@300;400;500;600&display=swap">
<link rel="stylesheet" href="${p}assets/css/styles.css">
${jsonLd(t)}
</head>
<body>
<a class="skip" href="#main">${esc(t.skipToContent)}</a>
${nav(t, p, langSwitch)}
<main id="main">
${hero(t)}
${journeys(t, p)}
${loop(t)}
${team(t)}
${pricing(t)}
${testimonials(t)}
${faq(t)}
${contact(t)}
</main>
${footer(t)}
<script src="${p}assets/js/app.js" defer></script>
</body>
</html>
`;
}
