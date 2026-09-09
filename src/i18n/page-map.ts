/**
 * ─────────────────────────────────────────────────────────────────────────────
 * PL <-> EN PAGE MAP
 * ─────────────────────────────────────────────────────────────────────────────
 * Maps every Polish page that has a published English counterpart, so
 * BaseLayout can emit correct hreflang alternate links automatically
 * (no per-page props needed). English URLs use English-language slugs
 * (better for ranking in English search), not a literal /en/ + Polish slug.
 *
 * Keep both directions here in sync as new EN pages are published.
 * A Polish page NOT listed here simply gets no hreflang alternate.
 * As of now, all 44 blog posts are translated and mapped below.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const plToEn: Record<string, string> = {
  '/': '/en',
  '/about': '/en/about',
  '/services': '/en/services',
  '/contact': '/en/contact',
  '/wykrojniki': '/en/size-guide',
  '/torby-reklamowe': '/en/promotional-paper-bags',
  '/torby-reklamowe-z-logo': '/en/custom-logo-paper-bags',
  '/torby-reklamowe-premium': '/en/premium-paper-bags',
  '/torby-eko': '/en/eco-friendly-paper-bags',
  '/torby-ozdobne': '/en/decorative-paper-bags',
  '/torby-na-alkohol': '/en/wine-gift-bags',
  '/torby-jednokolorowe': '/en/solid-color-paper-bags',
  '/torebki-na-prezenty': '/en/gift-bags',
  '/produkty-z-tektury-falistej': '/en/corrugated-cardboard-products',
  '/pudelka-prezentowe': '/en/gift-boxes',
  '/kosze-prezentowe': '/en/gift-baskets',
  '/kolekcja-lux': '/en/lux-collection',
  '/kolekcje-swiateczne': '/en/holiday-collections',
  '/nasze-realizacje': '/en/our-work',
  '/privacy': '/en/privacy',
  '/terms': '/en/terms',
  '/blog': '/en/blog',

  // --- Blog posts (all 44 translated to English) ---
  '/blog/jak-dobrac-rozmiar-torby': '/en/blog/how-to-choose-bag-size',
  '/blog/rodzaje-uchwytow-do-toreb': '/en/blog/paper-bag-handle-types',
  '/blog/4-korzysci-wynikajace-ze-stosowania-toreb-papierowych': '/en/blog/4-benefits-of-paper-bags',
  '/blog/dlaczego-warto-posiadac-torby-reklamowe': '/en/blog/why-you-need-promotional-paper-bags',
  '/blog/metody-nadrukow-stosowane-na-torbach': '/en/blog/paper-bag-printing-methods',
  '/blog/wybor-kolorow-papierowych-toreb': '/en/blog/choosing-paper-bag-colors',
  '/blog/produkcja-toreb-ekologicznych-krok-po-kroku': '/en/blog/eco-paper-bag-production-process',
  '/blog/torby-reklamowe-premium-charakterystyka': '/en/blog/premium-paper-bags-characteristics',
  '/blog/jak-najlepiej-zapakowac-alkohol': '/en/blog/how-to-wrap-wine-and-spirits',
  '/blog/jak-kreatywnie-zapakowac-prezent': '/en/blog/creative-gift-wrapping-ideas',
  '/blog/cechy-rozpoznawcze-toreb-ekologicznych': '/en/blog/eco-bag-characteristics',
  '/blog/co-podarowac-parze-mlodej-z-okazji-slubu': '/en/blog/wedding-gift-ideas',
  '/blog/co-wplywa-na-estetyke-toreb-papierowych': '/en/blog/what-shapes-paper-bag-aesthetics',
  '/blog/czy-ekologiczne-torby-papierowe-sa-wytrzymale': '/en/blog/are-eco-paper-bags-durable',
  '/blog/czym-sie-charakteryzuja-pudelka-ekologiczne': '/en/blog/what-makes-eco-boxes-eco-friendly',
  '/blog/czym-sie-wyrozniaja-eleganckie-torby-papierowe': '/en/blog/what-sets-elegant-paper-bags-apart',
  '/blog/dlaczego-ekotorby-sa-korzystne-dla-srodowiska': '/en/blog/why-eco-bags-are-good-for-the-environment',
  '/blog/dlaczego-torby-sa-doskonalym-nosnikiem-reklamowym': '/en/blog/why-bags-are-a-great-advertising-medium',
  '/blog/dlaczego-warto-wybrac-torby-recznie-zdobione': '/en/blog/why-choose-hand-decorated-bags',
  '/blog/gdzie-sprawdzaja-sie-torby-reklamowe': '/en/blog/which-businesses-benefit-from-promotional-bags',
  '/blog/jak-dobrac-kolor-i-wzor-torby-do-okazji': '/en/blog/choosing-bag-color-and-pattern-for-the-occasion',
  '/blog/jak-dopasowac-torbe-okolicznosciowa-do-prezentu': '/en/blog/matching-a-gift-bag-to-the-present',
  '/blog/jak-sie-wyroznic-przygotowujac-prezenty-dla-pracownikow': '/en/blog/how-to-stand-out-with-employee-gifts',
  '/blog/jak-torby-i-inne-gadzety-reklamowe-poprawiaja-wizerunek-firmy': '/en/blog/how-promotional-bags-improve-company-image',
  '/blog/jakie-sa-rozmiary-toreb-na-prezent': '/en/blog/gift-bag-sizes-guide',
  '/blog/kiedy-warto-wybrac-torby-laminowane': '/en/blog/when-to-choose-laminated-bags',
  '/blog/ladne-opakowanie-to-w-marketingu-podstawa': '/en/blog/good-packaging-is-a-marketing-fundamental',
  '/blog/moda-na-torby-ekologiczne-skad-sie-wziela': '/en/blog/where-did-the-eco-bag-trend-come-from',
  '/blog/papier-czy-torba-jak-najlepiej-zapakowac-prezent': '/en/blog/paper-or-a-bag-best-way-to-wrap-a-gift',
  '/blog/przygotowanie-nadruku-na-torbe-etapy-postepowania': '/en/blog/printing-on-a-bag-step-by-step',
  '/blog/sposoby-uszlachetniania-toreb-ekologicznych': '/en/blog/eco-bag-finishing-methods',
  '/blog/tektura-falista-tez-jest-eko': '/en/blog/corrugated-cardboard-is-eco-too',
  '/blog/torby-idealne-na-prezent': '/en/blog/perfect-bags-for-gift-giving',
  '/blog/torby-jako-nosnik-reklamy': '/en/blog/bags-as-an-advertising-medium',
  '/blog/torby-jedno-czy-wielokolorowe': '/en/blog/single-color-vs-multicolor-bags',
  '/blog/torby-papierowe-jednokolorowe-gdzie-i-kiedy-sie-sprawdzaja': '/en/blog/when-do-single-color-paper-bags-work-best',
  '/blog/torby-papierowe-z-logo-jako-propozycja-dla-firm': '/en/blog/custom-logo-paper-bags-for-businesses',
  '/blog/torby-reklamowe-jako-element-kampanii-promocyjnej': '/en/blog/promotional-bags-as-part-of-a-campaign',
  '/blog/torby-reklamowe-klucz-do-promocji-marki': '/en/blog/promotional-bags-the-key-to-brand-promotion',
  '/blog/torby-reklamowe-na-zamowienie-kiedy-warto-sie-nimi-zainteresowac': '/en/blog/custom-promotional-bags-when-worth-it',
  '/blog/w-jaki-sposob-mozna-zdobic-torby-papierowe': '/en/blog/how-can-paper-bags-be-decorated',
  '/blog/wykorzystanie-toreb-z-logo-do-dzialan-marketingowych': '/en/blog/using-logo-bags-in-marketing',
  '/blog/zalety-uzywania-toreb-papierowych': '/en/blog/advantages-of-using-paper-bags',
  '/blog/zastosowanie-papierow-dekoracyjnych-w-produkcji-toreb': '/en/blog/decorative-papers-in-bag-production',
};

export const enToPl: Record<string, string> = Object.fromEntries(
  Object.entries(plToEn).map(([pl, en]) => [en, pl]),
);
