import assert from 'node:assert/strict'
import { test } from 'node:test'
import setup from '../setup/transformers.ts'

const [transform] = setup().pre

function run(source) {
  let result = source
  transform({ s: { original: source, overwrite: (_start, _end, content) => { result = content } } })
  return result
}

test('setzt den Body einer einzeiligen Card zwischen Leerzeilen', () => {
  assert.equal(
    run('<Card title="A">Text mit `Code`.</Card>'),
    '<Card title="A">\n\nText mit `Code`.\n\n</Card>',
  )
})

test('verträgt ">" in Attributwerten', () => {
  assert.equal(
    run('<Card title="Eingabe -> Ausgabe">Text.</Card>'),
    '<Card title="Eingabe -> Ausgabe">\n\nText.\n\n</Card>',
  )
  assert.equal(
    run('<Step label="Eingang > Prüfung">Schritt.</Step>'),
    '<Step label="Eingang > Prüfung">\n\nSchritt.\n\n</Step>',
  )
})

test('behält die Einrückung, etwa in einem Listenpunkt', () => {
  assert.equal(
    run('- Punkt\n  <Card title="A">Text.</Card>'),
    '- Punkt\n  <Card title="A">\n\n  Text.\n\n  </Card>',
  )
})

test('lässt Zeilen mit vier Spalten Einrückung unverändert', () => {
  const fourSpaces = '    <Card title="A">Text.</Card>'
  const tab = '\t<Step label="A">Text.</Step>'
  assert.equal(run(fourSpaces), fourSpaces)
  assert.equal(run(tab), tab)
})

test('lässt mehrere Komponenten in einer Zeile unverändert', () => {
  const line = '<Card title="A">Erste.</Card><Card title="B">Zweite.</Card>'
  assert.equal(run(line), line)
})

test('lässt Codeblöcke und andere Komponenten unverändert', () => {
  const fenced = '```md\n<Card title="A">Text.</Card>\n```'
  const grid = '<CardGrid cols="3">Text</CardGrid>'
  assert.equal(run(fenced), fenced)
  assert.equal(run(grid), grid)
})
