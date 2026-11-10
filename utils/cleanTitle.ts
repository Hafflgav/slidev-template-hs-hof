// Titel ohne Markdown-Zeichen für Agenda und Fußzeile. Inline-Code bleibt
// wörtlich (snake_case, __init__), &shy; wird zum weichen Trennstrich.
export function cleanTitle(value: unknown) {
  const code: string[] = []
  return String(value ?? '')
    .replace(/`([^`]*)`/g, (_, c: string) => `\u0000${code.push(c) - 1}\u0000`)
    .replace(/&shy;/g, '­')
    .replace(/(\*\*|__)(?=\S)(.+?)(?<=\S)\1/g, '$2')
    .replace(/(^|[^\w*])([*_])(?=\S)(.+?)(?<=\S)\2(?![\w*])/g, '$1$3')
    .replace(/\u0000(\d+)\u0000/g, (_, i: string) => code[Number(i)])
    .trim()
}
