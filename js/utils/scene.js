/* =============================================================
   utils/scene.js  电影级产品 / 作业场景 SVG（data URI）
   自包含，不依赖外链图床，保证 CSP 与 file:// 下正常渲染
   ============================================================= */

function svgUri(markup) {
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(markup);
}

function droneCatapult() {
  return [
    '<g>',
    '  <rect x="80" y="368" width="420" height="14" rx="4" fill="#8a94a6"/>',
    '  <rect x="80" y="348" width="28" height="48" rx="3" fill="#6d7686"/>',
    '  <rect x="460" y="340" width="18" height="42" rx="3" fill="#6d7686"/>',
    '  <path d="M90 368 L470 330" stroke="#c5ccd8" stroke-width="6" stroke-linecap="round"/>',
    '</g>',
    '<g transform="translate(520 220) rotate(-18)">',
    '  <g fill="none" stroke="#d7dde8" stroke-width="3" stroke-linecap="round">',
    '    <rect x="-40" y="-12" width="80" height="24" rx="8"/>',
    '    <path d="M-40 0L-108 -52M-40 0L-108 52M40 0L108 -52M40 0L108 52"/>',
    '  </g>',
    '  <circle cx="-108" cy="-52" r="18" fill="#0b1018" stroke="#7fd9ff" stroke-width="2"/>',
    '  <circle cx="-108" cy="52" r="18" fill="#0b1018" stroke="#7fd9ff" stroke-width="2"/>',
    '  <circle cx="108" cy="-52" r="18" fill="#0b1018" stroke="#7fd9ff" stroke-width="2"/>',
    '  <circle cx="108" cy="52" r="18" fill="#0b1018" stroke="#7fd9ff" stroke-width="2"/>',
    '  <ellipse cx="0" cy="6" rx="12" ry="6" fill="#00d4ff" opacity="0.85"/>',
    '</g>',
  ].join('');
}

function droneHex() {
  return [
    '<g transform="translate(400 250)">',
    '  <g fill="none" stroke="#cfd6e4" stroke-width="3" stroke-linecap="round">',
    '    <rect x="-52" y="-16" width="104" height="32" rx="10"/>',
    '    <path d="M-52 0L-140 -72M-52 0L-140 72M52 0L140 -72M52 0L140 72"/>',
    '  </g>',
    '  <circle cx="-140" cy="-72" r="26" fill="#0b1018" stroke="#7fd9ff" stroke-width="2"/>',
    '  <circle cx="-140" cy="72" r="26" fill="#0b1018" stroke="#7fd9ff" stroke-width="2"/>',
    '  <circle cx="140" cy="-72" r="26" fill="#0b1018" stroke="#7fd9ff" stroke-width="2"/>',
    '  <circle cx="140" cy="72" r="26" fill="#0b1018" stroke="#7fd9ff" stroke-width="2"/>',
    '  <ellipse cx="0" cy="6" rx="18" ry="8" fill="#00d4ff" opacity="0.85"/>',
    '</g>',
  ].join('');
}

function droneVtol() {
  return [
    '<g transform="translate(400 250)">',
    '  <ellipse cx="0" cy="8" rx="210" ry="18" fill="#9aa3b5"/>',
    '  <rect x="-90" y="-14" width="180" height="28" rx="8" fill="#d7dde8"/>',
    '  <rect x="-8" y="-28" width="16" height="56" rx="4" fill="#eceff4"/>',
    '  <circle cx="-70" cy="-36" r="16" fill="#0b1018" stroke="#7fd9ff" stroke-width="2"/>',
    '  <circle cx="70" cy="-36" r="16" fill="#0b1018" stroke="#7fd9ff" stroke-width="2"/>',
    '  <circle cx="-70" cy="36" r="16" fill="#0b1018" stroke="#7fd9ff" stroke-width="2"/>',
    '  <circle cx="70" cy="36" r="16" fill="#0b1018" stroke="#7fd9ff" stroke-width="2"/>',
    '</g>',
  ].join('');
}

