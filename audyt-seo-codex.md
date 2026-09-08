# Audyt SEO i poprawności technicznej projektu Astro

Data audytu: 2026-09-08  
Zakres: `src/pages/**/*.astro`, layouty i komponenty używane przez strony, kolekcja blogowa, linki wewnętrzne, `astro.config.mjs`, sitemap, robots.txt i JSON-LD.

## Status po wdrożeniu poprawek

Aktualizacja: 2026-09-08. Wszystkie problemy wykazane w audycie zostały naprawione i sprawdzone na produkcyjnym buildzie:

- konflikt Vite/Tailwind usunięto przez przypięcie `vite@7.3.6` w `package.json:44` i aktualizację `pnpm-lock.yaml`; `npm run build` kończy się kodem 0,
- `BaseLayout` wymaga niepustych `title` i `description` (`src/layouts/BaseLayout.astro:16-24`) oraz generuje absolutne adresy canonical i obrazów społecznościowych (`src/layouts/BaseLayout.astro:36-40`, `91-108`),
- dodano rzeczywisty obraz `public/og-image.png`, używany jako domyślny obraz Open Graph i stały obraz encji firmy,
- `LocalBusiness` jest generowany w jednym miejscu, ma wspólne `@id` i korzysta ze wspólnych danych firmy (`src/layouts/BaseLayout.astro:40-62`),
- 14 stron ofertowych otrzymało schema `Service` przez `serviceName`; definicja schematu znajduje się w `src/layouts/BaseLayout.astro:64-82`,
- wpisy blogowe otrzymały własny obraz społecznościowy, `og:type="article"` i schema `BlogPosting` (`src/layouts/PostLayout.astro:27-57`),
- `/contact/success/` ma `noindex,follow` (`src/pages/contact/success.astro:8`) i jest wykluczone z sitemap (`astro.config.mjs:11-16`),
- usunięto dwa przekierowania równoważne własnym adresom; pozostałe reguły nie zawierają pętli, duplikatów ani łańcuchów,
- poziomy nagłówków stopki zmieniono z `h3` na `h2` (`src/components/Footer.astro:66`, `81`),
- skrócono trzy zbyt długie meta descriptions: `src/pages/index.astro:18`, `src/pages/torby-eko.astro:15` i `src/pages/torebki-na-prezenty.astro:15`,
- dodano automatyczny audyt artefaktów produkcyjnych `scripts/verify-seo.mjs:1-156`, uruchamiany poleceniem `npm run test:seo` (`package.json:29`),
- poprawiono nieaktualne testy strony głównej oraz odizolowano Playwright od przypadkowo uruchomionego serwera deweloperskiego (`playwright.config.ts:11-27`).

Wynik końcowej weryfikacji:

```text
npm run build     — PASS, 67 stron zbudowanych
npm run test:seo  — PASS, 66 adresów z sitemap, 0 błędów
npm test          — PASS, 8/8 testów Playwright
git diff --check  — PASS
```

W sitemap jest 66 stron indeksowalnych; 67. zbudowana strona to cel formularza `/contact/success/`, celowo oznaczony `noindex` i wykluczony z mapy. Ostrzeżenie o niedostępnym API metadanych Google Fonts pojawiało się wyłącznie w sieciowo ograniczonym środowisku audytu i nie przerywało buildu.

Poniższa część raportu dokumentuje stan wejściowy przed naprawami i uzasadnienie każdej zmiany.

## Podsumowanie

Audyt objął:

- 24 pliki routingu Astro,
- 23 statyczne strony źródłowe,
- 1 dynamiczny route bloga generujący 44 wpisy,
- łącznie 67 docelowych adresów stron,
- 44 pliki Markdown w kolekcji blogowej,
- 142 reguły przekierowań,
- 35 wystąpień `<Image>` lub `<img>` w plikach Astro oraz 41 obrazów wyróżniających wpisów blogowych.

