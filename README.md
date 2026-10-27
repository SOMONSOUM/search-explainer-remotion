# Search Explainer – Remotion (TypeScript)

A Remotion re-creation of the 5:41 "How Elasticsearch works" explainer:
55 timed scenes, glossy dark UI, Montserrat + JetBrains Mono, original narration track.

## Run

```bash
npm install
npm run dev          # Remotion Studio (live preview + timeline scrubbing)
npm run build        # full 1920x1080 render -> out/video.mp4
npm run preview      # half-res render -> out/preview.mp4
npx remotion still SearchExplainer out/frame.png --frame=1800
```

## Structure

| File | Purpose |
| --- | --- |
| `src/timeline.ts` | **Scene list**: start time (seconds), two-tone title, caption. Edit this to re-time anything. |
| `src/SearchExplainer.tsx` | Audio + one `<Sequence>` per scene, title/fade wrapper, watermark |
| `src/scenes/part1-4.tsx` | The 55 scene visuals (store window, indexing, book, logs, nodes, Lucene…) |
| `src/scenes/index.ts` | Scene id -> component map |
| `src/ui.tsx` | Kit: glossy blocks, tiles, search bar, windows, icons, server, ES logo |
| `src/anim.ts` | `useAnim()` – scene-local time helpers (`p`, `pop`, `typed`, `loop`) |
| `src/theme.ts` | Colors, gradients, `FPS` (all timings are in seconds, so 60 fps just works) |
| `public/narration.mp3` | Audio extracted from the source video |

## Notes
- Brand logos (Apple, Sony…) are replaced with neutral text badges; the "cloudxberry" mark is a simple text watermark (`Watermark` in `ui.tsx`).
- To use 60 fps like the source, set `FPS = 60` in `theme.ts`.
- Narration is not transcribed – scene timings come from title-change detection on the source video.
