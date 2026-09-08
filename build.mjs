// Build script — regenerates all static HTML + SEO files from src/.
// Usage: node build.mjs
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { site, en, sl } from './src/content.mjs';
import { page } from './src/template.mjs';

const root = dirname(fileURLToPath(import.meta.url));
const write = (rel, content) => {
  const abs = join(root, rel);
  mkdirSync(dirname(abs), { recursive: true });
  writeFileSync(abs, content);
  console.log('  ✓', rel);
};

const fullBase = site.baseUrl + site.basePath;
const urlFor = (lang) => (lang === 'en' ? fullBase : fullBase + lang + '/');

console.log('Building Lynx Studio site…');

// --- HTML pages ------------------------------------------------------------
// EN lives at the root, SL under /sl/. `p` is the relative asset prefix.
write('index.html', page(en, ''));
write('sl/index.html', page(sl, '../'));

// --- 404 (GitHub Pages serves /404.html on unknown paths) ------------------
const notFound = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>404 — ${site.brand}</title>
<meta name="robots" content="noindex">
<link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml">
<style>
  body{margin:0;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:20px;background:#F5F1E8;color:#004225;font-family:system-ui,sans-serif;text-align:center;padding:24px}
  h1{font-size:64px;margin:0}
  a{color:#004225}
</style>
</head>
<body>
  <h1>404</h1>
  <p>This page moved or never existed.</p>
  <p><a href="/">← Back to Lynx Studio</a></p>
</body>
</html>
`;
write('404.html', notFound);

// --- sitemap.xml -----------------------------------------------------------
const pages = [
  { lang: 'en', url: urlFor('en') },
  { lang: 'sl', url: urlFor('sl') },
];
const alternates = (self) =>
  pages
    .map((pg) => `    <xhtml:link rel="alternate" hreflang="${pg.lang}" href="${pg.url}"/>`)
    .concat(`    <xhtml:link rel="alternate" hreflang="x-default" href="${urlFor('en')}"/>`)
    .join('\n');
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${pages
  .map(
    (pg) => `  <url>
    <loc>${pg.url}</loc>
${alternates(pg)}
    <changefreq>monthly</changefreq>
    <priority>${pg.lang === 'en' ? '1.0' : '0.9'}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;
write('sitemap.xml', sitemap);

// --- robots.txt ------------------------------------------------------------
write(
  'robots.txt',
  `User-agent: *
Allow: /

Sitemap: ${fullBase}sitemap.xml
`
);

// --- web app manifest ------------------------------------------------------
write(
  'site.webmanifest',
  JSON.stringify(
    {
      name: site.brand,
      short_name: 'Lynx',
      description: en.seoDescription,
      start_url: site.basePath,
      scope: site.basePath,
      display: 'standalone',
      background_color: '#F5F1E8',
      theme_color: '#004225',
      lang: 'en',
      icons: [
        { src: 'assets/img/favicon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
      ],
    },
    null,
    2
  )
);

// --- generated SVG assets --------------------------------------------------
// Brand favicon: rounded square with a stylised lynx "L".
write(
  'assets/img/favicon.svg',
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="16" fill="#004225"/>
  <path d="M22 16v24h20" fill="none" stroke="#F5F1E8" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`
);

// Open Graph image (SVG). NOTE: most social scrapers require a raster
// 1200×630 PNG/JPG — export one and replace this reference (see docs/todo.md).
write(
  'assets/img/og-image.svg',
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#004225"/>
  <rect x="64" y="64" width="72" height="72" rx="18" fill="#F5F1E8"/>
  <text x="160" y="120" font-family="Georgia, serif" font-size="52" font-weight="700" fill="#F5F1E8">Lynx Studio</text>
  <text x="64" y="360" font-family="Georgia, serif" font-size="86" font-weight="700" fill="#F5F1E8">Train, stretch and</text>
  <text x="64" y="456" font-family="Georgia, serif" font-size="86" font-weight="700" fill="#F5F1E8">recover under one roof.</text>
  <text x="64" y="556" font-family="system-ui, sans-serif" font-size="34" fill="rgba(245,241,232,0.8)">Fitness · Pilates · Physiotherapy — Ljubljana</text>
</svg>
`
);

// Neutral video poster / placeholder frame.
write(
  'assets/img/poster.svg',
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1920">
  <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#12352a"/><stop offset="1" stop-color="#0B2019"/>
  </linearGradient></defs>
  <rect width="1080" height="1920" fill="url(#g)"/>
</svg>
`
);

console.log('Done.');
