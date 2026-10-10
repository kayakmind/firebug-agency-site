// Firebug logo master. One source of geometry, every file derived from it.
const fs = require('fs');
const path = require('path');
const out = process.argv[2];
fs.mkdirSync(out, { recursive: true });

// ---- palette
const C = {
  soot: '#1C1A1F', smoke: '#8E8A91', ash: '#BDB9C1', white: '#FFFFFF',
  vermilion: '#F2401C', amber: '#FFAA3B', core: '#FFE4A0',
};

// ---- mark geometry (viewBox 0 0 60 140). x = flame width = 26.
const FLAME_OUT = 'M30 4 C30 4, 42 18, 43 30 C44 42, 38 48, 30 50 C22 48, 16 42, 17 30 C18 18, 30 4, 30 4Z';
const FLAME_IN = 'M30 18 C30 18, 37 26, 37 33 C37 39, 34 44, 30 46 C26 44, 23 39, 23 33 C23 26, 30 18, 30 18Z';
const X = 26;            // unit
const MARK_TOP = 4, MARK_BOTTOM = 138, MARK_H = MARK_BOTTOM - MARK_TOP; // 134

// version -> colors
const V = {
  full:  { stick: C.smoke, outer: C.vermilion, inner: C.amber, core: C.core, fire: C.soot, bug: C.vermilion },
  dark:  { stick: C.ash,   outer: C.vermilion, inner: C.amber, core: C.core, fire: C.white, bug: C.vermilion },
  ink:   { stick: C.soot,  outer: C.soot,      inner: null,    core: null,   fire: C.soot,  bug: C.soot },
  white: { stick: C.white, outer: C.white,     inner: null,    core: null,   fire: C.white, bug: C.white },
};

// detail: 'full' (3 flame colors) | 'two' (no core) | 'one' (outer only)
function markGroup(v, detail = 'full', withStick = true) {
  const p = V[v];
  let s = '';
  if (withStick) s += `<rect x="27" y="48" width="6" height="90" rx="3" fill="${p.stick}"/>`;
  s += `<path d="${FLAME_OUT}" fill="${p.outer}"/>`;
  if (p.inner && detail !== 'one') s += `<path d="${FLAME_IN}" fill="${p.inner}"/>`;
  if (p.core && detail === 'full') s += `<ellipse cx="30" cy="40" rx="4" ry="6" fill="${p.core}"/>`;
  return s;
}

