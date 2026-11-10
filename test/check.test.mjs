import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { test } from 'node:test'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))

function check(...args) {
  const result = spawnSync(process.execPath, ['bin/check.mjs', ...args], { cwd: root, encoding: 'utf8' })
  const out = result.stdout + result.stderr
  const rules = [...out.matchAll(/\[([\w-]+)\]/g)].map(m => m[1])
  return { status: result.status, out, rules, count: rule => rules.filter(r => r === rule).length }
}

test('der Beispielfoliensatz besteht die Prüfung mit --self', () => {
  const r = check('deck/slides.md', '--self')
  assert.equal(r.status, 0, r.out)
  assert.deepEqual(r.rules, [], r.out)
})

test('erlaubte Inhalte lösen nichts aus', () => {
  // Nummern und Anker im Text, ~~~ und eingerückte Codeblöcke, Komponenten in
  // kebab-case, "i<n" im Text, sub/sup/kbd, zweimal vier Punkte auf compare,
  // Listen mit Fortsetzungszeilen, #101 als Wert, gültige Icons, Zaun im Zaun
  const r = check('test/fixtures/fehlalarme/slides.md')
  assert.equal(r.status, 0, r.out)
  assert.deepEqual(r.rules, [], r.out)
})

test('erkennt Regelverstöße', () => {
  const r = check('test/fixtures/fehler/slides.md')
  assert.equal(r.status, 1, r.out)
  const expected = {
    // 8 auf der ersten Inhaltsfolie; dazu text-red-5, text-violet6, color-#ff0000,
    // eine Klasse hinter title="A -> B" und zwei MDC-Attribute
    'no-style-override': 14,
    // Card und hero mit color "gelb", auch <card> in kebab-case
    'invalid-option': 3,
    'unknown-component': 1,
    'no-raw-html': 2,
    'resources-missing': 2,
    'image-alt': 1,
    // ```mermaid und ``` mermaid mit Leerzeichen
    'no-hardcoded-color': 2,
    'sanctioned-layout': 1,
    // Tippfehler, fehlendes Präfix in <Card> und <card>, unbekannt in der Frontmatter
    'unknown-icon': 4,
  }
  for (const [rule, n] of Object.entries(expected))
    assert.equal(r.count(rule), n, `${rule}\n${r.out}`)
  // Ein Fehler aus der Frontmatter eines src:-Imports gehört zur importierenden Datei.
  assert.match(r.out, /fehler\/slides\.md:\d+\s+\[sanctioned-layout\]/)
})

test('erkennt einen falschen Theme-Pfad', () => {
  // ./pfad, pfad/ohne/punkt und @/pfad behandelt Slidev als Pfad, nicht als Paketnamen.
  for (const file of ['slides.md', 'ohne-punkt.md', 'projekt.md']) {
    const r = check(`test/fixtures/theme-pfad/${file}`)
    assert.equal(r.status, 1, r.out)
    assert.match(r.out, new RegExp(`theme-pfad/${file.replace('.', '\\.')}:2\\s+\\[theme-missing\\]`))
  }
})

test('meldet Hinweise ohne Abbruch', () => {
  const r = check('test/fixtures/hinweise/slides.md')
  assert.equal(r.status, 0, r.out)
  const expected = {
    // lange Titel bleiben auch auf Titel- und Abschlussfolie ein Hinweis
    'title-length': 2,
    'agenda-empty': 1,
    // sechs Punkte mit Fortsetzungszeilen; fünf Punkte in einer Spalte von compare
    'list-length': 2,
    // 13 Zeilen; 56 Zeichen in einer Spalte von compare
    'code-length': 2,
    'table-length': 1,
    'contact-lines': 1,
    'pie-slices': 1,
  }
  for (const [rule, n] of Object.entries(expected))
    assert.equal(r.count(rule), n, `${rule}\n${r.out}`)
})
