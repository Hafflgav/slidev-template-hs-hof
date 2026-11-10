import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { dirname, extname, join, relative, resolve, sep } from 'node:path'
import { fileURLToPath } from 'node:url'

// Jedes Kapitel hält seine Dateien in chapter/<kapitel>/resources/. Slidev kennt
// nur einen public-Ordner, deshalb stellt dieses Plugin die Dateien unter
// /resources/<kapitel>/<datei> bereit: im Dev-Server (auch für den Export) und
// als Kopie im Build. Außerdem legt es dem Build die Lizenzhinweise bei.
const THEME = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const NOTICES = ['THIRD_PARTY_NOTICES.md', 'assets/fonts/OFL-Sora.txt', 'assets/fonts/OFL-SourceSans3.md']

const MIME: Record<string, string> = {
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.pdf': 'application/pdf',
  '.bpmn': 'application/xml',
  '.dmn': 'application/xml',
  '.xml': 'application/xml',
  '.json': 'application/json',
}

// URLs in NFC, damit Dateinamen mit Umlauten unabhängig vom Dateisystem passen.
function collect(chapterDir: string) {
  const out: { url: string, file: string }[] = []
  if (!existsSync(chapterDir))
    return out
  for (const chapter of readdirSync(chapterDir)) {
    const resources = join(chapterDir, chapter, 'resources')
    if (!existsSync(resources) || !statSync(resources).isDirectory())
      continue
    const walk = (dir: string) => {
      for (const name of readdirSync(dir)) {
        const path = join(dir, name)
        if (statSync(path).isDirectory())
          walk(path)
        else
          out.push({ url: `/resources/${chapter}/${relative(resources, path).split(sep).join('/')}`.normalize('NFC'), file: path })
      }
    }
    walk(resources)
  }
  return out
}

export default (options: { userRoot: string }) => {
  const chapterDir = join(options.userRoot, 'chapter')
  let outDir = ''
  return [{
    name: 'hof-chapter-resources',
    configResolved(config: any) {
      outDir = resolve(config.root, config.build.outDir)
    },
    configureServer(server: any) {
      server.middlewares.use((req: any, res: any, next: () => void) => {
        const base = server.config.base.replace(/\/$/, '')
        const raw = (req.url ?? '').split('?')[0]
        const path = raw.startsWith(base) ? raw.slice(base.length) : raw
        if (!path.startsWith('/resources/'))
          return next()
        let url: string
        try {
          url = decodeURIComponent(path).normalize('NFC')
        }
        catch {
          return next()
        }
        const hit = collect(chapterDir).find(r => r.url === url)
        if (!hit)
          return next()
        res.setHeader('Content-Type', MIME[extname(hit.file).toLowerCase()] ?? 'application/octet-stream')
        res.end(readFileSync(hit.file))
      })
    },
    writeBundle() {
      for (const { url, file } of collect(chapterDir)) {
        const target = join(outDir, url.slice(1))
        mkdirSync(dirname(target), { recursive: true })
        copyFileSync(file, target)
      }
      mkdirSync(join(outDir, 'lizenzen'), { recursive: true })
      for (const notice of NOTICES) {
        if (existsSync(join(THEME, notice)))
          copyFileSync(join(THEME, notice), join(outDir, 'lizenzen', notice.split('/').pop()!))
      }
    },
  }]
}
