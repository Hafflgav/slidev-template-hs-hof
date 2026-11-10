# Quellen, Rechte und Annahmen

Stand: 10. November 2026. Dieses Dokument hält fest, woher Gestaltung, Logo und Schriften des Templates stammen, was zu den Nutzungsrechten bekannt ist, welche Annahmen getroffen wurden und was noch offen ist. Es ist keine Rechtsberatung. Mit der Hochschule wurde noch nicht gesprochen.

## Kurzfassung

- Das Template ist **inoffiziell**. Die Hochschule Hof hat es weder beauftragt noch freigegeben.
- Eine öffentliche Gestaltungsrichtlinie der Hochschule war nicht zu finden. Die Gestaltung folgt deshalb der **Website www.hof-university.de**, gemessen an Stylesheet und Darstellung.
- Das **Logo liegt nicht im Repository**. Für eine Weitergabe der Logodatei in einem öffentlichen Repository fand sich keine Erlaubnis. Das Theme zeigt ein lokal abgelegtes Logo an, sonst einen Platzhalter.
- Code, Konfiguration und Dokumentation stehen unter der **MIT-Lizenz** (`LICENSE`). Name, Logo, Claim und andere Kennzeichen der Hochschule sind davon ausgenommen.
- Die Schriften Sora und Source Sans 3 stehen unter der SIL Open Font License 1.1 und liegen dem Theme bei.
- Teile der Theme-Mechanik und der Prüfregeln sind aus dem Miragon Slidev Deck Template übernommen (MIT-Lizenz, siehe `THIRD_PARTY_NOTICES.md`). Gestalterisch ist nichts davon übernommen.

## 1. Gestaltung

### Grundlage

Gemessen am 8. November 2026 im Browser bei 1440 × 900 Pixeln, jeweils mit berechneten Stilen, Bildschirmfotos und dem heruntergeladenen Stylesheet der Website:

- Startseite deutsch und englisch, Hochschule, Studium, Studiengang Informatik B.Sc., Fakultät Informatik, Newsroom, Veranstaltungskalender
- zur Gegenprüfung: Forschung und Transfer, International, Fakultät Wirtschaftswissenschaften, Bibliothek
- der Artikel der Hochschule zum neuen Erscheinungsbild in campuls vom 15.03.2021

Alle Adressen stehen im Quellenverzeichnis am Ende.

### Farben

| Token in `styles/theme.css` | Wert | Rolle auf der Website | Verwendung im Template |
|---|---|---|---|
| `--hof-black` | `#000000` | Text und Überschriften (`--bs-primary`) | Text |
| `--hof-white` | `#FFFFFF` | Seitengrund | Foliengrund, Text auf Blau |
| `--hof-soft` | `#F0F5F8` | helle Abschnitte und Karten (`--bs-light`) | Karten, Panels, Code |
| `--hof-blue` | `#2962FA` | Kacheln, Kalender (`--bs-blue`) | Farbfläche mit weißer Schrift |
| `--hof-red` | `#EE0D1E` | Kacheln, Quadrat im Kopfbild (`--bs-red`) | Farbfläche mit schwarzer Schrift, Motiv |
| `--hof-yellow` | `#FECE00` | Kacheln, Kontaktkästen (`--bs-yellow`) | Farbfläche mit schwarzer Schrift |
| `--hof-green` | `#0BDA7D` | Kacheln, Balken im Kopfbild (`--bs-green`) | Farbfläche mit schwarzer Schrift, Motiv |
| `--hof-ink-rule` | `#575757` | Linie über der Fußzeile | Tabellenlinien, gedämpfter Text (Anpassung) |

Abgeleitet, nicht von der Website: Codeblöcke zeigen Syntax nur in Schwarz, `#575757` und Blau, unterschieden zusätzlich durch fett und kursiv (`setup/shiki.ts`). Inline-Code auf Farbflächen bekommt eine Fläche, die von der Textfarbe weg abgetönt ist (`--hof-code-bg` in `styles/theme.css`).

Bewusst nicht übernommen: die Farben des Cookie-Banners (`#00405A` und ein Linkblau, beide stammen vom Dienstleister), die Bootstrap-Zustandsfarben aus dem Stylesheet, das reine Blau `#0000FF` einzelner Slider-Pfeile und die Farben des Magazins campuls, das ein eigenes Erscheinungsbild hat.

### Kontrast