// ---- wordmark glyphs: Space Mono Bold outlines, baseline y=0, cap height 140 units, advance 158.4
const GLYPH = {
  F: 'M44 0L17.600 0L17.600-140L107.200-140L107.200-114.800L44-114.800L44-82.800L106-82.800L106-57.600L44-57.600',
  I: 'M108 0L14.400 0L14.400-25.200L48-25.200L48-114.800L14.400-114.800L14.400-140L108-140L108-114.800L74.400-114.800L74.400-25.200L108-25.200',
  R: 'M41 0L14.600 0L14.600-140L68.200-140Q82.600-140 92.400-134.800Q102.200-129.600 107.200-120.900Q112.200-112.200 112.200-101.400L112.200-96.600Q112.200-88 107.500-80.500Q102.800-73 93.400-69L93.400-65.400Q100.400-64.600 104.500-60Q108.600-55.400 108.600-48.400L108.600 0L82.200 0L82.200-42Q82.200-46.800 79.700-49.800Q77.200-52.800 71.400-52.800L41-52.800L41 0M41-114.800L41-78L66.200-78Q75.800-78 80.800-82.600Q85.800-87.200 85.800-95.200L85.800-97.600Q85.800-104.600 80.800-109.700Q75.800-114.800 66.200-114.800',
  E: 'M107.200 0L16.400 0L16.400-140L104.800-140L104.800-114.800L42.800-114.800L42.800-82.800L102.400-82.800L102.400-57.600L42.800-57.600L42.800-25.200L107.200-25.200',
  B: 'M70.600 0L9.200 0L9.200-25.200L22.400-25.200L22.400-114.800L9.200-114.800L9.200-140L70.600-140Q90.800-140 101.400-129.600Q112-119.200 112-103.600L112-101.200Q112-89.200 105.300-82Q98.600-74.800 88.400-72L88.400-68.400Q98.600-65.800 105.300-58.300Q112-50.800 112-39L112-36.600Q112-20.800 101.400-10.400Q90.800 0 70.600 0M48.800-114.800L48.800-82.800L68-82.800Q76.400-82.800 81.600-86.400Q86.800-90 86.800-98.200L86.800-99.400Q86.800-107.600 81.600-111.200Q76.400-114.800 68-114.800L48.800-114.800M48.800-57.600L48.800-25.200L68-25.200Q76.400-25.200 81.600-28.900Q86.800-32.600 86.800-40.800L86.800-42Q86.800-50.200 81.600-53.900Q76.400-57.600 68-57.600',
  U: 'M61.200 2.800Q36.400 2.800 23.600-10.900Q10.800-24.600 10.800-48.400L10.800-140L37.200-140L37.200-48.400Q37.200-36.200 43.100-29.100Q49-22 61.200-22Q73.600-22 79.400-29.100Q85.200-36.200 85.200-48.400L85.200-140L111.600-140L111.600-48.400Q111.600-24.600 98.900-10.900Q86.200 2.800 61.200 2.800',
  G: 'M54.800 2.800Q42 2.800 31.600-3.500Q21.200-9.800 15-22.400Q8.800-35 8.800-53.600L8.800-86.400Q8.800-104.600 15.500-117.200Q22.200-129.800 34-136.300Q45.800-142.800 61.200-142.800Q77.200-142.800 88.600-136Q100-129.200 106-117.700Q112-106.200 112-92L112-89.600L85.600-89.600L85.600-92Q85.600-104.600 79.100-111.100Q72.600-117.600 60.800-117.600Q49.800-117.600 42.500-110.200Q35.200-102.800 35.200-84.400L35.200-54.800Q35.200-22.400 61.600-22.400Q73.400-22.400 79.500-28.800Q85.600-35.200 85.600-45.600L52-45.600L52-70.800L112-70.800L112 0L88 0L88-15.600L84.400-15.600Q82-7.800 75.200-2.500Q68.400 2.800 54.800 2.800',
};
const ADV = 158.4, CAPU = 140, WORD = 'FIREBUG';
const GLYPH_LEFT = 9.2, GLYPH_RIGHT_G = 112; // trim bearings a little
function wordWidthUnits() { return ADV * (WORD.length - 1) + GLYPH_RIGHT_G - GLYPH_LEFT; }

function wordGroup(v, cap, x0, baseline) {
  const p = V[v]; const k = cap / CAPU; let s = '';
  WORD.split('').forEach((ch, i) => {
    const fill = i < 4 ? p.fire : p.bug;
    const tx = x0 + (i * ADV - GLYPH_LEFT) * k;
    s += `<path transform="translate(${r(tx)},${r(baseline)}) scale(${r(k)})" d="${GLYPH[ch]}" fill="${fill}"/>`;
  });
  return s;
}
const r = n => Math.round(n * 1000) / 1000;
function svg(w, h, body, bg) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${r(w)}" height="${r(h)}" viewBox="0 0 ${r(w)} ${r(h)}">${bg ? `<rect width="100%" height="100%" fill="${bg}"/>` : ''}${body}</svg>\n`;
}
const write = (name, s) => { fs.writeFileSync(path.join(out, name), s); console.log(name); };

// ---- 1. mark alone, 1x clear space
for (const v of Object.keys(V)) {
  const s = 1; const pad = X * s;
  const body = `<g transform="translate(${pad},${pad - MARK_TOP})">${markGroup(v)}</g>`;
  write(`firebug-mark-${v}.svg`, svg(60 * s + 2 * pad - 0 , MARK_H * s + 2 * pad, body));
}