function droneAg() {
  return [
    '<g transform="translate(400 248)">',
    '  <rect x="-70" y="-18" width="140" height="36" rx="12" fill="#d5dbe6"/>',
    '  <path d="M-70 0L-160 -50M-70 0L-160 50M70 0L160 -50M70 0L160 50" fill="none" stroke="#c5ccd8" stroke-width="8" stroke-linecap="round"/>',
    '  <ellipse cx="0" cy="28" rx="36" ry="10" fill="#00d4ff" opacity="0.45"/>',
    '  <circle cx="-160" cy="-50" r="22" fill="#10141c" stroke="#9be7ff" stroke-width="2"/>',
    '  <circle cx="-160" cy="50" r="22" fill="#10141c" stroke="#9be7ff" stroke-width="2"/>',
    '  <circle cx="160" cy="-50" r="22" fill="#10141c" stroke="#9be7ff" stroke-width="2"/>',
    '  <circle cx="160" cy="50" r="22" fill="#10141c" stroke="#9be7ff" stroke-width="2"/>',
    '</g>',
  ].join('');
}

function deviceBox() {
  return [
    '<g transform="translate(400 250)">',
    '  <rect x="-110" y="-70" width="220" height="140" rx="16" fill="#121821" stroke="#7fd9ff" stroke-width="2"/>',
    '  <rect x="-92" y="-52" width="184" height="88" rx="8" fill="#071018"/>',
    '  <path d="M-70 -10h40M-20 -10h90" stroke="#00d4ff" stroke-width="3" opacity="0.8"/>',
    '  <circle cx="78" cy="42" r="6" fill="#00d4ff"/>',
    '</g>',
  ].join('');
}

const SCENES = {
  hex:    { sky: ['#08131f', '#02050a'], accent: '#00d4ff', art: droneHex },
  vtol:   { sky: ['#0c1824', '#05080e'], accent: '#5e9cff', art: droneVtol },
  ag:     { sky: ['#10240f', '#071107'], accent: '#7dffb2', art: droneAg },
  fc:     { sky: ['#10131c', '#05060a'], accent: '#00d4ff', art: deviceBox },
  gcs:    { sky: ['#14110c', '#070605'], accent: '#ffcf7a', art: deviceBox },
  link:   { sky: ['#0d1220', '#05060c'], accent: '#8b7dff', art: deviceBox },
  power:  { sky: ['#1a1408', '#07050a'], accent: '#ffb347', art: droneHex, ground: '#2a2214' },
  rescue: { sky: ['#1a0c0c', '#080404'], accent: '#ff6b6b', art: droneVtol, ground: '#241010' },
  city:   { sky: ['#0b1220', '#05070c'], accent: '#6ecbff', art: droneHex, ground: '#121820' },
  farm:   { sky: ['#10240f', '#071107'], accent: '#9dffb0', art: droneAg, ground: '#1a2a14' },
  forest: { sky: ['#0c1a14', '#040807'], accent: '#62d6a8', art: droneHex, ground: '#102018' },
  urban:  { sky: ['#12151c', '#06070a'], accent: '#c9d4e8', art: droneVtol, ground: '#1a1e26' },
  catapult: { sky: ['#0b1420', '#03060b'], accent: '#7fd9ff', art: droneCatapult, ground: '#121820' },
};

export function cinematicScene(kind) {
  const s = SCENES[kind] || SCENES.hex;
  const id = String(kind || 'hex').replace(/[^a-z0-9]/gi, '');
  const markup = [
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" role="img">',
    '<defs>',
    '  <linearGradient id="sky' + id + '" x1="0" y1="0" x2="0" y2="1">',
    '    <stop offset="0%" stop-color="' + s.sky[0] + '"/>',
    '    <stop offset="100%" stop-color="' + s.sky[1] + '"/>',
    '  </linearGradient>',
    '  <radialGradient id="glow' + id + '" cx="50%" cy="42%" r="48%">',
    '    <stop offset="0%" stop-color="' + s.accent + '" stop-opacity="0.42"/>',
    '    <stop offset="70%" stop-color="' + s.accent + '" stop-opacity="0"/>',
    '  </radialGradient>',
    '</defs>',
    '<rect width="800" height="500" fill="url(#sky' + id + ')"/>',
    '<rect width="800" height="500" fill="url(#glow' + id + ')"/>',
    s.ground ? '<rect y="360" width="800" height="140" fill="' + s.ground + '" opacity="0.85"/>' : '',
    '<ellipse cx="400" cy="390" rx="220" ry="18" fill="#000" opacity="0.35"/>',
    s.art(),
    '</svg>',
  ].join('');
  return svgUri(markup);
}
