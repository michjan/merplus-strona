// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import robotsTxt from 'astro-robots-txt';

export default defineConfig({
  site: 'https://www.merplus.pl',
  output: 'static',

  integrations: [sitemap(), robotsTxt()],

  redirects: {
    // --- Strony ogólne ---
    '/o-nas/': '/about',
    '/strona-glowna/': '/',
    '/projekt-eu/': '/',
    '/nasze-realizacje/': '/',
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
    '/torby-ozdobne/': '/torby-ozdobne',

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
    '/oferta/torby-reklamowe-z-nadrukiem/': '/torby-reklamowe',
    '/oferta/torby-reklamowe-z-logo/': '/torby-reklamowe-z-logo',
    '/oferta/torby-laminowane/': '/torby-reklamowe',
    '/oferta/torby-firmowe/': '/torby-reklamowe-z-logo',
    '/oferta/torby-papierowe-z-logo/': '/torby-reklamowe-z-logo',
    '/oferta/torby-reklamowe-premium/': '/torby-reklamowe',
    '/oferta/torby-reklamowe-eko-kraft/': '/torby-eko',
    '/oferta/torby-reklamowe-na-targi/': '/torby-reklamowe',
    '/oferta/torby-reklamowe/torby-papierowe-z-nadrukiem/': '/torby-reklamowe',
    '/oferta/torby-papierowe-jednokolorowe/': '/torby-reklamowe',
    '/oferta/personalizowane-torby-papierowe/': '/torby-reklamowe-z-logo',
    '/torby-reklamowe-z-faktury-falistej/': '/torby-reklamowe',
    '/laminowane-biale-torby-papierowe/': '/torby-reklamowe',
    '/zalety-uzywania-toreb-papierowych/': '/torby-reklamowe',

    // --- Torby ozdobne / prezentowe / eko / alkohol ---
    '/oferta/pudelka-na-prezenty/': '/pudelka-prezentowe',
    '/oferta/kolekcje-swiateczne/': '/pudelka-prezentowe',
    '/oferta/torby-prezentowe-z-wlasnym-nadrukiem/': '/pudelka-prezentowe',
    '/kosze-prezentowe/': '/pudelka-prezentowe',
    '/oferta/torby-na-alkohol/': '/torby-na-alkohol',
    '/oferta/torby-reklamowe-z-papierow-ozdobnych/': '/torby-ozdobne',
    '/oferta/torebki-kolorowe/': '/torby-ozdobne',
    '/torby-papierowe/': '/torby-ozdobne',
    '/torby-papierowe-recznie-zdobione/': '/torby-ozdobne',
    '/torby-papierowe-recznie-zdobione-2/': '/torby-ozdobne',
    '/torby-papierowe-kolekcja-lux/': '/torby-ozdobne',
    '/torby-elegance-lux/': '/torby-ozdobne',
    '/torby-retro-lux/': '/torby-ozdobne',
    '/torby-papierowe-eco-recznie-zdobione/': '/torby-eko',
    '/ekologiczne-torby-papierowe-eco-kraft/': '/torby-eko',
    '/torby-ekologiczne-170-gr/': '/torby-eko',

    // --- Maseczki/przyłbice (wycofany produkt) ---
    '/maseczki-i-przylbice-ochronne/': '/',
    '/maseczki-ochronne/': '/',
    '/przylbice-ochronne/': '/',

    // --- Blog: wpisy z odpowiednikami na nowym blogu ---
    '/torby-reklamowe-klucz-do-promocji-marki/': '/blog/torby-reklamowe-klucz-do-promocji-marki',
    '/wybor-kolorow-papierowych-toreb-klucz-do-sukcesu/': '/blog/wybor-kolorow-papierowych-toreb',
    '/w-jakich-rodzajach-dzialalnosci-sprawdzaja-sie-torby-reklamowe/': '/blog/gdzie-sprawdzaja-sie-torby-reklamowe',

    // --- Blog: pozostałe stare wpisy -> lista blogu ---
    '/aktualnosci/': '/blog',
    '/witamy-na-blogu-firmy-mer-plus/': '/blog',
    '/moda-na-torby-ekologiczne-skad-sie-wziela/': '/blog',
    '/ladne-opakowanie-to-w-marketingu-podstawa/': '/blog',
    '/papier-czy-torba-jak-najlepiej-zapakowac-prezent/': '/blog',
    '/torby-idealne-na-prezent/': '/blog',
    '/torby-papierowe-z-logo-jako-propozycja-dla-firm/': '/blog',
    '/torby-jako-nosnik-reklamy/': '/blog',
    '/torby-reklamowe-premium-charakterystyka/': '/blog',
    '/zastosowanie-papierow-dekoracyjnych-w-produkcji-toreb/': '/blog',
    '/jak-sie-wyroznic-przygotowujac-prezenty-dla-pracownikow/': '/blog',
    '/jak-dobrac-rozmiar-torby/': '/blog',
    '/przygotowanie-nadruku-na-torbe-etapy-postepowania/': '/blog',
    '/dlaczego-ekotorby-sa-korzystne-dla-srodowiska/': '/blog',
    '/jak-najlepiej-zapakowac-alkohol/': '/blog',
    '/wykorzystanie-toreb-z-logo-do-dzialan-marketingowych/': '/blog',
    '/torby-jedno-czy-wielokolorowe/': '/blog',
    '/torby-reklamowe-na-zamowienie-kiedy-warto-sie-nimi-zainteresowac/': '/blog',
    '/w-jaki-sposob-mozna-zdobic-torby-papierowe/': '/blog',
    '/jakie-sa-rozmiary-toreb-na-prezent/': '/blog',
    '/jak-dobrac-kolor-i-wzor-torby-do-okazji/': '/blog',
    '/dlaczego-warto-posiadac-torby-reklamowe/': '/blog',
    '/4-korzysci-wynikajace-ze-stosowania-toreb-papierowych/': '/blog',
    '/dlaczego-warto-wybrac-torby-recznie-zdobione/': '/blog',
    '/kiedy-warto-wybrac-torby-laminowane/': '/blog',
    '/co-podarowac-parze-mlodej-z-okazji-slubu/': '/blog',
    '/jak-torby-i-inne-gadzety-reklamowe-poprawiaja-wizerunek-firmy/': '/blog',
    '/torby-reklamowe-jako-element-kampanii-promocyjnej/': '/blog',
    '/czym-sie-wyrozniaja-eleganckie-torby-papierowe/': '/blog',
    '/jak-dopasowac-torbe-okolicznosciowa-do-prezentu/': '/blog',
    '/dlaczego-torby-sa-doskonalym-nosnikiem-reklamowym/': '/blog',
    '/torby-papierowe-jednokolorowe-gdzie-i-kiedy-sie-sprawdzaja/': '/blog',
    '/jak-kreatywnie-zapakowac-prezent/': '/blog',
    '/czym-sie-charakteryzuja-pudelka-ekologiczne/': '/blog',
    '/rodzaje-uchwytow-do-toreb/': '/blog',
    '/sposoby-uszlachetniania-toreb-ekologicznych/': '/blog',
    '/cechy-rozpoznawcze-toreb-ekologicznych/': '/blog',
    '/produkcja-toreb-ekologicznych-krok-po-kroku/': '/blog',
    '/metody-nadrukow-stosowane-na-torbach/': '/blog',
    '/co-wplywa-na-estetyke-toreb-papierowych/': '/blog',
    '/czy-ekologiczne-torby-papierowe-sa-wytrzymale/': '/blog',
    '/tektura-falista-tez-jest-eko/': '/blog',
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
