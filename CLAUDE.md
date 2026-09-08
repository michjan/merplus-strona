# CLAUDE.md — merplus-strona (przebudowa merplus.pl)

Punkt startowy dla Claude przy pracy nad tym projektem. Przeczytaj w całości przed zmianami.

**Uwaga historyczna:** ten plik wcześniej opisywał (przez pomyłkę) zupełnie inny projekt —
`torby-ozdobne-strona` / folder `strona-nowa` w Cowork-owym folderze "Strona torby
ozdobne". Ten drugi projekt to osobna, mniejsza inicjatywa (dedykowana witryna dla toreb
ozdobnych) i został usunięty z lokalnego dysku 2026-09-08 na prośbę Michu (kod nadal
istnieje na GitHubie jako `michjan/torby-ozdobne-strona`, gdyby jednak był potrzebny).
Ten plik dotyczy WYŁĄCZNIE `merplus-strona` — pełnej przebudowy merplus.pl.

## Co to za projekt

Nowa wersja całej strony **merplus.pl** — zastąpienie obecnej strony WordPress (motyw
Blade/PHP + pola ACF, treść zaszyta w szablonach, nie w edytorze WP). Cel: zachować
strukturę URL / SEO na tyle, na ile się da, i przenieść całą ofertę na nowoczesny,
szybki, statyczny stack.

Firma: **MER Plus Sp. z o.o.** — producent toreb papierowych reklamowych, ozdobnych,
na alkohol, toreb eko oraz pudełek prezentowych, ponad 30 lat doświadczenia.
Adres: ul. Rataja 7B, Sulejówek (woj. mazowieckie). NIP: PL1130000192.
Kontakt: joanna.wojciechowska@merplus.pl, +48 601 999 402.
(Dane firmowe — patrz `src/data/client.ts`, nie hardkoduj ich nigdzie indziej.)

## Stack techniczny

- **Astro 6** + **Tailwind CSS v4** (`@tailwindcss/vite`), oparte na szablonie
  "Small Business Starter" (stąd `package.json` name: `small-business-starter` —
  do zmiany przy porządkach)
- **Menedżer pakietów: pnpm — NIE npm/yarn.** README wprost ostrzega, że `npm install`
  tworzy konfliktujący lockfile. W repo jest teraz też `package-lock.json` (gitignored,
  najwyraźniej ktoś odpalił npm install lokalnie) — do usunięcia, używać tylko
  `pnpm install`
- `@astrojs/sitemap` + `astro-robots-txt` — sitemap i robots.txt działają (w przeciwieństwie
  do wcześniejszego, porzuconego projektu torby-ozdobne-strona, gdzie sitemap się wysypywał)
- Fonty: Oswald (display) + Inter (body), przez wbudowany font-optimizer Astro 6
  (skonfigurowane w `astro.config.mjs`, muszą być zsynchronizowane z `src/config/brand.ts`)
- Testy: Playwright (`pnpm test`, `pnpm test:perf` — perf testy w `tests/performance.spec.ts`)
- Output: `static`, deployment wg README na Netlify (`netlify.toml` w repo) — **do
  potwierdzenia z Michu**, bo w innych notatkach padało też Cloudflare Pages; sprawdzić
  które wdrożenie jest aktualnie aktywne / docelowe
- Repo GitHub: `https://github.com/michjan/merplus-strona` (branch: `main`)
- Lokalnie: `Pulpit/merplus-strona` (podłączony przez Cowork jako folder na Desktopie)
- Node: wymagane `>=22.12.0` (pole `engines`)

## Personalizacja (wzorzec szablonu)

Szablon zakłada dwa pliki jako jedyne miejsce z danymi klienta — trzymaj się tego przy
edycjach:
- `src/data/client.ts` — nazwa, telefon, email, adres, social media, NIP/licencja
- `src/config/brand.ts` — nazwa marki, tagline, opis SEO, kolory (→ `src/styles/theme.css`
  jako CSS custom properties, Tailwind v4 `@theme` je podchwytuje), fonty, promienie
  zaokrągleń

Paleta kolorów MER Plus (już ustawiona w brand.ts): primary `#A33223` / accent `#D6432B`
(czerwień/terakota), tło `#FDF9F4`, tekst `#3A2A22` — ciepła, ziemista kolorystyka.

## Struktura stron (src/pages/)

- `index.astro` — strona główna
- `about.astro` — o nas
- `services.astro` — oferta (landing zbiorczy)
- `torby-reklamowe.astro`, `torby-reklamowe-z-logo.astro`, `torby-ozdobne.astro`,
  `torby-eko.astro`, `torby-na-alkohol.astro`, `pudelka-prezentowe.astro`,
  `wykrojniki.astro` — poszczególne linie produktowe (odpowiadają pozycjom w menu Oferta)
