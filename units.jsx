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
    const [active, setActive] = useState(null);

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
      const fn = (e) => { if (e.key === "Escape") setActive(null); };
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
              <UnitCard key={u.code} u={u} t={t} onOpen={setActive} />
            ))}
          </div>
        </div>

        {/* Detail drawer */}
        <UnitDrawer u={active} t={t}
          onClose={() => setActive(null)}
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

  function UnitCard({ u, t, onOpen }) {
    const isAvail = u.status === "available";
    const stateLabel = u.type === "Geschäftslokal"
      ? t.units_card_state_commercial
      : (u.haus === "74" ? t.units_card_state_74 : t.units_card_state);
    return (
      <article className={`unit-card ${isAvail ? "is-available" : "is-rented"}`}>
        <button className="unit-card-inner" onClick={() => onOpen(u)}>
          <div className="unit-card-plan">
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
          </div>

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
            <span className="unit-card-cta">
              {t.units_card_cta} <span className="arrow">→</span>
            </span>
          </footer>
        </button>
      </article>
    );
  }

  function UnitDrawer({ u, t, onClose, onEnquire }) {
    const [idx, setIdx] = useState(0);
    const planRef = useRef(null);

    useEffect(() => {
      if (u) {
        document.body.style.overflow = "hidden";
        setIdx(0);
      } else document.body.style.overflow = "";
      return () => { document.body.style.overflow = ""; };
    }, [u]);

    if (!u) return null;

    const hasPhotos = u.photos && u.photos.length > 0;
    const photo = hasPhotos ? u.photos[Math.min(idx, u.photos.length - 1)] : null;

    return (
      <div className="drawer-scrim" onClick={onClose} role="dialog" aria-modal="true">
        <aside className="drawer" onClick={(e) => e.stopPropagation()}>
          <header className="drawer-head">
            <div>
              <span className="eyebrow">{u.top} · {u.code}</span>
              <h3 className="display-3" style={{ marginTop: 8 }}>
                {u.size.toFixed(2).replace(".", ",")}<span className="drawer-unit"> m²</span>
              </h3>
            </div>
            <button className="drawer-close" onClick={onClose} aria-label="Close">
              <svg width="14" height="14" viewBox="0 0 14 14"><path d="M1 1 L13 13 M13 1 L1 13" stroke="currentColor" strokeWidth="1"/></svg>
            </button>
          </header>

          {/* Plan */}
          <figure className="drawer-plan" ref={planRef}>
            <img src={imgSrc(u.plan)} alt={`Grundriss ${u.top}`} />
            <figcaption className="drawer-plan-cap meta mono">
              Bestandsplan · Müllner CAD · 2022
            </figcaption>
          </figure>

          {/* Photo gallery */}
          {hasPhotos && (
            <div className="drawer-gallery">
              <div className="drawer-gallery-stage">
                <img key={photo.src} src={imgSrc(photo.src)} alt={photo.alt} className="dg-img" />
                <div className="drawer-gallery-meta">
                  <span className="meta mono">{String(idx + 1).padStart(2, "0")} / {String(u.photos.length).padStart(2, "0")}</span>
                  <span className="meta">{photo.alt}</span>
                </div>
                {u.photos.length > 1 && (
                  <React.Fragment>
                    <button className="dg-nav dg-prev" onClick={() => setIdx((idx - 1 + u.photos.length) % u.photos.length)} aria-label="prev">
                      <svg width="14" height="14" viewBox="0 0 14 14"><path d="M9 1 L3 7 L9 13" fill="none" stroke="currentColor" strokeWidth="1"/></svg>
                    </button>
                    <button className="dg-nav dg-next" onClick={() => setIdx((idx + 1) % u.photos.length)} aria-label="next">
                      <svg width="14" height="14" viewBox="0 0 14 14"><path d="M5 1 L11 7 L5 13" fill="none" stroke="currentColor" strokeWidth="1"/></svg>
                    </button>
                  </React.Fragment>
                )}
              </div>
              {u.photos.length > 1 && (
                <div className="drawer-gallery-thumbs">
                  {u.photos.map((p, i) => (
                    <button key={p.src + i}
                      className={`dg-thumb ${i === idx ? "is-active" : ""}`}
                      onClick={() => setIdx(i)}
                      aria-label={`photo ${i + 1}`}>
                      <img src={imgSrc(p.src)} alt="" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Meta grid */}
          <dl className="drawer-meta">
            <div><dt>Haus</dt><dd>Maxingstraße {u.haus}</dd></div>
            <div><dt>{t.units_card_floor}</dt><dd>{u.floor}</dd></div>
            <div><dt>{t.units_card_rooms}</dt><dd>{u.rooms}</dd></div>
            <div><dt>{t.units_card_orientation}</dt><dd>{u.orientation}</dd></div>
            <div><dt>Raumhöhe</dt><dd>{u.ceiling.toString().replace(".", ",")} m</dd></div>
            <div><dt>Kaufpreis</dt><dd>{eur(u.price)}</dd></div>
            <div><dt>Zustand</dt><dd>{u.haus === "74" ? "Grundsaniert" : "Originalzustand"}</dd></div>
            <div><dt>Status</dt><dd>{u.status === "available" ? t.units_status_available : "Vermietet · kaufbar"}</dd></div>
            {u.lease && <div><dt>Mietverhältnis</dt><dd>{u.lease}</dd></div>}
            <div><dt>Nutzung</dt><dd>{u.type}</dd></div>
          </dl>

          {u.hint && (
            <p className="drawer-hint meta">
              <span className="mono">Bestandsplan:</span> {u.hint}
            </p>
          )}

          <p className="drawer-note">
            {u.status === "vermietet"
              ? "Auch diese vermietete Einheit ist kaufbar — die Übergabe erfolgt mit bestehendem (unbefristetem) Mietverhältnis. Vollständiges Exposé inkl. Bestandsplan, Zinsliste und Mietvertrag bei der Anfrage."
              : (u.haus === "74"
                ? "Maxingstraße 74 — grundsaniert und sofort bezugsfähig, mit Raum für eigene Gestaltung. Vollständiges Exposé inkl. Bestandsplan, Befundung und Energieausweis bei der Anfrage."
                : "Maxingstraße 72 — Übergabe im Originalzustand. Vollständiges Exposé inkl. Bestandsplan, Befundung und Energieausweis bei der Anfrage.")}
          </p>

          <div className="drawer-cta">
            <button className="btn btn-primary" onClick={() => { onClose(); onEnquire(u); }}>
              {t.units_card_cta} <span className="arrow">→</span>
            </button>
            <button className="btn btn-secondary" onClick={onClose}>
              Zurück zur Collection
            </button>
          </div>
        </aside>
      </div>
    );
  }

  window.UnitCollection = UnitCollection;
})();
