#!/usr/bin/env python3
# Kopiert die <path>-Elemente des Logos Byte für Byte aus einer mit pdftocairo
# erzeugten Seiten-SVG in eine eigene SVG-Datei. Pfaddaten werden weder
# verändert noch neu gezeichnet; neu sind nur das Wurzelelement und die viewBox.
# Aufruf: logo-aus-pdf.py <seite.svg> <ziel.svg> <x0> <y0> <x1> <y1> <anzahl> "<kommentar>"
import re
import sys

src, out, x0, y0, x1, y1, expected, comment = sys.argv[1:9]
x0, y0, x1, y1 = map(float, (x0, y0, x1, y1))
expected = int(expected)
page = open(src, encoding='utf-8', errors='strict').read()
PATH = re.compile(r'<path\b[^>]*?/>')
TOKENS = re.compile(r'[MLCZ]|-?\d+(?:\.\d+)?')


def extents(d):
    toks = TOKENS.findall(d)
    i, cur, xs, ys = 0, None, [], []
    while i < len(toks):
        c = toks[i]
        if c in 'ML':
            cur = (float(toks[i + 1]), float(toks[i + 2]))
            xs.append(cur[0])
            ys.append(cur[1])
            i += 3
        elif c == 'C':
            p0 = cur
            p1 = (float(toks[i + 1]), float(toks[i + 2]))
            p2 = (float(toks[i + 3]), float(toks[i + 4]))
            p3 = (float(toks[i + 5]), float(toks[i + 6]))
            i += 7
            for k in range(0, 129):
                s = k / 128.0
                a, b, c2, d3 = (1 - s) ** 3, 3 * (1 - s) ** 2 * s, 3 * (1 - s) * s * s, s ** 3
                xs.append(a * p0[0] + b * p1[0] + c2 * p2[0] + d3 * p3[0])
                ys.append(a * p0[1] + b * p1[1] + c2 * p2[1] + d3 * p3[1])
            cur = p3
        elif c == 'Z':
            i += 1
        else:
            raise ValueError('unerwartetes Token ' + c)
    return min(xs), min(ys), max(xs), max(ys)


selected = []
for m in PATH.finditer(page):
    tag = m.group(0)
    ex = extents(re.search(r'\bd="([^"]*)"', tag).group(1))
    if ex[0] >= x0 and ex[1] >= y0 and ex[2] <= x1 and ex[3] <= y1:
        selected.append((m.start(), m.end(), tag, ex))

assert len(selected) == expected, f'{len(selected)} statt {expected} Pfade gefunden'
# Die Pfade müssen im Original direkt aufeinander folgen.
for (_, a1, _, _), (b0, _, _, _) in zip(selected, selected[1:]):
    assert page[a1:b0].strip() == '', 'Pfade folgen nicht direkt aufeinander'
for _, _, tag, _ in selected:
    assert 'transform=' not in tag and 'clip-path=' not in tag, 'Pfad mit Transformation'

xmin = min(e[3][0] for e in selected)
ymin = min(e[3][1] for e in selected)
w = max(e[3][2] for e in selected) - xmin
h = max(e[3][3] for e in selected) - ymin
body = '\n'.join(tag for _, _, tag, _ in selected)
svg = '<?xml version="1.0" encoding="UTF-8"?>\n<!-- %s -->\n<svg xmlns="http://www.w3.org/2000/svg" viewBox="%.4f %.4f %.4f %.4f" width="%.4fpt" height="%.4fpt">\n%s\n</svg>\n' % (comment, xmin, ymin, w, h, w, h, body)
open(out, 'w', encoding='utf-8').write(svg)
