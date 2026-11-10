#!/usr/bin/env node
// Prüft Folienquellen gegen die Regeln des Themes. Kein Browser nötig.
// Aufruf:  hof-slides-check [slides.md] [--self]
// --self prüft zusätzlich das Theme selbst; nur im Template-Repository sinnvoll.
import { createHash } from 'node:crypto'
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { createRequire } from 'node:module'
import { basename, dirname, join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { load } from '@slidev/parser/fs'

const THEME = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const args = process.argv.slice(2)
const self = args.includes('--self')
const entry = resolve(args.find(a => !a.startsWith('--')) ?? 'slides.md')
const deckDir = dirname(entry)

const errors = []
const hints = []
const where = (file, line) => `${relative(process.cwd(), file)}:${line}`
const error = (file, line, rule, msg) => errors.push(`${where(file, line)}  [${rule}] ${msg}`)
const hint = (file, line, rule, msg) => hints.push(`${where(file, line)}  [${rule}] ${msg}`)

// Codeblöcke (auch eingerückt oder mit ~~~), Kommentare und Inline-Code zählen
// nicht als Folieninhalt. Sie werden durch Leerzeichen ersetzt, damit
// Zeilennummern stimmen.
const blank = (text, re) => text.replace(re, m => m.replace(/[^\n]/g, ' '))
const FENCE_BLOCK = /^[ \t]*(`{3,}|~{3,})[^\n]*\n[\s\S]*?^[ \t]*\1[ \t]*$/gm
const sanitize = src => blank(blank(blank(src, FENCE_BLOCK), /<!--[\s\S]*?-->/g), /`[^`\n]*`/g)
const lineOf = (text, index) => text.slice(0, index).split('\n').length
const names = (dir, re) => (existsSync(dir) ? readdirSync(dir).filter(f => re.test(f)).map(f => basename(f).replace(re, '')) : [])
const walk = dir => readdirSync(dir, { withFileTypes: true }).flatMap(e => (e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)]))
const pascal = tag => tag.replace(/(?:^|-)(\w)/g, (_, c) => c.toUpperCase())

function slidevBuiltins() {
  for (const base of [deckDir, THEME]) {
    try {
      const pkg = createRequire(join(base, 'noop.js')).resolve('@slidev/client/package.json')
      return names(join(dirname(pkg), 'builtin'), /\.(?:vue|ts)$/)
    }
    catch {}
  }
  return []
}

