// ORIGINS — Maxing 72/74 · real unit data
// Sources:
//  - Vermessungsplan Maxingstraße 72 (CAD Office Müllner, 14.03.2022 / 026_778)
//  - Vermessungsplan Maxingstraße 74 (CAD Office Müllner, 21.11.2022 / 085_450)
//  - Photo sessions PR0304–PR0313 (CAM04241G0)
//
// Areas are NGF (Nutzfläche aus Bestandsplan). The brief's marketed total
// (1.108,51 m²) is a Zinslisten-Nutzfläche which can be < NGF.

window.ORIGINS_DATA = (function () {

  // ---- Image URL resolver: resolves logical path to data URI when inlined ----
  window.imgSrc = (path) => {
    if (!path) return "";
    if (typeof window.ORIGINS_IMAGES === "object" && window.ORIGINS_IMAGES[path]) {
      return window.ORIGINS_IMAGES[path];
    }
    return path;
  };

  // ---- PR-Sessions index ----
  // For each photo group, we record kind + count + a representative caption.
  const PR = {
    '72-PR0304': { count: 5, kind: 'interior',  cap: 'Innenraum · originaler Zustand' },
    '72-PR0305': { count: 5, kind: 'interior',  cap: 'Wohnung · Parkett, Küche' },
    '72-PR0306': { count: 3, kind: 'entrance',  cap: 'Wohnungseingang Top 9 · Stiegenhaus' },
    '72-PR0307': { count: 6, kind: 'entrance',  cap: 'Wohnungseingang Top 7 · Stiegenhaus' },
    '72-PR0308': { count: 4, kind: 'exterior',  cap: 'Haus 72 · Hauseingang & Allgemeinflächen' },
    '72-PR0310': { count: 2, kind: 'interior',  cap: 'Bad und Küche · Bestand' },
    '74-PR0306': { count: 1, kind: 'interior',  cap: 'Wohnzimmer · Parkett' },
    '74-PR0307': { count: 1, kind: 'entrance',  cap: 'Wohnungseingang Top 7' },
    '74-PR0308': { count: 1, kind: 'exterior',  cap: 'Haus 74 · Hauseingang' },
    '74-PR0310': { count: 4, kind: 'interior',  cap: 'Küche und Vorraum · Bestand' },
    '74-PR0311': { count: 8, kind: 'interior',  cap: 'Wohnung · Originalzustand, durchgehend' },
    '74-PR0313': { count: 8, kind: 'interior',  cap: 'Wohnung · Originalzustand, durchgehend' },
  };

  // Build [{ src, alt }] for a list of PR codes
  function photos(prCodes) {
    const out = [];
    for (const code of prCodes) {
      const grp = PR[code];
      if (!grp) continue;
      for (let i = 1; i <= grp.count; i++) {
        out.push({ src: `assets/photos/${code}-${i}.jpg`, alt: grp.cap, kind: grp.kind });
      }
    }
    return out;
  }

  // Per-unit definitions. Each unit has:
  //   code, haus, top (original), floor (label), floorIdx, size, type, status,
  //   orientation, rooms, ceiling, year, plan (path), photos (array)
  const units = [
    // ============================================================
    // HAUS 72 — 9 Einheiten
    // ============================================================
    {
      code: "M72-01", haus: "72", top: "Top GL 2",
      floor: "KG", floorIdx: 0, size: 35.19,
      type: "Geschäftslokal", status: "vermietet",
      orientation: "Straße", rooms: 2, ceiling: 2.35, year: 1908,
      plan: "assets/plans/M72-01.jpg",
      hint: "Verkaufsraum 19,67 m² + Küche · Vorplatz 46,60 m²",
      photos: photos(['72-PR0308'])
    },
    {
      code: "M72-02", haus: "72", top: "Top 1",
      floor: "KG", floorIdx: 0, size: 26.26,
      type: "Wohnung", status: "available",
      orientation: "Hof", rooms: 1, ceiling: 2.45, year: 1908,
      plan: "assets/plans/M72-02.jpg",
      hint: "Raum 13,88 m² · Küche 6,73 m² · Bad",
      photos: photos(['72-PR0308'])
    },
    {
      code: "M72-03", haus: "72", top: "Top 3",
      floor: "HP", floorIdx: 1, size: 74.63,
      type: "Wohnung", status: "available",
      orientation: "Straße/Hof", rooms: 3, ceiling: 2.95, year: 1908,
      plan: "assets/plans/M72-03.jpg",
      hint: "2 Zimmer Parkett 22 & 19 m² · Küche 8,24 m² · Bad",
      photos: photos(['72-PR0310', '72-PR0308'])
    },
    {
      code: "M72-04", haus: "72", top: "Top 4",
      floor: "HP", floorIdx: 1, size: 87.46,
      type: "Wohnung", status: "available",
      orientation: "Straße/Hof + Garten", rooms: 3, ceiling: 2.95, year: 1908,
      plan: "assets/plans/M72-04.jpg",
      hint: "2 Zimmer 18 & 21 m² · Küche · Garten 43,09 m² + Garten 2 55,59 m²",
      photos: photos(['72-PR0305', '72-PR0308'])
    },
    {
      code: "M72-05", haus: "72", top: "Top 5+6",
      floor: "1.OG", floorIdx: 2, size: 152.79,
      type: "Wohnung", status: "available",
      orientation: "Straße/Hof", rooms: 5, ceiling: 3.10, year: 1908,
      plan: "assets/plans/M72-05.jpg",
      hint: "Zusammengelegt · 4 Zimmer · 2 Bäder · Küche · AR · Lichthof",
      photos: photos(['72-PR0305', '72-PR0310'])
    },
    {
      code: "M72-06", haus: "72", top: "Top 8",
      floor: "2.OG", floorIdx: 3, size: 75.95,
      type: "Wohnung", status: "available",
      orientation: "Straße/Hof", rooms: 3, ceiling: 2.95, year: 1908,
      plan: "assets/plans/M72-06.jpg",
      hint: "Zimmer 22,30 & 20,80 m² · Küche · Bad · AR",
      photos: photos(['72-PR0304', '72-PR0308'])
    },
    {
      code: "M72-07", haus: "72", top: "Top 7",
      floor: "2.OG", floorIdx: 3, size: 76.25,
      type: "Wohnung", status: "vermietet",
      orientation: "Straße/Hof", rooms: 3, ceiling: 2.95, year: 1908,
      plan: "assets/plans/M72-07.jpg",
      hint: "2 Zimmer 22 & 20 m² · Küche · Bad · WC · AR",
      photos: photos(['72-PR0307'])
    },
    {
      code: "M72-08", haus: "72", top: "Top 8A",
      floor: "DG", floorIdx: 4, size: 49.19,
      type: "Wohnung", status: "vermietet",
      orientation: "Hof + Dach", rooms: 2, ceiling: 2.42, year: 1908,
      plan: "assets/plans/M72-08.jpg",
      hint: "Zimmer 24,28 m² · Vorraum mit Koch­gel. · Bad · Lichtkuppel",
      photos: photos(['72-PR0308'])
    },
    {
      code: "M72-09", haus: "72", top: "Top 9",
      floor: "DG", floorIdx: 4, size: 21.62,
      type: "Wohnung", status: "available",
      orientation: "Straße (DG)", rooms: 1, ceiling: 2.42, year: 1908,
      plan: "assets/plans/M72-09.jpg",
      hint: "Zimmer 12,99 m² · Vorraum mit Koch­gel. & WC · Bad",
      photos: photos(['72-PR0306', '72-PR0308'])
    },

    // ============================================================
    // HAUS 74 — 9 Einheiten · Original­zustand
    // ============================================================
    {
      code: "M74-01", haus: "74", top: "Top 1",
      floor: "KG", floorIdx: 0, size: 24.13,
      type: "Wohnung", status: "available",
      orientation: "Hof", rooms: 1, ceiling: 2.65, year: 1908,
      plan: "assets/plans/M74-01.jpg",
      hint: "Lager 21,24 m² Estrich · Zufahrt Pflastersteine 53,76 m²",
      photos: photos(['74-PR0308'])
    },
    {
      code: "M74-02", haus: "74", top: "Top GL 2",
      floor: "KG", floorIdx: 0, size: 39.66,
      type: "Geschäftslokal", status: "vermietet",
      orientation: "Straße", rooms: 2, ceiling: 2.38, year: 1908,
      plan: "assets/plans/M74-02.jpg",
      hint: "Zimmer 19,96 m² · AR 16,47 m² · Vollglas-Element",
      photos: photos(['74-PR0308'])
    },
    {
      code: "M74-03", haus: "74", top: "Top 3",
      floor: "EG", floorIdx: 1, size: 73.34,
      type: "Wohnung", status: "vermietet",
      orientation: "Straße/Hof", rooms: 3, ceiling: 2.96, year: 1908,
      plan: "assets/plans/M74-03.jpg",
      hint: "Zimmer 21,12 & 19,05 m² · Küche · Bad · SR · AR",
      photos: photos(['74-PR0311', '74-PR0308'])
    },
    {
      code: "M74-04", haus: "74", top: "Top 4",
      floor: "EG", floorIdx: 1, size: 76.67,
      type: "Wohnung", status: "available",
      orientation: "Straße/Hof", rooms: 3, ceiling: 2.93, year: 1908,
      plan: "assets/plans/M74-04.jpg",
      hint: "Zimmer 22,40 & 21,10 m² · Küche · Bad · SR · AR",
      photos: photos(['74-PR0313', '74-PR0308'])
    },
    {
      code: "M74-05", haus: "74", top: "Top 5",
      floor: "1.OG", floorIdx: 2, size: 72.84,
      type: "Wohnung", status: "available",
      orientation: "Hof", rooms: 3, ceiling: 3.03, year: 1908,
      plan: "assets/plans/M74-05.jpg",
      hint: "Zimmer 22,11 & 18,20 m² · Küche · Bad · SR",
      photos: photos(['74-PR0310', '74-PR0308'])
    },
    {
      code: "M74-06", haus: "74", top: "Top 6",
      floor: "1.OG", floorIdx: 2, size: 74.41,
      type: "Wohnung", status: "available",
      orientation: "Straße", rooms: 3, ceiling: 3.06, year: 1908,
      plan: "assets/plans/M74-06.jpg",
      hint: "Zimmer 20,79 & 20,25 m² · Küche · Bad · AR",
      photos: photos(['74-PR0306', '74-PR0308'])
    },
    {
      code: "M74-07", haus: "74", top: "Top 7",
      floor: "2.OG", floorIdx: 3, size: 75.90,
      type: "Wohnung", status: "available",
      orientation: "Hof", rooms: 3, ceiling: 3.00, year: 1908,
      plan: "assets/plans/M74-07.jpg",
      hint: "Zimmer 22,29 & 20,12 m² · Küche · Bad · AR",
      photos: photos(['74-PR0307', '74-PR0308'])
    },
    {
      code: "M74-08", haus: "74", top: "Top 8",
      floor: "2.OG", floorIdx: 3, size: 76.31,
      type: "Wohnung", status: "vermietet",
      orientation: "Straße/Hof", rooms: 3, ceiling: 3.01, year: 1908,
      plan: "assets/plans/M74-08.jpg",
      hint: "Zimmer 22,30 & 20,80 m² · Küche · Bad · SR",
      photos: photos(['74-PR0308'])
    },
    {
      code: "M74-09", haus: "74", top: "Top 9",
      floor: "DG", floorIdx: 4, size: 26.93,
      type: "Wohnung", status: "available",
      orientation: "Straße (DG)", rooms: 1, ceiling: 2.43, year: 1908,
      plan: "assets/plans/M74-09.jpg",
      hint: "Zimmer 18,58 m² · Vorraum mit Koch­gel. · Bad/WC",
      photos: photos(['74-PR0308'])
    },
  ];

  // ---- Kaufpreise (Richtwerte, vom Vertrieb zu bestätigen) + Mietverhältnis ----
  // Auch vermietete Einheiten sind kaufbar (Übergabe mit bestehendem Vertrag).
  const PRICES = {
    "M72-01": 123000, "M72-02": 137000, "M72-03": 388000, "M72-04": 475000,
    "M72-05": 795000, "M72-06": 395000, "M72-07": 365000, "M72-08": 225000, "M72-09": 108000,
    "M74-01": 145000, "M74-02": 153000, "M74-03": 485000, "M74-04": 552000,
    "M74-05": 525000, "M74-06": 535000, "M74-07": 545000, "M74-08": 505000, "M74-09": 189000
  };
  // Mietverhältnis je vermieteter Einheit (zu bestätigen)
  const LEASES = {
    "M72-01": "Unbefristet", "M72-07": "Unbefristet", "M72-08": "Unbefristet",
    "M74-02": "Unbefristet", "M74-03": "Unbefristet", "M74-08": "Unbefristet"
  };
  units.forEach(u => {
    u.price = PRICES[u.code] || null;
    if (u.status === "vermietet") u.lease = LEASES[u.code] || "Unbefristet";
  });

  // ---- FAQ ----
  const faq = {
    de: [
      { q: "Sind die Wohnungen saniert?",
        a: "Nein. Die Einheiten werden bewusst im Originalzustand übergeben — mit der bestehenden Substanz, den bestehenden Oberflächen und Raumstrukturen aus dem Altbestand (errichtet 1908). Eine Sanierung erfolgt durch die Käufer:innen nach eigener Vorstellung." },
      { q: "Was muss ich bei einer Sanierung beachten?",
        a: "Für jede Einheit liegen ein Bestandsplan (CAD Office Müllner, 2022), eine Befundung sowie ein Übergabe-Dossier vor. Bei genehmigungspflichtigen Eingriffen — etwa an tragenden Bauteilen oder an der Fassade — ist ein:e Planer:in einzubinden. Gerne stellen wir bei Bedarf einen Erstkontakt her." },
      { q: "Kann ich die Wohnung selbst gestalten?",
        a: "Ja. Grundriss, Material, Ausstattung und Oberflächen entscheiden Sie. Innerhalb des bauphysikalisch und baurechtlich Möglichen sind Sie frei in der Umsetzung Ihres Wohnkonzepts." },
      { q: "Gibt es Empfehlungen für Planung oder Umsetzung?",
        a: "Auf Wunsch vermitteln wir Kontakte zu Architekturbüros, Planer:innen und ausführenden Gewerken, mit denen wir bereits zusammengearbeitet haben. Eine Verpflichtung besteht nicht — die Wahl liegt bei Ihnen." },
      { q: "Welche Unterlagen erhalte ich?",
        a: "Im Rahmen der Besichtigung erhalten Sie ein vollständiges Exposé je Einheit: Grundriss aus Bestandsplan, technische Bestandsaufnahme, Energieausweis, Eigentumsverhältnisse, Zinsliste und das ORIGINS-Übergabe-Dossier." },
      { q: "Welche Einheiten sind vermietet?",
        a: "Sechs der achtzehn Einheiten — zwei Geschäftslokale (M72-01, M74-02) und vier Wohnungen (M72-07, M72-08, M74-03, M74-08) — sind aktuell vermietet und werden mit bestehendem Mietverhältnis übergeben. Bestandsmieten und Vertragsdaten sind je Einheit transparent ausgewiesen." }
    ],
    en: [
      { q: "Are the apartments renovated?", a: "No. Units are deliberately delivered in their original state — with the existing substance, surfaces, and spatial structures of the historic stock (built 1908). Renovation is carried out by the buyer, according to their own vision." },
      { q: "What do I need to consider for renovation?", a: "Each unit comes with surveyor plans (CAD Office Müllner, 2022), a condition report, and a handover dossier. Interventions on load-bearing elements or the façade require a planner. We are happy to introduce trusted partners on request." },
      { q: "Can I design the apartment myself?", a: "Yes. Layout, material, fixtures, and finishes are yours to decide. Within the bounds of building physics and law, you are free to realise your own concept of home." },
      { q: "Are there recommendations for planning or execution?", a: "On request, we can connect you with architecture studios, planners, and trades we have collaborated with. There is no obligation — the choice remains yours." },
      { q: "What documents do I receive?", a: "Each viewing includes a full exposé per unit: surveyor's floor plan, technical survey, energy certificate, ownership records, rent roll, and the ORIGINS handover dossier." },
      { q: "Which units are tenanted?", a: "Six of the eighteen units — two commercial spaces (M72-01, M74-02) and four apartments (M72-07, M72-08, M74-03, M74-08) — are currently tenanted and transferred with the existing lease in place. Lease terms and rents are disclosed transparently per unit." }
    ]
  };

  // ---- Process ----
  const process = {
    de: [
      { n: "01", t: "Einheit entdecken",             d: "Aus achtzehn Einheiten die wählen, die zu Ihrer Vorstellung passt — Lage im Haus, Größe, Orientierung." },
      { n: "02", t: "Besichtigung vereinbaren",      d: "Persönliche Besichtigung vor Ort in der Maxingstraße 72/74. Bestandsdokumente liegen bereit." },
      { n: "03", t: "Zustand und Potenzial verstehen", d: "Wir gehen mit Ihnen durch Substanz, Grundriss und Möglichkeiten. Keine geschönten Versprechen." },
      { n: "04", t: "Kaufentscheidung treffen",      d: "Mit vollständiger Datenlage entscheiden Sie über Erwerb, Zeitpunkt und Konditionen." },
      { n: "05", t: "Eigene Gestaltung planen",      d: "Vom Originalzustand zum eigenen Raum. Auf Wunsch vermitteln wir Planung und Umsetzung." },
    ],
    en: [
      { n: "01", t: "Discover a unit",     d: "From eighteen units, choose one that fits your idea — position, size, orientation." },
      { n: "02", t: "Schedule a viewing",  d: "Personal viewing on-site at Maxingstraße 72/74. Documentation is ready to hand over." },
      { n: "03", t: "Understand substance",d: "We walk you through structure, layout, and potential. No embellished promises." },
      { n: "04", t: "Make the decision",   d: "With the full picture in front of you, decide on terms and timing." },
      { n: "05", t: "Plan your own finish",d: "From original state to your own room. On request, we introduce planning and execution." },
    ]
  };

  // ---- Materials ----
  const materials = [
    { name: "Eichenparkett · Fischgrät", img: "assets/photos/mat-eiche.jpg",        color: "#c2a274" },
    { name: "Wandvertäfelung · Weiß",    img: "assets/photos/mat-vertaefelung.jpg", color: "#efe9e1" },
    { name: "Kalkputz · Naturweiß",      img: "assets/photos/mat-kalkputz.jpg",     color: "#ede5d6" },
    { name: "Travertin · Barga",         img: "assets/photos/mat-travertin.jpg",    color: "#c9b89a" },
    { name: "Messing · gebürstet",       img: "assets/photos/mat-messing.jpg",      color: "#b08d57" },
  ];

  // ---- Potenzial / Directions ----
  const directions = {
    de: [
      { tag: "I",   title: "Behutsam erneuert",      body: "Originalboden geschliffen, Türen aufgearbeitet, Sanitär dezent ersetzt. Substanz bleibt sichtbar." },
      { tag: "II",  title: "Modern interpretiert",   body: "Klare Eingriffe in Küche und Bad, neue Oberflächen, Bestand als Hintergrund." },
      { tag: "III", title: "Vollständig neu gedacht",body: "Grundriss neu gesetzt, durchgehende Materialität, zeitgenössische Architektur." },
    ],
    en: [
      { tag: "I",   title: "Gently renewed",         body: "Original floors sanded, doors restored, fixtures discreetly replaced. Substance stays visible." },
      { tag: "II",  title: "Modern interpretation",  body: "Clear interventions in kitchen and bath, new surfaces, existing fabric as backdrop." },
      { tag: "III", title: "Completely re-imagined", body: "New plan, continuous materiality, contemporary architecture." },
    ]
  };

  // ---- Potential / Before-After comparisons (kind · label · note) ----
  const comparisons = {
    de: [
      {
        kind: "Wohnzimmer",
        label: "Aus Bestand wird Raum.",
        note: "Derselbe Raum, dieselben Achsen — das Rundbogenfenster bleibt, der Lavendel-Anstrich weicht. Boden geschliffen, Einbau in Eiche, Wände beruhigt. Was zählt, war schon da.",
        before: "assets/photos/72-PR0304-4.jpg",
        variants: [
          { key: "san", label: "Saniert · derselbe Raum", type: "photo", src: "assets/photos/wohnzimmer-saniert.jpg", cap: "Saniert · derselbe Raum" }
        ]
      },
      {
        kind: "Küche",
        label: "Vom rohen Bestand zur eigenen Materialwahl.",
        note: "Wo vorher Anschlüsse und Improvisation waren, entstehen mit wenigen, sauberen Entscheidungen — Boden, Front, Licht — Räume, in denen gekocht und gegessen wird, nicht nur funktioniert.",
        before: "assets/photos/72-PR0305-1.jpg",
        variants: [
          { key: "san", label: "Saniert · leer", type: "photo", src: "assets/photos/kueche-saniert.jpg", cap: "Saniert · derselbe Raum" }
        ]
      },
      {
        kind: "Küche · Ausstattung",
        label: "Vom Standard zur eigenen Handschrift.",
        note: "Dieselbe Küchenzeile, zwei Ausbaustufen: solide und klar — oder mit Naturstein und Echtholz zur eigenen Vorstellung weitergedacht. Was möglich ist, entscheiden Material und Anspruch.",
        before: "assets/photos/kueche-standard.jpg",
        beforeCap: "Standard · saniert",
        variants: [
          { key: "nuss",  label: "Nussholz · Marmor", type: "photo", src: "assets/photos/kueche-nuss.jpg",        cap: "Ausbau-Idee · Premium" },
          { key: "weiss", label: "Weiß · Marmor",     type: "photo", src: "assets/photos/kueche-weissmarmor.jpg", cap: "Ausbau-Idee · Premium" }
        ]
      }
    ],
    en: [
      {
        kind: "Living room",
        label: "From stock to room.",
        note: "Same room, same axes — the arched window stays, the lavender paint goes. Floor sanded, oak built-in, walls calmed. What mattered was already there.",
        before: "assets/photos/72-PR0304-4.jpg",
        variants: [
          { key: "san", label: "Renovated · same room", type: "photo", src: "assets/photos/wohnzimmer-saniert.jpg", cap: "Renovated · same room" },
          { key: "v-b", label: "Variant B", type: "slot" }
        ]
      },
      {
        kind: "Kitchen",
        label: "From raw stock to your own materials.",
        note: "Where there were connections and improvisation, a few clean decisions — floor, front, light — produce rooms in which one cooks and eats, not just functions.",
        before: "assets/photos/72-PR0305-1.jpg",
        variants: [
          { key: "san", label: "Renovated · empty", type: "photo", src: "assets/photos/kueche-saniert.jpg", cap: "Renovated · same room" }
        ]
      },
      {
        kind: "Kitchen · fit-out",
        label: "From standard to your own signature.",
        note: "The same kitchen run, two levels of finish: solid and clear — or rethought with natural stone and real wood. What's possible is decided by material and ambition.",
        before: "assets/photos/kueche-standard.jpg",
        beforeCap: "Standard · renovated",
        variants: [
          { key: "nuss",  label: "Walnut · marble", type: "photo", src: "assets/photos/kueche-nuss.jpg",        cap: "Fit-out idea · premium" },
          { key: "weiss", label: "White · marble",  type: "photo", src: "assets/photos/kueche-weissmarmor.jpg", cap: "Fit-out idea · premium" }
        ]
      }
    ]
  };

  // ---- Objections / Klarheit ----
  const objections = {
    de: [
      { q: "Planbar — und in Ihrem Tempo.",
        a: "Sie investieren schrittweise, nach eigener Priorität. Für jede Einheit liegen Bestandsplan und Befundung vor — eine belastbare Grundlage für klare Kostenschätzungen statt böser Überraschungen." },
      { q: "Sie brauchen kein Expertenwissen.",
        a: "Auf Wunsch vermitteln wir Architektur, Planung und ausführende Gewerke, mit denen wir bereits gearbeitet haben — von der ersten Skizze bis zur Übergabe. Sie entscheiden, wie viel Sie selbst übernehmen." },
      { q: "Ehrliche Substanz, vollständig dokumentiert.",
        a: "Bausubstanz von 1908, transparent in Bestandsplan, Befundung und Energieausweis. Sie kaufen mit offener Datenlage — und wissen genau, was Sie gestalten." },
      { q: "Finanzierung, die mitwächst.",
        a: "Kaufpreis und Sanierungsbudget lassen sich getrennt und in Etappen planen; auf Wunsch stellen wir Kontakt zu Finanzierungspartnern und möglichen Förderungen her." },
      { q: "Zwei Häuser, zwei Ausgangspunkte.",
        a: "Maxingstraße 74 ist bereits grundsaniert und sofort bezugsfähig — mit viel Raum für eigene Gestaltung. Maxingstraße 72 wird im Originalzustand übergeben, für alle, die von Grund auf selbst entwickeln möchten." }
    ],
    en: [
      { q: "Plannable — and at your pace.",
        a: "You invest step by step, on your own priorities. Each unit comes with surveyor plans and a condition report — a solid basis for clear estimates, not nasty surprises." },
      { q: "No expert knowledge required.",
        a: "On request we introduce architecture, planning and trades we've already worked with — from first sketch to handover. You decide how much you take on yourself." },
      { q: "Honest substance, fully documented.",
        a: "Building fabric from 1908, transparent in plans, survey and energy certificate. You buy with the data open — and know exactly what you're shaping." },
      { q: "Financing that grows with you.",
        a: "Purchase price and renovation budget can be planned separately and in stages; on request we connect you with financing partners and possible subsidies." },
      { q: "Two buildings, two starting points.",
        a: "Maxingstraße 74 is already fully renovated and move-in ready — with plenty of room for your own touch. Maxingstraße 72 is handed over in original condition, for those who want to develop from the ground up." }
    ]
  };

  const costTiers = {
    de: [
      { t: "Sanfte Auffrischung", scope: "Böden geschliffen, Wände beruhigt, Bad-Refresh. Einzug zeitnah möglich.", tag: "Wochen" },
      { t: "Solide Sanierung", scope: "Neue Bäder, Küche, Elektrik und Böden. Substanz bleibt, Oberflächen neu.", tag: "Monate" },
      { t: "Vollsanierung", scope: "Grundriss neu gedacht, Haustechnik und Oberflächen komplett. Maximaler Gestaltungsspielraum.", tag: "Projekt" }
    ],
    en: [
      { t: "Gentle refresh", scope: "Floors sanded, walls calmed, bathroom refresh. Move in soon.", tag: "Weeks" },
      { t: "Solid renovation", scope: "New baths, kitchen, electrics and floors. Substance stays, surfaces renewed.", tag: "Months" },
      { t: "Full renovation", scope: "Layout re-imagined, services and surfaces complete. Maximum design freedom.", tag: "Project" }
    ]
  };

  // Hero photo — building exterior
  const heroPhoto = "assets/photos/72-PR0308-1.jpg";

  // Potential section reference photos (one renovated, one original)
  const potentialPhotos = [
    "assets/photos/72-PR0305-4.jpg",  // a renovated parquet/window shot
    "assets/photos/72-PR0307-5.jpg",  // a clean room
    "assets/photos/74-PR0306-1.jpg",  // a quiet room
  ];

  return { units, faq, process, materials, directions, comparisons, objections, costTiers, heroPhoto, potentialPhotos };
})();
