# Folien schreiben mit dem Theme der Hochschule Hof

Diese Regeln gelten für jeden Foliensatz mit `slidev-theme-hs-hof`, für Menschen wie für Coding-Agenten. Jede Regel hat einen Grund; die Gestaltung folgt der Website der Hochschule Hof (Belege in `docs/quellen.md` des Templates).

Pfade: Die Einstiegsdatei heißt im Template `deck/slides.md`, in einem eigenen Repository meist `slides.md`. Die Demo-Folien liegen im Template unter `deck/`, in einem eigenen Repository unter `node_modules/slidev-theme-hs-hof/deck/`.

## Arbeitsweise

1. Die passende Demo-Folie kopieren und den Inhalt ersetzen. Titel, Agenda und Abschluss stehen in `slides.md`, die übrigen Layouts in `chapter/`. Die erste Demo-Folie jedes Layouts hat oben einen Hinweisblock mit PFLICHT, OPTIONAL, GRENZE und VERWENDUNG. In eigenen Folien kann er entfallen.
2. Ein Foliensatz hat eine Sprache, in der Regel Deutsch. Code, Produktnamen und Fachbegriffe bleiben unverändert.
3. Sprechernotizen stehen als letzter Kommentar am Ende der Folie. Slidev übernimmt nur diesen Kommentar als Notiz.
4. Vor dem Abschluss müssen `npm run check` und `npm run build` fehlerfrei laufen. Geänderte Folien als PNG ansehen: `npm run vorschau -- --range N` schreibt sie nach `.slidev/vorschau/`.

## Layouts

| Layout | Wofür | Pflicht | Optional | Grenze |
|---|---|---|---|---|
| `cover` | Titelfolie | `# Titel` | `kicker`, Untertitel, `meta`, `image` mit `imageAlt` | Titel höchstens zwei Zeilen |
| `section` | Kapitelanfang | `# Titel` | Absatz, `kicker`, `color` | Titel höchstens drei kurze Zeilen |
| `subsection` | Abschnitt im Kapitel | `# Titel` | `kicker`, ein Satz | eine Zeile |
| `content` | Inhalte aller Art | `# Titel` | `kicker`, Text, Liste, Code, Tabelle, Komponenten | fünf Punkte ohne Unterpunkte, 12 Zeilen Code, 7 Tabellenzeilen |
| `content-image` | Text mit Bild | `# Titel`, `image`, `imageAlt` | `kicker`, `side`, `fit`, `source` | vier Punkte, ein Bild |
| `compare` | zwei Varianten | `# Titel`, `::left::`, `::right::` | `kicker`, `###` je Seite | vier Punkte je Seite |
| `goodbad` | Welche Variante ist richtig? | `# Frage`, `::left::`, `::right::`, `leftIsGood` | `kicker`, `::legend::`, `leftLabel`, `rightLabel`, `goodLabel`, `badLabel` | Begründung in einem Satz |
| `hero` | Leitfrage oder Kernaussage | `# Frage` | ein bis zwei Sätze, `color`, `side` | vier Zeilen in der Fläche |
| `interactive` | Übung, Diskussion, Abstimmung | `# Aufgabe` | `kicker`, `icon`, `color`, ein bis zwei Sätze | eine Aufgabe |
| `mermaid` | Diagramm aus Text | `# Titel`, ein `mermaid`-Block | `kicker`, `::caption::` | etwa zehn Knoten |
| `diagram` | exportiertes Diagramm | `# Titel`, `diagram`, `diagramAlt` | `kicker`, `source`, `::caption::` | ein Diagramm |
| `closing` | Abschluss | `# Titel` | `kicker`, Satz, `::contact::`, `contactLabel` | Titel höchstens zwei Zeilen, vier Kontaktzeilen |

Folien ohne `layout` sehen aus wie `content`. `color` kennt `yellow`, `green`, `red` und `blue`; die Textfarbe passt das Theme selbst an. `section` wechselt die Farbe automatisch von Kapitel zu Kapitel, die Agenda übernimmt sie. Bei `goodbad` `leftIsGood` von Folie zu Folie wechseln, damit die Lösung nicht immer auf derselben Seite steht.

Kontaktzeilen auf der Abschlussfolie durch Leerzeilen trennen, sonst laufen sie in eine Zeile:

```md
::contact::

Name der Lehrperson

Fakultät · Raum

vorname.nachname@hof-university.de
```

## Komponenten

```md
<Agenda></Agenda>

<CardGrid cols="3">
<Card title="Titel" icon="i-lucide-download">Text mit `Code` und **Hervorhebung**.</Card>
</CardGrid>

<Figure src="/resources/01-kapitel/bild.svg" alt="Was das Bild zeigt" caption="Bildunterschrift" source="Quelle"></Figure>

<SplitView ratio="1/2">
<template #visual>
<Figure src="/resources/01-kapitel/bild.svg" alt="Was das Bild zeigt"></Figure>
</template>

- Erklärung

</SplitView>

<StepList>
<Step label="Erfassen">Bestellung aufnehmen.</Step>
<Step label="Prüfen">Verfügbarkeit klären.</Step>
</StepList>
```

