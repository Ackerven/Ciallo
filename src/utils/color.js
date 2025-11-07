// ===== Base Colors =====
const baseColors = [
  "#F7B6C8", // soft pink
  "#FFF3E0", // cream white
  "#FFD166", // light gold
  "#C97A95", // rose pink
  "#E0F7FA"  // light aqua blue
]

// ===== HEX ↔ RGB =====
function hexToRgb(hex) {
  const bigint = parseInt(hex.slice(1), 16)
  return [
    (bigint >> 16) & 255,
    (bigint >> 8) & 255,
    bigint & 255
  ]
}

function rgbToHex(r, g, b) {
  return (
    '#' +
    [r, g, b]
      .map(x => {
        const hex = x.toString(16)
        return hex.length === 1 ? '0' + hex : hex
      })
      .join('')
  )
}

// ===== RGB ↔ HSL =====
function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255
  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  let h, s, l = (max + min) / 2

  if (max === min) {
    h = s = 0
  } else {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break
      case g: h = (b - r) / d + 2; break
      case b: h = (r - g) / d + 4; break
    }
    h *= 60
  }
  return [h, s, l]
}

function hslToRgb(h, s, l) {
  h /= 360
  let r, g, b

  if (s === 0) {
    r = g = b = l
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1
      if (t > 1) t -= 1
      if (t < 1 / 6) return p + (q - p) * 6 * t
      if (t < 1 / 2) return q
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
      return p
    }
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q
    r = hue2rgb(p, q, h + 1 / 3)
    g = hue2rgb(p, q, h)
    b = hue2rgb(p, q, h - 1 / 3)
  }
  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)]
}

// ===== RGB Mixing =====
function mixColors(color1, color2, ratio) {
  const [r1, g1, b1] = hexToRgb(color1)
  const [r2, g2, b2] = hexToRgb(color2)
  const r = Math.round(r1 + (r2 - r1) * ratio)
  const g = Math.round(g1 + (g2 - g1) * ratio)
  const b = Math.round(b1 + (b2 - b1) * ratio)
  return rgbToHex(r, g, b)
}

// ===== HSL Mixing =====
function mixColorsHsl(color1, color2, ratio) {
  const [r1, g1, b1] = hexToRgb(color1)
  const [r2, g2, b2] = hexToRgb(color2)
  const [h1, s1, l1] = rgbToHsl(r1, g1, b1)
  const [h2, s2, l2] = rgbToHsl(r2, g2, b2)

  let dh = h2 - h1
  if (dh > 180) dh -= 360
  if (dh < -180) dh += 360

  const h = (h1 + dh * ratio + 360) % 360
  const s = s1 + (s2 - s1) * ratio
  const l = l1 + (l2 - l1) * ratio
  const [r, g, b] = hslToRgb(h, s, l)

  return rgbToHex(r, g, b)
}

// ===== OKLCH Mixing =====
// Linear RGB helpers
function srgbToLinear(c) {
  c /= 255
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
}
function linearToSrgb(c) {
  const v = c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055
  return Math.round(Math.min(Math.max(0, v), 1) * 255)
}

// RGB → OKLab
function rgbToOklab(r, g, b) {
  const [lr, lg, lb] = [srgbToLinear(r), srgbToLinear(g), srgbToLinear(b)]
  const l_ = 0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb
  const m_ = 0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb
  const s_ = 0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb

  const l = Math.cbrt(l_)
  const m = Math.cbrt(m_)
  const s = Math.cbrt(s_)

  const L = 0.2104542553 * l + 0.7936177850 * m - 0.0040720468 * s
  const A = 1.9779984951 * l - 2.4285922050 * m + 0.4505937099 * s
  const B = 0.0259040371 * l + 0.7827717662 * m - 0.8086757660 * s

  return [L, A, B]
}

// OKLab → RGB
function oklabToRgb(L, A, B) {
  const l = Math.pow(L + 0.3963377774 * A + 0.2158037573 * B, 3)
  const m = Math.pow(L - 0.1055613458 * A - 0.0638541728 * B, 3)
  const s = Math.pow(L - 0.0894841775 * A - 1.2914855480 * B, 3)

  const lr = +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s
  const lg = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s
  const lb = -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s

  return [
    linearToSrgb(lr),
    linearToSrgb(lg),
    linearToSrgb(lb)
  ]
}

function oklabToOklch(L, A, B) {
  const C = Math.sqrt(A * A + B * B)
  let h = Math.atan2(B, A) * 180 / Math.PI
  if (h < 0) h += 360
  return [L, C, h]
}

function oklchToOklab(L, C, h) {
  const hr = h * Math.PI / 180
  const A = Math.cos(hr) * C
  const B = Math.sin(hr) * C
  return [L, A, B]
}

// OKLCH mixing
function mixColorsOklch(color1, color2, ratio) {
  const [r1, g1, b1] = hexToRgb(color1)
  const [r2, g2, b2] = hexToRgb(color2)

  const [L1, A1, B1] = rgbToOklab(r1, g1, b1)
  const [L2, A2, B2] = rgbToOklab(r2, g2, b2)

  const [_, C1, h1] = oklabToOklch(L1, A1, B1)
  const [__, C2, h2] = oklabToOklch(L2, A2, B2)

  let dh = h2 - h1
  if (dh > 180) dh -= 360
  if (dh < -180) dh += 360

  const L = L1 + (L2 - L1) * ratio
  const C = C1 + (C2 - C1) * ratio
  const h = (h1 + dh * ratio + 360) % 360

  const [l3, a3, b3] = oklchToOklab(L, C, h)
  const [r, g, b] = oklabToRgb(l3, a3, b3)
  return rgbToHex(r, g, b)
}

// ===== Public APIs =====

// random from base colors
export function randomBaseColor() {
  return baseColors[Math.floor(Math.random() * baseColors.length)]
}

// random between two adjacent base colors (RGB)
export function randomMixColor() {
  const i = Math.floor(Math.random() * (baseColors.length - 1))
  const ratio = Math.random()
  return mixColors(baseColors[i], baseColors[i + 1], ratio)
}

// random between two adjacent base colors (HSL)
export function randomMixHslColor() {
  const i = Math.floor(Math.random() * (baseColors.length - 1))
  const ratio = Math.random()
  return mixColorsHsl(baseColors[i], baseColors[i + 1], ratio)
}

// random between two adjacent base colors (OKLCH)
export function randomMixOklchColor() {
  const i = Math.floor(Math.random() * (baseColors.length - 1))
  const ratio = Math.random()
  return mixColorsOklch(baseColors[i], baseColors[i + 1], ratio)
}

export function getBaseColors() {
  return baseColors
}
