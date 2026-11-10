#!/usr/bin/env node
// Erzeugt docs/vorschau.png aus vier Folien des Beispielfoliensatzes.
// Das lokale Logo darf nicht ins Bild: deck/brand wird für die Aufnahme nach
// .slidev/brand-geparkt verschoben und danach in jedem Fall zurückgelegt.
// Aufruf: npm run vorschau:bild
import { spawn } from 'node:child_process'
import { existsSync, mkdirSync, readdirSync, readFileSync, renameSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright-chromium'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const SLIDES = [1, 3, 6, 18]
const brand = join(root, 'deck', 'brand')
const parked = join(root, '.slidev', 'brand-geparkt')
const shots = join(root, '.slidev', 'vorschau-bild')
const target = join(root, 'docs', 'vorschau.png')

if (existsSync(parked)) {
  console.error(`${parked} gibt es schon, vermutlich von einem abgebrochenen Lauf. Den Ordner zuerst nach deck/brand zurücklegen.`)
  process.exit(1)
}

let moved = false
function restore() {
  if (moved) {
    moved = false
    renameSync(parked, brand)
    console.log('Logo zurück in deck/brand')
  }
}
// Greift auch, wenn eine Bibliothek process.exit() aufruft.
process.on('exit', restore)

// Strg+C, kill und ein geschlossenes Terminal beenden den Export, nicht dieses
// Skript; es legt danach das Logo zurück.
let child = null
let stopped = null
for (const signal of ['SIGINT', 'SIGTERM', 'SIGHUP']) {
  process.on(signal, () => {
    stopped = signal
    child?.kill(signal)
  })
}

if (existsSync(brand)) {
  mkdirSync(dirname(parked), { recursive: true })
  renameSync(brand, parked)
  moved = true
  console.log(`Logo liegt während der Aufnahme unter ${parked}`)
}
try {
  const slidev = join(root, 'node_modules', '@slidev', 'cli', 'bin', 'slidev.mjs')
  const status = await new Promise((done, fail) => {
    child = spawn(process.execPath, [slidev, 'export', 'deck/slides.md', '--format', 'png', '--output', shots, '--range', SLIDES.join(',')], { cwd: root, stdio: 'inherit' })
    child.on('error', fail)
    child.on('exit', (code, signal) => done(signal ?? code))
  })
  child = null
  if (stopped || status !== 0)
    throw new Error(`slidev export endete mit ${stopped ?? status}`)

  // Der Hintergrund ist die helle Fläche aus styles/theme.css.
  const soft = readFileSync(join(root, 'styles', 'theme.css'), 'utf8').match(/--hof-soft:\s*([^;]+);/)[1]
  const files = readdirSync(shots)
  const tiles = SLIDES.map((no) => {
    const file = files.find(f => new RegExp(`^0*${no}\\.png$`).test(f))
    if (!file)
      throw new Error(`Folie ${no} fehlt in ${shots}`)
    return `data:image/png;base64,${readFileSync(join(shots, file)).toString('base64')}`
  })
  const html = `<!doctype html><body style="margin:0;background:${soft}">
<div style="display:grid;grid-template-columns:repeat(2,780px);gap:16px;padding:24px">
${tiles.map(src => `<img src="${src}" style="display:block;width:780px">`).join('\n')}
</div></body>`

  // Ohne eigene Signal-Handler von Playwright, die sonst process.exit() aufrufen.
  const browser = await chromium.launch({ handleSIGINT: false, handleSIGTERM: false, handleSIGHUP: false })
  try {
    const page = await browser.newPage({ viewport: { width: 1624, height: 900 }, deviceScaleFactor: 1 })
    await page.setContent(html, { waitUntil: 'load' })
    const png = await page.screenshot({ fullPage: true })
    if (stopped)
      throw new Error(`abgebrochen (${stopped})`)
    writeFileSync(target, png)
  }
  finally {
    await browser.close()
  }
  console.log(`${target} geschrieben`)
}
finally {
  restore()
}