// ---- 2. horizontal lockup: mark height = 3 cap heights, gap 0.5x, baseline on stick foot, clear space 1x
function horizontal(v, cap = 28) {
  const s = (3 * cap) / MARK_H;           // mark scale
  const pad = X * s;                      // 1x
  const gap = 0.5 * X * s;
  const markW = 60 * s, markH = MARK_H * s;
  const wordW = wordWidthUnits() * (cap / CAPU);
  const W = pad + markW + gap + wordW + pad;
  const H = pad + markH + pad;
  const baseline = pad + markH;           // stick foot
  const body = `<g transform="translate(${r(pad)},${r(pad - MARK_TOP * s)}) scale(${r(s)})">${markGroup(v)}</g>` +
    wordGroup(v, cap, pad + markW + gap, baseline);
  return svg(W, H, body);
}
for (const v of Object.keys(V)) write(`firebug-lockup-horizontal-${v}.svg`, horizontal(v));

// ---- 3. stacked lockup: mark above, gap 0.4x, centered; mark height = 2.2 cap? keep same 3C relation feels tall; use word width as the anchor.
function stacked(v, cap = 24) {
  const wordW = wordWidthUnits() * (cap / CAPU);
  const s = (3 * cap) / MARK_H;
  const pad = X * s, gap = 0.4 * X * s;
  const markW = 60 * s, markH = MARK_H * s;
  const W = pad + wordW + pad;
  const H = pad + markH + gap + cap + pad;
  const cx = W / 2;
  const body = `<g transform="translate(${r(cx - markW / 2)},${r(pad - MARK_TOP * s)}) scale(${r(s)})">${markGroup(v)}</g>` +
    wordGroup(v, cap, cx - wordW / 2, pad + markH + gap + cap);
  return svg(W, H, body);
}
for (const v of Object.keys(V)) write(`firebug-lockup-stacked-${v}.svg`, stacked(v));

// ---- 4. avatars 1024: Soot square, Soot circle, white square. mark at 65% height, centered.
function avatar(shape, bg, v, size = 1024) {
  const s = (0.65 * size) / MARK_H; const markW = 60 * s, markH = MARK_H * s;
  const clip = shape === 'circle' ? `<circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="${bg}"/>` : `<rect width="${size}" height="${size}" fill="${bg}"/>`;
  const body = clip + `<g transform="translate(${r(size / 2 - markW / 2)},${r(size / 2 - markH / 2 - MARK_TOP * s)}) scale(${r(s)})">${markGroup(v)}</g>`;
  return svg(size, size, body);
}
write('firebug-avatar-soot-square.svg', avatar('square', C.soot, 'dark'));
write('firebug-avatar-soot-circle.svg', avatar('circle', C.soot, 'dark'));
write('firebug-avatar-white-square.svg', avatar('square', C.white, 'full'));

// ---- 5. favicon: flame alone, two colors, no stick, fills a 64 box
{
  const flameH = 46, s = 56 / flameH; const w = 26 * s;
  const body = `<g transform="translate(${r(32 - 30 * s)},${r(4 - 4 * s)}) scale(${r(s)})">${markGroup('full', 'two', false)}</g>`;
  write('firebug-favicon.svg', svg(64, 64, body));
}

// ---- 6. OG share image 1200x630: stacked lockup on white
{
  const cap = 64; const inner = stacked('full', cap);
  const m = inner.match(/width="([\d.]+)" height="([\d.]+)"/); const iw = +m[1], ih = +m[2];
  const content = inner.replace(/^<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '');
  const body = `<rect width="1200" height="630" fill="${C.white}"/><g transform="translate(${r(600 - iw / 2)},${r(315 - ih / 2)})">${content}</g>`;
  write('firebug-og-1200x630.svg', svg(1200, 630, body));
}