Wykryto sześć problemów technicznych lub SEO oraz jedną drobną optymalizację treści. Najważniejsze są niedziałający build produkcyjny, brak domyślnego obrazu Open Graph i indeksowanie strony potwierdzenia formularza.

## Problemy wykryte w stanie przed naprawą

### 1. Krytyczny: produkcyjny build nie działa

Polecenie:

```sh
npm run build
```

kończy się błędem:

```text
[@tailwindcss/vite:generate:build]
Missing field `tsconfigPaths` on BindingViteResolvePluginConfig.resolveOptions
file: src/styles/global.css
```

Istotne lokalizacje:

- `src/styles/global.css:1` — import Tailwind CSS uruchamiający wadliwą ścieżkę pluginu,
- `package.json:36-39` — szerokie zakresy wersji Astro, Tailwind i pluginu Vite,
- `package-lock.json:2511-2513` — Vite 7.3.6 zainstalowany wewnątrz Astro,
- `package-lock.json:5934-5944` — równocześnie Vite 8.2.2 i Rolldown 1.2.x w katalogu głównym.

`npm ls` potwierdza, że Astro 6.4.8 używa Vite 7.3.6, podczas gdy `@tailwindcss/vite` rozwiązuje zależność do głównego Vite 8.2.2. Mieszanie dwóch głównych wersji Vite prowadzi do niezgodności konfiguracji pluginu.

Skutki:

- katalog `dist/` pozostaje pusty,
- nie powstają produkcyjne pliki HTML,
- nie powstają sitemap ani robots.txt,
- nie można wdrożyć aktualnego stanu projektu za pomocą standardowego `npm run build`.

Zalecenie:

1. Ujednolicić Vite do jednej wersji zgodnej z używaną wersją Astro, najbezpieczniej przez jawne przypięcie kompatybilnego Vite 7.
2. Ujednolicić wersje Astro, Tailwind CSS i `@tailwindcss/vite`.
3. Ponownie wygenerować lockfile wybranym menedżerem pakietów.
4. Nie utrzymywać równolegle niespójnych lockfile npm i pnpm.
5. Po naprawie ponownie uruchomić `npm run build` i sprawdzić zawartość `dist/`.

Ostrzeżenia o braku możliwości pobrania metadanych Google Fonts nie były bezpośrednią przyczyną przerwania buildu. Błąd krytyczny pochodził z integracji Tailwind/Vite.

### 2. Wysoki: obrazy Open Graph i Twitter wskazują na nieistniejący plik

`src/layouts/BaseLayout.astro:26` ustawia domyślnie:

```astro
image = '/og-image.png'
```

Pliku `public/og-image.png` nie ma. W katalogu `public/` znajdują się wyłącznie:

- `public/favicon.ico`,
- `public/favicon-512.png`.

Nieistniejąca ścieżka jest następnie emitowana jako:

- `og:image` — `src/layouts/BaseLayout.astro:66`,
- `twitter:image` — `src/layouts/BaseLayout.astro:73`.

Problem dotyczy domyślnie wszystkich stron. Dodatkowo adres obrazu jest względny, podczas gdy metadane społecznościowe powinny używać pełnego URL.

Wpisy blogowe mają osobny problem: `src/layouts/PostLayout.astro:18` pobiera `image`, ale w `src/layouts/PostLayout.astro:27` przekazuje do `BaseLayout` wyłącznie `title` i `description`:

```astro
<BaseLayout title={title} description={description}>
```

W efekcie 41 wpisów blogowych posiadających własny obraz również korzystałoby z brakującego `/og-image.png` zamiast z obrazu wpisu.

Zalecenie:

- dodać rzeczywisty plik `public/og-image.png`,
- generować absolutny adres, np. `new URL(image, Astro.site).href`,
- przekazywać `image={image}` z `PostLayout` do `BaseLayout`,
- dla wpisów blogowych ustawiać `og:type="article"` zamiast globalnego `website`.

### 3. Średni: `/contact/success/` jest indeksowalne i zostanie dodane do sitemap

`src/pages/contact/success.astro:8` korzysta ze zwykłego `BaseLayout`:

