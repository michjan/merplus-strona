// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import robotsTxt from 'astro-robots-txt';

export default defineConfig({
  site: 'https://www.merplus.pl',
  output: 'static',

  integrations: [
    sitemap({
      filter: (page) => new URL(page).pathname.replace(/\/$/, '') !== '/contact/success',
    }),
    robotsTxt({
      policy: [
        {
          userAgent: '*',
          allow: '/',
        },
        // --- Boty AI: jawna zgoda na indeksowanie pod widocznosc w LLM-ach ---
        { userAgent: 'GPTBot', allow: '/' },
        { userAgent: 'ChatGPT-User', allow: '/' },
        { userAgent: 'OAI-SearchBot', allow: '/' },
        { userAgent: 'PerplexityBot', allow: '/' },
        { userAgent: 'Perplexity-User', allow: '/' },
        { userAgent: 'ClaudeBot', allow: '/' },
        { userAgent: 'Claude-Web', allow: '/' },
        { userAgent: 'anthropic-ai', allow: '/' },
        { userAgent: 'Google-Extended', allow: '/' },
        { userAgent: 'Applebot-Extended', allow: '/' },
        { userAgent: 'CCBot', allow: '/' },
        { userAgent: 'Bytespider', allow: '/' },
      ],
    }),
  ],

  redirects: {
    // --- Strony ogólne ---
    '/o-nas/': '/about',
    '/strona-glowna/': '/',
    '/projekt-eu/': '/',
    '/kontakt/': '/contact',
    '/kontakt-do-toreb/': '/contact',
    '/do-pobrania/': '/contact',
    '/polityka-prywatnosci/': '/privacy',
    '/oferta/': '/services',
    '/produkcja-toreb-reklamowych/': '/torby-reklamowe',
    '/produkcja-toreb-reklamowych/wykrojniki-toreb-mer-plus/': '/wykrojniki',
    '/produkcja-toreb-reklamowych/przygotowanie-plikow-produkcyjnych/': '/contact',
    '/produkcja-toreb-reklamowych/informacje-potrzebne-do-wyceny/': '/contact',
    '/produkcja-toreb-reklamowych/torby-reklamowe-produkcja/': '/torby-reklamowe',

    // --- Wersja angielska (brak EN na nowej stronie) ---
    '/en/': '/',
    '/en/offer/': '/services',
    '/en/contact/': '/contact',
    '/en/offer/premium-advertising-bags/': '/torby-reklamowe',
    '/en/offer/promotional-bags/': '/torby-reklamowe',
    '/en/offer/printed-advertising-bags/': '/torby-reklamowe',
    '/en/offer/corrugated-advertising-bags/': '/torby-reklamowe',
    '/en/offer/laminated-paper-bags/': '/torby-reklamowe',
    '/en/offer/promotional-bags-with-a-logo/': '/torby-reklamowe-z-logo',
    '/en/offer/company-paper-bags/': '/torby-reklamowe-z-logo',
    '/en/offer/decorative-bags/': '/torby-ozdobne',
    '/en/offer/ecological-advertising-bags/': '/torby-eko',
    '/en/offer/production-of-advertising-bags/': '/torby-reklamowe',
    '/en/offer/production-of-advertising-bags/information-needed-for-the-valuation/': '/contact',
    '/en/offer/production-of-advertising-bags/preparing-production-files/': '/contact',
    '/en/offer/production-of-advertising-bags/custom-die-cutting/': '/wykrojniki',

    // --- Torby reklamowe (oferta) ---
    '/oferta/torby-reklamowe/': '/torby-reklamowe',
    '/oferta/torby-reklamowe-z-nadrukiem/': '/torby-reklamowe-z-logo',
    '/oferta/torby-reklamowe-z-logo/': '/torby-reklamowe-z-logo',
    '/oferta/torby-laminowane/': '/torby-reklamowe',
    '/oferta/torby-firmowe/': '/torby-reklamowe-z-logo',
    '/oferta/torby-papierowe-z-logo/': '/torby-reklamowe-z-logo',
    '/oferta/torby-reklamowe-premium/': '/torby-reklamowe-premium',
    '/oferta/torby-reklamowe-eko-kraft/': '/torby-eko',
    '/oferta/torby-reklamowe-na-targi/': '/torby-reklamowe',
    '/oferta/torby-reklamowe/torby-papierowe-z-nadrukiem/': '/torby-eko',
    '/oferta/torby-papierowe-jednokolorowe/': '/torby-jednokolorowe',
    '/oferta/personalizowane-torby-papierowe/': '/torby-reklamowe-z-logo',
    '/torby-reklamowe-z-faktury-falistej/': '/produkty-z-tektury-falistej',
    '/laminowane-biale-torby-papierowe/': '/torby-reklamowe',
    '/zalety-uzywania-toreb-papierowych/': '/blog/zalety-uzywania-toreb-papierowych',

    // --- Torby ozdobne / prezentowe / eko / alkohol ---
    '/oferta/pudelka-na-prezenty/': '/pudelka-prezentowe',
    '/oferta/kolekcje-swiateczne/': '/kolekcje-swiateczne',
    '/oferta/torby-prezentowe-z-wlasnym-nadrukiem/': '/torby-reklamowe-z-logo',
    '/oferta/torby-na-alkohol/': '/torby-na-alkohol',
    '/oferta/torby-reklamowe-z-papierow-ozdobnych/': '/torby-ozdobne',
    '/oferta/torebki-kolorowe/': '/torby-jednokolorowe',
    '/torby-papierowe/': '/torebki-na-prezenty',
    '/torby-papierowe-recznie-zdobione/': '/torebki-na-prezenty',
    '/torby-papierowe-recznie-zdobione-2/': '/torby-eko',
    '/torby-papierowe-kolekcja-lux/': '/kolekcja-lux',
    '/torby-elegance-lux/': '/kolekcja-lux',
    '/torby-retro-lux/': '/kolekcja-lux',
    '/torby-papierowe-eco-recznie-zdobione/': '/torby-eko',
    '/ekologiczne-torby-papierowe-eco-kraft/': '/torby-eko',
    '/torby-ekologiczne-170-gr/': '/torby-eko',

    // --- Maseczki/przyłbice (wycofany produkt) ---
    '/maseczki-i-przylbice-ochronne/': '/',
    '/maseczki-ochronne/': '/',
    '/przylbice-ochronne/': '/',

    // --- Blog: wszystkie 43 zmigrowane wpisy -> bezpośrednio na nowy adres wpisu ---
    '/torby-reklamowe-klucz-do-promocji-marki/': '/blog/torby-reklamowe-klucz-do-promocji-marki',
    '/wybor-kolorow-papierowych-toreb-klucz-do-sukcesu/': '/blog/wybor-kolorow-papierowych-toreb',
    '/w-jakich-rodzajach-dzialalnosci-sprawdzaja-sie-torby-reklamowe/': '/blog/gdzie-sprawdzaja-sie-torby-reklamowe',

    '/aktualnosci/': '/blog',
    '/witamy-na-blogu-firmy-mer-plus/': '/blog',
    '/moda-na-torby-ekologiczne-skad-sie-wziela/': '/blog/moda-na-torby-ekologiczne-skad-sie-wziela',
    '/ladne-opakowanie-to-w-marketingu-podstawa/': '/blog/ladne-opakowanie-to-w-marketingu-podstawa',
    '/papier-czy-torba-jak-najlepiej-zapakowac-prezent/': '/blog/papier-czy-torba-jak-najlepiej-zapakowac-prezent',
    '/torby-idealne-na-prezent/': '/blog/torby-idealne-na-prezent',
    '/torby-papierowe-z-logo-jako-propozycja-dla-firm/': '/blog/torby-papierowe-z-logo-jako-propozycja-dla-firm',
    '/torby-jako-nosnik-reklamy/': '/blog/torby-jako-nosnik-reklamy',
    '/torby-reklamowe-premium-charakterystyka/': '/blog/torby-reklamowe-premium-charakterystyka',
    '/zastosowanie-papierow-dekoracyjnych-w-produkcji-toreb/': '/blog/zastosowanie-papierow-dekoracyjnych-w-produkcji-toreb',
    '/jak-sie-wyroznic-przygotowujac-prezenty-dla-pracownikow/': '/blog/jak-sie-wyroznic-przygotowujac-prezenty-dla-pracownikow',
    '/jak-dobrac-rozmiar-torby/': '/blog/jak-dobrac-rozmiar-torby',
    '/przygotowanie-nadruku-na-torbe-etapy-postepowania/': '/blog/przygotowanie-nadruku-na-torbe-etapy-postepowania',
    '/dlaczego-ekotorby-sa-korzystne-dla-srodowiska/': '/blog/dlaczego-ekotorby-sa-korzystne-dla-srodowiska',
    '/jak-najlepiej-zapakowac-alkohol/': '/blog/jak-najlepiej-zapakowac-alkohol',
    '/wykorzystanie-toreb-z-logo-do-dzialan-marketingowych/': '/blog/wykorzystanie-toreb-z-logo-do-dzialan-marketingowych',
    '/torby-jedno-czy-wielokolorowe/': '/blog/torby-jedno-czy-wielokolorowe',
    '/torby-reklamowe-na-zamowienie-kiedy-warto-sie-nimi-zainteresowac/': '/blog/torby-reklamowe-na-zamowienie-kiedy-warto-sie-nimi-zainteresowac',
    '/w-jaki-sposob-mozna-zdobic-torby-papierowe/': '/blog/w-jaki-sposob-mozna-zdobic-torby-papierowe',
    '/jakie-sa-rozmiary-toreb-na-prezent/': '/blog/jakie-sa-rozmiary-toreb-na-prezent',
    '/jak-dobrac-kolor-i-wzor-torby-do-okazji/': '/blog/jak-dobrac-kolor-i-wzor-torby-do-okazji',
    '/dlaczego-warto-posiadac-torby-reklamowe/': '/blog/dlaczego-warto-posiadac-torby-reklamowe',
    '/4-korzysci-wynikajace-ze-stosowania-toreb-papierowych/': '/blog/4-korzysci-wynikajace-ze-stosowania-toreb-papierowych',
    '/dlaczego-warto-wybrac-torby-recznie-zdobione/': '/blog/dlaczego-warto-wybrac-torby-recznie-zdobione',
    '/kiedy-warto-wybrac-torby-laminowane/': '/blog/kiedy-warto-wybrac-torby-laminowane',
    '/co-podarowac-parze-mlodej-z-okazji-slubu/': '/blog/co-podarowac-parze-mlodej-z-okazji-slubu',
    '/jak-torby-i-inne-gadzety-reklamowe-poprawiaja-wizerunek-firmy/': '/blog/jak-torby-i-inne-gadzety-reklamowe-poprawiaja-wizerunek-firmy',
    '/torby-reklamowe-jako-element-kampanii-promocyjnej/': '/blog/torby-reklamowe-jako-element-kampanii-promocyjnej',
    '/czym-sie-wyrozniaja-eleganckie-torby-papierowe/': '/blog/czym-sie-wyrozniaja-eleganckie-torby-papierowe',
    '/jak-dopasowac-torbe-okolicznosciowa-do-prezentu/': '/blog/jak-dopasowac-torbe-okolicznosciowa-do-prezentu',
    '/dlaczego-torby-sa-doskonalym-nosnikiem-reklamowym/': '/blog/dlaczego-torby-sa-doskonalym-nosnikiem-reklamowym',
    '/torby-papierowe-jednokolorowe-gdzie-i-kiedy-sie-sprawdzaja/': '/blog/torby-papierowe-jednokolorowe-gdzie-i-kiedy-sie-sprawdzaja',
    '/jak-kreatywnie-zapakowac-prezent/': '/blog/jak-kreatywnie-zapakowac-prezent',
    '/czym-sie-charakteryzuja-pudelka-ekologiczne/': '/blog/czym-sie-charakteryzuja-pudelka-ekologiczne',
    '/rodzaje-uchwytow-do-toreb/': '/blog/rodzaje-uchwytow-do-toreb',
    '/sposoby-uszlachetniania-toreb-ekologicznych/': '/blog/sposoby-uszlachetniania-toreb-ekologicznych',
    '/cechy-rozpoznawcze-toreb-ekologicznych/': '/blog/cechy-rozpoznawcze-toreb-ekologicznych',
    '/produkcja-toreb-ekologicznych-krok-po-kroku/': '/blog/produkcja-toreb-ekologicznych-krok-po-kroku',
    '/metody-nadrukow-stosowane-na-torbach/': '/blog/metody-nadrukow-stosowane-na-torbach',
    '/co-wplywa-na-estetyke-toreb-papierowych/': '/blog/co-wplywa-na-estetyke-toreb-papierowych',
    '/czy-ekologiczne-torby-papierowe-sa-wytrzymale/': '/blog/czy-ekologiczne-torby-papierowe-sa-wytrzymale',
    '/tektura-falista-tez-jest-eko/': '/blog/tektura-falista-tez-jest-eko',

    // --- Legacy: stara struktura /pl/ (prefiks jezykowy z wtyczki Redirection) ---
    '/pl/': '/',
    '/pl/oferta/': '/services',
    '/pl/oferta/torby-reklamowe-z-logo/': '/torby-reklamowe-z-logo',
    '/pl/oferta/torby-papierowe-z-nadrukiem/': '/torby-reklamowe-z-logo',
    '/pl/oferta/torby-papierowe-z-logo/': '/torby-reklamowe-z-logo',
    '/pl/oferta/torby-papierowe-jednokolorowe/': '/torby-jednokolorowe',
    '/pl/oferta/torby-reklamowe-z-nadrukiem/': '/torby-reklamowe-z-logo',
    '/pl/oferta/torby-z-papierow-dekoracyjnych-ozdobnych-fakturowanych/': '/torby-ozdobne',
    '/pl/oferta/torby-papierowe-reklamowe-eko-kraft-ekologiczne/': '/torby-eko',
    '/pl/oferta/torby-laminowane-premium/': '/torby-reklamowe-premium',
    '/pl/oferta/torby-papierowe/': '/torebki-na-prezenty',
    '/pl/torby-reklamowe-produkcja/': '/torby-reklamowe',
    '/pl/torby-reklamowe-produkcja/informacje-potrzebne-do-wyceny/': '/contact',
    '/pl/torby-reklamowe-produkcja/przygotowanie-plikow-produkcyjnych-torby-reklamowe/': '/contact',
    '/pl/torby-reklamowe-produkcja/dostepne-rozmiary-toreb-mer-plus/': '/wykrojniki',
    '/pl/kontakt/': '/contact',
    '/pl/projekt-ue/': '/',
    '/pl/category/blog/': '/blog',
    '/pl/blog/metody-nadrukow-stosowane-na-torbach/': '/blog/metody-nadrukow-stosowane-na-torbach',
    '/pl/blog/tektura-falista-tez-jest-eko/': '/produkty-z-tektury-falistej',

    // --- Legacy: domena torbypapierowe.warszawa.pl (koncowka lancucha przekierowan) ---
    '/producent-toreb-papierowych/': '/torby-ozdobne',

    // --- Legacy: pojedyncze stare adresy (wczesniejsza struktura WP) ---
    '/torby-firmowe/': '/torby-reklamowe-z-logo',
    '/pudelka-na-prezenty/': '/pudelka-prezentowe',
    '/nasze-realizacje-2/': '/nasze-realizacje',
    '/nasze-realizacje-torby-ozdobne/': '/nasze-realizacje',
    '/oferta/torby-papierowe-kolekcja-lux/': '/kolekcja-lux',
    '/oferta/torby-reklamowe-z-faktury-falistej/': '/produkty-z-tektury-falistej',
    '/en/promotional-bags/': '/torby-reklamowe',
    '/en/offer/production-of-advertising-bags/wykrojniki-toreb-mer-plus/': '/wykrojniki',
    '/produkcja-toreb-reklamowych/custom-die-cutting/': '/wykrojniki',

    // --- Legacy: placeholdery motywu WP (niska wartosc, dodane dla kompletnosci) ---
    '/proin-ultricies-id-metus-eget-mollis/': '/blog/przygotowanie-nadruku-na-torbe-etapy-postepowania',
    '/vivamus-ac-lectus-luctus-fringilla-turpis-sit-amet-laoreet-ipsum/': '/blog/torby-papierowe-jednokolorowe-gdzie-i-kiedy-sie-sprawdzaja',
    '/lorem-ipsum-dolor-sit-amet-consectetur-adipiscing-elit/': '/blog/jak-dobrac-rozmiar-torby',
  },

  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Oswald',
      cssVariable: '--font-display',
      weights: ['400', '600', '700'],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext'],
    },
    {
      provider: fontProviders.google(),
      name: 'Inter',
      cssVariable: '--font-body',
      weights: ['400', '500', '700'],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext'],
    },
  ],

  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },

  vite: {
    plugins: [tailwindcss()],
    build: {
      cssMinify: 'lightningcss',
    },
    server: {
      allowedHosts: true,
    },
  },
});
