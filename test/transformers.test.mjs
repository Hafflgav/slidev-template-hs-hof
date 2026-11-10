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

test('beendet einen Codeblock nur am passenden Zaun', () => {
  const longer = '````md\n```\n<Card title="A">Text.</Card>\n```\n````'
  const mixed = '```md\n~~~\n<Step label="A">Text.</Step>\n~~~\n```'
  assert.equal(run(longer), longer)
  assert.equal(run(mixed), mixed)
  // Ein längerer schließender Zaun beendet den Block ebenfalls.
  assert.equal(
    run('```js\nx\n````\n<Card title="A">Text.</Card>'),
    '```js\nx\n````\n<Card title="A">\n\nText.\n\n</Card>',
  )
  // Ein Zaun mit vier Spalten mehr Einrückung ist Inhalt, kein Ende.
  const nested = '```md\n- Schritt\n\n    ```bash\n    npm ci\n    ```\n<Card title="A">Im Beispiel.</Card>\n```'
  assert.equal(
    run(`${nested}\n<Card title="B">Danach.</Card>`),
    `${nested}\n<Card title="B">\n\nDanach.\n\n</Card>`,
  )
  // Ein Zaun direkt hinter dem Listenzeichen öffnet ebenfalls einen Codeblock.
  const inItem = '- ```md\n  <Card title="A">Im Beispiel.</Card>\n  ```'
  assert.equal(
    run(`${inItem}\n\n<Card title="B">Danach.</Card>`),
    `${inItem}\n\n<Card title="B">\n\nDanach.\n\n</Card>`,
  )
})