```astro
<BaseLayout title="Wiadomość wysłana" description="Twoja wiadomość została odebrana.">
```

`BaseLayout` nie obsługuje właściwości `noindex` ani własnej dyrektywy robots. Jednocześnie `astro.config.mjs:11` uruchamia sitemap bez filtra:

```js
integrations: [sitemap(), robotsTxt()],
```

Po naprawieniu buildu integracja sitemap potraktuje stronę sukcesu jak zwykłą stronę i doda `/contact/success/` do mapy witryny.

Skutek: techniczna strona potwierdzenia może być indeksowana i pojawiać się w wynikach wyszukiwania.

Zalecenie:

- rozszerzyć `BaseLayout` o opcję generującą `<meta name="robots" content="noindex,follow">`,
- włączyć ją na `contact/success.astro`,
- wykluczyć `/contact/success/` przez `sitemap({ filter })`.

### 4. Średni: strona główna emituje dwa niezależne schematy `LocalBusiness`

Domyślny schemat `LocalBusiness` jest definiowany w `src/layouts/BaseLayout.astro:33-48` i zawsze emitowany w `src/layouts/BaseLayout.astro:85`.

Strona główna przekazuje drugi obiekt `LocalBusiness` w `src/pages/index.astro:20-35`. `BaseLayout` emituje go jako drugi skrypt w `src/layouts/BaseLayout.astro:86-88`.

W rezultacie na stronie głównej znajdują się dwa niezależne opisy tej samej firmy, bez wspólnego `@id`. Dane adresowe są dodatkowo zapisane niespójnie:

- `src/layouts/BaseLayout.astro:40` — `ul. Macieja Rataja 7B`,
- `src/data/client.ts:22` — `ul. Rataja 7B`.

JSON pozostaje poprawny składniowo dzięki `JSON.stringify()`, a użyte typy i właściwości istnieją w schema.org. Problem dotyczy modelu danych i duplikacji encji, nie składni JSON.

Zalecenie:

- utworzyć jeden kompletny obiekt `LocalBusiness`,
- nadać mu trwałe `@id`, np. `https://www.merplus.pl/#business`,
- przechowywać dane firmy wyłącznie w `src/data/client.ts`,
- na pozostałych stronach odwoływać się do firmy przez ten sam `@id`,
- ewentualne dodatkowe encje publikować jako spójny `@graph`.

### 5. Niski: dwa redirecty są równoważne przekierowaniu adresu na samego siebie

Problematyczne reguły:

- `astro.config.mjs:18` — `/nasze-realizacje/` → `/nasze-realizacje`,
- `astro.config.mjs:69` — `/kosze-prezentowe/` → `/kosze-prezentowe`.

Konfiguracja nie ustawia `trailingSlash`, więc obowiązuje domyślne `ignore`. Wariant ze slashem i bez niego jest traktowany jako ten sam route. Ponadto istniejące strony `src/pages/nasze-realizacje.astro` i `src/pages/kosze-prezentowe.astro` mają pierwszeństwo przed redirectami.

W samym Astro nie powstanie obecnie aktywna pętla — reguły są martwe i nie wykonują zamierzonego przekierowania. Po skopiowaniu ich do konfiguracji hostingu lub CDN mogłyby jednak utworzyć pętlę normalizacji URL.

Zalecenie: usunąć obie reguły i ustalić jedną globalną politykę trailing slash na poziomie Astro oraz hostingu.

Pozostałe wyniki analizy redirectów:

- 142 unikalne klucze źródłowe,
- brak zduplikowanych kluczy,
- brak cykli wieloelementowych,
- brak celów, które prowadzą do kolejnego skonfigurowanego redirectu,
- wszystkie właściwe cele przekierowań odpowiadają istniejącym stronom lub wpisom blogowym.

Dokumentacja: <https://docs.astro.build/en/reference/configuration-reference/#redirects>

### 6. Niski: pominięty poziom nagłówka na `/contact/success/`

