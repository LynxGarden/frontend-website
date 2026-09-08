// ---------------------------------------------------------------------------
// Lynx Studio — content source of truth (EN + SL)
// Edit copy / business data here, then run `node build.mjs` to regenerate HTML.
// All placeholder values that must be replaced before launch are tracked in
// docs/todo.md.
// ---------------------------------------------------------------------------

// Global, language-independent configuration ------------------------------
export const site = {
  // Canonical origin + base path. GitHub Pages project site is served under
  // /frontend-app/. If you move to a custom domain at the root, set baseUrl to
  // e.g. "https://lynxstudio.si" and basePath to "/". See docs/todo.md.
  baseUrl: 'https://lynxgarden.github.io',
  basePath: '/frontend-app/',

  brand: 'Lynx Studio',
  legalName: 'Lynx Studio',

  // --- NAP (Name, Address, Phone) — PLACEHOLDER, replace before launch ------
  street: 'Trg republike 3',
  postalCode: '1000',
  city: 'Ljubljana',
  region: 'Osrednjeslovenska',
  country: 'SI',
  countryName: 'Slovenia',
  // Approx. Ljubljana centre — replace with the studio's real coordinates.
  latitude: 46.0511,
  longitude: 14.5051,

  email: 'hello@lynxstudio.si',
  phone: '+386 1 234 5678',
  phoneHref: '+38612345678',

  priceRange: '€€',
  currency: 'EUR',
  foundingYear: '2026',

  // Social / citation profiles for sameAs — replace or remove as needed.
  social: [
    'https://www.instagram.com/lynxstudio',
    'https://www.facebook.com/lynxstudio',
  ],

  // Opening hours, machine-readable (24h). Keep in sync with the human copy.
  openingHours: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '06:30', closes: '22:00' },
    { days: ['Saturday', 'Sunday'], opens: '08:00', closes: '18:00' },
  ],
};

// The interactive story carousels. Icons map to src/icons.mjs keys.
const JOURNEY_ICONS = [
  ['flame', 'dumbbell', 'handshake', 'wind', 'arrow'],
  ['reformer', 'waves', 'springs', 'core', 'arrow'],
  ['clipboard', 'hands', 'target', 'calendar', 'arrow'],
];

// Which carousel step uses a real video (path relative to the site root asset
// prefix). null = fillable image placeholder. Only fitness/step-1 ships with a
// real clip today; see docs/todo.md to add the rest.
const JOURNEY_VIDEOS = [
  ['media/lynx-warmup.mp4', null, null, null, null],
  [null, null, null, null, null],
  [null, null, null, null, null],
];

export const journeyMeta = { icons: JOURNEY_ICONS, videos: JOURNEY_VIDEOS };

