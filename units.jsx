/* global React */
// Unit Collection — filter row + grid + detail drawer with real plans + photo gallery.

(function () {
  const { useState, useMemo, useEffect, useRef } = React;
  const eur = (n) => n ? "€ " + n.toLocaleString("de-DE") : "Preis auf Anfrage";

  function UnitCollection({ t, units, onEnquire }) {
    const [filters, setFilters] = useState({
      haus: "all",
      floorIdx: "all",
      type: "all",
      status: "all"
    });
    const [plan, setPlan] = useState(null);

    const filtered = useMemo(() => {
      return units.filter(u =>
        (filters.haus === "all" || u.haus === filters.haus) &&
        (filters.floorIdx === "all" || String(u.floorIdx) === filters.floorIdx) &&
        (filters.type === "all" || u.type === filters.type) &&
        (filters.status === "all" || u.status === filters.status)
      ).sort((a, b) => a.code.localeCompare(b.code));
    }, [units, filters]);

    const reset = () => setFilters({ haus: "all", floorIdx: "all", type: "all", status: "all" });

    useEffect(() => {
      const fn = (e) => { if (e.key === "Escape") setPlan(null); };
      window.addEventListener("keydown", fn);
      return () => window.removeEventListener("keydown", fn);
    }, []);

    const floors = [
      { v: "all", label: t.units_filter_all },
      { v: "0", label: "KG" },
      { v: "1", label: "EG/HP" },
      { v: "2", label: "1.OG" },
      { v: "3", label: "2.OG" },
      { v: "4", label: "DG" }
    ];

    return (
      <section id="einheiten" className="section sec-units" data-screen-label="Unit Collection">
        <div className="container">
          <header className="sec-head" data-reveal>
            <span className="eyebrow eyebrow-dot">{t.units_eyebrow}</span>
            <h2 className="display-2">{t.units_h}</h2>
            <p className="lede col-7" style={{ marginTop: 24 }}>{t.units_lede}</p>
          </header>

          {/* Filter row */}
          <div className="unit-filter" data-reveal>
            <FilterGroup label={t.units_filter_haus} value={filters.haus}
              onChange={(v) => setFilters({ ...filters, haus: v })}
              options={[{ v: "all", label: t.units_filter_all }, { v: "72", label: "Haus 72" }, { v: "74", label: "Haus 74" }]} />

            <FilterGroup label={t.units_filter_floor} value={filters.floorIdx}
              onChange={(v) => setFilters({ ...filters, floorIdx: v })}
              options={floors} />

            <FilterGroup label={t.units_filter_type} value={filters.type}
              onChange={(v) => setFilters({ ...filters, type: v })}
              options={[
                { v: "all", label: t.units_filter_all },
                { v: "Wohnung", label: "Wohnung" },
                { v: "Geschäftslokal", label: "Geschäft" }
              ]} />

            <FilterGroup label={t.units_filter_status} value={filters.status}
              onChange={(v) => setFilters({ ...filters, status: v })}
              options={[
                { v: "all",        label: t.units_filter_all },
                { v: "available",  label: t.units_status_available },
                { v: "vermietet",  label: t.units_status_rented }
              ]} />

            <div className="filter-meta">
              <span className="meta">{t.units_count(filtered.length, units.length)}</span>
              <button className="filter-clear" onClick={reset}>
                <span>{t.units_filter_clear}</span>
                <svg width="11" height="11" viewBox="0 0 11 11" aria-hidden><path d="M1 1 L10 10 M10 1 L1 10" stroke="currentColor" strokeWidth="1"/></svg>
              </button>
            </div>
          </div>

          {/* Grid */}
          <div className="unit-grid" data-reveal-children>
            {filtered.length === 0 && (
              <div className="unit-empty">{t.units_empty}</div>
            )}
            {filtered.map((u) => (
              <UnitCard key={u.code} u={u} t={t} onPlan={setPlan} onEnquire={onEnquire} />
            ))}
          </div>
        </div>

        {/* Grundriss + Foto-Lightbox */}
        <UnitLightbox u={plan} t={t}
          onClose={() => setPlan(null)}
          onEnquire={onEnquire} />
      </section>
    );
  }

  function FilterGroup({ label, value, onChange, options }) {
    return (
      <div className="filter-group">
        <span className="filter-label">{label}</span>
        <div className="filter-chips">
          {options.map(o => (
            <button key={o.v}
              className={`chip ${value === o.v ? "is-active" : ""}`}
              onClick={() => onChange(o.v)}
              aria-pressed={value === o.v}>
              {o.label}
            </button>
          ))}
        </div>
      </div>
    );
  }

  function UnitCard({ u, t, onPlan, onEnquire }) {
    const isAvail = u.status === "available";
    const stateLabel = u.type === "Geschäftslokal"
      ? t.units_card_state_commercial
      : (u.haus === "74" ? t.units_card_state_74 : t.units_card_state);
    return (
      <article className={`unit-card ${isAvail ? "is-available" : "is-rented"}`}>
        <button className="unit-card-plan" onClick={() => onPlan(u)} aria-label={`Grundriss ${u.top} vergrößern`}>
          <img src={imgSrc(u.plan)} alt={`Grundriss ${u.top} · ${u.code}`} loading="lazy" />
          <span className="unit-card-coord">
            <span className="cross">
              <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
                <line x1="7" y1="0" x2="7" y2="14" stroke="currentColor" strokeWidth="0.6"/>
                <line x1="0" y1="7" x2="14" y2="7" stroke="currentColor" strokeWidth="0.6"/>
                <circle cx="7" cy="7" r="1.6" fill="currentColor"/>
              </svg>
            </span>
            {u.haus === "72" ? "M72" : "M74"} · {u.floor}
          </span>
          <span className="unit-card-zoom">
            <svg width="13" height="13" viewBox="0 0 13 13" aria-hidden>
              <circle cx="5.5" cy="5.5" r="4" fill="none" stroke="currentColor" strokeWidth="1"/>
              <line x1="8.4" y1="8.4" x2="12" y2="12" stroke="currentColor" strokeWidth="1"/>
              <line x1="5.5" y1="3.6" x2="5.5" y2="7.4" stroke="currentColor" strokeWidth="1"/>
              <line x1="3.6" y1="5.5" x2="7.4" y2="5.5" stroke="currentColor" strokeWidth="1"/>
            </svg>
            Grundriss
          </span>
        </button>

        <div className="unit-card-body">
          <header className="unit-card-head">
            <span className="unit-card-code">{u.top} · {u.code}</span>
            <span className={`unit-card-status status-${u.status}`}>
              {isAvail ? t.units_status_available : t.units_status_rented_buyable}
            </span>
          </header>

          <div className="unit-card-size">
            <span className="num">{u.size.toFixed(2).replace(".", ",")}</span>
            <span className="unit">m²</span>
          </div>

          <div className="unit-card-price">
            <span className="ucp-amount">{eur(u.price)}</span>
            {u.lease && <span className="ucp-lease">{u.lease} vermietet</span>}
          </div>

          <dl className="unit-card-meta">
            <div><dt>{t.units_card_floor}</dt><dd>{u.floor}</dd></div>
            <div><dt>{t.units_card_rooms}</dt><dd>{u.rooms}</dd></div>
            <div><dt>{t.units_card_orientation}</dt><dd>{u.orientation}</dd></div>
          </dl>

          <footer className="unit-card-foot">
            <span className="unit-card-state">{stateLabel}</span>
            <button className="unit-card-cta-btn" onClick={() => onEnquire(u)}>
              {t.units_card_cta} <span className="arrow">→</span>
            </button>
          </footer>
        </div>
      </article>
    );
  }

  // Lightbox — enlarge the floor plan + browse the unit photos
  function UnitLightbox({ u, t, onClose, onEnquire }) {
    const [idx, setIdx] = useState(0);

    useEffect(() => {
      if (u) { document.body.style.overflow = "hidden"; setIdx(0); }
      else document.body.style.overflow = "";
      return () => { document.body.style.overflow = ""; };
    }, [u]);

    if (!u) return null;

    const slides = [
      { src: u.plan, alt: `Grundriss ${u.top}`, cap: "Bestandsplan · Müllner CAD · 2022", isPlan: true },
      ...(u.photos || []).map(p => ({ src: p.src, alt: p.alt, cap: p.alt }))
    ];
    const cur = slides[Math.min(idx, slides.length - 1)];
    const many = slides.length > 1;

    return (
      <div className="lb-scrim" onClick={onClose} role="dialog" aria-modal="true">
        <div className="lb" onClick={(e) => e.stopPropagation()}>
          <header className="lb-head">
            <div className="lb-title">
              <span className="eyebrow">{u.top} · {u.code}</span>
              <span className="lb-sub meta">{u.size.toFixed(2).replace(".", ",")} m² · {u.floor} · {eur(u.price)}</span>
            </div>
            <button className="lb-close" onClick={onClose} aria-label="Schließen">
              <svg width="15" height="15" viewBox="0 0 14 14"><path d="M1 1 L13 13 M13 1 L1 13" stroke="currentColor" strokeWidth="1.2"/></svg>
            </button>
          </header>

          <div className={`lb-stage ${cur.isPlan ? "is-plan" : ""}`}>
            <img key={cur.src} src={imgSrc(cur.src)} alt={cur.alt} className="lb-img" />
            {many && (
              <React.Fragment>
                <button className="lb-nav lb-prev" onClick={() => setIdx((idx - 1 + slides.length) % slides.length)} aria-label="zurück">
                  <svg width="16" height="16" viewBox="0 0 14 14"><path d="M9 1 L3 7 L9 13" fill="none" stroke="currentColor" strokeWidth="1.2"/></svg>
                </button>
                <button className="lb-nav lb-next" onClick={() => setIdx((idx + 1) % slides.length)} aria-label="weiter">
                  <svg width="16" height="16" viewBox="0 0 14 14"><path d="M5 1 L11 7 L5 13" fill="none" stroke="currentColor" strokeWidth="1.2"/></svg>
                </button>
              </React.Fragment>
            )}
            <div className="lb-cap">
              <span className="meta mono">{String(idx + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}</span>
              <span className="meta">{cur.cap}</span>
            </div>
          </div>

          {many && (
            <div className="lb-thumbs">
              {slides.map((s, i) => (
                <button key={s.src + i} className={`lb-thumb ${i === idx ? "is-active" : ""} ${s.isPlan ? "is-plan" : ""}`}
                  onClick={() => setIdx(i)} aria-label={`Bild ${i + 1}`}>
                  <img src={imgSrc(s.src)} alt="" />
                </button>
              ))}
            </div>
          )}

          <div className="lb-foot">
            <span className="meta">{u.haus === "74" ? "Grundsaniert" : "Originalzustand"} · Maxingstraße {u.haus}</span>
            <button className="btn btn-primary" onClick={() => { onClose(); onEnquire(u); }}>
              {t.units_card_cta} <span className="arrow">→</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  window.UnitCollection = UnitCollection;
})();
