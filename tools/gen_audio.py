"""Генерує mp3 нейроголосами Microsoft (edge-tts) і маніфест data/audio.js.

    node tools/build-audio-list.js
    python tools/gen_audio.py

Вже згенеровані файли пропускаються, тож скрипт можна перезапускати.
"""
import asyncio
import json
import sys
from pathlib import Path

import edge_tts

ROOT = Path(__file__).resolve().parent.parent
AUDIO = ROOT / "audio"
ITEMS = json.loads((ROOT / "tools" / "audio-items.json").read_text(encoding="utf-8"))
CONCURRENCY = 8


async def render(item, sem, stats):
    target = AUDIO / f"{item['file']}.mp3"
    if target.exists() and target.stat().st_size > 0:
        stats["skipped"] += 1
        return
    async with sem:
        for attempt in range(4):
            try:
                tmp = target.with_suffix(".part")
                await edge_tts.Communicate(item["text"], item["voice"], rate=item["rate"], pitch=item["pitch"]).save(str(tmp))
                if tmp.stat().st_size == 0:
                    raise RuntimeError("empty audio")
                tmp.replace(target)
                stats["made"] += 1
                done = stats["made"] + stats["skipped"]
                if done % 50 == 0:
                    print(f"  {done}/{len(ITEMS)}", flush=True)
                return
            except Exception as exc:  # network hiccups: retry with backoff
                if attempt == 3:
                    stats["failed"].append((item["file"], item["voice"], item["text"][:40], str(exc)[:80]))
                else:
                    await asyncio.sleep(1.5 * (attempt + 1))


async def main():
    AUDIO.mkdir(exist_ok=True)
    stats = {"made": 0, "skipped": 0, "failed": []}
    sem = asyncio.Semaphore(CONCURRENCY)
    await asyncio.gather(*(render(item, sem, stats) for item in ITEMS))

    manifest = {}
    for item in ITEMS:
        if (AUDIO / f"{item['file']}.mp3").exists():
            for key in item["keys"]:
                manifest[key] = item["file"]
    (ROOT / "data" / "audio.js").write_text(
        "/* Згенеровано tools/gen_audio.py — ключ: режим|персонаж|мова|текст → audio/<файл>.mp3 */\n"
        "window.AUDIO = " + json.dumps(manifest, ensure_ascii=False, indent=0) + ";\n",
        encoding="utf-8",
    )
    print(f"made {stats['made']}, skipped {stats['skipped']}, failed {len(stats['failed'])}, manifest keys {len(manifest)}")
    for f in stats["failed"][:15]:
        print("  FAILED", f)
    return 1 if stats["failed"] else 0


if __name__ == "__main__":
    sys.exit(asyncio.run(main()))
