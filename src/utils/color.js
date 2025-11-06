// base color
const baseColors = [
  "#F7B6C8", // soft pink
  "#FFF3E0", // cream white
  "#FFD166", // light gold
  "#C97A95", // rose pink
  "#E0F7FA"  // light aqua blue
]

// hex to RGB
function hexToRgb(hex) {
  const bigint = parseInt(hex.slice(1), 16)
  const r = (bigint >> 16) & 255
  const g = (bigint >> 8) & 255
  const b = bigint & 255
  return [r, g, b]
}

// RGB to hex
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


// RGB to HSL
function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h *= 60;
  }
  return [h, s, l];
}

// HSL to RGB
function hslToRgb(h, s, l) {
  h /= 360;
  let r, g, b;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }
  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

// generate a blended color between two colors
function mixColors(color1, color2, ratio) {
  const [r1, g1, b1] = hexToRgb(color1)
  const [r2, g2, b2] = hexToRgb(color2)
  const r = Math.round(r1 + (r2 - r1) * ratio)
  const g = Math.round(g1 + (g2 - g1) * ratio)
  const b = Math.round(b1 + (b2 - b1) * ratio)
  return rgbToHex(r, g, b)
}

// generate a blended color between two colors with hsl
function mixColorsHsl(color1, color2, ratio) {
  const [r1, g1, b1] = hexToRgb(color1);
  const [r2, g2, b2] = hexToRgb(color2);

  const [h1, s1, l1] = rgbToHsl(r1, g1, b1);
  const [h2, s2, l2] = rgbToHsl(r2, g2, b2);

  let dh = h2 - h1;
  if (dh > 180) dh -= 360;
  if (dh < -180) dh += 360;
  const h = (h1 + dh * ratio + 360) % 360;

  const s = s1 + (s2 - s1) * ratio;
  const l = l1 + (l2 - l1) * ratio;

  const [r, g, b] = hslToRgb(h, s, l);
  return rgbToHex(r, g, b);
}

// pick a random color from the gradient formed by base colors
export function randomMixColor() {
  const index = Math.floor(Math.random() * (baseColors.length - 1))
  const c1 = baseColors[index]
  const c2 = baseColors[index + 1]
  const ratio = Math.random()
  return mixColors(c1, c2, ratio)
}

// pick a random color from the gradient formed by base colors with hsl
export function randomMixHslColor() {
  const index = Math.floor(Math.random() * (baseColors.length - 1))
  const c1 = baseColors[index]
  const c2 = baseColors[index + 1]
  const ratio = Math.random()
  return mixColorsHsl(c1, c2, ratio)
}

// pick a random color from the base colors
export function randomBaseColor() {
  return baseColors[Math.floor(Math.random() * baseColors.length)]
}

export function getBaseColors() {
  return baseColors
}
