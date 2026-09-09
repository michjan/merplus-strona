# Rekomendacje rozwoju strony MER Plus

> Dokument przygotowany dla właściciela projektu i kolejnego agenta programistycznego (np. Claude). Jest to analiza i backlog rekomendacji, a nie automatyczne polecenie wdrożenia wszystkich punktów. Przed implementacją należy zweryfikować dane handlowe, ceny, minimalne nakłady, terminy, certyfikaty i możliwości produkcyjne.

Data analizy: 2026-09-09  
Projekt: Astro, polska i angielska wersja językowa

## Podsumowanie

MER Plus ma szybką, estetyczną i technicznie solidną stronę, ale obecnie działa ona przede wszystkim jak katalog. Największy potencjał wzrostu leży w przekształceniu jej w narzędzie sprzedażowe prowadzące użytkownika przez proces:

1. określenie, co chce zapakować,
2. dobór właściwego rozmiaru,
3. konfigurację materiału, nadruku i wykończenia,
4. przesłanie projektu,
5. przygotowanie kompletnego zapytania ofertowego.

Najważniejszym większym projektem powinien być zintegrowany moduł **„Dobierz torbę i przygotuj wycenę”**, wykorzystujący istniejącą bazę 124 wykrojników.

## Ocena obecnej strony

| Obszar | Ocena | Wniosek |
|---|---:|---|
| Wygląd i spójność | 8/10 | Profesjonalny i spójny kierunek wizualny |
| Szybkość techniczna | 9/10 | Bardzo dobry fundament pod dalszy rozwój |
| Oferta i treści produktowe | 7/10 | Dużo informacji, ale miejscami zbyt opisowo |
| Konwersja na zapytanie | 5/10 | Formularz zbiera za mało danych |
| Dobór produktu | 4/10 | Wyszukiwarka wykrojników jest tylko filtrem tabeli |
| Dowody wiarygodności | 5/10 | Za mało weryfikowalnych opinii, realizacji i danych |
| Przewaga nad konkurencją | 6/10 | Przewagi istnieją, ale nie są wystarczająco wyeksponowane |
| Analityka i automatyzacja | 3/10 | Brak pełnego lejka zdarzeń i integracji sprzedażowej |

Aktualny build wygenerował 135 tras. Wszystkie 18 testów Playwright przeszło. Lokalnie strona główna miała około 302 KB zasobów własnych, brak przesunięć CLS i brak nieoczekiwanych zasobów blokujących renderowanie. Są to wyniki laboratoryjne, a nie terenowe dane Core Web Vitals.

## 1. Asystent doboru i wyceny

Nie należy zaczynać od kalkulatora obiecującego zawsze dokładną cenę. Przy niestandardowej produkcji cena zależy od wielu parametrów. Lepszym rozwiązaniem będzie asystent przygotowujący kompletną specyfikację, a automatyczną cenę pokazujący tylko dla dobrze zdefiniowanych wariantów.

### Proponowany przebieg

1. **Zastosowanie** — klient wybiera kosmetyki, odzież, butelkę, pudełko, dokumenty A4, upominek albo własne zastosowanie.
2. **Wymiary produktu** — szerokość, głębokość, wysokość, liczba produktów i orientacyjna waga.
3. **Rekomendacja formatu** — system pokazuje najmniejszy pasujący, rekomendowany i większy format wraz z luzem i możliwością obrócenia produktu.
4. **Konfiguracja** — typ torby, papier, gramatura, kolor, uchwyt, nadruk, liczba stron, uszlachetnienia i nakład.
5. **Termin i dostawa** — oczekiwany termin, pilność, kod pocztowy, wysyłka lub odbiór.
6. **Upload projektu** — PDF, SVG, AI, EPS lub PNG przesyłane do bezpiecznego magazynu plików.
7. **Podsumowanie** — specyfikacja, numer zapytania, orientacyjny przedział ceny, deklarowany czas odpowiedzi i kopia e-mail.

### Logika cenowa

- Cena automatyczna tylko dla standardowych kombinacji.
- Wycena indywidualna dla nietypowego formatu, pilnego terminu i specjalnych uszlachetnień.
- Lepiej podać uczciwy przedział niż pozornie dokładną kwotę, która później się zmieni.
- Każda wycena automatyczna powinna mieć opis założeń i informację, że cena końcowa zależy od weryfikacji pliku.

### Inspiracje rynkowe

