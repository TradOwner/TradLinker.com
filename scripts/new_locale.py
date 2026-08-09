#!/usr/bin/env python3
"""Create a translation workspace for a locale declared in languages.json."""
from pathlib import Path
import json, shutil, sys
ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / 'src'
if len(sys.argv) != 2:
    raise SystemExit('Usage: python scripts/new_locale.py <language-code>')
code = sys.argv[1].lower()
langs = json.loads((SRC/'config'/'languages.json').read_text(encoding='utf-8'))
if code not in {x['code'] for x in langs}:
    raise SystemExit(f'{code!r} is not declared in src/config/languages.json')
target = SRC/'content'/code
if target.exists():
    raise SystemExit(f'{target} already exists')
shutil.copytree(SRC/'content'/'en', target)
legal_target = SRC/'legal'/code
legal_target.mkdir(parents=True, exist_ok=True)
print(f'Created {target}. Translate every file, then set "published": true for {code} in languages.json.')
print('Legal pages are intentionally not copied automatically; translate/review them separately before setting legalPublished=true.')