Berechnet nach WCAG 2.2. Das Template nutzt nur Paare, die 4,5 : 1 erreichen.

| Text | Grund | Verhältnis |
|---|---|---|
| Schwarz | Weiß | 21,00 |
| Schwarz | `#F0F5F8` | 19,12 |
| Schwarz | Gelb | 14,04 |
| Schwarz | Grün | 11,34 |
| `#575757` | Weiß | 7,23 |
| Weiß | Blau | 4,97 |
| Schwarz | Rot | 4,71 |
| `#575757` | `#F0F5F8` (Kommentare, Zeichenketten in Code) | 6,58 |
| Blau | `#F0F5F8` (Schlüsselwörter in Code) | 4,53 |
| Schwarz | Gelb, abgetönt `#E0B500` (Inline-Code) | 10,78 |
| Schwarz | Grün, abgetönt `#0AC06E` (Inline-Code) | 8,78 |
| Weiß | Blau, abgetönt `#2353D4` (Inline-Code) | 6,44 |
| Schwarz | Rot, aufgehellt `#F13140` (Inline-Code) | 5,25 |

Vermieden werden Weiß auf Rot (4,46), Schwarz auf Blau (4,22) sowie Gelb und Grün als Textfarbe (unter 2 : 1). Text steht nie auf überlappenden Flächen.

Grauer Nebentext (`#575757`, etwa Bildquellen) erreicht auf Grün nur 3,90, auf Rot 1,62 und auf Blau 1,45. Auf allen kräftigen Flächen, auch auf Gelb, nimmt er deshalb die Textfarbe der Fläche an (`styles/theme.css`).

### Schrift und Formen

| Element | Website | Template |
|---|---|---|
| Überschriften | Sora 400, Hierarchie über die Größe; Ausnahmen: Sora 700 auf blauen Textflächen, Source Sans Pro 600 für Kastentitel und Namen | Sora 400 |
| Fließtext | Source Sans Pro 400, 18/27 px | Source Sans 3 400, 18/27 px auf Inhaltsfolien und in Karten; kleiner sind die Meta-Zeile der Titelfolie (16/24), Tabellen (16/24), Bildunterschriften (13 bis 16 px), Code (15/23), die Kapitelnummer in der Agenda (15/21), das Urteil bei `goodbad` (Sora 15/24) und die Fußzeile (12 px) |
| Überzeile | Source Sans Pro, Großbuchstaben, so groß wie der Fließtext | gleich |
| Links | halbfett, schwarz, Pfeil nach dem Text | gleich, Pfeil als SVG: Sora enthält ihn nicht, und so sieht er überall gleich aus |
| Flächen | eckig, ohne Schatten und Verlauf | gleich |
| Motiv | Farbflächen überlappen multiplizierend; Rot auf Grün ergibt fast Schwarz | gleich, auf Titel- und Abschlussfolie |
| Diagramme | keine Entsprechung | Mermaid flach ohne Schatten und Verlauf, Torten mit höchstens vier Segmenten in Gelb, Grün, Rot und `#F0F5F8` mit schwarzer Schrift; die eigenen SVG-Grafiken der Demo in Arial, weil ein SVG als Bild die Schriften der Folie nicht lädt |

Die Größen sind von 1440 px Seitenbreite auf die 980 px breite Folie umgerechnet (Faktor etwa 0,68). Fließtext bleibt mit 18 px bewusst groß, weil Folien projiziert werden.

### Layouts und ihre Vorbilder

| Layout | Vorbild auf der Website | Anpassung |
|---|---|---|
| `cover` | Kopfbereich mit Text links, Foto rechts, grünem Balken und rotem Quadrat (Seiten Hochschule, Studium, Fakultäten) | ohne Foto eine blaue Fläche an dessen Stelle |
| `section` | quadratische Fragekacheln auf der Seite Studium (Titel in Sora 32 px); Farbfolge der Kacheln auf der Startseite | Überzeile „Kapitel N“ |
| `subsection` | helle, volle Bänder in `#F0F5F8` | keine |
| `content` | Textseiten: schwarz auf weiß, Überzeile, Links mit Pfeil | keine |
| `content-image` | Text- und Bildspalten | keine |
| `compare`, Karten | Veranstaltungskarten in `#F0F5F8` mit Abstand | keine |
| `CardGrid flush` | bündige Farbkacheln „Dafür steht die Hochschule Hof“ | keine |
| Agenda | dieselben Kacheln, kleine Zeile über dem Titel wie in den Kacheln | Kapitelnummer in der kleinen Zeile |
| `hero` | Fragekacheln auf der Seite Studium und Farbblöcke über zwei Drittel der Breite auf Studiengangsseiten | Größe und Ausrichtung |
| `goodbad` | wie `compare` | Bewertung als grüne oder rote Fläche |
| `closing` | wie `cover`; gelbe Kontaktfläche nach der Kontaktkarte auf der Fakultätsseite Informatik | Kontaktfläche an Stelle des Fotos |
| `interactive`, `mermaid`, `diagram` | keine Entsprechung | aus den Tokens gestaltet |
| Logo in der Ecke, Fußzeile mit Seitenzahl | keine Entsprechung (Folienelemente) | Anpassung |

