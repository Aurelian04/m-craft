"""Generează fotografiile și clipurile optimizate pentru site, plus app/data/media.json.

Utilizare (din rădăcina proiectului):
    python scripts/media/build_media.py "C:\\M-Craft\\Selectie_finala" <cale către ffmpeg>

- Sursa: originalele din Selectie_finala (căile din scripts/media/selection.json).
- Fotografii: WebP la 480/960/1600 px lățime (nu mai mari decât originalul), fără metadate EXIF/GPS.
- Clipuri: MP4 H.264, max 540 px pe latura scurtă, fără sunet, cu copertă WebP.
- Fișierele deja generate sunt sărite; ștergeți public/media pentru o regenerare completă.
Necesită Pillow (pip install pillow). ffmpeg poate fi cel din pachetul npm ffmpeg-static.
"""
import json
import re
import subprocess
import sys
from pathlib import Path

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[2]
SRC = Path(sys.argv[1])
FFMPEG = sys.argv[2]
SEL = json.loads((ROOT / "scripts/media/selection.json").read_text(encoding="utf-8"))
OUT_FOTO = ROOT / "public/media/foto"
OUT_VIDEO = ROOT / "public/media/video"
WIDTHS = [480, 960, 1600]


def source(rel: str) -> Path:
    """'S1/photo/IMG_1.JPEG' -> Selectie_finala/Serviciul 1 .../Poze/IMG_1.JPEG"""
    m = re.match(r"S(\d+)/(photo|video)/(.+)", rel)
    if not m:
        return SRC / rel
    folder = next(SRC.glob(f"Serviciul {m.group(1)} *"))
    return folder / ("Poze" if m.group(2) == "photo" else "Video") / m.group(3)


def probe(path: Path):
    info = subprocess.run([FFMPEG, "-i", str(path)], capture_output=True, text=True, encoding="utf-8", errors="replace").stderr
    d = re.search(r"Duration: (\d+):(\d+):([\d.]+)", info)
    dur = int(d.group(1)) * 3600 + int(d.group(2)) * 60 + float(d.group(3))
    m = re.search(r"Video:.*?, (\d{2,5})x(\d{2,5})", info)
    return dur, int(m.group(1)), int(m.group(2))


def build_photos():
    OUT_FOTO.mkdir(parents=True, exist_ok=True)
    out = []
    for p in SEL["photos"]:
        src = source(p["src"])
        with Image.open(src) as raw:
            im = ImageOps.exif_transpose(raw).convert("RGB")
        w, h = im.size
        widths = [x for x in WIDTHS if x <= w] or [w]
        for tw in widths:
            dest = OUT_FOTO / f"{p['id']}-{tw}.webp"
            if not dest.exists():
                th = round(h * tw / w)
                im.resize((tw, th), Image.LANCZOS).save(dest, "WEBP", quality=74, method=6)
        out.append({
            "id": p["id"], "w": widths[-1], "h": round(h * widths[-1] / w), "widths": widths,
            "alt": p["alt"], "project": p["project"], "services": p["services"],
            "categories": p["categories"], "stage": p["stage"],
        })
        print("foto", p["id"], flush=True)
    return out


def build_videos():
    OUT_VIDEO.mkdir(parents=True, exist_ok=True)
    out = []
    for v in SEL["videos"]:
        src = source(v["src"])
        dest = OUT_VIDEO / f"{v['id']}.mp4"
        if not dest.exists():
            subprocess.run([
                FFMPEG, "-y", "-loglevel", "error", "-i", str(src),
                "-vf", "scale='if(gt(iw,ih),-2,540)':'if(gt(iw,ih),540,-2)',fps=30",
                "-c:v", "libx264", "-preset", "slow", "-crf", "29", "-profile:v", "high", "-pix_fmt", "yuv420p",
                "-an", "-map_metadata", "-1", "-movflags", "+faststart", str(dest),
            ], check=True)
        dur, w, h = probe(dest)
        poster = OUT_VIDEO / f"{v['id']}.webp"
        if not poster.exists():
            t = dur * [0.1, 0.5, 0.9][v.get("poster_frame", 1)]
            tmp = OUT_VIDEO / f"{v['id']}.tmp.png"
            subprocess.run([FFMPEG, "-y", "-loglevel", "error", "-ss", f"{t:.2f}", "-i", str(dest), "-frames:v", "1", str(tmp)], check=True)
            with Image.open(tmp) as fr:
                fr.convert("RGB").save(poster, "WEBP", quality=72, method=6)
            tmp.unlink()
        out.append({
            "id": v["id"], "project": v["project"], "title": v["title"], "description": v.get("description", ""),
            "w": w, "h": h, "duration": round(dur, 1), "services": v.get("services", []),
        })
        print("video", v["id"], flush=True)
    return out


def main():
    photos = build_photos()
    videos = build_videos()
    data = {
        "photos": photos,
        "videos": videos,
        "projects": [{k: p[k] for k in ("id", "title", "summary", "works", "cover", "services", "before_after")} for p in SEL["projects"]],
        "services": SEL["services"],
        "home": SEL["home"],
        "categories": [c for c in SEL["categories"] if any(c["id"] in p["categories"] for p in photos)],
    }
    (ROOT / "app/data/media.json").write_text(json.dumps(data, ensure_ascii=False, indent=1), encoding="utf-8")
    print(len(photos), "fotografii,", len(videos), "clipuri")


if __name__ == "__main__":
    main()
