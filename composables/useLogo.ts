import placeholder from '../assets/logo-platzhalter.svg'

// Vite löst Muster mit führendem "/" relativ zum Ordner des Foliensatzes auf.
// Liegt dort brand/logo.svg (oder .png, .webp), wird es verwendet, sonst
// erscheint der Platzhalter. So bleibt das noch nicht freigegebene Logo
// außerhalb des Theme-Pakets.
const found = import.meta.glob('/brand/logo.{svg,png,webp}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

// SVG vor PNG vor WebP, damit eine freigegebene Vektordatei immer gewinnt.
const deckLogo = found['/brand/logo.svg'] ?? found['/brand/logo.png'] ?? found['/brand/logo.webp']

export const logoSrc: string = deckLogo ?? placeholder
export const logoIsPlaceholder = !deckLogo