Główna treść strony ma `h1` w `src/pages/contact/success.astro:19`. Nie ma na niej `h2`. Następne nagłówki dokumentu pochodzą ze wspólnej stopki i są elementami `h3`:

- `src/components/Footer.astro:66`,
- `src/components/Footer.astro:81`.

Pełna sekwencja dokumentu przechodzi zatem bezpośrednio z `h1` do `h3`.

Zalecenie: nagłówki sekcji stopki zmienić na `h2` albo zapewnić nadrzędny nagłówek `h2` dla grupy nawigacyjnej stopki.

### 7. Drobna optymalizacja: trzy meta descriptions są długie

Wszystkie opisy są niepuste, unikalne i związane z treścią stron. Trzy mogą być jednak skracane w wynikach wyszukiwania:

| Plik i linia | Długość | Strona |
|---|---:|---|
| `src/pages/index.astro:19` | 181 znaków | Strona główna |
| `src/pages/torby-eko.astro:15` | 177 znaków | Torby ekologiczne |
| `src/pages/torebki-na-prezenty.astro:15` | 161 znaków | Torebki na prezenty |

Nie jest to błąd techniczny ani bezpośredni czynnik rankingowy. Warto skrócić opisy tak, aby najważniejsza propozycja wartości i wezwanie do działania mieściły się w początkowej części tekstu.

## Wyniki poszczególnych kontroli

### Title i description

Wynik: poprawnie, z wyjątkiem opcjonalnego skrócenia trzech opisów wskazanych powyżej.

- Każdy statyczny plik strony przekazuje `title` i `description` do `BaseLayout`.
- `src/pages/blog/[...slug].astro:17-23` przekazuje dane wpisu do `PostLayout`.
- `src/layouts/PostLayout.astro:27` przekazuje `title` i `description` do `BaseLayout`.
- Wszystkie 44 wpisy blogowe mają niepuste `title` i `description`.
- Nie znaleziono identycznych tytułów.
- Nie znaleziono identycznych opisów.
- Nie znaleziono pustych wartości.

Schemat kolekcji w `src/content.config.ts:8-9` wymaga obu pól jako stringów. Sam schemat dopuszczałby pusty string, ale kontrola rzeczywistych danych potwierdziła, że żaden wpis nie ma pustej wartości.

### Struktura nagłówków

Wynik: poprawnie poza `/contact/success/`.

- Każda strona ma dokładnie jeden `h1`.
- Strona główna otrzymuje `h1` z `src/components/Hero.astro:48`.
- Strony wewnętrzne otrzymują `h1` z `src/components/Banner.astro:66`.
- Wpisy blogowe otrzymują `h1` z `src/layouts/PostLayout.astro:60`.
- `contact/success.astro` posiada własny `h1` w linii 19.
- Żaden wpis Markdown nie zawiera dodatkowego `# h1`; treść wpisów używa `## h2`.
- Nie znaleziono przejść `h2 → h4` ani innych pominięć poziomów w głównej treści.
- Sekcje kart poprawnie używają `h3` pod `h2`.

### Obrazy i teksty alternatywne

Wynik: poprawnie dla obrazów treści.

- Wszystkie obrazy treści w plikach Astro mają niepusty `alt` lub otrzymują go z wymaganych danych komponentu.
- 41 z 44 wpisów blogowych ma obraz wyróżniający.
- Wszystkie 41 wpisów z obrazem ma niepuste `imageAlt`.
- `src/layouts/PostLayout.astro:75` dodatkowo używa tytułu wpisu jako fallbacku.
- Automatyczna galeria generuje alt z nazwy pliku w `src/config/images.ts:75-81`.

Trzy puste alty są celowe i poprawne dostępnościowo:

- `src/components/Banner.astro:29` — dekoracyjne tło banera,
- `src/layouts/PostLayout.astro:34` — dekoracyjne tło nagłówka wpisu,
- `src/components/FloatingContact.astro:29` — dekoracyjne logo w linku, który ma widoczną etykietę i `aria-label`.

