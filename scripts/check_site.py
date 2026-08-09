#!/usr/bin/env python3
from pathlib import Path
import re, sys
ROOT=Path(__file__).resolve().parents[1]
SITE=ROOT/'_site'
errors=[]
for p in SITE.rglob('*.html'):
    text=p.read_text(encoding='utf-8')
    if p.name!='404.html' and p.parent==SITE:
        continue
    if '<html ' in text and ' lang=' not in text:
        errors.append(f'{p}: missing lang')
    if p.parent != SITE and '<link rel="canonical"' not in text and p.name!='404.html':
        errors.append(f'{p}: missing canonical')
    # No source Markdown URLs should leak into generated pages.
    if re.search(r'href="[^"]+\.md(?:[?#"]|$)', text):
        errors.append(f'{p}: leaked .md link')
if errors:
    print('\n'.join(errors), file=sys.stderr)
    raise SystemExit(1)
print(f'Checked {sum(1 for _ in SITE.rglob("*.html"))} HTML files: OK')