- [AWIH](https://awih.pl/torby-papierowe-producent/torby-papierowe-z-uchwytem-plaskim-z-nadrukiem/) pokazuje orientacyjną cenę, koszty przygotowania, transport, termin oraz pozwala zestawiać konfiguracje.
- [BestShirt](https://bestshirt.pl/torebki-papierowe) pokazuje szacunkową cenę zależną od wariantu i nakładu.
- [Gesti](https://gesti.pl/wycena) prowadzi użytkownika od wyboru typu produktu do dalszej konfiguracji.

## 2. Wyszukiwarka rozmiarów 2.0

Obecna strona `src/pages/wykrojniki.astro` zawiera 124 formaty, ale skrypt od okolic linii 261 wykonuje jedynie tekstowe filtrowanie całej zawartości wiersza. Nie pomaga ustalić, który format rzeczywiście pasuje do produktu.

Nowa wersja powinna:

- przyjmować trzy wymiary produktu,
- pozwalać na obracanie produktu,
- uwzględniać konfigurowalny luz technologiczny,
- sortować wyniki według najmniejszej niewykorzystanej objętości,
- pokazywać najmniejszy pasujący, rekomendowany i większy wariant,
- wizualizować ułożenie produktu w torbie,
- filtrować po typie torby, papierze, uchwycie i nośności,
- oferować presety, np. butelka 0,75 l, A4, kosmetyki, odzież i prezent,
- umożliwiać porównanie 2–3 formatów,
- dodawać wybrany rozmiar bezpośrednio do formularza wyceny,
- udostępniać plik wykrojnika, jeśli może być publiczny,
- jednoznacznie wyjaśniać kolejność wymiarów: szerokość × głębokość × wysokość.

W danych wykrojników istnieje opcjonalne pole uwag, ale nie jest prezentowane. Można je wykorzystać na komunikaty „mieści A4”, „na butelkę”, „polecany do pudełek kosmetycznych”.

## 3. Rozbudowa formularza ofertowego

Formularz w `src/pages/contact/index.astro` pyta obecnie tylko o imię, e-mail, telefon i wiadomość. Handlowiec musi więc niemal zawsze ponownie pytać o podstawowe parametry.

Formularz powinien zbierać:

- firmę i opcjonalnie NIP,
- rodzaj produktu,
- wybrany format albo wymiary,
- nakład,
- papier i gramaturę,
- kolor,
- typ uchwytu,
- technikę i liczbę kolorów nadruku,
- nadruk jedno- lub dwustronny,
- uszlachetnienia,
- termin,
- kod pocztowy dostawy,
- projekt lub logo,
- preferowaną formę kontaktu.

Dodatkowo należy wdrożyć:

- wieloetapowy formularz z zapisem stanu,
- walidację i czytelne błędy,
- Cloudflare Turnstile lub podobną ochronę antyspamową,
- automatyczne potwierdzenie e-mail,
- numer sprawy,
- deklarowany czas odpowiedzi, ale tylko jeśli firma może go dotrzymać,
- krótką informację o przetwarzaniu danych i link do polityki prywatności,
- osobną, nieobowiązkową zgodę marketingową.

## 4. Podgląd nadruku 2D

Pełny konfigurator 3D nie powinien być pierwszym krokiem. Tańszy i praktyczniejszy będzie kreator 2D:

- wybór modelu i koloru torby,
- przesłanie logo,
- przesuwanie i skalowanie nadruku,
- wybór jednej lub dwóch stron,
- pokazanie bezpiecznego pola nadruku,
- orientacyjny podgląd efektu,
- wygenerowanie PDF z konfiguracją.

Podgląd nie może być przedstawiany jako finalny plik produkcyjny. Finalną wizualizację powinien zatwierdzić grafik. [Appe Studio](https://appestudio.pl/) mocno komunikuje darmową wizualizację i pomoc graficzną, dlatego MER Plus powinien pokazać tę część procesu wcześniej.

## 5. Zamawianie próbek

W tej branży klient chce dotknąć papieru, sprawdzić sztywność, fakturę, kolor, uchwyt i jakość nadruku. Warto wdrożyć osobny proces zamawiania próbnika:

- próbki papierów i gramatur,
- przykłady uchwytów,
- próbki nadruków i uszlachetnień,
- wybór branży klienta,
- płatność za przesyłkę lub kaucja odliczana od zamówienia,
- przypisanie próbki do późniejszej wyceny.

CTA „Zamów próbnik” powinno występować na stronach produktowych, w realizacjach i konfiguratorze.

## 6. Wiarygodność i social proof

Opinie w `src/components/Reviews.astro` mają imiona z inicjałami i wszystkie ocenę 5/5. Bez źródła, daty i firmy wyglądają jak tekst marketingowy.

Rekomendowane elementy:

- aktualna średnia i liczba opinii Google z linkiem do źródła,
- nazwa firmy, branża albo miasto klienta,
- zdjęcie realizacji powiązane z opinią,
- logotypy klientów publikowane za zgodą,
- krótkie studia przypadku,
- zdjęcia zakładu, maszyn i zespołu,
- film pokazujący produkcję,
- konkretne liczby: liczba projektów, formatów, kraje wysyłki, typowe nakłady, terminowość i czas odpowiedzi.

Należy ujednolicić adres wizytówki Google. `src/data/client.ts` zawiera ogólny link do Google Maps, podczas gdy `src/components/FloatingContact.astro` ma inny, konkretny adres.

## 7. Portfolio jako narzędzie sprzedażowe

`src/pages/nasze-realizacje.astro` deklaruje ponad 90 realizacji, ale pokazuje tylko sześć kart. Każda mocna realizacja powinna mieć:

- branżę i cel klienta,
- wyzwanie,
- format i konstrukcję,
- papier i gramaturę,
- technikę nadruku,
- uszlachetnienia,
- nakład lub przedział nakładu,
- czas realizacji,
- kilka zdjęć detali,
- opinię klienta,
- CTA „Chcę podobną realizację”.

Najlepsze projekty warto opublikować jako oddzielne, indeksowalne studia przypadku.

## 8. Strony produktowe

Obecne strony mają wartościową treść, ale użytkownik musi czytać ją liniowo. Na początku każdej strony powinien pojawić się zwarty blok decyzyjny:

- dostępne formaty,
- minimalny nakład,
- typowy czas realizacji,
- papiery i gramatury,
- rodzaje uchwytów,
- techniki nadruku,
- uszlachetnienia,
- dostępność próbek,
- poziom cenowy lub przycisk konfiguracji.

Należy dodać tabelę porównującą warianty Standard, Premium i Eko oraz przyciski uruchamiające formularz z uzupełnionym typem produktu.

Hasła „bez minimum” i „realizacja od 3 dni” powinny być doprecyzowane, jeżeli dotyczą tylko części produktów albo technologii.

## 9. Strona główna i pozycjonowanie marki

Pierwszy ekran jest estetyczny, ale obietnica firmy jest szeroka. Należy wybrać najważniejszą, prawdziwą i rentowną przewagę, np.:

- produkcja od małych nakładów,
- brak minimum dla określonych produktów,
- szybkie terminy,
- własna produkcja,
- premium i ręczne wykończenia,
- nietypowe formaty,
- ponad 30 lat doświadczenia,
- wsparcie graficzne.

Przykładowy kierunek komunikatu:

> Torby reklamowe dopasowane do Twojego produktu. Własna produkcja, 124 gotowe formaty i pomoc od doboru rozmiaru po finalny nadruk.

Główne CTA:

1. Znajdź rozmiar.
2. Wyceń projekt.
3. Zamów próbki.

## 10. Landing pages dla branż

Warto przygotować rozbudowane strony dla:

- kosmetyków,
- butików i fashion,
- alkoholi i wina,
- gastronomii,
- eventów i konferencji,
- agencji reklamowych,
- opakowań prezentowych,
- sklepów internetowych.

Nie powinny być to płytkie strony SEO. Każda musi zawierać właściwe formaty, realizacje, wymagania, rekomendowane materiały, typowe nakłady i odpowiednie CTA.

## 11. Blog i centrum wiedzy

Projekt zawiera 44 artykuły polskie i 44 angielskie. Polskie wpisy mają średnio około 286 słów; 26 z 44 ma mniej niż 250 słów, 39 z 44 mniej niż 400, a 41 z 44 ma pustą listę tagów. Wiele tematów pokrywa się ze sobą.

Zamiast publikować kolejne krótkie teksty należy zbudować większe centra tematyczne:

- kompletny przewodnik po torbach papierowych,
- dobór rozmiaru,
- porównanie technik nadruku,
- papiery, gramatury i nośność,
- uchwyty i wykończenia,
- przygotowanie pliku produkcyjnego,
- opakowania zgodne z PPWR,
- opakowania Standard vs Premium.

Krótkie wpisy należy połączyć, uzupełnić o autorskie zdjęcia, dane techniczne, tabele, schematy i doświadczenie produkcyjne firmy. Karty bloga powinny używać zdjęć z frontmatteru.

Audyt SEO wykrywa również identyczny wynikowy tytuł „Blog — MER Plus” dla polskiego i angielskiego indeksu bloga.

## 12. Centrum PPWR i dokumentacji

Rozporządzenie PPWR stosuje się od 12 sierpnia 2026 r. Aktualny tekst: [EUR-Lex](https://eur-lex.europa.eu/eli/reg/2025/40/oj).

MER Plus może przygotować centrum informacji dla działów zakupów:

- pochodzenie i parametry papieru,
- informacje o recyklingu,
- wpływ laminowania i uszlachetnień,
- dokumentacja dla materiałów mających kontakt z żywnością, jeśli dotyczy,
- certyfikaty i deklaracje dostawców,
- pliki techniczne,
- FAQ dotyczące zgodności.

Określenia „ekologiczny” i „biodegradowalny” powinny być używane wyłącznie z precyzyjnym wyjaśnieniem i dokumentacją.

## 13. CRM i automatyzacja

Docelowy proces:

```text
Formularz lub konfigurator
        ↓
CRM i numer zapytania
        ↓
Automatyczne potwierdzenie klientowi
        ↓
Zadanie dla handlowca z terminem
        ↓
Wycena i follow-up
        ↓
Wygrane lub przegrane zamówienie
```

Można użyć HubSpot, Pipedrive lub obecnego systemu firmy. Lead powinien zawierać konfigurację, źródło ruchu, kampanię, język, produkt, nakład, termin i linki do plików.

## 14. Panel klienta i ponowienie zamówienia

Jako dalszy etap warto rozważyć panel B2B:

- historia projektów,
- zatwierdzone pliki,
- parametry i kolory Pantone,
- ponowienie zamówienia,
- zmiana nakładu,
- status realizacji,
- dokumenty i wizualizacje,
- zgłoszenie korekty.

Może to zwiększyć retencję i ograniczyć błędy przy powtarzalnych zamówieniach.

## 15. Analityka konwersji

Google Tag Manager jest ładowany w `src/layouts/BaseLayout.astro`, ale należy wdrożyć pełny lejek zdarzeń:

- `quote_start`,
- `quote_step_complete`,
- `quote_submit`,
- `size_search`,
- `size_selected`,
- `file_uploaded`,
- `sample_order`,
- `phone_click`,
- `email_click`,
- `case_study_view`,
- `technical_file_download`,
- `language_switch`.

Kluczowe KPI:

- rozpoczęcie i ukończenie wyceny,
- kwalifikowane leady,
- średni czas odpowiedzi,
- konwersja wycena → zamówienie,
- przychód według źródła,
- udział powtarzalnych zamówień,
- najczęściej wybierane formaty i nakłady.

## 16. Pilne: cookies i Consent Mode

GTM ładuje się bezwarunkowo, a w projekcie nie znaleziono kompletnego CMP ani Consent Mode. Należy wdrożyć:

- panel zarządzania zgodami,
- właściwy domyślny stan zgody,
- blokowanie odpowiednich tagów do czasu decyzji,
- Consent Mode v2, w tym `ad_user_data` i `ad_personalization`,
- możliwość późniejszej zmiany decyzji,
- weryfikację GA4 i Google Ads.

Dokumentacja: [Google Consent Mode](https://developers.google.com/tag-platform/security/guides/consent) oraz [materiał UODO](https://uodo.gov.pl/file/5869).

## 17. Mniejsze problemy UX i techniczne

- Polski breadcrumb na stronie kontaktu pokazuje angielskie „Contact”; logika znajduje się w `src/components/Banner.astro`.
- Logo w `src/components/Header.astro` zawsze prowadzi do `/`, więc z wersji EN przenosi na polską stronę główną.
- Skip link w `src/layouts/BaseLayout.astro` jest po polsku również na stronach angielskich.
- Przyciski w `src/components/FloatingContact.astro` zajmują zbyt dużo miejsca na telefonach; lepszy będzie kompaktowy dolny pasek „Zadzwoń / Wycena”.
- NIP nie musi zajmować miejsca w głównej nawigacji; można przenieść go do stopki.
- Część zdjęć blogowych jest ładowana ze starego WordPressa, co tworzy zależność od starego hostingu i omija optymalizację Astro.
- W repozytorium są źródłowe obrazy PNG o rozmiarze 6–14 MB; używane należy optymalizować, a zbędne archiwizować.
- Warto dodać przetestowane nagłówki CSP i HSTS.
- Formularz powinien mieć obsługę błędów, potwierdzenie, ochronę antyspamową i monitoring dostarczania wiadomości.

## 18. Migracja publicznej wersji

Podczas analizy publiczny adres [merplus.pl/torby-papierowe](https://merplus.pl/torby-papierowe/) nadal zwracał starą wersję WordPress. Jeśli projekt Astro nie został jeszcze wdrożony, migracja jest priorytetem zero.

Przed uruchomieniem należy zweryfikować:

- mapę starych i nowych adresów,
- przekierowania 301 bez pętli i łańcuchów,
- zależności od obrazów WordPressa,
- canonical i hreflang,
- Search Console,
- sitemapę i robots.txt,
- formularze w środowisku produkcyjnym,
- GTM i zgody,
- schema JSON-LD,
- indeksację po migracji.

## Czego obecnie nie budować

- Generycznego chatbota AI, który mógłby podawać błędne ceny lub terminy.
- Drogiego konfiguratora 3D przed uporządkowaniem danych produktowych i cenników.
- Pełnego sklepu dla całkowicie niestandardowych produktów.
- Kolejnych krótkich artykułów SEO.
- Agresywnych popupów uruchamianych od razu po wejściu.
- Obowiązkowego pozostawienia danych przed pokazaniem użytecznej rekomendacji.
- Informacji o stanach magazynowych, jeśli nie są synchronizowane automatycznie.

## Rekomendowana kolejność wdrożenia

### Etap 1 — 1–2 tygodnie

- CMP i Consent Mode v2.
- Naprawa problemów językowych i duplikatu tytułu bloga.
- Ujednolicenie linków Google Maps.
- Doprecyzowanie głównej obietnicy marki.
- Weryfikowalne opinie, logotypy i dane liczbowe.
- Rozbudowa formularza i upload pliku.
- Zdarzenia analityczne.
- Poprawa mobilnych CTA.

### Etap 2 — 3–6 tygodni

- Wyszukiwarka rozmiarów 2.0.
- Przenoszenie wybranego formatu do formularza.
- Wieloetapowy asystent wyceny.
- Automatyczne podsumowania e-mail.
- Integracja CRM.
- Numerowanie i statusowanie zapytań.

### Etap 3 — 6–10 tygodni

- Szczegółowe studia przypadku.
- Tabele porównawcze produktów.
- Zamawianie próbek.
- Centrum plików technicznych.
- Konsolidacja bloga.
- Centrum wiedzy PPWR.

### Etap 4 — 10–16 tygodni

- Podgląd nadruku 2D.
- Generowanie PDF konfiguracji.
- Automatyczne ceny dla standardowych wariantów.
- Panel powtarzalnych zamówień.

## Najważniejsza rekomendacja końcowa

Jeżeli można rozpocząć tylko jeden większy projekt, powinien nim być moduł:

> **Dobierz torbę i przygotuj wycenę — wyszukiwarka rozmiarów połączona z konfiguratorem i kompletnym formularzem ofertowym.**

MER Plus posiada już wartościowy zasób: bazę 124 wykrojników i szeroką wiedzę produkcyjną. Należy zamienić je z tabeli i tekstów w interaktywne narzędzie, które pomaga klientowi podjąć decyzję i przekazuje handlowcowi kompletne, kwalifikowane zapytanie.

## Instrukcja dla agenta wdrażającego

Przed rozpoczęciem implementacji agent powinien:

1. przeczytać `CLAUDE.md` i `audyt-seo-codex.md`,
2. sprawdzić aktualny stan repozytorium i nie nadpisywać istniejących zmian,
3. uzgodnić z właścicielem prawdziwe minima produkcyjne, terminy, warianty i reguły cenowe,
4. podzielić wdrożenie na małe, niezależnie testowalne etapy,
5. nie implementować automatycznych deklaracji cenowych ani środowiskowych bez zatwierdzonych danych,
6. po każdej zmianie uruchomić build, testy oraz audyt SEO,
7. przetestować formularze, analitykę i zgody również w środowisku produkcyjnym.