Nie należy wypełniać tych altów słowami kluczowymi, ponieważ powodowałoby to powtarzanie informacji dla czytników ekranu.

### Linki wewnętrzne

Wynik: wszystkie nawigacyjne linki wewnętrzne są poprawne.

Sprawdzono:

- literały `href` w stronach, layoutach i komponentach,
- linki generowane z tablic w `Header.astro`, `Footer.astro`, `Services.astro` i `RelatedProducts.astro`,
- linki wpisów generowane w `src/pages/blog/index.astro:44`,
- linki Markdown w kolekcji blogowej,
- akcję formularza `/contact/success`,
- referencje do faviconów,
- cele wszystkich redirectów.

Nie znaleziono linków do nieistniejących stron. Jedyną brakującą lokalną referencją jest `/og-image.png`, opisana w problemie nr 2.

### Redirects

Wynik: brak duplikatów, cykli i łańcuchów; dwa martwe redirecty różniące się wyłącznie końcowym slashem.

Wszystkie inne cele kończą się bezpośrednio na docelowej stronie. Nie ma reguły, której cel byłby źródłem kolejnego redirectu.

### Sitemap i robots.txt

Konfiguracja integracji w `astro.config.mjs:4-5` i `astro.config.mjs:11` jest zasadniczo poprawna:

```js
import sitemap from '@astrojs/sitemap';
import robotsTxt from 'astro-robots-txt';

integrations: [sitemap(), robotsTxt()],
```

`site` jest poprawnie ustawione na `https://www.merplus.pl` w `astro.config.mjs:8`.

Przy domyślnej konfiguracji `@astrojs/sitemap` oczekiwane pliki to:

- `dist/sitemap-index.xml`,
- `dist/sitemap-0.xml`.

Nie należy oczekiwać pojedynczego `dist/sitemap.xml`. Domyślne ustawienia `astro-robots-txt` są z tym zgodne i powinny wygenerować:

```text
User-agent: *
Allow: /
Sitemap: https://www.merplus.pl/sitemap-index.xml
```

Konfiguracja jest więc logicznie zgodna, ale wynik nie powstaje z powodu błędu buildu. Po jego naprawie trzeba sprawdzić:

1. czy oba pliki sitemap istnieją,
2. czy XML jest poprawny,
3. czy zawiera oczekiwane strony i 44 wpisy blogowe,
4. czy nie zawiera redirectów,
5. czy `/contact/success/` został wykluczony,
6. czy `robots.txt` wskazuje istniejący `sitemap-index.xml`.

Dokumentacja: <https://docs.astro.build/en/guides/integrations-guide/sitemap/>

### JSON-LD w BaseLayout

Domyślny obiekt `LocalBusiness` jest poprawnym składniowo JSON-LD. Poprawne są także użyte typy:

- `LocalBusiness`,
- `PostalAddress`,
- `FAQPage`,
- `Question`,
- `Answer`.

Do poprawy pozostaje duplikacja encji firmy na stronie głównej i brak wspólnego `@id`.

Istniejące `FAQPage`:

- `src/components/FAQ.astro:50-61` — strona główna,
- `src/pages/torby-reklamowe.astro:157-186`,
- `src/pages/torby-reklamowe-z-logo.astro:121-150`,
- `src/pages/torby-ozdobne.astro:120-149`.

Treść widocznych pytań odpowiada danym w JSON-LD, więc implementacja jest spójna z zawartością strony.

Od 7 maja 2026 r. Google nie pokazuje już wyników rozszerzonych FAQ, a dokumentację tej funkcji usunięto w czerwcu 2026 r. Rozszerzanie `FAQPage` na kolejne strony wyłącznie dla widoczności w Google nie jest obecnie opłacalne. Można pozostawić istniejące dane dla semantyki i innych konsumentów schema.org.

Źródło: <https://developers.google.com/search/updates>

### Czy dodawać Product lub Service?

Rekomendowany typ dla obecnych stron ofertowych to `Service`, nie `Product`.

