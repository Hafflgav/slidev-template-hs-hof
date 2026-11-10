// Syntaxfarben aus den Hochschulfarben. Jede Farbe erreicht auf dem Codegrund
// #F0F5F8 mindestens 4,5 : 1: Schwarz 19,1, Grau #575757 6,6, Blau 4,5.
// Unterschiede entstehen zusätzlich über fett und kursiv. Shiki braucht
// Literale; die Werte entsprechen den Tokens in styles/theme.css.
export default () => ({
  theme: {
    name: 'hochschule-hof',
    type: 'light',
    colors: {
      'editor.background': '#F0F5F8',
      'editor.foreground': '#000000',
    },
    tokenColors: [
      { settings: { foreground: '#000000' } },
      {
        scope: ['comment', 'punctuation.definition.comment'],
        settings: { foreground: '#575757', fontStyle: 'italic' },
      },
      {
        scope: ['keyword', 'storage', 'constant.language', 'constant.numeric', 'constant.character', 'support.constant', 'variable.language', 'markup.inserted'],
        settings: { foreground: '#2962FA' },
      },
      {
        scope: ['entity.other.attribute-name', 'support.type.property-name', 'meta.object-literal.key', 'punctuation.definition.list.begin'],
        settings: { foreground: '#2962FA' },
      },
      {
        scope: ['string', 'markup.inline.raw', 'markup.fenced_code', 'punctuation', 'meta.brace', 'keyword.operator'],
        settings: { foreground: '#575757' },
      },
      {
        scope: ['entity.name.function', 'support.function', 'entity.name.type', 'entity.name.class', 'support.class', 'entity.name.tag', 'markup.heading', 'markup.bold'],
        settings: { foreground: '#000000', fontStyle: 'bold' },
      },
      { scope: ['markup.italic'], settings: { fontStyle: 'italic' } },
      { scope: ['markup.deleted'], settings: { foreground: '#000000', fontStyle: 'strikethrough' } },
    ],
  },
})