- `Agenda` gehört auf eine `content`-Folie. Sie liest die Kapitel aus allen `section`-Folien, bis sechs als Farbkacheln, ab sieben als Liste.
- `Card` hat `color` mit `soft` (Standard, hellgrau), `yellow`, `green`, `red` oder `blue`. Ohne `flush` haben Karten Abstand. `CardGrid flush` setzt sie bündig nebeneinander wie die Kacheln der Website und ist für farbige Karten gedacht.
- `Figure` zeigt ein Bild höchstens 300 px hoch. `height="250px"` ändert das; eine Zahl ohne Einheit gilt als px. Große Bilder gehören in die Layouts `content-image` oder `diagram`.
- Komponenten mit schließendem Tag schreiben. `Card` und `Step` dürfen in einer Zeile stehen, Inline-Markdown darin funktioniert trotzdem, wenn die Komponente allein in ihrer Zeile steht und höchstens drei Leerzeichen eingerückt ist. In anderen Komponenten Markdown durch Leerzeilen vom Tag trennen.

## Gestaltung

- **Farben** kommen nur über Layouts und `color`-Optionen. Keine Farbwerte, keine Farbklassen und kein rohes HTML in Folien. So bleiben alle Kombinationen lesbar: Schwarz auf Gelb, Grün und Rot, Weiß auf Blau.
- **`class` und `style`** nur für Abstände und Größen, etwa `<Card class="mt-4">`.
- **Schrift nie verkleinern**, um Inhalt unterzubringen. Kürzen, auf zwei Folien teilen oder `<v-clicks>` nutzen. Fließtext ist mit 18 px auf Projektion ausgelegt.
- **Höchstens fünf Punkte** pro Liste und keine Unterpunkte, in `compare`, `content-image` und `goodbad` höchstens vier.
- **Code** mit höchstens zwölf Zeilen und 80 Zeichen pro Zeile, in einer Spalte von `compare`, `content-image` und `goodbad` etwa 40.
- **Lange Komposita** in Titeln mit `&shy;` an der Wortfuge trennen, etwa `Geschäftsprozess&shy;modellierung`. Sonst trennt der Browser nach Silben. Im Quadrat der Kapitelfolie (`section`) passen nur etwa zwölf Zeichen in eine Zeile; längere Wortteile trennt der Browser dort trotzdem nach Silben, also kurze Wörter wählen.
- **Bilder** brauchen einen Alternativtext (`alt`, `imageAlt`, `diagramAlt`), rein dekorative ein leeres. Fremde Bilder brauchen eine Quelle (`source`) und das Recht zur Nutzung.
- **Diagramme** müssen im PNG noch lesbar sein: Beschriftungen von etwa 14 px oder mehr auf der Folie. Breite Diagramme bekommen eine eigene Folie im Layout `diagram`. Tortendiagramme haben höchstens vier Segmente, weil das Theme nur vier Farben dafür hat. Exporte aus Werkzeugen behalten deren Schrift, meist Arial.
- **Eigene SVG-Grafiken** laden als Bild keine Schriften der Folie. Beschriftungen vor dem Export in Pfade umwandeln oder, wie die Grafiken im Template, Arial verwenden.
- **Icons** stammen aus Lucide und werden als vollständige Klasse geschrieben, etwa `i-lucide-pencil`. `npm run check` meldet Namen, die es nicht gibt.
- **Logo** nie verändern, umfärben oder neu zeichnen. Das Theme platziert es selbst und nur auf Weiß.

## Dateien und Pfade

- Ein Kapitel ist ein Ordner `chapter/NN-name/` mit `NN-name.md` und bei Bedarf `resources/`. Die Datei beginnt mit einer `section`-Folie und wird in der Einstiegsdatei mit `src: ./chapter/NN-name/NN-name.md` eingebunden.
- Bilder aus `resources/` über `<Figure src="/resources/NN-name/datei" alt="…"></Figure>` oder die Layout-Optionen `image` und `diagram` einbinden. Ein Markdown-Bild mit `/resources/…` bricht den Build ab; `npm run check` meldet das vorher, ebenso Pfade, die es nicht gibt.
- Diagramme: einfache Abläufe als `mermaid`-Block, BPMN und andere Notationen als SVG-Export aus dem Werkzeug (Camunda Modeler, bpmn.io) mit dem Layout `diagram`.

## Nicht tun

- Das Hochschullogo einchecken, solange keine Freigabe vorliegt.
- Farben erfinden oder aus anderen Quellen übernehmen.
- Ohne Rücksprache veröffentlichen (`npm publish`), `private` entfernen oder eine Lizenz festlegen oder ändern.
