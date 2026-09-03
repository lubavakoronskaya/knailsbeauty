# K Nails & Beauty — Landing “Settimana Open” Epilazione Laser 🇮🇹

Landing page singola in italiano, ottimizzata per SEO e conversioni.
Palette dal poster ufficiale del centro: teal `#106860`, inchiostro `#111`, crema.

Campagna reale: **Settimana Open dal 28 settembre al 5 ottobre 2026** · laser a diodo,
percorsi da 10 sedute fino a −48%, prova e consulenza gratuite, 3 rate a interessi zero.

## Struttura

```
├── index.html          → pagina principale (SEO head + sezioni)
├── css/style.css       → stili
├── js/
│   ├── main.js         → countdown, slider recensioni, menu, reveal, FAQ…
│   └── data/
│       ├── config.js   → ★ numeri, date, link, orari (modifica qui)
│       └── reviews.js  → ★ 20 recensioni Google reali (a 5 stelle)
├── assets/favicon.svg
├── assets/logo.jpeg               → logo ufficiale (header, footer, favicon)
├── assets/settimana-open-poster.jpg   → locandina ufficiale (solo riferimento colore, NON mostrata sul sito)
├── robots.txt / sitemap.xml / 404.html / humans.txt
└── README.md
```

## ⚠️ Prima di pubblicare: TODO (importanti)

1. **Recensioni reali** — `js/data/reviews.js` ora contiene **20 recensioni vere**
   (5 stelle, da Google; `date` = anno approssimativo). Per aggiungerne altre copia
   un blocco `{…}`: slider e badge si aggiornano da soli.
2. **Numero recensioni Google** — impostato a **54** in `js/data/config.js`
   (`googleReviewCount`) e nello schema `AggregateRating` di `index.html`: aggiornalo se cambia.
3. **Dominio** — sostituisci `https://www.knailsbeauty.it/` in `index.html`
   (canonical, Open Graph, JSON-LD), `robots.txt` e `sitemap.xml`.
4. **Codici tracking** — in testa a `index.html` ci sono i *template* commentati di
   Google Analytics 4 e Meta Pixel: incolla i tuoi codici reali. Inserisci anche il
   codice di verifica Google Search Console (`google-site-verification`).
5. **Locandina ufficiale** — `assets/settimana-open-poster.jpg` **non è più mostrata**
   sul sito (rimossa su richiesta): resta nel progetto solo come riferimento di colori e offerta.
6. **⚠️ Percentuali di sconto** — la locandina stampata dichiara “FINO A 40% OFF”, mentre
   i pacchetti inseriti arrivano al −48%. Sul sito i tag delle card mostrano i valori esatti
   (−43%, −45%, −48%) e l'hero dice “Sconto fino a −48%”. Se il centro vuole allinearsi
   alla locandina (40%), riduci i valori in `index.html` (hero + card + meta title).
7. **Orari** — `hoursLabel` in `config.js` è un valore di prova: confermalo.
8. **Prezzi “esempio”** nella tabella Prezzi (`#prezzi`) sono **indicativi**: allineali
   al listino reale del centro prima della pubblicazione.
9. **Numero telefonico / WhatsApp** già impostati: `+39 350 136 9266`.
10. **P.IVA** — inseriscila nel footer (`Partita IVA: da inserire`) e nei modali legali.
11. **Og-image** — consiglio: sostituisci l’og:image con un’immagine locale (1200×630).

## Timer (3 fasi automatiche)
Le date sono in `js/data/config.js`:
- `promoStart` = `2026-09-28T09:00:00` — fino a questa data il countdown mostra il tempo
  mancante all'apertura della Settimana Open;
- tra `promoStart` e `promoEnd` (`2026-10-05T19:00:00`) il countdown mostra il tempo
  rimanente alla chiusura (urgenza: “Settimana Open attiva — prezzi validi fino al …”);
- dopo `promoEnd` la pagina mostra “Settimana Open conclusa” con invito a contattare.

## Come provare in locale
Apri `index.html` direttamente nel browser, oppure da terminale nella cartella:
```
python3 -m http.server 8080
```
poi visita `http://localhost:8080`.

## Deploy (consigliati)
Il sito è statico: puoi pubblicarlo gratis su **Netlify / Vercel / GitHub Pages** oppure
nel web hosting attuale del centro. Carica i file così come sono (mantenendo la struttura).

## SEO già presente
Meta title/description/keywords, Open Graph, Twitter Card, canonical, JSON-LD
(`HealthAndBeautyBusiness`, `Offer/Product`, `FAQPage`, `AggregateRating`), heading
semantici, alt testuali, `robots.txt` + `sitemap.xml`, 404 personalizzata,
immagini lazy con dimensioni esplicite.