const ALLOWED_TAGS = new Set(['template', 'component', 'slot', 'transition', 'transition-group', 'keep-alive', 'sub', 'sup', 'kbd'])
// Vue rendert diese Namen als HTML-Element; andere kleine Namen wie <card> löst es als Komponente auf.
const HTML_TAGS = new Set('a abbr address area article aside audio b base bdi bdo blockquote body br button canvas caption center cite code col colgroup data datalist dd del details dfn dialog div dl dt em embed fieldset figcaption figure font footer form h1 h2 h3 h4 h5 h6 head header hgroup hr html i iframe img input ins label legend li link main map mark marquee math menu meta meter nav noscript object ol optgroup option output p picture pre progress q rp rt ruby s samp script search section select small source span strong style summary svg table tbody td textarea tfoot th thead time title tr track u ul var video wbr'.split(' '))
const COMPONENTS = new Set([
  ...names(join(THEME, 'components'), /\.vue$/),
  ...names(join(deckDir, 'components'), /\.vue$/),
  ...slidevBuiltins(),
  'Transition', 'TransitionGroup', 'KeepAlive', 'Teleport', 'Suspense', 'Component', 'Slot', 'Template',
])
// Ein vollständiger öffnender Tag, auch über mehrere Zeilen.
const TAG = /<([A-Za-z][\w-]*)(?=[\s/>])[^<>]*>/g
const ATTR = /(?<![-\w:@#])(:?[\w-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g
const SPACING = /^(?:margin|padding|width|height|min|max|gap|align|justify|grid|flex|order)/i
const COLOR_NAMES = 'slate|gray|grey|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|black|white|transparent|current'
const COLOR_UTILITY = new RegExp(String.raw`^(?:[\w-]+:)*!?(?:text|bg|border(?:-[trblxy])?|from|via|to|fill|stroke|ring|outline|accent|decoration|divide|shadow|caret|placeholder|c|color)-(?:\[.+\]|(?:${COLOR_NAMES})(?:-\d{2,3})?(?:\/\d+)?)$`)
// In Theme-Dateien zählt jedes Farbliteral; dreistellige Werte nur mit Buchstabe,
// damit Nummern wie #101 nicht auffallen.
const COLOR_LITERAL = /(?<![\w&/])#(?:[0-9a-f]{8}|[0-9a-f]{6}|(?=[0-9]*[a-f])[0-9a-f]{3,4})\b|\b(?:rgba?|hsla?|oklch|oklab|lab|lch)\(/i
// In Folien zählt ein Wert nur, wenn er als Ganzes eine Farbe ist ("Raum #101" nicht).
const COLOR_VALUE = /^\s*(?:#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})|(?:rgba?|hsla?|oklch|oklab|lab|lch)\(.*\))\s*$/i

const OPTIONS = {
  color: { layouts: ['section', 'hero', 'interactive'], values: ['yellow', 'green', 'red', 'blue'] },
  side: { layouts: ['hero', 'content-image'], values: ['left', 'right'] },
  fit: { layouts: ['content-image'], values: ['cover', 'contain'] },
  leftIsGood: { layouts: ['goodbad'], values: [true, false] },
}
const CARD_COLORS = ['soft', 'yellow', 'green', 'red', 'blue']

// Grobe Zeichenbudgets für zwei Zeilen Titel. Nur ein Hinweis: die Schrift
// wird nie verkleinert, also lieber kürzen oder teilen.
const TITLE_BUDGET = { cover: 44, closing: 30, section: 50, subsection: 60, hero: 90, interactive: 100, 'content-image': 60 }
const DEFAULT_TITLE_BUDGET = 90
const LIST_LIMIT = 5
const CODE_LIMIT = 12
const TABLE_LIMIT = 7

function resourceExists(url) {
  const [chapter, ...rest] = url.replace(/^\/resources\//, '').split('/')
  if (!chapter || !rest.length)
    return false
  const decoded = rest.map((part) => {
    try { return decodeURIComponent(part) }
    catch { return part }
  })
  const file = join(deckDir, 'chapter', chapter, 'resources', ...decoded)
  return existsSync(file.normalize('NFC')) || existsSync(file.normalize('NFD'))
}
function checkResource(file, line, url) {
  if (url?.startsWith('/resources/') && !resourceExists(url.split(/[?#]/)[0]))
    error(file, line, 'resources-missing', `${url} gibt es nicht; erwartet unter chapter/<kapitel>/resources/`)
}
function checkClasses(file, line, value) {
  for (const cls of String(value ?? '').split(/\s+/).filter(Boolean)) {
    if (COLOR_UTILITY.test(cls))
      error(file, line, 'no-style-override', `Farbklasse "${cls}" ist nicht erlaubt; Farben kommen aus Layouts und color-Optionen`)
  }
}

const data = await load({ userRoot: deckDir }, entry)
const allowedLayouts = new Set(['default', ...names(join(THEME, 'layouts'), /\.vue$/), ...names(join(deckDir, 'layouts'), /\.vue$/)])
const layoutList = [...allowedLayouts].sort().join(', ')
const demoCoverage = new Map()

for (const md of Object.values(data.markdownFiles)) {
  for (const e of md.errors ?? []) error(md.filepath, e.row + 1, 'parse', e.message)
}

for (const file of Object.keys(data.markdownFiles)) {
  const raw = readFileSync(file, 'utf8')
  const clean = sanitize(raw)

  for (const m of clean.matchAll(TAG)) {
    const [whole, tag] = m
    const at = lineOf(clean, m.index)
    if (/^[A-Z]/.test(tag) || tag.includes('-') || (!HTML_TAGS.has(tag) && !ALLOWED_TAGS.has(tag) && COMPONENTS.has(pascal(tag)))) {
      const known = tag.startsWith('v-') || /^lucide-/i.test(tag) || /^Lucide[A-Z]/.test(tag) || COMPONENTS.has(pascal(tag))
      if (!known)
        error(file, at, 'unknown-component', `<${tag}> gibt es nicht. Theme-Komponenten: ${names(join(THEME, 'components'), /\.vue$/).filter(n => !n.startsWith('Hof')).join(', ')}`)
    }
    else if (!ALLOWED_TAGS.has(tag)) {
      error(file, at, 'no-raw-html', `<${tag}> durch eine Komponente oder Markdown ersetzen`)
    }
    for (const a of whole.matchAll(ATTR)) {
      const name = a[1].replace(/^:/, '')
      const value = a[2] ?? a[3]
      if (name === 'style') {
        for (const [, prop] of value.matchAll(/([a-z-]+)\s*:/gi)) {
          if (!SPACING.test(prop.replace(/-/g, '')))
            error(file, at, 'no-style-override', `style nur für Abstände und Größen, nicht für "${prop}"`)
        }
      }
      else if (name === 'class') {
        checkClasses(file, at, value)
      }
      else if (COLOR_VALUE.test(value.replace(/^'(.*)'$/, '$1'))) {
        error(file, at, 'no-hardcoded-color', `Farbwert in ${name}="${value}"; Farben kommen aus dem Theme`)
      }
      if (name === 'src')
        checkResource(file, at, value)
      if (tag === 'Card' && name === 'color' && !a[1].startsWith(':') && !CARD_COLORS.includes(value))
        error(file, at, 'invalid-option', `Card color="${value}" gibt es nicht. Erlaubt: ${CARD_COLORS.join(', ')}`)
    }
    if (tag === 'Figure' && !/\balt\s*=/.test(whole))
      error(file, at, 'image-alt', '<Figure> braucht alt (rein dekorativ: alt="")')
  }

  for (const m of clean.matchAll(/!\[([^\]]*)\]\(\s*([^)\s]+)/g)) {
    const at = lineOf(clean, m.index)
    if (!m[1].trim())
      error(file, at, 'image-alt', 'Markdown-Bild ohne Alternativtext')
    if (m[2].startsWith('/resources/'))
      error(file, at, 'resources-path', 'Markdown-Bilder mit /resources/… brechen den Build ab; <Figure src="/resources/…" alt="…"></Figure> verwenden')
  }

  // Mermaid übernimmt Farben aus style, classDef, linkStyle und init-Direktiven.
  for (const m of raw.matchAll(/^[ \t]*(`{3,}|~{3,})mermaid[^\n]*\n([\s\S]*?)^[ \t]*\1[ \t]*$/gm)) {
    m[2].split('\n').forEach((line, i) => {
      if ((/^\s*(?:style|classDef|linkStyle)\b/.test(line) || line.includes('%%{')) && (COLOR_LITERAL.test(line) || /\b(?:fill|stroke|color|background)\s*:/i.test(line)))
        error(file, lineOf(raw, m.index) + 1 + i, 'no-hardcoded-color', 'Farben in Mermaid-Diagrammen kommen aus dem Theme (setup/mermaid.ts)')
    })
  }
}

// Frontmatter-Werte aus einem src:-Import gehören zur importierenden Folie.
function at(slide, key) {
  const stub = slide.importChain?.at(-1)
  if (stub && key !== undefined && stub.frontmatter?.[key] !== undefined)
    return [stub.filepath, stub.start + 1]
  return [slide.source.filepath, slide.source.start + 1]
}

let hasSections = false
let agendaAt = null
for (const slide of data.slides) {
  const fm = slide.frontmatter ?? {}
  const layout = fm.layout ?? (slide.index === 0 ? 'cover' : 'default')
  const raw = slide.content ?? ''
  const content = sanitize(raw)
  if (layout === 'section')
    hasSections = true
  if (/<Agenda\b/.test(content))
    agendaAt ??= at(slide)

  if (!allowedLayouts.has(layout))
    error(...at(slide, 'layout'), 'sanctioned-layout', `Layout "${layout}" gibt es nicht. Erlaubt: ${layoutList}`)
  for (const [key, option] of Object.entries(OPTIONS)) {
    if (fm[key] !== undefined && option.layouts.includes(layout) && !option.values.includes(fm[key]))
      error(...at(slide, key), 'invalid-option', `${key}: ${fm[key]} gibt es für ${layout} nicht. Erlaubt: ${option.values.join(', ')}`)
  }
  for (const [key, value] of Object.entries(fm)) {
    if (key === 'class')
      checkClasses(...at(slide, key), value)
    else if (typeof value === 'string' && COLOR_VALUE.test(value))
      error(...at(slide, key), 'no-hardcoded-color', `Farbwert in ${key}: ${value}; Farben kommen aus dem Theme`)
  }
  if (fm.image && fm.imageAlt === undefined)
    error(...at(slide, 'image'), 'image-alt', 'image braucht imageAlt (rein dekorativ: imageAlt: "")')
  if (fm.diagram && fm.diagramAlt === undefined)
    error(...at(slide, 'diagram'), 'image-alt', 'diagram braucht diagramAlt')
  checkResource(...at(slide, 'image'), fm.image)
  checkResource(...at(slide, 'diagram'), fm.diagram)

  const title = content.match(/^#\s+(.+)$/m)?.[1]?.replace(/[*_]|&shy;/g, '').trim()
  if (title) {
    if (/<br\s*\/?>/i.test(title))
      error(...at(slide), 'heading-single-line', 'Titel ohne erzwungenen Zeilenumbruch schreiben')
    const budget = TITLE_BUDGET[layout] ?? DEFAULT_TITLE_BUDGET
    if ([...title].length > budget)
      hint(...at(slide), 'title-length', `Titel hat ${[...title].length} Zeichen, für ${layout} passen etwa ${budget} in zwei Zeilen`)
  }

  let run = 0
  let nested = false
  for (const line of [...content.split('\n'), '']) {
    if (/^(?:[-*+]|\d+\.)\s/.test(line)) {
      run++
      continue
    }
    if (/^\s{2,}(?:[-*+]|\d+\.)\s/.test(line) && run) {
      nested = true
      continue
    }
    if (run > LIST_LIMIT)
      hint(...at(slide), 'list-length', `Liste mit ${run} Punkten; höchstens ${LIST_LIMIT}, sonst auf zwei Folien verteilen`)
    if (line.trim())
      run = 0
  }
  if (nested)
    hint(...at(slide), 'list-length', 'Unterpunkte vermeiden, lieber eine eigene Folie oder Liste')

  for (const m of raw.matchAll(/^[ \t]*(`{3,}|~{3,})(\w*)[^\n]*\n([\s\S]*?)^[ \t]*\1[ \t]*$/gm)) {
    const lines = m[3].split('\n').length - 1
    if (m[2] !== 'mermaid' && lines > CODE_LIMIT)
      hint(...at(slide), 'code-length', `Codeblock mit ${lines} Zeilen; ab ${CODE_LIMIT + 1} läuft er unter die Fußzeile`)
  }
  const rows = content.split('\n').filter(l => /^\s*\|/.test(l) && !/^\s*\|[\s:|-]+\|?\s*$/.test(l)).length - 1
  if (rows > TABLE_LIMIT)
    hint(...at(slide), 'table-length', `Tabelle mit ${rows} Zeilen; ab ${TABLE_LIMIT + 1} läuft sie unter die Fußzeile`)

  if (layout === 'closing') {
    const contact = content.split(/^::contact::\s*$/m)[1]?.split(/^::\w+::\s*$/m)[0] ?? ''
    if (contact.split(/\n\s*\n/).some(p => p.trim().split('\n').filter(l => l.trim()).length > 1))
      hint(...at(slide), 'contact-lines', 'Kontaktzeilen durch Leerzeilen trennen, sonst laufen sie in eine Zeile')
  }

  if (self) {
    const comments = [...(slide.source.raw ?? '').matchAll(/<!--([\s\S]*?)-->/g)].map(m => m[1]).join(' ')
    const complete = ['PFLICHT', 'OPTIONAL', 'GRENZE', 'VERWENDUNG'].every(label => comments.includes(`${label}:`))
    demoCoverage.set(layout, (demoCoverage.get(layout) ?? false) || complete)
  }
}
if (agendaAt && !hasSections)
  hint(...agendaAt, 'agenda-empty', 'Agenda ohne Kapitel: Kapitel beginnen mit einer Folie im Layout section')

if (self) {
  const dirs = ['styles', 'layouts', 'components', 'composables', 'utils', 'global', 'setup'].map(d => join(THEME, d)).filter(existsSync)
  const sources = [...dirs.flatMap(walk), join(THEME, 'global-top.vue')].filter(f => /\.(?:css|vue|ts)$/.test(f) && existsSync(f))
  const tokensFile = join(THEME, 'styles', 'theme.css')
  const literalFiles = [tokensFile, join(THEME, 'setup', 'mermaid.ts'), join(THEME, 'setup', 'shiki.ts')]
  const defined = new Set([...readFileSync(tokensFile, 'utf8').matchAll(/(?:^|[\s;{])(--hof-[\w-]+)\s*:/g)].map(m => m[1]))
  for (const file of sources) {
    const code = blank(blank(readFileSync(file, 'utf8'), /\/\*[\s\S]*?\*\//g), /<!--[\s\S]*?-->/g)
    for (const m of code.matchAll(/var\(\s*(--hof-[\w-]+)/g)) {
      if (!defined.has(m[1]))
        error(file, lineOf(code, m.index), 'token-defined', `${m[1]} ist in styles/theme.css nicht definiert`)
    }
    if (!literalFiles.includes(file)) {
      code.split('\n').forEach((line, i) => {
        if (COLOR_LITERAL.test(line))
          error(file, i + 1, 'hex-only-in-tokens', 'Farbwerte gehören nach styles/theme.css')
      })
    }
  }

  for (const layout of names(join(THEME, 'layouts'), /\.vue$/).filter(l => l !== 'default')) {
    if (!demoCoverage.has(layout))
      error(entry, 1, 'demo-coverage', `Layout ${layout} hat keine Demo-Folie`)
    else if (!demoCoverage.get(layout))
      error(entry, 1, 'demo-coverage', `Demo-Folie für ${layout} ohne vollständigen Block PFLICHT/OPTIONAL/GRENZE/VERWENDUNG`)
  }

  // Eine lokale Logodatei muss dokumentiert sein, und außerhalb von deck/brand
  // darf keine Kopie des Logos liegen.
  const provenance = join(THEME, 'docs', 'logo-herkunft.json')
  const documented = existsSync(provenance) ? JSON.parse(readFileSync(provenance, 'utf8')).dateien.map(d => d.sha256) : []
  const sha = f => createHash('sha256').update(readFileSync(f)).digest('hex')
  const brandDir = join(deckDir, 'brand')
  for (const name of existsSync(brandDir) ? readdirSync(brandDir).filter(f => /^logo\./.test(f)) : []) {
    const hash = sha(join(brandDir, name))
    if (!documented.includes(hash))
      error(join(brandDir, name), 1, 'logo-herkunft', `Herkunft nicht in docs/logo-herkunft.json dokumentiert (sha256 ${hash})`)
  }
  const SKIP = /^(?:node_modules|\.git|\.slidev|\.gstack|dist|brand)$|-export$/
  const repoFiles = (dir) => readdirSync(dir, { withFileTypes: true }).flatMap(e => (e.isDirectory() ? (SKIP.test(e.name) ? [] : repoFiles(join(dir, e.name))) : [join(dir, e.name)]))
  for (const file of repoFiles(THEME)) {
    if (statSync(file).size < 5e6 && documented.includes(sha(file)))
      error(file, 1, 'logo-copy', 'Kopie des Hochschullogos außerhalb von deck/brand; ohne Freigabe nicht ins Repository')
  }
}

for (const line of errors) console.error(line)
for (const line of hints) console.log(`Hinweis: ${line}`)
console.log(`${Object.keys(data.markdownFiles).length} Datei(en), ${data.slides.length} Folie(n), ${errors.length} Fehler, ${hints.length} Hinweis(e)`)
process.exit(errors.length ? 1 : 0)
