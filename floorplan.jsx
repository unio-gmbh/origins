/* global React */
// FloorPlan — minimal SVG floor plan, varied by unit footprint.
// Drawn at 200x140 viewBox; intended to render small/medium.
// Pure presentation; deterministic from `seed`.

(function () {
  const { useMemo } = React;

  // Simple seeded rand so plans are stable per unit code.
  function mulberry32(a) {
    return function () {
      a |= 0; a = a + 0x6D2B79F5 | 0;
      let t = Math.imul(a ^ a >>> 15, 1 | a);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }
  function hashCode(s) {
    let h = 0;
    for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0;
    return Math.abs(h);
  }

  // Generate a footprint roughly proportional to size + orientation.
  // Always returns rooms[] with rectangles inside a bounding outline.
  function generatePlan(unit) {
    const seed = hashCode(unit.code);
    const rand = mulberry32(seed);

    // outline aspect depends on orientation
    const isCorner = unit.orientation.includes("/");
    const isStreet = unit.orientation.startsWith("Stra");
    const aspect = isCorner ? 1.0 : (isStreet ? 1.45 : 1.2);

    // size area drives outline magnitude
    const area = Math.sqrt(Math.max(unit.size, 30));
    const baseW = 12 + area * 1.6;
    const baseH = baseW / aspect;

    // viewBox is 200x140 with margin 12
    const VBW = 200, VBH = 140, MARGIN = 14;
    const innerW = VBW - MARGIN * 2;
    const innerH = VBH - MARGIN * 2;

    // scale to fit
    const scale = Math.min(innerW / baseW, innerH / baseH);
    const w = baseW * scale;
    const h = baseH * scale;
    const x = (VBW - w) / 2;
    const y = (VBH - h) / 2;

    // Rooms: split into 2..4 rectangles
    const rooms = [];
    const splitH = rand() > 0.5;
    if (unit.rooms >= 3) {
      // Two-axis split
      const sx = 0.35 + rand() * 0.25;
      const sy = 0.45 + rand() * 0.2;
      const wA = w * sx, wB = w * (1 - sx);
      const hA = h * sy, hB = h * (1 - sy);
      rooms.push({ x, y, w: wA, h: hA });
      rooms.push({ x: x + wA, y, w: wB, h: hA });
      rooms.push({ x, y: y + hA, w: w, h: hB });
      if (unit.rooms >= 4) {
        // sub-split the last
        rooms.pop();
        const sxx = 0.55;
        rooms.push({ x, y: y + hA, w: w * sxx, h: hB });
        rooms.push({ x: x + w * sxx, y: y + hA, w: w * (1 - sxx), h: hB });
      }
    } else {
      // Single split
      if (splitH) {
        const s = 0.55 + rand() * 0.15;
        rooms.push({ x, y, w, h: h * s });
        rooms.push({ x, y: y + h * s, w, h: h * (1 - s) });
      } else {
        const s = 0.6 + rand() * 0.15;
        rooms.push({ x, y, w: w * s, h });
        rooms.push({ x: x + w * s, y, w: w * (1 - s), h });
      }
    }

    // Windows along the outer edges based on orientation
    const windows = [];
    const wallSegments = (side, count, len) => {
      const segs = [];
      const usable = side - 20;
      const step = usable / (count + 1);
      for (let i = 1; i <= count; i++) segs.push({ offset: 10 + i * step - len / 2, len });
      return segs;
    };
    if (unit.orientation.includes("Stra") || isCorner) {
      // south/street: top edge windows
      const segs = wallSegments(w, unit.rooms >= 3 ? 3 : 2, 14);
      segs.forEach(s => windows.push({ x: x + s.offset, y: y - 1, w: s.len, h: 2, side: "top" }));
    }
    if (unit.orientation.includes("Hof") || isCorner) {
      // courtyard: bottom edge windows
      const segs = wallSegments(w, 2, 12);
      segs.forEach(s => windows.push({ x: x + s.offset, y: y + h - 1, w: s.len, h: 2, side: "bottom" }));
    }
    // a side window for variation
    if (rand() > 0.4) {
      const off = 12 + rand() * (h - 30);
      const side = rand() > 0.5 ? "left" : "right";
      if (side === "left") windows.push({ x: x - 1, y: y + off, w: 2, h: 12, side });
      else windows.push({ x: x + w - 1, y: y + off, w: 2, h: 12, side });
    }

    // Door — entry on courtyard or stair side (right edge usually)
    const doorY = y + h - 22;
    const door = { x: x + w - 1, y: doorY, w: 2, h: 8 };

    return { outline: { x, y, w, h }, rooms, windows, door, viewBox: `0 0 ${VBW} ${VBH}` };
  }

  function FloorPlan({ unit, stroke = "currentColor", muted = "rgba(27,29,25,0.16)", showLabel = true }) {
    const plan = useMemo(() => generatePlan(unit), [unit.code]);
    const { outline, rooms, windows, door, viewBox } = plan;

    return (
      <svg viewBox={viewBox} className="fp" aria-hidden="true" style={{ width: "100%", height: "100%", display: "block" }}>
        {/* faint grid */}
        <defs>
          <pattern id={`grid-${unit.code}`} width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M10 0 L0 0 0 10" fill="none" stroke={muted} strokeWidth="0.3" opacity="0.5" />
          </pattern>
        </defs>
        <rect x="0" y="0" width="200" height="140" fill={`url(#grid-${unit.code})`} opacity="0.6" />

        {/* room fills — soft */}
        {rooms.map((r, i) => (
          <rect key={i}
            x={r.x} y={r.y} width={r.w} height={r.h}
            fill={i === 0 ? "rgba(168,138,74,0.06)" : "rgba(27,29,25,0.025)"}
          />
        ))}

        {/* interior walls between rooms */}
        {rooms.map((r, i) => (
          <rect key={`rw-${i}`} x={r.x} y={r.y} width={r.w} height={r.h} fill="none" stroke={stroke} strokeWidth="0.4" opacity="0.55" />
        ))}

        {/* outer walls — heavier */}
        <rect x={outline.x} y={outline.y} width={outline.w} height={outline.h}
          fill="none" stroke={stroke} strokeWidth="1.2" />

        {/* windows — break the outer wall */}
        {windows.map((w, i) => (
          <rect key={`w-${i}`} x={w.x} y={w.y} width={w.w} height={w.h} fill="var(--bg, #F5F1E8)" />
        ))}
        {windows.map((w, i) => {
          // window mullion line
          if (w.side === "top" || w.side === "bottom") {
            return <line key={`ml-${i}`} x1={w.x} y1={w.y + 1} x2={w.x + w.w} y2={w.y + 1} stroke={stroke} strokeWidth="0.5" />;
          }
          return <line key={`ml-${i}`} x1={w.x + 1} y1={w.y} x2={w.x + 1} y2={w.y + w.h} stroke={stroke} strokeWidth="0.5" />;
        })}

        {/* entry door — break + arc */}
        <rect x={door.x} y={door.y} width={door.w} height={door.h} fill="var(--bg, #F5F1E8)" />
        <path d={`M ${door.x - 8} ${door.y + door.h} A 8 8 0 0 1 ${door.x} ${door.y}`}
          fill="none" stroke={stroke} strokeWidth="0.45" opacity="0.7" />

        {/* north arrow */}
        <g transform={`translate(${outline.x + outline.w - 14}, ${outline.y + 10})`} opacity="0.7">
          <line x1="0" y1="-6" x2="0" y2="6" stroke={stroke} strokeWidth="0.5" />
          <polygon points="0,-7 -2.4,-3 2.4,-3" fill={stroke} />
          <text x="0" y="14" fontSize="5" textAnchor="middle" fill={stroke}
            fontFamily="Inter, sans-serif" letterSpacing="0.1em">N</text>
        </g>

        {/* corner code label */}
        {showLabel && (
          <text x="8" y="132" fontSize="6" fill={stroke} opacity="0.55"
            fontFamily="Inter, sans-serif" letterSpacing="0.2em">
            {unit.code} · {unit.size.toFixed(2).replace(".", ",")} m²
          </text>
        )}
      </svg>
    );
  }

  window.FloorPlan = FloorPlan;
})();
