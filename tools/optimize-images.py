"""Převede fotky (.jpg/.jpeg/.png) na optimalizované .webp.

Použití:  python tools/optimize-images.py cesta/k/fotce.jpg [další soubory…]
          python tools/optimize-images.py web/assets/nove-fotky/   (celá složka)

Výsledný .webp se uloží vedle originálu. Fotky se zmenší na max. 1800 px na delší straně,
výřezy s průhledným pozadím (PNG) si průhlednost zachovají. Potřebuje: pip install pillow
"""
import sys
from pathlib import Path
from PIL import Image

MAX_SIZE = 1800
EXTENSIONS = {'.jpg', '.jpeg', '.png'}


def convert(path: Path) -> None:
    image = Image.open(path)
    image.thumbnail((MAX_SIZE, MAX_SIZE))
    out = path.with_suffix('.webp')
    if image.mode in ('RGBA', 'LA') or 'transparency' in image.info:
        image.convert('RGBA').save(out, 'WEBP', quality=82, method=6)
    else:
        image.convert('RGB').save(out, 'WEBP', quality=78, method=6)
    print(f'{path.name}: {path.stat().st_size // 1024} KB -> {out.name}: {out.stat().st_size // 1024} KB')


if __name__ == '__main__':
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    for arg in sys.argv[1:]:
        target = Path(arg)
        files = [p for p in target.iterdir() if p.suffix.lower() in EXTENSIONS] if target.is_dir() else [target]
        for f in files:
            convert(f)