- `blog/index.astro`, `blog/[...slug].astro` — blog (content collection w `src/content/blog/`,
  na razie tylko 3 wpisy — stara strona WP ma ~38, do przeniesienia)
- `contact/index.astro`, `contact/success.astro` — kontakt (formularz)
- `privacy.astro`, `terms.astro` — polityka prywatności, regulamin

Nawigacja główna (Header.astro): Strona główna | O nas | Oferta (dropdown: Torby
reklamowe, Torby z logo, Torby ozdobne, Pudełka prezentowe, Torby na alkohol, Torby eko)
| Wykrojniki | Blog | Kontakt

Komponenty sekcji (src/components/): Hero, TrustBar, Services, About, Reviews, Gallery,
CTA, FAQ, Banner, RelatedProducts, FloatingContact, Header, Footer.

## Przekierowania 301 (astro.config.mjs)

W `astro.config.mjs` jest już rozbudowana mapa przekierowań ze starych URL-i WP
(sekcje: strony ogólne, wersja angielska /en/, torby reklamowe, torby ozdobne/prezentowe/
eko/alkohol, maseczki/przyłbice → usunięte na `/`, ~40 starych wpisów blogowych → `/blog`
albo bezpośrednio do odpowiednika, jeśli istnieje). To duży i ważny kawałek pracy SEO —
**obecnie niezacommitowany w repo, do sprawdzenia czy wszystko się zgadza z pełną listą
54 przekierowań z trackera migracji** (`merplus_migracja_tracker.xlsx`, patrz pamięć
`/areas/merplus-website-rebuild.md`).

## Google Tag Manager — UWAGA PRAWNA

W `BaseLayout.astro` dodany GTM (`GTM-54LVD7WK`) ładujący się bezwarunkowo w `<head>`,
przed jakąkolwiek zgodą użytkownika. **To narusza RODO** (tracking przed consentem) —
priorytet: albo owinąć ładowanie GTM w Consent Mode / banner zgody, albo opóźnić
ładowanie do momentu zgody, zanim to wejdzie na produkcję.

## Braki / priorytety do zrobienia

1. Consent Mode / banner zgody przed GTM (patrz wyżej — pilne, RODO)
2. Dociągnąć pełną treść ze starej strony WP — treść nie jest w bazie WP, jest w
   szablonach Blade/PHP i polach ACF, więc trzeba ją wyciągnąć przez Royal MCP
   (`wp_get_pages`, `wp_get_posts`, ACF field tools) albo ręcznie, nie prostym exportem
3. Blog — tylko 3 z ~38 wpisów przeniesione
4. Zdjęcia — nowe pliki w `src/assets/images/` (m.in. `krówki.jpg` i wersje
   "poprawione") są niezacommitowane, sprawdzić czy to kompletny zestaw
5. Schema.org (Organization / Product / FAQPage) — sprawdzić co już jest w BaseLayout
   (`defaultSchema` — jest jakiś JSON-LD, dociągnąć jeśli niepełny)
6. `llms.txt` dla widoczności w LLM-ach (ChatGPT, Perplexity, Google AI Overview) —
   nieformalny standard, do rozważenia
7. Potwierdzić docelowy hosting (Netlify wg README vs. Cloudflare Pages wspominane
   gdzie indziej) i podpięcie domeny merplus.pl
8. Uprzątnąć `package-lock.json` (npm) — projekt ma być tylko na pnpm
9. Dopracować przekierowania 301 względem pełnej listy z trackera migracji

## Kontekst / powiązane zasoby

- Stara strona: `https://www.merplus.pl` — WordPress, dostęp przez Royal MCP
  (connector `merplus_wordpress`) — narzędzia `wp_*`, `wc_*`, `acf_*`, `yoast_*` itd.
  Uwaga: wymaga autoryzacji w danej sesji, zanim będzie użyteczny
- Tracker migracji (Google Sheets/xlsx wysłany wcześniej Michu): pełna inwentaryzacja
  65 stron WP + 38 wpisów blogowych + 54 istniejące przekierowania 301 + plan działania
- Sprzedaż idzie głównie przez Allegro (BaseLinker, Wapro WF Mag) — ta strona to
  wizytówka/SEO/leadgen, nie sklep transakcyjny
- Osobny, mniejszy i już nieaktywny lokalnie projekt `torby-ozdobne-strona` (usunięty
  2026-09-08) — nie mylić z tym repo

## Konwencje pracy

- Commity po polsku (patrz `git log`)
- Wszystkie teksty na stronie po polsku
- Dane firmowe wyłącznie z `client.ts` / `brand.ts` — nigdy hardkodowane w komponentach
- `pnpm install` / `pnpm run dev` / `pnpm run build` / `pnpm run preview` — nie `npm`
