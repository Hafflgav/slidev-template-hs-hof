// Inline-Markdown (`Code`, **fett**, Links) rendert Slidev in einem
// Komponenten-Body nur, wenn er durch Leerzeilen vom Tag getrennt ist. Dieser
// Schritt schreibt <Card>…</Card> in einer Zeile vor dem Parsen entsprechend um,
// außer in Codeblöcken, damit Folien Komponenten-Quelltext zeigen können.
const BODY_TAGS = ['Card', 'Step']

// Attributwerte in Anführungszeichen dürfen ">" enthalten, etwa title="A -> B".
const ATTRS = String.raw`((?:\s+[^\s=>"'/]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>"']+))?)*)`
const SINGLE_LINE = new RegExp(String.raw`^([ \t]*)<(${BODY_TAGS.join('|')})${ATTRS}\s*>(.*)</\2>[ \t]*$`)
// Ein Codeblock endet erst an einem Zaun aus demselben Zeichen, mindestens so
// lang wie der öffnende und ohne Infotext. Backticks im Infotext öffnen keinen.
const FENCE = /^[ \t]*(`{3,}|~{3,})(.*)$/

// Ab vier Spalten Einrückung würde der Body nach einer Leerzeile zum Codeblock.
const columns = (indent: string) => [...indent].reduce((col, ch) => (ch === '\t' ? col + 4 - (col % 4) : col + 1), 0)

function wrapComponentBody(ctx: { s: { original: string, overwrite: (start: number, end: number, content: string) => void } }) {
  const source = ctx.s.original
  if (!source)
    return
  const lines = source.split('\n')
  let fence = ''
  let changed = false
  for (let i = 0; i < lines.length; i++) {
    const marker = lines[i].match(FENCE)
    if (!fence && marker && !(marker[1][0] === '`' && marker[2].includes('`'))) {
      fence = marker[1]
      continue
    }
    if (fence) {
      if (marker && marker[1][0] === fence[0] && marker[1].length >= fence.length && !marker[2].trim())
        fence = ''
      continue
    }
    const match = lines[i].match(SINGLE_LINE)
    if (!match)
      continue
    const [, indent, tag, attrs, body] = match
    // Mehrere Komponenten in einer Zeile bleiben, wie sie sind.
    if (!body.trim() || columns(indent) >= 4 || new RegExp(`</?${tag}\\b`).test(body))
      continue
    lines[i] = `${indent}<${tag}${attrs}>\n\n${indent}${body.trim()}\n\n${indent}</${tag}>`
    changed = true
  }
  if (changed)
    ctx.s.overwrite(0, source.length, lines.join('\n'))
}

export default () => ({ pre: [wrapComponentBody] })
