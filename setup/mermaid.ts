// Mermaid rechnet mit diesen Werten (Kontrastfarben), deshalb müssen es Literale
// sein: CSS-Variablen würden hier nicht aufgelöst. Die Werte entsprechen den
// Tokens in styles/theme.css.
export default () => ({
  theme: 'base',
  // Flache Formen ohne Schatten und Verlauf, wie auf der Website.
  look: 'classic',
  themeVariables: {
    primaryColor: '#F0F5F8',
    primaryBorderColor: '#000000',
    primaryTextColor: '#000000',
    secondaryColor: '#FFFFFF',
    secondaryBorderColor: '#000000',
    tertiaryColor: '#FFFFFF',
    tertiaryBorderColor: '#000000',
    lineColor: '#000000',
    edgeLabelBackground: '#FFFFFF',
    noteBkgColor: '#FECE00',
    noteBorderColor: '#000000',
    noteTextColor: '#000000',
    // Tortendiagramme: höchstens vier Segmente, alle mit schwarzer Schrift lesbar.
    pie1: '#FECE00',
    pie2: '#0BDA7D',
    pie3: '#EE0D1E',
    pie4: '#F0F5F8',
    pieOpacity: '1',
    pieSectionTextColor: '#000000',
    pieStrokeColor: '#000000',
    pieOuterStrokeColor: '#000000',
    useGradient: false,
    dropShadow: 'none',
    fontFamily: '\'Source Sans 3\', sans-serif',
    // Diagramme werden meist verkleinert; 20 px ergeben auf der Folie etwa 16 px.
    fontSize: '20px',
  },
})
