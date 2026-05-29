/* global React, ReactDOM, ORIGINS_DATA, ORIGINS_I18N,
   Hero, Concept, Opportunity, OriginalState, UnitCollection,
   Potential, Location, Process, ByUnio, FinalCTA, Footer, OriginMark, StoererBand, Clarity, EnquiryModal,
   TweaksPanel, TweakSection, TweakRadio, TweakSelect, TweakToggle, TweakColor, useTweaks */

(function () {
  const { useState, useEffect, useRef, useMemo } = React;

  const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
    "lang": "de",
    "palette": "ivory",
    "ctaStyle": "block",
    "showInquiryBar": true,
    "originMark": "crosshair",
    "showStatBand": true
  }/*EDITMODE-END*/;

  function App() {
    const [t, setT] = useTweaks(TWEAK_DEFAULTS);
    const i18n = ORIGINS_I18N[t.lang === "en" ? "en" : "de"];

    const [navScrolled, setNavScrolled] = useState(false);
    const [activeNav, setActiveNav] = useState("projekt");
    const [showSticky, setShowSticky] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [enquiryOpen, setEnquiryOpen] = useState(false);
    const [enquiryUnit, setEnquiryUnit] = useState(null);

    // Scroll observers
    useEffect(() => {
      const onScroll = () => {
        setNavScrolled(window.scrollY > 60);
        setShowSticky(window.scrollY > 700);
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
      return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Active section observer
    useEffect(() => {
      const ids = ["projekt", "konzept", "einheiten", "original", "potential", "klarheit", "lage", "prozess", "kontakt"];
      const els = ids.map(id => document.getElementById(id)).filter(Boolean);
      if (els.length === 0) return;
      const obs = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) setActiveNav(e.target.id);
        });
      }, { rootMargin: "-40% 0px -55% 0px", threshold: 0.01 });
      els.forEach(el => obs.observe(el));
      return () => obs.disconnect();
    }, []);

    // Reveal-on-scroll
    useEffect(() => {
      const obs = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) e.target.classList.add("is-in");
        });
      }, { threshold: 0.08, rootMargin: "0px 0px -40px 0px" });
      document.querySelectorAll("[data-reveal], [data-reveal-children]").forEach(el => obs.observe(el));
      return () => obs.disconnect();
    });

    // Body class for palette
    useEffect(() => {
      document.body.classList.remove("scheme-ivory", "scheme-stone-light", "scheme-graphite");
      document.body.classList.add(`scheme-${t.palette}`);
    }, [t.palette]);

    // CTA style class
    useEffect(() => {
      document.documentElement.classList.remove("cta-block", "cta-pill", "cta-underline");
      document.documentElement.classList.add(`cta-${t.ctaStyle}`);
    }, [t.ctaStyle]);

    // Mark style class
    useEffect(() => {
      document.documentElement.classList.remove("mark-cross", "mark-ring", "mark-dot");
      document.documentElement.classList.add(`mark-${t.originMark}`);
    }, [t.originMark]);

    const scrollTo = (id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top, behavior: "smooth" });
    };

    const startEnquiry = (unit = null) => {
      setEnquiryUnit(unit || null);
      setEnquiryOpen(true);
    };

    const navItems = [
      { id: "konzept",   label: i18n.nav_projekt },
      { id: "einheiten", label: i18n.nav_einheiten },
      { id: "lage",      label: i18n.nav_lage }
    ];

    const goMobile = (id) => { setMenuOpen(false); setTimeout(() => scrollTo(id), 60); };

    // Lock scroll when mobile menu open
    useEffect(() => {
      if (menuOpen) {
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => { document.body.style.overflow = prev; };
      }
    }, [menuOpen]);

    return (
      <React.Fragment>
        {/* Nav */}
        <header className={`origin-nav ${navScrolled ? "is-light" : ""} ${menuOpen ? "is-menu-open" : ""}`}>
          <div className="on-inner">
            <a href="#projekt" className="on-brand" onClick={(e) => { e.preventDefault(); goMobile("projekt"); }}>
              <span className="on-mark">
                <OriginMark size={20} />
              </span>
              <span className="on-word">ORIGINS</span>
              <span className="on-sub">M72/74</span>
            </a>

            <nav className="on-nav">
              {navItems.map(n => (
                <a key={n.id} href={`#${n.id}`}
                  className={activeNav === n.id ? "is-active" : ""}
                  onClick={(e) => { e.preventDefault(); scrollTo(n.id); }}>
                  {n.label}
                </a>
              ))}
            </nav>

            <div className="on-cta">
              <button className="on-pill" onClick={() => startEnquiry()}>
                <span>{i18n.nav_cta}</span>
                <span className="arrow">→</span>
              </button>
              <button className={`on-burger ${menuOpen ? "is-open" : ""}`}
                onClick={() => setMenuOpen(o => !o)} aria-label="Menü" aria-expanded={menuOpen}>
                <span></span><span></span><span></span>
              </button>
            </div>
          </div>
        </header>

        {/* Mobile menu overlay */}
        <div className={`on-menu ${menuOpen ? "is-open" : ""}`} aria-hidden={!menuOpen}>
          <nav className="on-menu-nav">
            {navItems.map((n, i) => (
              <a key={n.id} href={`#${n.id}`}
                className={activeNav === n.id ? "is-active" : ""}
                style={{ transitionDelay: `${menuOpen ? 80 + i * 45 : 0}ms` }}
                onClick={(e) => { e.preventDefault(); goMobile(n.id); }}>
                <span className="omn-n">{String(i + 1).padStart(2, "0")}</span>
                <span className="omn-l">{n.label}</span>
              </a>
            ))}
          </nav>
          <div className="on-menu-foot">
            <button className="btn btn-primary" onClick={() => { setMenuOpen(false); setTimeout(() => startEnquiry(), 60); }}>
              {i18n.nav_cta} <span className="arrow">→</span>
            </button>
            <div className="on-menu-meta">
              <span className="meta mono">Maxingstraße 72 &amp; 74 · 1130 Wien</span>
              <span className="meta">Original State Homes by UNIO</span>
            </div>
          </div>
        </div>

        <main className="origin-main">
          <Hero t={i18n}
            onScrollUnits={() => scrollTo("einheiten")}
            onEnquire={() => startEnquiry()}
            heroPhoto={ORIGINS_DATA.heroPhoto} />

          <Concept t={i18n} />

          <Opportunity t={i18n} />

          <UnitCollection t={i18n} units={ORIGINS_DATA.units} onEnquire={startEnquiry} />

          <OriginalState t={i18n} faq={ORIGINS_DATA.faq[t.lang === "en" ? "en" : "de"]} />

          <Potential t={i18n}
            materials={ORIGINS_DATA.materials}
            comparisons={ORIGINS_DATA.comparisons[t.lang === "en" ? "en" : "de"]} />

          <StoererBand src="assets/photos/stoerer.jpg" />

          <Clarity t={i18n}
            objections={ORIGINS_DATA.objections[t.lang === "en" ? "en" : "de"]}
            costTiers={ORIGINS_DATA.costTiers[t.lang === "en" ? "en" : "de"]} />

          <Umgebung t={i18n} environs={ORIGINS_DATA.environs[t.lang === "en" ? "en" : "de"]} />

          <Location t={i18n} />

          <Process t={i18n} steps={ORIGINS_DATA.process[t.lang === "en" ? "en" : "de"]} />

          <ByUnio t={i18n} />

          <FinalCTA t={i18n} onFinder={() => scrollTo("einheiten")} />

          <Footer t={i18n} />
        </main>

        <EnquiryModal open={enquiryOpen} unit={enquiryUnit} t={i18n} onClose={() => setEnquiryOpen(false)} />

        {/* Sticky inquiry bar */}
        {t.showInquiryBar && showSticky && activeNav !== "kontakt" && (
          <div className="sticky-inq" data-cc-id="sticky-inq">
            <span className="si-pulse" />
            <span className="si-label">{i18n.sticky_label}</span>
            <button className="si-cta" onClick={() => startEnquiry()}>
              {i18n.sticky_cta} <span className="arrow">→</span>
            </button>
          </div>
        )}

        {/* Tweaks */}
        <TweaksPanel title="Tweaks · ORIGINS">
          <TweakSection title="Sprache & Ton">
            <TweakRadio label="Sprache" value={t.lang} onChange={(v) => setT("lang", v)}
              options={[{ value: "de", label: "DE" }, { value: "en", label: "EN" }]} />
          </TweakSection>

          <TweakSection title="Palette">
            <TweakColor label="Hintergrund-Schema" value={t.palette} onChange={(v) => setT("palette", v)}
              options={[
                ["#F5F1E8", "#1B1D19", "#A88A4A"],
                ["#ECE6D8", "#1B1D19", "#A88A4A"],
                ["#EDE9DF", "#232826", "#AAB39D"]
              ]} />
            <span className="meta" style={{ fontSize: 10, opacity: 0.7, marginTop: 6, display: "block" }}>
              Ivory · Parchment · Graphite-soft
            </span>
          </TweakSection>

          <TweakSection title="CTA-Stil">
            <TweakRadio label="Button" value={t.ctaStyle} onChange={(v) => setT("ctaStyle", v)}
              options={[
                { value: "block",     label: "Block" },
                { value: "pill",      label: "Pill" },
                { value: "underline", label: "Linie" }
              ]} />
          </TweakSection>

          <TweakSection title="Origin-Mark">
            <TweakRadio label="Motiv" value={t.originMark} onChange={(v) => setT("originMark", v)}
              options={[
                { value: "crosshair", label: "Crosshair" },
                { value: "ring",      label: "Ring" },
                { value: "dot",       label: "Punkt" }
              ]} />
          </TweakSection>

          <TweakSection title="Anzeige">
            <TweakToggle label="Sticky-Inquiry-Bar" value={t.showInquiryBar} onChange={(v) => setT("showInquiryBar", v)} />
            <TweakToggle label="Stat-Band" value={t.showStatBand} onChange={(v) => setT("showStatBand", v)} />
          </TweakSection>
        </TweaksPanel>

        <style>{`
          ${t.showStatBand ? "" : ".stat-band { display: none !important; }"}
        `}</style>
      </React.Fragment>
    );
  }

  ReactDOM.createRoot(document.getElementById("root")).render(<App />);
})();
