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

// generate a blended color between two colors
function mixColors(color1, color2, ratio) {
  const [r1, g1, b1] = hexToRgb(color1)
  const [r2, g2, b2] = hexToRgb(color2)
  const r = Math.round(r1 + (r2 - r1) * ratio)
  const g = Math.round(g1 + (g2 - g1) * ratio)
  const b = Math.round(b1 + (b2 - b1) * ratio)
  return rgbToHex(r, g, b)
}

// pick a random color from the gradient formed by base colors
export function randomMixColor() {
  const index = Math.floor(Math.random() * (baseColors.length - 1))
  const c1 = baseColors[index]
  const c2 = baseColors[index + 1]
  const ratio = Math.random()
  return mixColors(c1, c2, ratio)
}

// pick a random color from the base colors
export function randomBaseColor() {
  return baseColors[Math.floor(Math.random() * (baseColors.length - 1))]
}

export function getBaseColors() {
  return baseColors
}
