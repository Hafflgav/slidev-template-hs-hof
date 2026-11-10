---
title: Slidev-Template der Hochschule Hof
info: Beispielfoliensatz für das Slidev-Template im Erscheinungsbild der Hochschule Hof.
theme: ..
lang: de
transition: fade
themeConfig:
  course: Slidev-Template der Hochschule Hof
layout: cover
kicker: Beispielfoliensatz
meta: Name der Lehrperson · Fakultät · Wintersemester 2026/27
---

<!--
PFLICHT: eine Überschrift mit dem Titel der Veranstaltung.
OPTIONAL: kicker (Überzeile), ein Absatz als Untertitel, meta (Lehrperson, Fakultät, Semester), image und imageAlt für ein Foto an Stelle der blauen Fläche.
GRENZE: Titel höchstens zwei Zeilen, Untertitel eine Zeile.
VERWENDUNG: immer die erste Folie. Das Logo kommt aus brand/logo.svg im Ordner des Foliensatzes; fehlt die Datei, erscheint ein Platzhalter.
-->

# Folien für die Lehre an der Hochschule Hof

Ein Beispielfoliensatz mit allen Layouts

<!--
Begrüßung. Dieser Foliensatz zeigt jedes Layout des Templates mindestens einmal. Die erste Demo-Folie jedes Layouts erklärt im Quelltext, was Pflicht ist und wo die Grenzen liegen.
-->

---
layout: content
---

<!--
PFLICHT: die Überschrift und die Komponente Agenda.
OPTIONAL: nichts weiter, die Kapitel kommen automatisch aus allen section-Folien.
GRENZE: bis sechs Kapitel als Farbkacheln, ab sieben als Liste.
VERWENDUNG: direkt nach der Titelfolie. Ein Klick auf ein Kapitel springt dorthin.
-->

# Agenda

<Agenda></Agenda>

<!--
Überblick über die beiden Kapitel. Überleitung: Zuerst das Template selbst, dann ein Beispiel aus der Lehre.
-->

---
src: ./chapter/01-template/01-template.md
---

---
src: ./chapter/02-prozesse/02-prozesse.md
---

---
layout: closing
kicker: Vielen Dank
---

<!--
PFLICHT: eine Überschrift.
OPTIONAL: kicker, ein Satz, ::contact:: mit Kontaktzeilen, contactLabel (Standard „Kontakt“).
GRENZE: Titel höchstens zwei Zeilen, höchstens vier Kontaktzeilen.
VERWENDUNG: immer die letzte Folie.
-->

# Fragen und Feedback

Die Folien entstehen als Code und liegen im Repository der Veranstaltung.

::contact::

Name der Lehrperson

Fakultät · Raum

vorname.nachname@hof-university.de

<!--
Abschluss. Auf Sprechstunde und Kontaktweg hinweisen.
-->
