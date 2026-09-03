/* ============================================================
   K Nails & Beauty — main.js
   Countdown, slider recensioni, reveal, header, menu mobile, FAQ,
   modale note legali.
   ============================================================ */
(function () {
  "use strict";

  var C = window.CONFIG || {};
  var R = window.REVIEWS || [];
  var prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Anno footer ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Header sticky ---------- */
  var headerMain = document.getElementById("headerMain");
  var onScroll = function () {
    if (!headerMain) return;
    headerMain.classList.toggle("is-sticky", window.scrollY > 8);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Menu mobile ---------- */
  var burger = document.getElementById("navBurger");
  var nav = document.getElementById("nav");
  if (burger && nav) {
    var closeNav = function () {
      nav.classList.remove("open");
      burger.classList.remove("open");
      burger.setAttribute("aria-expanded", "false");
      document.body.classList.remove("menu-open");
      document.body.style.overflow = "";
    };
    burger.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      burger.classList.toggle("open", open);
      burger.setAttribute("aria-expanded", String(open));
      document.body.classList.toggle("menu-open", open);
      document.body.style.overflow = open ? "hidden" : "";
    });
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", closeNav);
    });
    nav.querySelectorAll("[data-nav-close]").forEach(function (b) {
      b.addEventListener("click", closeNav);
    });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeNav(); });
  }

  /* ---------- Reveal on scroll ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !prefersReduced) {
    var ro = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("in");
          ro.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach(function (el) { ro.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- Evidenzia link attivo nel menu ---------- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".nav a"));
  if ("IntersectionObserver" in window && navLinks.length) {
    var ids = navLinks.map(function (a) { return a.getAttribute("href").replace("#", ""); });
    var byId = {};
    ids.forEach(function (id) { var el = document.getElementById(id); if (el) byId[id] = el; });
    var secObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        navLinks.forEach(function (a) { a.classList.remove("active"); });
        var link = navLinks.find(function (a) { return a.getAttribute("href") === "#" + en.target.id; });
        if (link) link.classList.add("active");
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    Object.keys(byId).forEach(function (id) { secObs.observe(byId[id]); });
  }

  /* ---------- Countdown Settimana Open (28 Set – 5 Ott) ---------- */
  var cdD = document.getElementById("cdD"),
      cdH = document.getElementById("cdH"),
      cdM = document.getElementById("cdM"),
      cdS = document.getElementById("cdS"),
      countdownEl = document.getElementById("countdown"),
      noteEl = document.getElementById("countdownNote"),
      cdLabelEl = document.getElementById("cdLabel");
  var targetStart = C.promoStart ? new Date(C.promoStart).getTime() : NaN;
  var targetEnd = C.promoEnd ? new Date(C.promoEnd).getTime() : NaN;
  var topMsg = document.querySelector(".topbar__msg strong");
  if (topMsg && C.promoRangeShort) topMsg.textContent = C.promoRangeShort;

  function pad(n) { return String(n).padStart(2, "0"); }

  function setNums(diff) {
    var d = Math.floor(diff / 864e5);
    var h = Math.floor((diff % 864e5) / 36e5);
    var m = Math.floor((diff % 36e5) / 6e4);
    var s = Math.floor((diff % 6e4) / 1e3);
    if (cdD) cdD.textContent = pad(d);
    if (cdH) cdH.textContent = pad(h);
    if (cdM) cdM.textContent = pad(m);
    if (cdS) cdS.textContent = pad(s);
  }

  function renderCountdown() {
    if (!countdownEl) return;
    var now = Date.now();
    if (isNaN(targetStart)) { countdownEl.textContent = "—"; return; }
    var startDiff = targetStart - now;
    var endDiff = isNaN(targetEnd) ? 0 : targetEnd - now;

    // Fase 1 — attesa dell'apertura della Settimana Open
    if (startDiff > 0) {
      countdownEl.classList.remove("countdown--ended");
      if (cdLabelEl) cdLabelEl.textContent = "Le offerte si attivano il " + C.promoStartLabel;
      if (noteEl) noteEl.textContent = "Manca poco: prenota prima e blocca il prezzo promozionale.";
      setNums(startDiff);
      return;
    }
    // Fase 2 — Settimana Open ATTIVA (conto alla rovescia verso la chiusura)
    if (endDiff > 0) {
      countdownEl.classList.remove("countdown--ended");
      if (cdLabelEl) cdLabelEl.textContent = "Settimana Open attiva — prezzi validi fino al " + C.promoEndLabel;
      if (noteEl) noteEl.textContent = "Offerte valide solo fino al " + C.promoEndLabel + " · posti limitati · chiama ora: " + C.phoneDisplay;
      setNums(endDiff);
      countdownEl.setAttribute("aria-live", "polite");
      return;
    }
    // Fase 3 — Settimana Open conclusa
    countdownEl.classList.add("countdown--ended");
    if (cdLabelEl) cdLabelEl.textContent = "Settimana Open conclusa";
    if (noteEl) noteEl.textContent = "La Settimana Open si è conclusa: contattaci per le prossime promozioni.";
    if (cdD) cdD.textContent = "00";
    if (cdH) cdH.textContent = "00";
    if (cdM) cdM.textContent = "00";
    if (cdS) cdS.textContent = "00";
    countdownEl.setAttribute("aria-live", "polite");
  }
  renderCountdown();
  window.setInterval(renderCountdown, 1000);

  /* ---------- Imposta CTA WhatsApp precompilati (se non già con testo) ---------- */
  function waHref(text) {
    return C.waBase + "?text=" + encodeURIComponent(text);
  }

  /* ---------- Slider Recensioni ---------- */
  var reviewsEl = document.getElementById("reviews");
  var track = document.getElementById("reviewsTrack");
  var dotsWrap = document.getElementById("reviewsDots");
  var emptyNote = document.getElementById("reviewsEmpty");
  var countLabel = document.getElementById("reviewCountLabel");

  var slider = (function () {
    if (!reviewsEl || !track) return null;
    var cards = [];
    var index = 0, perView = 1, cardGap = 0, cardW = 0, maxIndex = 0, pages = 1;
    var autoTimer = null;

    function stars(n) {
      var s = "";
      for (var i = 0; i < (n || 5); i++) s += "★";
      for (var i = (n || 5); i < 5; i++) s += "☆";
      return s;
    }

    function build() {
      track.innerHTML = "";
      cards = [];
      // Numero TOTALE di recensioni reali su Google (da CONFIG),
      // non quante sono mostrate nello slider (sample).
      var totalCount = (typeof C.googleReviewCount === "number" && C.googleReviewCount > 0)
        ? C.googleReviewCount : R.length;
      if (!R.length) {
        reviewsEl.hidden = true;
        if (dotsWrap) dotsWrap.hidden = true;
        if (emptyNote) emptyNote.hidden = false;
        if (countLabel) countLabel.textContent = String(totalCount);
        return;
      }
      reviewsEl.hidden = false;
      if (emptyNote) emptyNote.hidden = true;
      if (countLabel) countLabel.textContent = String(totalCount);

      R.forEach(function (r, i) {
        var card = document.createElement("article");
        card.className = "review";

        var head = document.createElement("div");
        head.className = "review__head";
        var av = document.createElement("span");
        av.className = "review__avatar";
        av.textContent = (r.name || "?").trim().charAt(0).toUpperCase();
        var nm = document.createElement("div");
        var nameEl = document.createElement("div");
        nameEl.className = "review__name";
        nameEl.textContent = r.name || "Cliente Google";
        var dateEl = document.createElement("div");
        dateEl.className = "review__date";
        dateEl.textContent = r.date || "";
        nm.appendChild(nameEl); nm.appendChild(dateEl);
        head.appendChild(av); head.appendChild(nm);

        var st = document.createElement("div");
        st.className = "review__stars";
        st.textContent = stars(r.rating);

        var tx = document.createElement("p");
        tx.className = "review__text";
        tx.textContent = r.text || "";

        var via = document.createElement("div");
        via.className = "review__via";
        var g = document.createElement("span");
        g.className = "g";
        g.textContent = "G";
        via.appendChild(g);
        via.appendChild(document.createTextNode("Recensione Google"));

        card.appendChild(head); card.appendChild(st); card.appendChild(tx); card.appendChild(via);
        track.appendChild(card);
        cards.push(card);
      });
    }

    function measure() {
      var viewport = reviewsEl.querySelector(".reviews__viewport");
      if (!viewport || !cards.length) return;
      var gap = parseFloat(getComputedStyle(track).columnGap) || parseFloat(getComputedStyle(track).gap) || 0;
      cardGap = isNaN(gap) ? 0 : gap;
      cardW = cards[0].offsetWidth || 1;
      var vw = viewport.clientWidth;
      perView = Math.max(1, Math.round((vw + cardGap) / (cardW + cardGap)));
      perView = Math.min(perView, cards.length);
      maxIndex = Math.max(0, cards.length - perView);
      if (index > maxIndex) index = maxIndex;
      pages = Math.max(1, Math.ceil(cards.length / perView));
      buildDots();
      go(index, true);
    }

    function go(i, instant) {
      i = Math.max(0, Math.min(i, maxIndex));
      index = i;
      if (track) {
        track.style.transition = instant ? "none" : "";
        track.style.transform = "translateX(" + (-index * (cardW + cardGap)) + "px)";
      }
      updateDots();
    }

    function step(dir) {
      var next = index + dir;
      if (next > maxIndex) next = 0;
      if (next < 0) next = maxIndex;
      go(next);
    }
    function goPage(p) { go(p * perView); }

    function buildDots() {
      if (!dotsWrap) return;
      dotsWrap.innerHTML = "";
      for (var p = 0; p < pages; p++) {
        var b = document.createElement("button");
        b.setAttribute("aria-label", "Vai alla pagina " + (p + 1));
        b.addEventListener("click", function (pp) { return function () { goPage(pp); resetAuto(); }; }(p));
        dotsWrap.appendChild(b);
      }
    }
    function updateDots() {
      if (!dotsWrap) return;
      var active = Math.floor(index / perView);
      Array.prototype.forEach.call(dotsWrap.children, function (b, i) {
        b.classList.toggle("active", i === active);
      });
    }

    function startAuto() {
      if (prefersReduced || cards.length <= perView) return;
      stopAuto();
      autoTimer = window.setInterval(function () {
        if (index >= maxIndex) go(0); else go(index + 1);
      }, 4500);
    }
    function stopAuto() { if (autoTimer) { window.clearInterval(autoTimer); autoTimer = null; } }
    function resetAuto() { startAuto(); }

    return {
      init: function () {
        build();
        if (!cards.length) return;
        measure();
        window.addEventListener("resize", measure);
        var prev = document.getElementById("reviewsPrev");
        var next = document.getElementById("reviewsNext");
        if (prev) prev.addEventListener("click", function () { step(-1); resetAuto(); });
        if (next) next.addEventListener("click", function () { step(1); resetAuto(); });
        var vp = reviewsEl.querySelector(".reviews__viewport");
        if (vp) {
          vp.addEventListener("mouseenter", stopAuto);
          vp.addEventListener("mouseleave", startAuto);
          vp.addEventListener("touchstart", stopAuto, { passive: true });
        }
        startAuto();
      },
      refresh: measure
    };
  })();

  if (slider) slider.init();

  /* ---------- Modale note legali ---------- */
  var modal = document.getElementById("legalModal");
  var legalContent = document.getElementById("legalContent");
  var legalTexts = {
    privacy: {
      t: "Privacy & Cookie Policy",
      h: [
        "Informativa Privacy",
        "Il Titolare del trattamento è K Nails & Beauty, Via Dora 1/A, 10099 San Mauro Torinese (TO). I dati forniti (es. nome e telefono) vengono utilizzati esclusivamente per gestire la tua richiesta di prenotazione o preventivo e non vengono ceduti a terzi. Puoi richiederne in qualsiasi momento la modifica o la cancellazione contattandoci.",
        "Cookie",
        "Questo sito utilizza cookie tecnici ed eventualmente cookie di misurazione (analytics) e marketing, previo tuo consenso. Puoi gestire le preferenze dal tuo browser. Continuando la navigazione accetti l'uso dei cookie tecnici."
      ]
    },
    terms: {
      t: "Termini & Condizioni offerta",
      h: [
        "Termini e condizioni dell'offerta promozionale",
        "Le offerte indicate sono valide dal 28 settembre al 5 ottobre 2026 (Settimana Open) e fino a esaurimento posti disponibili nel centro. I prezzi promozionali si riferiscono a percorsi di 10 sedute di epilazione laser a diodo e non sono cumulabili con altre promozioni o sconti. La prova e la consulenza sono gratuite.",
        "Pagamento",
        "È possibile suddividere il pagamento in 3 rate a interessi zero secondo le modalità indicate in sede di prenotazione.",
        "Note",
        "La risposta al trattamento varia in base a fototipo, tipo di pelo e area trattata: il risultato non è garantibile al 100% per ogni persona. Per le controindicazioni consultare il personale prima della prima seduta."
      ]
    }
  };
  function openLegal(key) {
    if (!modal || !legalContent) return;
    var data = legalTexts[key];
    if (!data) return;
    legalContent.innerHTML = "";
    var h3 = document.createElement("h3"); h3.textContent = data.t; legalContent.appendChild(h3);
    data.h.forEach(function (block, i) {
      if (block.indexOf("?") === -1 && i % 2 === 1) {
        var h4 = document.createElement("h4"); h4.textContent = block; legalContent.appendChild(h4);
      } else {
        var p = document.createElement("p"); p.textContent = block; legalContent.appendChild(p);
      }
    });
    modal.hidden = false;
    document.body.style.overflow = "hidden";
  }
  function closeLegal() {
    if (modal) modal.hidden = true;
    document.body.style.overflow = "";
  }
  document.querySelectorAll("[data-open-legal]").forEach(function (b) {
    b.addEventListener("click", function (e) { e.preventDefault(); openLegal(b.getAttribute("data-open-legal")); });
  });
  document.querySelectorAll("[data-close-legal]").forEach(function (b) {
    b.addEventListener("click", closeLegal);
  });
  if (modal) {
    modal.addEventListener("click", function (e) { if (e.target === modal) closeLegal(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeLegal(); });
  }

  /* Esponiamo una piccola API per debug/aggiornamenti */
  window.KNails = {
    reviews: R,
    reloadReviews: function () { if (slider) slider.refresh(); },
    config: C,
    wa: waHref
  };
})();