Nicht übernommen sind Kopfzeile, Menü, Suche, Fußzeilen-Links, Social-Media-Symbole, Akkordeons, Slider, Pillen-Schaltflächen und Kampagnengrafiken.

## 2. Abgleich mit offiziellen Richtlinien

Eine öffentliche Gestaltungsrichtlinie, ein Logopaket oder eine Präsentationsvorlage war nicht zu finden. Durchsucht wurden die Suche der Website, die Sitemap, rund 700 Seiten der Hochschul-Domains, rund 600 PDF-Dokumente im Volltext, das Internet Archive und allgemeine Suchmaschinen.

Hinweise auf internes Material gibt es:

- Die Agentur think moto gibt an, für die Hochschule Corporate Design, Logo-System und ein Brand Manual entwickelt und die Verwendung der Gestaltungselemente in einem Styleguide dokumentiert zu haben.
- Ein öffentliches Dokument der Hochschule trägt in der Fußzeile den Vermerk „Corporate Design angepasst: 26.02.2023“.
- Im Internet Archive taucht 2022 ein Bild mit dem Dateinamen `HH_PowerPoint_Mastervorlage…` auf. Eine PowerPoint-Vorlage gab es also intern.

Login-Bereiche (Intranet, Moodle, Nextcloud, Anmeldung der Website) wurden nicht geöffnet. **Der Abgleich mit einer Richtlinie steht deshalb aus** (offene Punkte 2 und 3).

## 3. Logo

### Fundstellen

| Quelle | Form | Bemerkung |
|---|---|---|
| Kopfzeile der Website: `logo-de.gif`, `logo-en.gif` | GIF, 690 × 388, animiert (56 Bilder) | einzige in die Seiten eingebundene Logodatei, für Folien zu grob und animiert |
| Favicons der Website | nur Bildmarke, als Raster und als Vektor | |
| Flyer der Hochschulkommunikation (InDesign-PDFs 2026) | Vektor | Grundlage der lokalen Datei |
| Hochschulvertrag (PDF) | Raster 3322 × 1500 | gedämpfte Farbfassung |
| Offizielle SVG mit Schutzraum, früher auf einer Subdomain | Vektor | heute nicht mehr erreichbar, nur als Kopie im Internet Archive (Juni 2023) |
| Negativfassung mit weißer Wortmarke | Raster | nur als Kopie im Internet Archive (Juli 2025) |
| Wikimedia Commons, `File:Logo_Hochschule_Hof.svg` | Vektor | CC BY-SA 4.0, hochgeladen von einem Konto „HAW Hof“, dessen Zugehörigkeit nicht belegt ist; eine CC-Lizenz umfasst keine Kennzeichenrechte. Nicht verwendet |

### Verwendete Datei

Die lokale Datei `deck/brand/logo.svg` ist das unveränderte Vektorlogo aus Seite 1 des Flyers „Kommunikationsdesign“ (Oktober 2026), das auf der Studiengangsseite verlinkt ist. Die 49 Pfade wurden mit `pdftocairo -svg` gelesen und Byte für Byte in eine eigene SVG-Datei kopiert, ohne etwas neu zu zeichnen. `scripts/logo-aus-flyer.sh` wiederholt das und prüft die Prüfsummen. Quelle, Prüfsummen und Abrufdatum stehen in `docs/logo-herkunft.json`, und `npm run check` gleicht eine lokal abgelegte Datei damit ab.

Die Hochschule stellt diese Datei nicht als Logo bereit. Sie sollte durch eine freigegebene Datei ersetzt werden, sobald es eine gibt.

### Farbfassungen, Schutzraum, Mindestgröße

