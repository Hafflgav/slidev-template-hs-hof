---
layout: section
---

<!--
PFLICHT: eine Überschrift. Sie erscheint in der Farbfläche, in der Agenda und in der Fußzeile.
OPTIONAL: ein kurzer Absatz oder bis zu drei Punkte; kicker (Standard „Kapitel N“); color (yellow, green, red, blue), sonst wechselt die Farbe automatisch.
GRENZE: Titel höchstens drei kurze Zeilen in der Fläche.
VERWENDUNG: eröffnet jedes Kapitel. Jede Kapiteldatei beginnt mit dieser Folie.
-->

# Das Template

Aufbau, Arbeitsweise und Bausteine

<!--
Erstes Kapitel: was das Template kann und wie man damit arbeitet.
-->

---
layout: content
kicker: Das Template
---

<!--
PFLICHT: eine Überschrift.
OPTIONAL: kicker, Absätze, Aufzählung, Codeblock, Tabelle, Komponenten wie CardGrid, Card, SplitView, Figure und StepList.
GRENZE: höchstens fünf Punkte ohne Unterpunkte, Titel höchstens zwei Zeilen. Lieber eine zweite Folie als kleinere Schrift.
VERWENDUNG: das Standardlayout für Inhalte. Folien ohne layout-Angabe sehen genauso aus.
-->

# Was das Template mitbringt

- Layouts für Titel, Kapitel, Inhalte, Vergleiche, Übungen und Diagramme
- Farben, Schriften und Formen nach der Website der Hochschule Hof
- Schriften im Paket, damit Folien auch ohne Internet funktionieren
- Eine Prüfung für Layouts, Farben und Alternativtexte

[Website der Hochschule Hof](https://www.hof-university.de)

<!--
Die Gestaltung folgt der Website, weil öffentlich keine Gestaltungsrichtlinie zu finden war. Details stehen in docs/quellen.md.
-->

---
layout: subsection
kicker: Das Template
---

<!--
PFLICHT: eine Überschrift.
OPTIONAL: kicker, ein Satz darunter.
GRENZE: Titel eine Zeile, höchstens ein Satz.
VERWENDUNG: gliedert ein langes Kapitel. Zählt in der Agenda nicht als eigenes Kapitel.
-->

# Bausteine im Überblick

Karten, Code und Tabellen auf Inhaltsfolien

<!--
Unterabschnitt. Überleitung: drei Bausteine, die auf fast jeder Inhaltsfolie vorkommen.
-->

---
layout: content
kicker: Bausteine
---

# In drei Schritten zur ersten Folie

<CardGrid cols="3" flush>
<Card title="Installieren" color="yellow" icon="i-lucide-download">`npm ci`, danach `npm run dev` für die Vorschau.</Card>
<Card title="Schreiben" color="green" icon="i-lucide-pencil">Die passende Demo-Folie kopieren und den Inhalt ersetzen.</Card>
<Card title="Bauen" color="red" icon="i-lucide-hammer">`npm run build` erzeugt eine statische Website.</Card>
</CardGrid>

<!--
Mit flush stehen farbige Karten bündig nebeneinander wie die Kacheln auf der Startseite der Hochschule. Ohne color und ohne flush sind sie hellgrau und haben Abstand.
-->

---
layout: content
kicker: Bausteine
---

# Eine Folie im Quelltext

```md
---
layout: content
kicker: Grundlagen
---

# Titel der Folie

- Erster Punkt
- Zweiter Punkt
```

<!--
Jede Folie beginnt mit drei Strichen und einer Frontmatter. Das Layout bestimmt das Aussehen, der Inhalt ist normales Markdown.
-->

---
layout: content
kicker: Bausteine
---

# Die wichtigsten Layouts

| Layout | Wofür | Grenze |
|---|---|---|
| `cover` | Titelfolie | Titel höchstens zwei Zeilen |
| `section` | Kapitelanfang | Titel höchstens drei kurze Zeilen |
| `content` | Inhalte aller Art | höchstens fünf Punkte |
| `content-image` | Text mit Bild | ein Bild, vier Punkte |
| `compare` | zwei Varianten | vier Punkte je Seite |
| `interactive` | Übung oder Frage | eine Aufgabe |
| `closing` | Abschluss | vier Kontaktzeilen |

<!--
Die vollständige Liste mit allen Optionen steht in AUTHORING.md. Überleitung: Wie sieht das in einer echten Lehreinheit aus?
-->
