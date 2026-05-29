/* global React */
// ORIGINS — Section components (everything except UnitCollection).
(function () {
  const { useState, useEffect, useRef } = React;

  // -------------------------------------------------------------------
  // Origin Mark — the brand motif. Reused throughout.
  // -------------------------------------------------------------------
  function OriginMark({ size = 18, stroke = "currentColor" }) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" className="origin-mark">
        <circle cx="12" cy="12" r="10.5" fill="none" stroke={stroke} strokeWidth="0.8" />
        <circle cx="12" cy="12" r="1.6" fill={stroke} />
        <line x1="12" y1="0" x2="12" y2="3" stroke={stroke} strokeWidth="0.6" />
        <line x1="12" y1="21" x2="12" y2="24" stroke={stroke} strokeWidth="0.6" />
        <line x1="0" y1="12" x2="3" y2="12" stroke={stroke} strokeWidth="0.6" />
        <line x1="21" y1="12" x2="24" y2="12" stroke={stroke} strokeWidth="0.6" />
      </svg>
    );
  }
  window.OriginMark = OriginMark;

  // -------------------------------------------------------------------
  // Hero
  // -------------------------------------------------------------------
  function Hero({ t, onScrollUnits, onEnquire, heroPhoto }) {
    return (
      <section id="projekt" className="hero" data-screen-label="Hero">
        {/* Full-bleed background photo */}
        <div className="hero-bg" aria-hidden>
          {heroPhoto ? (
            <img src={imgSrc(heroPhoto)} alt="" className="hero-bg-img" loading="eager" />
          ) : (
            <image-slot
              id="hero-bg"
              shape="rect"
              placeholder="Hero · Fassade Maxingstraße"
              style={{ width: "100%", height: "100%" }}
            ></image-slot>
          )}
          <div className="hero-bg-veil" />
        </div>

        {/* Corner coordinate marks */}
        <div className="hero-marks" aria-hidden>
          <span className="hm hm-tl">M72/74 · A · 1130 WIEN</span>
          <span className="hm hm-tr">48.184° N · 16.302° E</span>
        </div>

        {/* Foreground content */}
        <div className="hero-content">
          <div className="hero-eyebrow">
            <OriginMark size={14} stroke="currentColor" />
            <span className="eyebrow">{t.hero_eyebrow}</span>
          </div>

          <h1 className="hero-h">
            <span className="hero-line"><span>{t.hero_claim_a}</span></span>
            <span className="hero-line hero-line-em"><span><em>{t.hero_claim_b}</em></span></span>
          </h1>

          <p className="hero-body">{t.hero_body}</p>

          <div className="hero-ctas">
            <button className="btn btn-primary hero-btn" onClick={onScrollUnits}>
              {t.hero_cta_primary} <span className="arrow">→</span>
            </button>
            <button className="btn-link hero-secondary" onClick={onEnquire}>
              {t.hero_cta_secondary} <span className="arrow">→</span>
            </button>
          </div>
        </div>

        {/* Footer strip — three USPs + scroll hint */}
        <div className="hero-foot">
          <div className="hero-usp">
            <span className="hero-usp-n meta mono">01</span>
            <span className="hero-usp-t">{t.hero_usp_1_t}</span>
            <span className="hero-usp-b">{t.hero_usp_1_b}</span>
          </div>
          <div className="hero-usp">
            <span className="hero-usp-n meta mono">02</span>
            <span className="hero-usp-t">{t.hero_usp_2_t}</span>
            <span className="hero-usp-b">{t.hero_usp_2_b}</span>
          </div>
          <div className="hero-usp">
            <span className="hero-usp-n meta mono">03</span>
            <span className="hero-usp-t">{t.hero_usp_3_t}</span>
            <span className="hero-usp-b">{t.hero_usp_3_b}</span>
          </div>
          <button className="hero-scroll" onClick={onScrollUnits} aria-label="Scroll to units">
            <span className="meta">Scroll</span>
            <span className="hero-scroll-line">
              <span className="hero-scroll-dot" />
            </span>
          </button>
        </div>
      </section>
    );
  }
  window.Hero = Hero;

  // -------------------------------------------------------------------
  // Concept — "Der Wert beginnt im Original."
  // -------------------------------------------------------------------
  function Concept({ t }) {
    const stats = [
      { v: "18",       label: t.stat_units },
      { v: "1.108",    label: t.stat_total,  suffix: ",51 m²" },
      { v: "764",      label: t.stat_avail,  suffix: ",76 m²" },
      { v: "02",       label: t.stat_houses }
    ];
    return (
      <section id="konzept" className="section sec-concept" data-screen-label="Concept">
        <div className="container">
          <div className="concept-grid">
            <header className="concept-head" data-reveal>
              <span className="eyebrow eyebrow-dot">{t.concept_eyebrow}</span>
              <h2 className="display-2 concept-h">{t.concept_h}</h2>
            </header>
            <div className="concept-body" data-reveal>
              <p className="lede">{t.concept_lede}</p>
              <p className="body-lg muted concept-body-p">{t.concept_body}</p>
            </div>
          </div>

          {/* Stat band */}
          <div className="stat-band" data-reveal-children>
            {stats.map((s, i) => (
              <div key={i} className="stat">
                <span className="stat-v">
                  {s.v}{s.suffix && <span className="stat-suffix">{s.suffix}</span>}
                </span>
                <span className="stat-l meta">{s.label}</span>
              </div>
            ))}
          </div>

          {/* 3 pills */}
          <div className="concept-pills" data-reveal-children>
            <div className="concept-pill">
              <span className="cp-num">i.</span>
              <h4 className="cp-t">{t.concept_pill_1_t}</h4>
              <p className="cp-b">{t.concept_pill_1_b}</p>
            </div>
            <div className="concept-pill">
              <span className="cp-num">ii.</span>
              <h4 className="cp-t">{t.concept_pill_2_t}</h4>
              <p className="cp-b">{t.concept_pill_2_b}</p>
            </div>
            <div className="concept-pill">
              <span className="cp-num">iii.</span>
              <h4 className="cp-t">{t.concept_pill_3_t}</h4>
              <p className="cp-b">{t.concept_pill_3_b}</p>
            </div>
          </div>
        </div>
      </section>
    );
  }
  window.Concept = Concept;

  // -------------------------------------------------------------------
  // Opportunity
  // -------------------------------------------------------------------
  function Opportunity({ t }) {
    const items = [
      { n: t.opp_1_n, k: "1", t: t.opp_1_t, b: t.opp_1_b },
      { n: t.opp_2_n, k: "2", t: t.opp_2_t, b: t.opp_2_b },
      { n: t.opp_3_n, k: "3", t: t.opp_3_t, b: t.opp_3_b }
    ];
    return (
      <section id="opportunity" className="section sec-opp section-deep" data-screen-label="Opportunity">
        <div className="container">
          <header className="sec-head" data-reveal>
            <span className="eyebrow eyebrow-dot on-dark">{t.opp_eyebrow}</span>
            <h2 className="display-2">{t.opp_h}</h2>
            <p className="lede on-dark" style={{ marginTop: 24, opacity: 0.78 }}>{t.opp_lede}</p>
          </header>

          <div className="opp-grid" data-reveal-children>
            {items.map(item => (
              <article key={item.k} className="opp-card">
                <div className="opp-card-top">
                  <span className="opp-roman">{item.n}</span>
                  <OriginMark size={16} stroke="rgba(245,241,232,0.5)" />
                </div>
                <h3 className="display-4 opp-card-t">{item.t}</h3>
                <p className="opp-card-b">{item.b}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  }
  window.Opportunity = Opportunity;

  // -------------------------------------------------------------------
  // Original State Explained — 3 columns + FAQ accordion
  // -------------------------------------------------------------------
  function OriginalState({ t, faq }) {
    const [open, setOpen] = useState(0);
    return (
      <section id="original" className="section sec-ose" data-screen-label="Original State">
        <div className="container">
          <header className="sec-head" data-reveal>
            <span className="eyebrow eyebrow-dot">{t.ose_eyebrow}</span>
            <h2 className="display-2">{t.ose_h}</h2>
            <p className="lede col-7" style={{ marginTop: 24 }}>{t.ose_lede}</p>
          </header>

          {/* 3 columns */}
          <div className="ose-cols" data-reveal-children>
            {[
              { t: t.ose_col_1_t, b: t.ose_col_1_b, n: "01" },
              { t: t.ose_col_2_t, b: t.ose_col_2_b, n: "02" },
              { t: t.ose_col_3_t, b: t.ose_col_3_b, n: "03" }
            ].map(c => (
              <div key={c.n} className="ose-col">
                <span className="ose-n meta mono">{c.n}</span>
                <h4 className="ose-t">{c.t}</h4>
                <p className="ose-b muted">{c.b}</p>
              </div>
            ))}
          </div>

          {/* FAQ */}
          <div className="ose-faq" data-reveal>
            <h3 className="display-4 ose-faq-h">{t.ose_faq_h}</h3>
            <ul className="faq">
              {faq.map((f, i) => (
                <li key={i} className={`faq-item ${open === i ? "is-open" : ""}`}>
                  <button className="faq-q" onClick={() => setOpen(open === i ? -1 : i)}
                    aria-expanded={open === i}>
                    <span className="faq-n meta mono">{String(i + 1).padStart(2, "0")}</span>
                    <span className="faq-q-text">{f.q}</span>
                    <span className="faq-toggle" aria-hidden>
                      <svg width="14" height="14" viewBox="0 0 14 14">
                        <line x1="0" y1="7" x2="14" y2="7" stroke="currentColor" strokeWidth="1"/>
                        <line x1="7" y1="0" x2="7" y2="14" stroke="currentColor" strokeWidth="1"
                          className="faq-toggle-v" />
                      </svg>
                    </span>
                  </button>
                  <div className="faq-a-wrap">
                    <div className="faq-a"><p className="faq-a-text">{f.a}</p></div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    );
  }
  window.OriginalState = OriginalState;

  // -------------------------------------------------------------------
  // Potential — same-room: real "before" constant + variant "Vorstellung"
  // -------------------------------------------------------------------
  function Potential({ t, materials, comparisons }) {
    return (
      <section id="potential" className="section sec-potential section-stone" data-screen-label="Potential">
        <div className="container">
          <header className="sec-head" data-reveal>
            <span className="eyebrow eyebrow-dot">{t.pot_eyebrow}</span>
            <h2 className="display-2">{t.pot_h}</h2>
            <p className="lede col-7" style={{ marginTop: 24 }}>{t.pot_lede}</p>
          </header>

          <div className="viz-stack" data-reveal-children>
            {comparisons.map((c, i) => (
              <VizBlock key={i} idx={i} c={c} t={t} />
            ))}
          </div>

          {/* Materials */}
          <div className="pot-materials" data-reveal>
            <header className="pot-mat-head">
              <span className="eyebrow eyebrow-dot">{t.pot_materials_h}</span>
              <p className="pot-mat-lede muted">{t.pot_materials_lede}</p>
            </header>
            <div className="pot-mat-grid">
              {materials.map((m, i) => (
                <div key={i} className="mat">
                  <span className="mat-swatch" style={{ background: m.color }}>
                    {m.img && imgSrc(m.img).startsWith("data:") && <img src={imgSrc(m.img)} alt={m.name} loading="lazy" />}
                  </span>
                  <span className="mat-n meta mono">{String(i + 1).padStart(2, "0")}</span>
                  <span className="mat-name">{m.name}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="pot-disclaimer meta">{t.pot_disclaimer}</p>
        </div>
      </section>
    );
  }
  window.Potential = Potential;

  function VizBlock({ c, t, idx }) {
    // variants: use explicit list if provided, else reference photo + 2 render slots
    const variants = c.variants || [
      { key: "ref", label: t.pot_ref_label, type: "photo", src: c.after },
      { key: "v-a", label: c.variantA || "Variante A", type: "slot" },
      { key: "v-b", label: c.variantB || "Variante B", type: "slot" }
    ];
    const [v, setV] = useState(0);
    const active = variants[Math.min(v, variants.length - 1)];
    const activeCap = active.cap || (active.type === "photo" ? t.pot_ref_caption : t.pot_after_label);

    return (
      <article className="viz">
        <header className="viz-head">
          <span className="viz-num meta mono">{String(idx + 1).padStart(2, "0")} · {c.kind}</span>
          <h3 className="viz-label">{c.label}</h3>
          <p className="viz-note">{c.note}</p>
        </header>

        <div className="viz-pair">
          {/* Before — real, constant */}
          <div className="viz-before-col">
            {variants.length > 1 && <div className="viz-tab-spacer" aria-hidden />}
            <figure className="viz-before">
              <img src={imgSrc(c.before)} alt={`Originalzustand · ${c.kind}`} loading="lazy" />
              <figcaption className="viz-cap viz-cap-before">
                <span className="meta mono">01 · {c.beforeCap || t.pot_before_label}</span>
              </figcaption>
            </figure>
          </div>

          {/* Vorstellung — variant switcher */}
          <div className="viz-after">
            {variants.length > 1 && (
              <div className="viz-tabs" role="tablist">
                {variants.map((vr, vi) => (
                  <button key={vr.key}
                    role="tab"
                    aria-selected={vi === v}
                    className={`viz-tab ${vi === v ? "is-active" : ""}`}
                    onClick={() => setV(vi)}>
                    {vr.label}
                  </button>
                ))}
              </div>
            )}

            <div className="viz-stage">
              {active.type === "photo" ? (
                <img src={imgSrc(active.src)} alt={`Vorstellung · ${c.kind}`} className="viz-after-img" loading="lazy" />
              ) : (
                <image-slot
                  id={`viz-${idx}-${active.key}`}
                  shape="rect"
                  aspect="4 / 3"
                  placeholder={`Visualisierung · ${c.kind} · ${active.label}`}
                  style={{ width: "100%", height: "100%" }}
                ></image-slot>
              )}
              <figcaption className="viz-cap viz-cap-after">
                <span className="meta mono">02 · {activeCap}</span>
              </figcaption>
            </div>
          </div>
        </div>
      </article>
    );
  }

  function StoererBand({ src }) {
    if (!imgSrc(src).startsWith("data:")) return null;
    return (
      <section className="stoerer" data-screen-label="Building" data-reveal>
        <img src={imgSrc(src)} alt="Maxingstraße 72 & 74 · Straßenansicht, 1130 Wien" loading="lazy" />
        <div className="stoerer-cap">
          <span className="meta mono">Maxingstraße 72 &amp; 74 · 1130 Wien · Hietzing</span>
        </div>
      </section>
    );
  }
  window.StoererBand = StoererBand;

  // -------------------------------------------------------------------
  // Clarity — disarm the most common buyer objections
  // -------------------------------------------------------------------
  function Clarity({ t, objections, costTiers }) {
    const [open, setOpen] = useState(0);
    return (
      <section id="klarheit" className="section sec-clarity" data-screen-label="Clarity">
        <div className="container">
          <div className="clarity-grid">
            <header className="clarity-head" data-reveal>
              <span className="eyebrow eyebrow-dot">{t.clarity_eyebrow}</span>
              <h2 className="display-2 clarity-h">{t.clarity_h}</h2>
              <p className="lede clarity-lede">{t.clarity_lede}</p>
              <div className="clarity-reassure">
                <OriginMark size={16} stroke="var(--court-brass)" />
                <span>{t.clarity_reassure}</span>
              </div>
            </header>

            <ul className="clarity-list" data-reveal>
              {objections.map((o, i) => (
                <li key={i} className={`clarity-item ${open === i ? "is-open" : ""}`}>
                  <button className="clarity-q" onClick={() => setOpen(open === i ? -1 : i)}
                    aria-expanded={open === i}>
                    <span className="clarity-n meta mono">{String(i + 1).padStart(2, "0")}</span>
                    <span className="clarity-q-text">{o.q}</span>
                    <span className="clarity-toggle" aria-hidden>
                      <svg width="14" height="14" viewBox="0 0 14 14">
                        <line x1="0" y1="7" x2="14" y2="7" stroke="currentColor" strokeWidth="1"/>
                        <line x1="7" y1="0" x2="7" y2="14" stroke="currentColor" strokeWidth="1" className="clarity-toggle-v" />
                      </svg>
                    </span>
                  </button>
                  <div className="clarity-a-wrap">
                    <div className="clarity-a"><p className="clarity-a-text">{o.a}</p></div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Staged cost orientation */}
          <div className="cost-block" data-reveal>
            <header className="cost-head">
              <span className="eyebrow eyebrow-dot">{t.cost_eyebrow}</span>
              <p className="cost-lede muted">{t.cost_lede}</p>
            </header>
            <div className="cost-tiers" data-reveal-children>
              {costTiers.map((c, i) => (
                <article key={i} className="cost-tier">
                  <div className="cost-tier-top">
                    <span className="cost-tier-n meta mono">{String(i + 1).padStart(2, "0")}</span>
                    <span className="cost-tier-tag">{c.tag}</span>
                  </div>
                  <h4 className="cost-tier-t">{c.t}</h4>
                  <p className="cost-tier-scope">{c.scope}</p>
                </article>
              ))}
            </div>
            <p className="cost-note meta">{t.cost_note}</p>
          </div>
        </div>
      </section>
    );
  }
  window.Clarity = Clarity;

  // -------------------------------------------------------------------
  // Location — minimal map + coordinates + nearby
  // -------------------------------------------------------------------
  function Location({ t }) {
    const nearby = [
      { d: "0.4 km", l: t.loc_nearby_a },
      { d: "0.6 km", l: t.loc_nearby_b },
      { d: "0.9 km", l: t.loc_nearby_c },
      { d: "1.8 km", l: t.loc_nearby_d },
      { d: "0.7 km", l: t.loc_nearby_e },
      { d: "2.1 km", l: t.loc_nearby_f }
    ];
    return (
      <section id="lage" className="section sec-loc" data-screen-label="Location">
        <div className="container">
          <header className="sec-head" data-reveal>
            <span className="eyebrow eyebrow-dot">{t.loc_eyebrow}</span>
            <h2 className="display-2">{t.loc_h}</h2>
            <p className="lede col-7" style={{ marginTop: 24 }}>{t.loc_lede}</p>
          </header>

          <div className="loc-grid" data-reveal>
            {/* Map — Google Maps embed */}
            <div className="loc-map">
              <iframe
                title="Maxingstraße 72/74 · 1130 Wien"
                src="https://www.google.com/maps?q=Maxingstra%C3%9Fe+72,+1130+Wien,+Austria&hl=de&z=16&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen=""
                className="loc-map-iframe"
              />
              <div className="loc-map-meta">
                <span className="meta mono">A · 48.184° N · 16.302° E</span>
                <span className="meta">Maxingstraße 72 &amp; 74 · {t.loc_district}</span>
              </div>
            </div>

            {/* Side panel */}
            <div className="loc-panel">
              <div className="loc-nearby">
                <span className="eyebrow eyebrow-dot">{t.loc_nearby_h}</span>
                <ul className="loc-nearby-list">
                  {nearby.map((n, i) => (
                    <li key={i}>
                      <span className="loc-n-d meta mono">{n.d}</span>
                      <span className="loc-n-l">{n.l}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="loc-coord-block">
                <span className="meta mono">{t.loc_coords_label}</span>
                <span className="loc-coord">48.184° N&nbsp;&nbsp;·&nbsp;&nbsp;16.302° E</span>
                <span className="meta muted">{t.loc_district} · A-1130</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  window.Location = Location;

  function MinimalMap() {
    // Simple SVG schematic — Maxingstraße + a few nearby vectors. Not a real map.
    return (
      <svg viewBox="0 0 800 500" className="mm" preserveAspectRatio="xMidYMid slice">
        {/* faint grid */}
        <defs>
          <pattern id="mm-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M40 0 L0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.3" opacity="0.18"/>
          </pattern>
        </defs>
        <rect width="800" height="500" fill="url(#mm-grid)" />

        {/* Schönbrunn park outline (stylised) */}
        <path d="M 80 80 L 360 60 L 410 180 L 380 280 L 200 320 L 90 220 Z"
              fill="rgba(170,179,157,0.20)" stroke="currentColor" strokeWidth="0.6" opacity="0.7" />
        <text x="220" y="180" fontSize="11" fill="currentColor" opacity="0.6"
          fontFamily="Inter, sans-serif" letterSpacing="0.16em">SCHLOSSPARK SCHÖNBRUNN</text>

        {/* Streets */}
        <g stroke="currentColor" fill="none">
          <line x1="0" y1="370" x2="800" y2="350" strokeWidth="0.6" opacity="0.45"/>
          <line x1="120" y1="0" x2="180" y2="500" strokeWidth="0.6" opacity="0.45"/>
          <line x1="450" y1="0" x2="430" y2="500" strokeWidth="0.6" opacity="0.45"/>
          <line x1="600" y1="0" x2="640" y2="500" strokeWidth="0.6" opacity="0.45"/>
          <line x1="0" y1="200" x2="800" y2="220" strokeWidth="0.6" opacity="0.35"/>
          {/* Maxingstraße highlighted */}
          <line x1="280" y1="60" x2="500" y2="460" strokeWidth="1.2" stroke="currentColor" opacity="0.95"/>
        </g>
        <text x="320" y="220" fontSize="11" fill="currentColor" opacity="0.8"
          fontFamily="Inter, sans-serif" letterSpacing="0.16em"
          transform="rotate(58, 320, 220)">MAXINGSTRASSE</text>

        {/* Pin — building A */}
        <g transform="translate(395, 300)">
          <circle r="32" fill="none" stroke="currentColor" strokeWidth="0.4" opacity="0.4"/>
          <circle r="18" fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.65"/>
          <line x1="-40" y1="0" x2="-22" y2="0" stroke="currentColor" strokeWidth="0.6"/>
          <line x1="22" y1="0" x2="40" y2="0" stroke="currentColor" strokeWidth="0.6"/>
          <line x1="0" y1="-40" x2="0" y2="-22" stroke="currentColor" strokeWidth="0.6"/>
          <line x1="0" y1="22" x2="0" y2="40" stroke="currentColor" strokeWidth="0.6"/>
          <circle r="4" fill="var(--court-brass)"/>
          <text x="0" y="-46" fontSize="11" fill="currentColor" textAnchor="middle"
            fontFamily="Inter, sans-serif" letterSpacing="0.18em">A · M72/74</text>
        </g>

        {/* Other markers */}
        <g opacity="0.55" fontFamily="Inter, sans-serif" letterSpacing="0.16em" fontSize="9">
          <g transform="translate(180, 250)">
            <circle r="2.5" fill="currentColor"/>
            <text x="8" y="3" fill="currentColor">SCHÖNBRUNN · PARK</text>
          </g>
          <g transform="translate(680, 380)">
            <circle r="2.5" fill="currentColor"/>
            <text x="8" y="3" fill="currentColor">U4 HIETZING</text>
          </g>
          <g transform="translate(560, 130)">
            <circle r="2.5" fill="currentColor"/>
            <text x="8" y="3" fill="currentColor">HIETZINGER HPTSTR.</text>
          </g>
          <g transform="translate(240, 440)">
            <circle r="2.5" fill="currentColor"/>
            <text x="8" y="3" fill="currentColor">LAINZER TIERGARTEN</text>
          </g>
        </g>

        {/* Scale */}
        <g transform="translate(40, 440)">
          <line x1="0" y1="0" x2="80" y2="0" stroke="currentColor" strokeWidth="0.6"/>
          <line x1="0" y1="-3" x2="0" y2="3" stroke="currentColor" strokeWidth="0.6"/>
          <line x1="80" y1="-3" x2="80" y2="3" stroke="currentColor" strokeWidth="0.6"/>
          <text x="40" y="-8" fontSize="9" fill="currentColor" textAnchor="middle"
            fontFamily="Inter, sans-serif" letterSpacing="0.16em">500 m</text>
        </g>
      </svg>
    );
  }

  // -------------------------------------------------------------------
  // Process — 5 steps
  // -------------------------------------------------------------------
  function Process({ t, steps }) {
    return (
      <section id="prozess" className="section sec-proc" data-screen-label="Process">
        <div className="container">
          <header className="sec-head" data-reveal>
            <span className="eyebrow eyebrow-dot">{t.proc_eyebrow}</span>
            <h2 className="display-2">{t.proc_h}</h2>
            <p className="lede col-7" style={{ marginTop: 24 }}>{t.proc_lede}</p>
          </header>

          <ol className="proc-steps" data-reveal-children>
            {steps.map((s, i) => (
              <li key={s.n} className="proc-step">
                <span className="proc-n">{s.n}</span>
                <div className="proc-body">
                  <h4 className="proc-t">{s.t}</h4>
                  <p className="proc-d muted">{s.d}</p>
                </div>
                <span className="proc-rule" aria-hidden />
              </li>
            ))}
          </ol>

          <p className="proc-optional meta">{t.proc_optional}</p>
        </div>
      </section>
    );
  }
  window.Process = Process;

  // -------------------------------------------------------------------
  // by UNIO
  // -------------------------------------------------------------------
  function ByUnio({ t }) {
    return (
      <section id="unio" className="section sec-unio" data-screen-label="By UNIO">
        <div className="container">
          <div className="unio-grid" data-reveal>
            <div className="unio-left">
              <span className="eyebrow eyebrow-dot">{t.unio_eyebrow}</span>
              <h2 className="display-3 unio-h">{t.unio_h}</h2>
            </div>
            <div className="unio-right">
              <p className="lede">{t.unio_body}</p>
              <ul className="unio-meta">
                <li><span className="meta mono">01</span><span>{t.unio_meta_a}</span></li>
                <li><span className="meta mono">02</span><span>{t.unio_meta_b}</span></li>
                <li><span className="meta mono">03</span><span>{t.unio_meta_c}</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    );
  }
  window.ByUnio = ByUnio;

  // -------------------------------------------------------------------
  // Final CTA — single link to the Wohnungsfinder, no form / phone
  // -------------------------------------------------------------------
  function FinalCTA({ t, onFinder }) {
    return (
      <section id="kontakt" className="section sec-cta section-deep" data-screen-label="Final CTA">
        <div className="container">
          <div className="cta-final" data-reveal>
            <span className="eyebrow eyebrow-dot on-dark">{t.cta_eyebrow}</span>
            <h2 className="display-1 cta-h">{t.cta_h}</h2>
            <p className="lede on-dark cta-body">{t.cta_body}</p>

            <div className="cta-final-actions">
              <button className="btn btn-primary cta-submit" onClick={onFinder}>
                {t.cta_finder} <span className="arrow">→</span>
              </button>
            </div>

            <div className="cta-final-meta">
              <OriginMark size={16} stroke="var(--court-brass)" />
              <span className="cta-meta-l">
                Maxingstraße 72 &amp; 74 · 1130 Wien · Hietzing<br/>
                Vermarktet durch Unio Verse GmbH
              </span>
            </div>
          </div>
        </div>
      </section>
    );
  }
  window.FinalCTA = FinalCTA;

  function Field({ label, value, onChange, type = "text", required, multi, placeholder }) {
    return (
      <div className="field cta-field">
        <label>{label}{required && <span className="req"> *</span>}</label>
        {multi ? (
          <textarea rows="3" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
        ) : (
          <input type={type} value={value} onChange={(e) => onChange(e.target.value)} required={required} placeholder={placeholder} />
        )}
      </div>
    );
  }
  function FieldSelect({ label, value, onChange, options }) {
    return (
      <div className="field cta-field">
        <label>{label}</label>
        <select value={value} onChange={(e) => onChange(e.target.value)}>
          {options.map(o => <option key={o.v} value={o.v}>{o.label}</option>)}
        </select>
      </div>
    );
  }

  // -------------------------------------------------------------------
  // Footer
  // -------------------------------------------------------------------
  function Footer({ t }) {
    return (
      <footer className="origin-footer" data-screen-label="Footer">
        <div className="of-mega">
          <span className="of-mega-text">ORIGIN<span className="o-dot">·</span>S</span>
        </div>

        <div className="of-grid">
          <div className="of-col of-col-brand">
            <div className="of-lockup">
              <span className="of-mark"><OriginMark size={22} stroke="rgba(245,241,232,0.8)" /></span>
              <span className="of-wordmark">ORIGINS</span>
            </div>
            <p className="of-sub">{t.lockup_line1}</p>
            <p className="of-sub muted-d">{t.lockup_line2}</p>
            <p className="of-brandline meta on-dark mono">{t.footer_brandline}</p>
          </div>

          <div className="of-col">
            <span className="meta on-dark of-col-h">{t.footer_col_a_h}</span>
            <ul>
              <li><a href="#projekt">{t.nav_projekt}</a></li>
              <li><a href="#einheiten">{t.nav_einheiten}</a></li>
              <li><a href="#original">{t.nav_original}</a></li>
              <li><a href="#prozess">{t.nav_prozess}</a></li>
            </ul>
          </div>

          <div className="of-col">
            <span className="meta on-dark of-col-h">{t.footer_col_b_h}</span>
            <ul>
              <li><a href="#konzept">Konzept</a></li>
              <li><a href="#opportunity">Möglichkeit</a></li>
              <li><a href="#potential">Potenzial</a></li>
              <li><a href="#lage">{t.nav_lage}</a></li>
            </ul>
          </div>

          <div className="of-col">
            <span className="meta on-dark of-col-h">{t.footer_col_c_h}</span>
            <ul>
              <li>{t.footer_addr_h}</li>
              <li className="muted-d">{t.footer_addr_b}</li>
              <li><a href="mailto:hello@origins-wien.at">hello@origins-wien.at</a></li>
              <li className="muted-d">+43 1 000 00 00</li>
            </ul>
          </div>
        </div>

        <div className="of-bottom">
          <span>Vermarktet bei <a href="https://app.unio.at" target="_blank" rel="noopener">Unio Verse GmbH</a> · Homepage <a href="https://www.ad.boutique" target="_blank" rel="noopener">Ad Boutique</a></span>
          <span className="of-legal">
            <a href="https://albrecht.unio.at/Impressum" target="_blank" rel="noopener">{t.footer_legal_a}</a>
            <span className="of-dot">·</span>
            <a href="https://albrecht.unio.at/Datenschutz" target="_blank" rel="noopener">{t.footer_legal_b}</a>
          </span>
          <span className="mono on-dark muted-d">48.184° N · 16.302° E</span>
        </div>
      </footer>
    );
  }
  window.Footer = Footer;

})();