- In den PDFs kommen zwei Farbfassungen vor: Bildschirmfarben (`#2962FA`, `#FECE00`, `#0BDA7D`, `#FF3E50`) und eine gedämpfte Farbfassung (`#0069B4`, `#FFDD00`, `#45AE54`, `#E7343F`), unter anderem in Druck-PDFs. Welche verbindlich ist, ist nicht veröffentlicht. Das Template nutzt die Bildschirmfarben der Website.
- Schutzraum: Die frühere offizielle SVG hat links, oben und unten genau eine Emblembreite Rand. Das Template hält diesen Abstand ein. Eine schriftliche Regel dazu wurde nicht gefunden (Annahme).
- Mindestgröße: nicht bekannt. Das Template zeigt das Logo 92 px breit auf Inhaltsfolien und 170 px breit auf Titel- und Abschlussfolie, bei 980 px Folienbreite.
- Das Logo steht nur auf Weiß. Eine freigegebene Fassung für farbige oder dunkle Flächen fehlt.

### Umsetzung im Template

- `components/HofLogo.vue` lädt `brand/logo.svg` (auch `.png` oder `.webp`) aus dem Ordner des Foliensatzes. Fehlt die Datei, erscheint ein gestrichelter Platzhalter.
- `.gitignore` schließt den Ordner `deck/brand/` sowie PDF- und PNG-Exporte aus; nur das verhindert, dass sie eingecheckt werden. `npm run check` findet Kopien der Logodatei außerhalb von `deck/brand/`, lokal schon vor dem Commit und in der CI. Eingecheckte Dateien aus `deck/brand/` und Exporte meldet die CI erst nach dem Push.
- Das npm-Paket enthält kein Logo, weil `deck/brand` nicht in `files` steht.
- `docs/vorschau.png` zeigt den Platzhalter. `npm run vorschau:bild` verschiebt `deck/brand/` für die Aufnahme nach `.slidev/` und legt den Ordner danach zurück.
- Ein gebauter Foliensatz (`npm run build`) und ein PDF-Export enthalten das Logo, wenn es lokal vorliegt. Wer einen Build öffentlich bereitstellt, etwa auf GitHub Pages, veröffentlicht damit auch das Logo.

## 4. Nutzungsrechte

Gefunden wurde:

- Das Impressum der Website enthält keine Aussage zu Urheber- oder Nutzungsrechten, Marken oder dem Logo. Vertretungsberechtigt ist laut Impressum der Präsident.
- Die Impressen des Magazins campuls und der Studiengangsseite hofdesigner verlangen für Vervielfältigung und Verbreitung außerhalb der Grenzen des Urheberrechts eine schriftliche Zustimmung. Das gilt für deren Inhalte und nennt das Logo nicht.
- Eine Pressemitteilung vom Dezember 2025 erlaubt die redaktionelle Nutzung eines Pressefotos. Das betrifft nicht das Logo.
- Die Nutzungsbedingungen von GitHub machen die Person verantwortlich, die fremde Inhalte einstellt. Forks bleiben bestehen, auch wenn die Datei später gelöscht wird.

Damit gilt für die drei Fälle:

| Fall | Erlaubt | Verboten | Stand |
|---|---|---|---|
| Logo auf Folien in der Lehre zeigen | keine Aussage | keine Aussage | offen |
| Logodatei in einem öffentlichen GitHub-Repository weitergeben | keine Aussage | keine Aussage | offen, daher nicht eingecheckt |
| Repository mit Logo unter eine Open-Source-Lizenz stellen | keine Aussage | keine Aussage | offen; das Repository steht ohne Logo unter der MIT-Lizenz |

Ansprechpartnerin ist die Hochschulkommunikation (Team Marketing und Design). Die Pressemitteilungen nennen als Kontakt `pressestelle@hof-university.de`.

Der Claim „Unfold your career“ wird im Template nicht verwendet. Die Hochschule schreibt ihn uneinheitlich („Unfold your career“, „unfold your career“, „unfoldyourcareer“), Bedingungen sind nicht veröffentlicht. Eine Stichprobe im EU-Markenregister ergab keine Treffer, das deutsche Register wurde nicht geprüft.

## 5. Schriften

