/* ============================================================
   CONFIGURAZIONE CENTRALE — K Nails & Beauty Landing
   Modifica qui i dati principali: numeri, date, link.
   ============================================================ */
window.CONFIG = {

  /* --- Contatti --- */
  phoneDisplay: "+39 350 136 9266",   // numero mostrato a video
  phoneHref: "+393501369266",         // per link tel:
  whatsappNumber: "393501369266",     // per link wa.me
  whatsappDefaultText: "Buongiorno, vorrei informazioni sull'epilazione laser.",

  /* --- Brand / SEO --- */
  brandName: "K Nails & Beauty",
  city: "San Mauro Torinese (TO)",
  address: "Via Dora 1/A, 10099 San Mauro Torinese (TO)",
  mapsUrl: "https://maps.app.goo.gl/cptNTFhgbejLCfhMA",
  // Numero TOTALE (reale) di recensioni Google, per il badge. Aggiorna!
  googleReviewCount: 54,

  /* --- Timer Settimana Open ---
     Periodo promozionale reale (dal poster ufficiale):
       inizio = promoStart  → il countdown va all'apertura
       fine   = promoEnd    → dopo l'inizio, il countdown scade alla chiusura
     Il sito passa in modalità "offerte attive" tra queste due date. */
  promoStart: "2026-09-28T09:00:00",          // ISO locale (inizio Settimana Open)
  promoStartLabel: "28 Settembre 2026",       // testo mostrato per l'apertura
  promoEnd: "2026-10-05T19:00:00",            // ISO locale (fine Settimana Open)
  promoEndLabel: "5 Ottobre 2026",            // testo mostrato per la chiusura
  promoRangeLabel: "28 Settembre – 5 Ottobre 2026", // periodo completo
  promoRangeShort: "28 Set – 5 Ott 2026",     // versione corta per barra in alto

  /* --- Orari (da verificare) --- */
  hoursLabel: "Lun–Sab su appuntamento · 10:00 – 19:00",

  /* --- Link social --- */
  instagram: "https://www.instagram.com/knails_beauty_sanmaurotorinese/",
  facebook: "https://www.facebook.com/K-Nails-Beauty-100070584561350"
};

window.CONFIG.waBase = "https://wa.me/" + window.CONFIG.whatsappNumber;
window.CONFIG.waDefault = window.CONFIG.waBase + "?text=" + encodeURIComponent(window.CONFIG.whatsappDefaultText);