// ---------------------------------------------------------------------------
// English
// ---------------------------------------------------------------------------
export const en = {
  lang: 'en',
  dir: 'ltr',
  localeTag: 'en',

  seoTitle: 'Lynx Studio — Fitness, Pilates & Physiotherapy in Ljubljana',
  seoDescription:
    'Lynx Studio in Ljubljana combines a coached fitness floor, reformer pilates and physiotherapy under one roof, working from the same plan. Book a visit.',
  ogImageAlt: 'Lynx Studio — fitness, pilates and physiotherapy in Ljubljana',

  navHome: 'Home', navFitness: 'Fitness', navPilates: 'Pilates', navPhysio: 'Physiotherapy',
  navPricing: 'Pricing', navContacts: 'Contacts', book: 'Book a visit',
  skipToContent: 'Skip to content',

  heroBadge: 'One studio · Three practices',
  heroTitle: 'Train, stretch and recover under one roof.',
  heroBody:
    'Lynx is a fitness floor, a pilates studio and a physiotherapy room that talk to each other. Follow a week from the inside — five moments, three practices, one loop.',
  heroCta: 'Start with fitness',
  scroll: 'Scroll to enter',
  stepHint: 'Swipe sideways or tap a step',
  stepWord: 'Step',
  of: 'of',

  loopKicker: 'The loop', loopTitle: 'Three practices, one plan.',
  loopFitness: 'Strength and conditioning on a written programme. Coaches on the floor, not behind a desk.',
  loopPilates: 'Reformer and mat work that gives your training the range it needs. Six people per class, maximum.',
  loopPhysio: 'Assessment, hands-on treatment and a plan your coach can read. Same building, same notes.',

  teamKicker: 'Team', teamTitle: 'The people on the floor.',
  team: [
    { name: 'Maja Vidmar', role: 'Head coach · Strength' },
    { name: 'Eva Kralj', role: 'Reformer pilates' },
    { name: 'Tomaž Rus', role: 'Physiotherapist · MSc' },
    { name: 'Rok Petrič', role: 'Conditioning · Mobility' },
  ],

  priceKicker: 'Membership', priceTitle: 'Pick the loop you need.', perMonth: '/ month',
  plans: [
    {
      name: 'Floor', price: 49, badge: null,
      desc: 'Open gym and coached strength sessions.',
      features: ['Unlimited gym floor access', 'Written programme, updated monthly', 'Two coached sessions a week'],
      cta: 'Choose Floor', featured: false,
    },
    {
      name: 'Loop', price: 89, badge: 'Most taken',
      desc: 'Fitness and pilates, planned together.',
      features: ['Everything in Floor', 'Six reformer classes a month', 'Quarterly physio screening'],
      cta: 'Choose Loop', featured: true,
    },
    {
      name: 'Recovery', price: 129, badge: null,
      desc: 'Physiotherapy-led, for coming back from an injury.',
      features: ['Weekly physiotherapy session', 'Rehab programme on the gym floor', 'Private reformer, twice a month'],
      cta: 'Choose Recovery', featured: false,
    },
  ],

  testKicker: 'Members', testTitle: 'What people say after a month.',
  testimonials: [
    { quote: '“I came in for a bad shoulder and stayed for the training. Nobody made me start over.”', name: 'Neža M.', meta: 'Member, 2 years' },
    { quote: '“The physio and my coach share notes. I stopped having to explain myself twice.”', name: 'Andrej L.', meta: 'Member, 8 months' },
    { quote: '“Two reformer classes a week and my squat finally looks like a squat.”', name: 'Nina B.', meta: 'Member, 1 year' },
  ],

  faqKicker: 'Questions', faqTitle: 'Before you come in.',
  faq: [
    {
      q: 'Do I need a referral to book physiotherapy?',
      a: "No. You can book an assessment directly, and you don't have to be a member. If something turns up, we'll tell you what training around it looks like.",
    },
    {
      q: "I've never used a reformer. Is that a problem?",
      a: 'Every first class is an intro class. Six people per session means the instructor gets to you within the first minute.',
    },
    {
      q: 'Can I use only one of the three?',
      a: 'Yes. The Floor membership is gym only, and physiotherapy can be booked as a single session. Most people end up using two.',
    },
    {
      q: 'What should I bring on the first visit?',
      a: 'Indoor shoes, a towel and grip socks for pilates — we sell those at the desk if you forget.',
    },
  ],

  contactTitle: 'Come and look around.',
  hours: 'Hours', hours1: 'Mon–Fri 06:30–22:00', hours2: 'Sat–Sun 08:00–18:00',
  reach: 'Reach us', studioLabel: 'Studio',
  footerLine: 'Fitness. Pilates. Physiotherapy.',

  slotCoach: ['Portrait — head coach', 'Portrait — pilates instructor', 'Portrait — physiotherapist', 'Portrait — conditioning coach'],
  slotPhoto: 'Member photo', slotMap: 'Map or studio exterior',

  journeys: [
    {
      id: 'fitness', label: 'Fitness',
      steps: [
        { title: 'Warm up', body: 'Ten minutes on the bike, then a mobility flow. Nothing heroic — you are just telling your body what is about to happen.', hint: 'POV: warming up on the mat, 06:40' },
        { title: 'The main lift', body: "Squat, press, pull. Your coach wrote today's session last week, and the load goes up when your form says it can.", hint: 'POV: hands on the barbell, rack in front' },
        { title: 'A nod from the floor', body: 'Someone walks past, checks your setup, moves one foot two centimetres. You feel the difference on the next rep.', hint: 'POV: coach walking past, giving a nod' },
        { title: 'Wind down', body: 'Five minutes of breathing and easy stretching before you leave the room. This is where the session actually settles.', hint: 'POV: sitting on the floor, cooling down' },
        { title: 'Next door: pilates', body: 'Hips tight from the squats. The reformer studio is through the next door, and the instructor already knows what you lifted.', hint: 'POV: walking toward the pilates studio door' },
      ],
    },
    {
      id: 'pilates', label: 'Pilates',
      steps: [
        { title: 'Set up on the reformer', body: 'Feet on the bar, shoulders against the blocks. The instructor sets your spring tension before you do anything else.', hint: 'POV: lying on the reformer, looking up' },
        { title: 'Find the breath', body: 'Four counts in, six out. Everything after this depends on it, which is why nobody rushes this part.', hint: 'POV: ribcage rising, hands on stomach' },
        { title: 'Load the springs', body: 'Footwork, then long stretch. The carriage moves slowly on purpose — slow is where the control lives.', hint: 'POV: hands on the straps, carriage moving' },
        { title: 'Deliberate core work', body: 'Six people in the room, so the correction comes to you by name. Ten good repetitions beat thirty rushed ones.', hint: 'POV: instructor correcting your position' },
        { title: 'Once a week: physiotherapy', body: 'Something in the left hip is not tracking. The physio room is at the end of the corridor and Thursday is free.', hint: 'POV: walking down the corridor to physio' },
      ],
    },
    {
      id: 'physio', label: 'Physiotherapy',
      steps: [
        { title: 'The assessment', body: 'Twenty minutes of questions and movement tests. You describe the pain once, and it goes into notes your coach can read.', hint: 'POV: physio testing your shoulder range' },
        { title: 'Hands on', body: 'Soft tissue work and joint mobilisation on the table. Uncomfortable in places, but never a surprise.', hint: 'POV: on the treatment table, ceiling above' },
        { title: 'Corrective loading', body: 'The same movement that hurt, rebuilt with less load and better order. Three exercises, not fifteen.', hint: 'POV: doing corrective work with a band' },
        { title: 'Your week, written down', body: 'What to train, what to leave alone and when to come back. It lands in the same plan as your gym sessions.', hint: 'POV: reading the plan on the tablet' },
        { title: 'Back to the floor', body: 'Cleared for the squat rack with a lighter top set. The loop closes where it started, one week wiser.', hint: 'POV: walking back onto the gym floor' },
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// Slovenian
// ---------------------------------------------------------------------------
export const sl = {
  lang: 'sl',
  dir: 'ltr',
  localeTag: 'sl',

  seoTitle: 'Lynx Studio — Fitnes, pilates in fizioterapija v Ljubljani',
  seoDescription:
    'Lynx Studio v Ljubljani združuje vodeno fitnes dvorano, pilates na reformerju in fizioterapijo pod eno streho, po istem načrtu. Rezerviraj obisk.',
  ogImageAlt: 'Lynx Studio — fitnes, pilates in fizioterapija v Ljubljani',

  navHome: 'Domov', navFitness: 'Fitnes', navPilates: 'Pilates', navPhysio: 'Fizioterapija',
  navPricing: 'Cenik', navContacts: 'Kontakt', book: 'Rezerviraj obisk',
  skipToContent: 'Preskoči na vsebino',

  heroBadge: 'En studio · Tri prakse',
  heroTitle: 'Vadba, razteg in okrevanje pod eno streho.',
  heroBody:
    'Lynx je fitnes dvorana, pilates studio in fizioterapevtska ordinacija, ki med sabo sodelujejo. Spremljaj teden od znotraj — pet trenutkov, tri prakse, en krog.',
  heroCta: 'Začni s fitnesom',
  scroll: 'Podrsaj za vstop',
  stepHint: 'Podrsaj vstran ali izberi korak',
  stepWord: 'Korak',
  of: 'od',

  loopKicker: 'Krog', loopTitle: 'Tri prakse, en načrt.',
  loopFitness: 'Moč in kondicija po zapisanem programu. Trenerji so v dvorani, ne za mizo.',
  loopPilates: 'Delo na reformerju in blazini, ki tvoji vadbi da potreben obseg. Največ šest ljudi na uro.',
  loopPhysio: 'Ocena, ročna terapija in načrt, ki ga tvoj trener lahko prebere. Ista stavba, isti zapisi.',

  teamKicker: 'Ekipa', teamTitle: 'Ljudje v dvorani.',
  team: [
    { name: 'Maja Vidmar', role: 'Glavna trenerka · Moč' },
    { name: 'Eva Kralj', role: 'Pilates na reformerju' },
    { name: 'Tomaž Rus', role: 'Fizioterapevt · mag.' },
    { name: 'Rok Petrič', role: 'Kondicija · Gibljivost' },
  ],

  priceKicker: 'Članstvo', priceTitle: 'Izberi krog, ki ga potrebuješ.', perMonth: '/ mesec',
  plans: [
    {
      name: 'Dvorana', price: 49, badge: null,
      desc: 'Prost dostop do dvorane in vodeni treningi moči.',
      features: ['Neomejen dostop do dvorane', 'Zapisan program, obnovljen vsak mesec', 'Dva vodena treninga na teden'],
      cta: 'Izberi Dvorano', featured: false,
    },
    {
      name: 'Krog', price: 89, badge: 'Najbolj izbrano',
      desc: 'Fitnes in pilates, načrtovana skupaj.',
      features: ['Vse iz paketa Dvorana', 'Šest ur na reformerju mesečno', 'Fizioterapevtski pregled vsako četrtletje'],
      cta: 'Izberi Krog', featured: true,
    },
    {
      name: 'Okrevanje', price: 129, badge: null,
      desc: 'Vodeno s fizioterapijo, za vrnitev po poškodbi.',
      features: ['Fizioterapija vsak teden', 'Rehabilitacijski program v dvorani', 'Zasebna ura na reformerju, dvakrat mesečno'],
      cta: 'Izberi Okrevanje', featured: false,
    },
  ],

  testKicker: 'Člani', testTitle: 'Kaj pravijo po prvem mesecu.',
  testimonials: [
    { quote: '„Prišla sem zaradi bolečega ramena in ostala zaradi treningov. Nihče mi ni rekel, naj začnem od začetka.“', name: 'Neža M.', meta: 'Članica, 2 leti' },
    { quote: '„Fizioterapevt in trener si delita zapise. Ni mi več treba vsega razlagati dvakrat.“', name: 'Andrej L.', meta: 'Član, 8 mesecev' },
    { quote: '„Dve uri na reformerju na teden in moj počep končno izgleda kot počep.“', name: 'Nina B.', meta: 'Članica, 1 leto' },
  ],

  faqKicker: 'Vprašanja', faqTitle: 'Preden prideš.',
  faq: [
    {
      q: 'Ali za fizioterapijo potrebujem napotnico?',
      a: 'Ne. Oceno stanja lahko rezerviraš neposredno in ni treba biti član. Če se kaj pokaže, ti povemo, kako izgleda vadba ob tem.',
    },
    {
      q: 'Reformerja še nisem uporabljal. Je to težava?',
      a: 'Vsaka prva ura je uvodna ura. Šest ljudi na uro pomeni, da je inštruktorica pri tebi v prvi minuti.',
    },
    {
      q: 'Ali lahko uporabljam samo eno od treh?',
      a: 'Da. Članstvo Dvorana je samo za dvorano, fizioterapijo pa lahko rezerviraš kot posamezen termin. Večina ljudi na koncu uporablja dve.',
    },
    {
      q: 'Kaj naj prinesem na prvi obisk?',
      a: 'Notranje copate, brisačo in nogavice z oprijemom za pilates — če jih pozabiš, jih dobiš na recepciji.',
    },
  ],

  contactTitle: 'Pridi pogledat.',
  hours: 'Odprto', hours1: 'Pon–Pet 06:30–22:00', hours2: 'Sob–Ned 08:00–18:00',
  reach: 'Kontakt', studioLabel: 'Studio',
  footerLine: 'Fitnes. Pilates. Fizioterapija.',

  slotCoach: ['Portret — glavna trenerka', 'Portret — inštruktorica pilatesa', 'Portret — fizioterapevt', 'Portret — kondicijski trener'],
  slotPhoto: 'Fotografija člana', slotMap: 'Zemljevid ali zunanjost studia',

  journeys: [
    {
      id: 'fitness', label: 'Fitnes',
      steps: [
        { title: 'Ogrevanje', body: 'Deset minut na kolesu, nato gibljivost. Nič junaškega — telesu samo poveš, kaj sledi.', hint: 'POV: ogrevanje na blazini, 06:40' },
        { title: 'Glavni dvig', body: 'Počep, potisk, poteg. Trener je današnji trening napisal prejšnji teden, teža pa naraste, ko to dopusti tehnika.', hint: 'POV: roke na drogu, stojalo pred tabo' },
        { title: 'Prikimavanje s parketa', body: 'Nekdo se ustavi, pogleda postavitev in premakne stopalo za dva centimetra. Razliko začutiš pri naslednji ponovitvi.', hint: 'POV: trener gre mimo in prikima' },
        { title: 'Umirjanje', body: 'Pet minut dihanja in lahkega raztezanja, preden zapustiš dvorano. Tu se trening zares usede.', hint: 'POV: sedenje na tleh, ohlajanje' },
        { title: 'Naslednja vrata: pilates', body: 'Kolki so po počepih tesni. Pilates studio je za naslednjimi vrati, inštruktorica pa že ve, kaj si dvigoval.', hint: 'POV: hoja proti vratom pilates studia' },
      ],
    },
    {
      id: 'pilates', label: 'Pilates',
      steps: [
        { title: 'Namestitev na reformerju', body: 'Stopala na drog, rame ob blazine. Inštruktorica nastavi vzmeti, preden narediš karkoli drugega.', hint: 'POV: ležanje na reformerju, pogled navzgor' },
        { title: 'Poišči dih', body: 'Štiri štetja vdih, šest izdih. Vse nadaljnje je odvisno od tega, zato nihče ne hiti.', hint: 'POV: prsni koš se dviga, roke na trebuhu' },
        { title: 'Obremeni vzmeti', body: 'Najprej stopala, nato dolgi razteg. Voziček se premika počasi z namenom — v počasnem je nadzor.', hint: 'POV: roke na jermenih, voziček se premika' },
        { title: 'Premišljeno delo s trupom', body: 'V prostoru je šest ljudi, zato popravek dobiš po imenu. Deset dobrih ponovitev prekosi trideset naglih.', hint: 'POV: inštruktorica popravi tvoj položaj' },
        { title: 'Enkrat na teden: fizioterapija', body: 'V levem kolku nekaj ne teče prav. Ordinacija je na koncu hodnika, četrtek pa je prost.', hint: 'POV: hoja po hodniku do fizioterapije' },
      ],
    },
    {
      id: 'physio', label: 'Fizioterapija',
      steps: [
        { title: 'Ocena stanja', body: 'Dvajset minut vprašanj in gibalnih testov. Bolečino opišeš enkrat, zapis pa lahko prebere tudi tvoj trener.', hint: 'POV: fizioterapevt testira gibljivost rame' },
        { title: 'Ročno delo', body: 'Delo z mehkimi tkivi in mobilizacija sklepov na mizi. Mestoma neprijetno, nikoli pa presenečenje.', hint: 'POV: na terapevtski mizi, strop nad tabo' },
        { title: 'Korektivna obremenitev', body: 'Isti gib, ki je bolel, sestavljen znova z manjšo obremenitvijo in boljšim vrstnim redom. Tri vaje, ne petnajst.', hint: 'POV: korektivne vaje z elastiko' },
        { title: 'Tvoj teden, zapisan', body: 'Kaj trenirati, česa ne in kdaj se vrniti. Vse pride v isti načrt kot tvoji treningi.', hint: 'POV: branje načrta na tablici' },
        { title: 'Nazaj v dvorano', body: 'Dovoljenje za počep z lažjo končno serijo. Krog se sklene tam, kjer se je začel, teden pametnejši.', hint: 'POV: vrnitev v dvorano' },
      ],
    },
  ],
};

export const languages = { en, sl };
