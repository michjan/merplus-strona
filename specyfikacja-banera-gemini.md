# Specyfikacja grafiki banera — prompt dla Gemini (Nano Banana)

## Cel
Wygenerować tło banera używanego pod tytułami podstron (np. "O NAS", "USŁUGI", "KONTAKT") na stronie MER Plus — producenta toreb papierowych.

## Dane wejściowe
Do promptu dołącz 1 zdjęcie torby (z folderu `src/assets/images/gallery/`), które ma być bohaterem grafiki.

## Wymiary docelowe
- **1920 x 320 px** (proporcje ok. 6:1)
- Orientacja pozioma, format JPG

---

## PROMPT (do wklejenia do Gemini, razem ze zdjęciem torby)

```
Stwórz szerokie, panoramiczne zdjęcie banerowe w proporcjach 6:1 (1920x320 px) 
na podstawie załączonego zdjęcia torby papierowej.

Wymagania:
1. Torba z załączonego zdjęcia ma być głównym elementem kompozycji, 
   umieszczona po prawej stronie kadru, częściowo wychodząca poza kadr 
   lub kadrowana w dynamiczny, zbliżony sposób.
2. Tło: ciemnogranatowe (kolor #1B3A6B), eleganckie, stonowane, 
   z delikatnym gradientem od głębokiego granatu po lewej stronie 
   do nieco jaśniejszego granatu/cienia po prawej, tam gdzie znajduje się torba.
3. Lewa strona kadru (ok. 50-60% szerokości) powinna pozostać 
   stosunkowo "czysta" / jednolita w kolorze granatowym — to przestrzeń 
   na nałożenie tekstu (tytułu strony) w późniejszym etapie, 
   więc NIE umieszczaj tam żadnego tekstu, napisów ani elementów graficznych.
4. Styl: nowoczesny, minimalistyczny, premium, profesjonalny — 
   pasujący do strony firmy produkującej eleganckie torby papierowe 
   reklamowe i prezentowe.
5. Oświetlenie: miękkie, studyjne, podkreślające fakturę i kolory torby.
6. Brak ludzi, brak dodatkowych przedmiotów — tylko torba i tło.
7. Brak tekstu, logo, znaków wodnych w obrazie.
8. Całość ma być spójna kolorystycznie z granatowym tłem strony 
   (kolor marki: #1B3A6B).
```

---

## Po wygenerowaniu obrazu

1. Zapisz plik jako JPG, jakość 70-80%, docelowo poniżej 200 KB.
2. Wrzuć plik do folderu `src/assets/images/` (np. pod nazwą `banner-bg.jpg`).
3. Prześlij mi nazwę pliku — podepnę go w komponencie `Banner.astro`, 
   żeby pojawił się automatycznie na wszystkich podstronach 
   (z tekstem tytułu i breadcrumbem nałożonym programowo, 
   białą czcionką, po lewej stronie).

## Uwaga
Jeśli chcesz przygotować kilka wariantów (różne torby), 
powtórz proces dla każdego zdjęcia i prześlij mi wszystkie pliki — 
wybierzemy razem najlepszy albo zrobimy kilka wersji do testów.