| Schrift | Lizenz | Rechteinhaber | Dateien im Theme |
|---|---|---|---|
| Sora | SIL OFL 1.1 | © 2019 The Sora Project Authors | variable WOFF2 (latin, latin-ext) aus `@fontsource-variable/sora` 5.3.0, Lizenztext `assets/fonts/OFL-Sora.txt` |
| Source Sans 3 | SIL OFL 1.1, reservierter Name „Source“ | © 2010–2024 Adobe | unveränderte variable WOFF2 (aufrecht und kursiv) aus `adobe-fonts/source-sans`, Lizenztext `assets/fonts/OFL-SourceSans3.md` |

Teilmengen einer Schrift gelten nach der OFL als verändert und dürften den reservierten Namen „Source“ nicht tragen. Deshalb liegen die vollständigen Originaldateien bei.

Die Website nutzt „Source Sans Pro“ in Version 18. Source Sans 3 ist der Nachfolger derselben Schriftfamilie (Annahme: für Folien gleichwertig). Slidev lädt keine Webschriften nach (`fonts.provider: none`). Der Build enthält keinen Verweis auf Google Fonts, und Folien funktionieren ohne Internet.

## 6. Annahmen

1. Solange keine Richtlinie vorliegt, ist die Website die maßgebliche Gestaltungsquelle.
2. Es gelten die Bildschirmfarben der Website, nicht die gedämpfte Farbfassung.
3. Farbflächen nutzen das CSS-Rot `#EE0D1E` der Website. Das hellere Rot `#FF3E50` kommt nur im Logo selbst vor.
4. Der Schutzraum des Logos beträgt eine Emblembreite.
5. Source Sans 3 ersetzt Source Sans Pro.
6. Logo in der Ecke, Fußzeile mit Seitenzahl sowie die Layouts `interactive`, `mermaid` und `diagram` sind Folienelemente ohne Vorbild auf der Website.
7. Syntaxfarben, die Abtönung von Inline-Code auf Farbflächen und die Farben der Mermaid-Diagramme sind aus den Hochschulfarben abgeleitet.

## 7. Offene Punkte

1. **Logo-Freigabe einholen.** Schriftlich bei der Hochschulkommunikation klären, ob das Logo (a) auf Folien gezeigt, (b) als Datei in einem öffentlichen Repository weitergegeben und (c) in einem Repository unter Open-Source-Lizenz geführt werden darf. Aus der Antwort muss hervorgehen, wer für die Hochschule entscheidet.
2. **Styleguide und Präsentationsvorlage anfordern** und das Template damit abgleichen: Logovarianten, Schutzraum, Mindestgröße, verbindliche Farben, Schriften.
3. **Freigegebene Logodateien anfordern:** SVG oder EPS mit Schutzraum, Fassung für dunkle und farbige Flächen, verbindliche Farbfassung, gegebenenfalls englische Wortmarke.
4. **Lizenz des Repositorys:** erledigt am 10. November 2026. Code, Konfiguration und Dokumentation stehen unter der MIT-Lizenz (`LICENSE`). Name, Logo, Claim und andere Kennzeichen der Hochschule sind ausgenommen, die Schriften bleiben unter der OFL.
5. **Claim klären,** falls er auf Folien erscheinen soll.
6. **Markenrechtliche Prüfung** im deutschen Register, falls nötig.
7. **Kennzeichnung:** Das Template bleibt als inoffiziell gekennzeichnet, bis die Hochschule zustimmt.
8. **Integration in das Repository der Lehrveranstaltung** abstimmen: Zeitpunkt, Einbindung über Git-Tag oder Paketdatei, Node- und Slidev-Version.
9. **BPMN live auf Folien** (Token-Simulation) bei Bedarf über `slidev-addon-diagram-js` ergänzen; bis dahin BPMN als SVG-Export mit dem Layout `diagram`.
10. **npm-Paketnamen klären.** Das Paket `slidev-theme-hs-hof` ist nicht veröffentlicht, und den Namen könnte ein Dritter im npm-Register belegen. Die Anleitung bindet das Theme deshalb über einen Pfad ein. Entscheiden, ob der Name oder ein eigener npm-Scope reserviert wird.

## Quellenverzeichnis

Abgerufen am 8. und 9. November 2026.