Strony takie jak:

- `src/pages/torby-reklamowe.astro:13`,
- `src/pages/torby-reklamowe-z-logo.astro:13`,
- `src/pages/torby-ozdobne.astro:13`,
- `src/pages/torby-eko.astro:13`,
- `src/pages/torby-na-alkohol.astro:14`,
- `src/pages/pudelka-prezentowe.astro:13`,
- `src/pages/torebki-na-prezenty.astro:13`,
- `src/pages/torby-reklamowe-premium.astro:13`,
- `src/pages/torby-jednokolorowe.astro:13`,
- `src/pages/kolekcja-lux.astro:28`,
- `src/pages/kolekcje-swiateczne.astro:10`,
- `src/pages/kosze-prezentowe.astro:12`,
- `src/pages/produkty-z-tektury-falistej.astro:12`

opisują produkcję i realizację konfigurowalnych zamówień. Nie przedstawiają jednego produktu z konkretnym SKU, ceną i dostępnością. Schemat `Service` może zawierać:

- `name`,
- `description`,
- `url`,
- `image`,
- `serviceType`,
- `areaServed`,
- `provider` wskazujący `LocalBusiness/@id`,
- opcjonalnie `hasOfferCatalog`.

`Product` warto dodać dopiero wtedy, gdy powstaną strony konkretnych produktów lub wariantów i będzie można podać wiarygodne właściwości produktu. Aby dane `Product` kwalifikowały się do wyniku produktowego Google, oprócz `name` wymagane jest co najmniej jedno z: `offers`, `review` lub `aggregateRating`. Nie należy tworzyć fikcyjnych cen, dostępności ani ocen tylko po to, by spełnić walidator.

Źródła:

- <https://schema.org/Service>
- <https://developers.google.com/search/docs/appearance/structured-data/product-snippet>

### Dodatkowa rekomendacja dla bloga

`src/layouts/PostLayout.astro:27` nie przekazuje żadnego schematu artykułu do `BaseLayout`. Warto dodać `BlogPosting` lub `Article` zawierający:

- `headline`,
- `description`,
- `datePublished`,
- `author`,
- `image`,
- `mainEntityOfPage`,
- `publisher` odwołujący się do wspólnej encji firmy.

Jednocześnie dla wpisów należy generować `og:type="article"` oraz przekazywać ich własny obraz społecznościowy.

## Priorytet wdrożenia

1. Naprawić konflikt Vite/Tailwind i doprowadzić `npm run build` do sukcesu.
2. Dodać prawidłowy, absolutny obraz Open Graph i przekazywanie obrazów wpisów.
3. Wykluczyć `/contact/success/` z indeksowania oraz sitemap.
4. Ujednolicić `LocalBusiness` i nadać encji wspólne `@id`.
5. Usunąć dwa martwe redirecty trailing-slash.
6. Poprawić poziomy nagłówków stopki na stronie sukcesu.
7. Dodać `Service` do stron ofertowych i `BlogPosting` do wpisów.
8. Opcjonalnie skrócić trzy najdłuższe meta descriptions.

## Kryterium zakończenia napraw

Po wdrożeniu zmian audyt powinien zostać zamknięty dopiero, gdy:

- `npm ci` oraz `npm run build` kończą się kodem 0,
- `dist/robots.txt`, `dist/sitemap-index.xml` i `dist/sitemap-0.xml` istnieją,
- sitemap nie zawiera `/contact/success/` ani adresów przekierowujących,
- każdy wygenerowany HTML ma dokładnie jeden niepusty `title`, jeden niepusty meta description i jeden `h1`,
- wszystkie lokalne `href`, `src`, canonicale i obrazy społecznościowe wskazują istniejące zasoby,
- każdy `og:image` i `twitter:image` jest absolutnym URL,
- JSON-LD przechodzi walidację składni i nie duplikuje encji firmy,
- wpisy blogowe używają własnych obrazów oraz typu `article`/`BlogPosting`.
