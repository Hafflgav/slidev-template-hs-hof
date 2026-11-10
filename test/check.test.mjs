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
  // kebab-case, "i<n" im Text, sub/sup/kbd, zweimal vier Punkte auf compare
  const r = check('test/fixtures/fehlalarme/slides.md')
  assert.equal(r.status, 0, r.out)
  assert.deepEqual(r.rules, [], r.out)
})

test('erkennt Regelverstöße', () => {
  const r = check('test/fixtures/fehler/slides.md')
  assert.equal(r.status, 1, r.out)
  const expected = {
    'no-style-override': 8,
    'invalid-option': 2,
    'unknown-component': 1,
    'no-raw-html': 2,
    'resources-missing': 2,
    'image-alt': 1,
    'no-hardcoded-color': 1,
    'sanctioned-layout': 1,
  }
  for (const [rule, n] of Object.entries(expected))
    assert.equal(r.count(rule), n, `${rule}\n${r.out}`)
  // Ein Fehler aus der Frontmatter eines src:-Imports gehört zur importierenden Datei.
  assert.match(r.out, /fehler\/slides\.md:\d+\s+\[sanctioned-layout\]/)
})

test('meldet Hinweise ohne Abbruch', () => {
  const r = check('test/fixtures/hinweise/slides.md')
  assert.equal(r.status, 0, r.out)
  for (const rule of ['title-length', 'agenda-empty', 'list-length', 'code-length', 'table-length', 'contact-lines'])
    assert.equal(r.count(rule), 1, `${rule}\n${r.out}`)
})