- Website: https://www.hof-university.de/ und https://www.hof-university.com/
- Seiten der Messung: https://www.hof-university.de/hochschule.html, https://www.hof-university.de/studium.html, https://www.hof-university.de/studium/studiengaenge-und-weiterbildungs-programme/studiengaenge/informatik-bsc.html, https://www.hof-university.de/ueber-die-hochschule/fakultaeten/informatik.html, https://www.hof-university.de/hochschule/aktuelles/newsroom.html, https://www.hof-university.de/hochschule/aktuelles/veranstaltungen.html, https://www.hof-university.de/forschung-transfer.html, https://www.hof-university.de/international.html, https://www.hof-university.de/ueber-die-hochschule/fakultaeten/wirtschaftswissenschaften.html, https://www.hof-university.de/studium/services-fuer-studierende/bibliothek.html
- Stylesheet: https://www.hof-university.de/typo3temp/assets/compressed/merged-0149f841c63f7ee4420ae869ec8cef9d-827ed00de0c97220b3e0483c1807583d.css
- Neues Erscheinungsbild (campuls, 15.03.2021): https://campuls.hof-university.de/aktuelles/neues-corporate-design-wird-stueck-fuer-stueck-umgesetzt/
- Agentur think moto: https://thinkmoto.de/case/hochschule-hof/
- Impressum: https://www.hof-university.de/impressum.html, https://campuls.hof-university.de/impressum, https://hofdesigner.hof-university.de/impressum.html
- Newsroom und Hochschulkommunikation: https://www.hof-university.de/hochschule/aktuelles/newsroom.html
- Pressemitteilung mit Pressekontakt: https://www.hof-university.de/fileadmin/user_upload/hochschulkommunikation/pressemitteilungen/14102026_Verwaltungsinformatik_fin.pdf
- Pressemitteilung mit Bildrechten für ein Foto (Dezember 2025): https://www.hof-university.de/fileadmin/user_upload/hochschulkommunikation/pressemitteilungen/25-12-19_PM-HfoeD-HAW_-_Modernisierungsschub_Verwaltungsinformatik_fin.pdf
- Dokument mit dem Vermerk „Corporate Design angepasst: 26.02.2023“ in der Fußzeile: https://www.hof-university.de/fileadmin/user_upload/sonderbeauftragte/Handlungsleitfaden_Umgang_mit_sexueller_Belaestigung.pdf
- Markenbildung und Claim (campuls, 13.10.2026): https://campuls.hof-university.de/aktuelles/markenbildung-eine-hochschule-muss-zeigen-wofuer-sie-steht/
- Flyer mit Vektorlogo: https://www.hof-university.de/fileadmin/user_upload/hochschulkommunikation/2026-10_flyer_a5_kommunikationsdesign_digital.pdf, verlinkt auf https://www.hof-university.de/studium/studiengaenge-und-weiterbildungs-programme/studiengaenge/kommunikationsdesign-ba.html
- Hochschulvertrag mit Logo als Raster: https://www.hof-university.de/fileadmin/user_upload/hochschulkommunikation/HaW-Hof_unterzeichnete_Version.pdf
- Frühere offizielle SVG (Archivkopie): https://web.archive.org/web/20230611170427id_/https://inwa.hof-university.de/wp-content/uploads/2023/04/Logo-RGB_HG-Weiss_Hochschule-Hof-mit-Subline-und-Schutzraum.svg
- Negativfassung (Archivkopie): https://web.archive.org/web/20250706183631id_/https://sso.hof-university.de/idp/images/Logo_Hochschule_Hof_weiss.png
- PowerPoint-Vorlage: Eintrag im Internet Archive vom 31.05.2022, Dateiname beginnt mit `csm_HH_PowerPoint_Mastervorlage_100122_Vorlesungs_Mastervorlage_3_`, Suche über https://web.archive.org/
- Wikimedia Commons: https://commons.wikimedia.org/wiki/File:Logo_Hochschule_Hof.svg
- GitHub-Nutzungsbedingungen: https://docs.github.com/en/site-policy/github-terms/github-terms-of-service
- EU-Markenregister (Stichprobe): https://euipo.europa.eu/eSearch/
- Sora: https://github.com/sora-xor/sora-font, Lizenz https://raw.githubusercontent.com/google/fonts/main/ofl/sora/OFL.txt
- Source Sans 3: https://github.com/adobe-fonts/source-sans, Lizenz https://raw.githubusercontent.com/adobe-fonts/source-sans/release/LICENSE.md
- OFL-FAQ: https://openfontlicense.org/documents/OFL-FAQ.txt
- Lucide: https://github.com/lucide-icons/lucide/blob/main/LICENSE
- Technische und strukturelle Referenz: https://github.com/Miragon/slidev-deck-template (Commit `bd986f3`)
