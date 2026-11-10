# CLAUDE.md

Dieses Repository ist das Slidev-Theme `slidev-theme-hs-hof` (Wurzelverzeichnis) mit einem Beispielfoliensatz in `deck/`. Projektsprache ist Deutsch.

@AUTHORING.md

## Änderungen am Theme

- Gestaltungsquelle ist die Website der Hochschule Hof und, sobald vorhanden, ihre offizielle Richtlinie. Aus dem Miragon-Template stammt nur Mechanik, nie Gestaltung. Neue Werte, Abweichungen und Annahmen in `docs/quellen.md` festhalten.
- Farbwerte stehen nur in `styles/theme.css`. `setup/mermaid.ts` und `setup/shiki.ts` brauchen Literale und spiegeln diese Werte.
- Größen in festen px auf der 980 px breiten Folie, keine `vw`-Einheiten: Bildschirm und PDF sollen gleich aussehen.
- Jedes Layout braucht eine Demo-Folie mit vollständigem Hinweisblock; neue Layouts in `AUTHORING.md` und `README.md` aufnehmen.
- `deck/brand/` bleibt lokal. Das Hochschullogo nie einchecken, auch nicht in Exporten oder Bildschirmfotos. `docs/vorschau.png` nur mit `npm run vorschau:bild` neu erzeugen; das Skript legt `deck/brand` für die Aufnahme beiseite, damit das Bild den Platzhalter zeigt.
- Vor dem Abschluss: `npm run check`, `npm run build` und die betroffenen Folien mit `npm run vorschau -- --range N` aus `.slidev/vorschau/` ansehen.
- Nur auf ausdrücklichen Auftrag: `npm publish`, `private` entfernen, Lizenz festlegen, Tags setzen, pushen.
