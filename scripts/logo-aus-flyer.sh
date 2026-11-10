#!/usr/bin/env bash
# Erzeugt deck/brand/logo.svg lokal aus einem öffentlichen Flyer der Hochschule
# Hof und prüft beide Prüfsummen gegen docs/logo-herkunft.json. Die Datei bleibt
# durch .gitignore außerhalb des Repositorys. Sobald die Hochschulkommunikation
# eine freigegebene Logodatei bereitstellt, diese verwenden.
# Benötigt: curl, pdftocairo (Poppler, z. B. brew install poppler), python3, shasum.
# Geprüft mit Poppler 26.11.0 und cairo 1.18.6; andere Versionen können eine
# anders formatierte, aber gleichwertige SVG-Datei erzeugen.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PDF_URL="https://www.hof-university.de/fileadmin/user_upload/hochschulkommunikation/2026-10_flyer_a5_kommunikationsdesign_digital.pdf"
PDF_SHA="f9ece051f1931a2f6c6d149068d073d0774c084fa546c965d568810f1c2b59b6"
LOGO_SHA="056a93489cdabd3e13e2f0009e7c882add5d6c1fe65a700062bb375560ef12b1"
COMMENT="Hochschule Hof logo, German wordmark. Vector paths copied verbatim from page 1 of ${PDF_URL} (pdftocairo -svg); retrieved 2026-11-08. Usage rights not cleared."

for tool in curl pdftocairo python3 shasum; do
  command -v "$tool" > /dev/null || { echo "Fehlt: $tool" >&2; exit 1; }
done

WORK="$(mktemp -d)"
trap 'rm -rf "$WORK"' EXIT

curl -fsSL --max-time 120 -o "$WORK/flyer.pdf" "$PDF_URL"
echo "$PDF_SHA  $WORK/flyer.pdf" | shasum -a 256 -c --status \
  || { echo "Der Flyer hat sich geändert (andere Prüfsumme). Bitte die Herkunft neu prüfen." >&2; exit 1; }

pdftocairo -svg -f 1 -l 1 "$WORK/flyer.pdf" "$WORK/seite.svg"
mkdir -p "$ROOT/deck/brand"
python3 -I "$ROOT/scripts/logo-aus-pdf.py" "$WORK/seite.svg" "$WORK/logo.svg" 257.0 503.6 364.7 552.1 49 "$COMMENT"

if ! echo "$LOGO_SHA  $WORK/logo.svg" | shasum -a 256 -c --status; then
  echo "Das Ergebnis weicht von der dokumentierten Datei ab." >&2
  echo "  erhalten: $(shasum -a 256 "$WORK/logo.svg" | cut -d' ' -f1)" >&2
  echo "  erwartet: $LOGO_SHA" >&2
  echo "  $(pdftocairo -v 2>&1 | head -1); cairo $(pkg-config --modversion cairo 2>/dev/null || echo unbekannt)" >&2
  exit 1
fi
mv "$WORK/logo.svg" "$ROOT/deck/brand/logo.svg"
echo "deck/brand/logo.svg erzeugt und geprüft."
