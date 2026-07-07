# Inner Cosmos — Wall Exhibit — Handoff

Context doc for continuing this project in a fresh session. Read this first.

## What this is
A cinematic, **kid-first** neuroscience wall exhibit for a **Boston** science museum.
Built to run as a **non-interactive auto-loop on a 3628×1600 ultrawide wall**. Every
cell on screen is a **real EM-reconstructed MICrONS cell** — never procedural where a
specific cell is implied.

The audience brief: "would a 5-year-old understand and care?" Language is picture-book,
not academic. The user (**Amy**) is hands-on, iterates fast, is rigorous about **accuracy
and sourcing**, likes **Boston-specific** and **relatable** framings, and rejects cheap
fakes/mocks.

## Repos, deploy, URLs
- **Primary working repo:** `C:\Users\amyle\science-experiment` → GitHub `amyleesterling/science-experiment` (public) → live at **`https://amyleesterling.github.io/science-experiment/`**. This is a **fork of inner_cosmos** tuned for the wall.
- Deploy: **push to `main`** → `.github/workflows/deploy.yml` (Vite build → GitHub Pages, Actions build). ~1–1.5 min. `dist/index.html` is copied to `404.html` for SPA deep links.
- **Vite base:** `/science-experiment/` in prod, `/` in dev. Deep links return HTTP **404 but serve the app shell** (normal GH Pages SPA behavior — verify by grepping the served HTML for `assets/index-*.js`, not the status code).
- **Related repo (the original site):** `C:\Users\amyle\hidden-worlds` → GitHub `amyleesterling/inner_cosmos` → `https://amyleesterling.github.io/inner_cosmos/` (base `/inner_cosmos/`). It was kept pristine, then Amy asked to add two pages there: **`/numbers`** and **`/citations`** (deployed). Its `/explore` still has the OLD action-potential copy (with "quadrillion") — NOT synced.
- Stack: Vite + React 19 + TypeScript + Tailwind v4 + Framer Motion + Three.js.
- **Dev server:** `npm run dev -- --port 3462 --strictPort` (port **3462**). Preview-config name `hidden-worlds` (port 3461) exists but is a different checkout — use 3462 for science-experiment.

## Routes (science-experiment)
- `/attract` — **the wall.** Auto-loops the 8-stage guided zoom, no chrome, cursor visible, drag-to-rotate on, Pause/Back/Next demo buttons (hidden with **`?exhibit=1`**).
- `/wall` — click-to-fullscreen launcher for the wall (fills the 3628×1600 screen chromeless). Use `/wall?exhibit=1` for the clean install. Kiosk alternative: `chrome --kiosk "…/attract?exhibit=1"`.
- `/explore`, `/explore/:stage` — the interactive guided zoom (keeps full copy).
- `/scale-test` — full **animated** "Brains by the numbers" standalone (count-ups, linear bars, `EarthWrap` SVG, Moon secondary stat). "Preserved" reference version. Now **leads with `NeuronIcon`** — an animated pyramidal-neuron glyph (self-sketching apical/basal dendrites + axon, breathing soma, violet→cyan gradient) ringed by the three headline figures (neurons / synapses / wiring, mouse vs human) with a link to `/citations`.
- `/scale-wall` — preview of the **wall card 5** layout (stats left, 3D space right).
- `/citations` — **"Citations & calculations"** sources page. **Unexposed** (nothing public links to it). Per-step sources, cells table, functional-data source.
- `/meet`, `/activity`, `/kindergarten`, `/wonder`, `/brain` — inherited pages from inner_cosmos.

## The wall loop (`Explore.tsx`, `attract` prop)
- `ATTRACT_SEQUENCE = [0,1,2,4,5,6,7,8]` — **skips STAGES index 3 ("Primary visual cortex")**. Eyebrow shows "Stage N of 8" from sequence position.
- `ATTRACT_DWELL_MS` per-stage dwell (stage 5 bumped to 13s for reading the stats).
- Auto-advance → at end, **fade-to-black wrap** then reset to stage 0 (ZoomScene unmounts on the activity stage, so returning to 0 remounts fresh — no backward fly). `paused` state gates auto-advance (pause button).
- **Stage 5 ("A neuron")** renders the **`BrainStatsCompact`** block + a "Brains by the numbers" eyebrow. In attract, `STAGES[5].subtitle` is overridden to a short neuron description; `/explore` keeps the long paragraph.
- **Stage 7 (action potential)** has an attract-only camera in `ZoomScene` (`attract` prop → bigger/lower/right framing) so the synapse clears the left copy panel.
- **`ZoomScene.tsx`** props: `interactive` (OrbitControls on/off), `attract` (stage-7 framing), `hideProgress`. `CellSwarm.tsx` has a **capture-only zoom** (`CAPTURE_ZOOM=0.5`) for the video render.

## "Brains by the numbers" stats
Shared component **`BrainStatsCompact.tsx`** (used by wall card 5, `/scale-wall`, and inner_cosmos `/numbers`): Mouse (`#7ee0ff`) / Human (`#b78bff`) as **color-coded columns stated once**, each value with a color-coded `≈` anchor; some rows have a `lead` line.

Current figures & anchors (keep these consistent across BrainStatsCompact, ScaleTest ROWS, ReferenceTable):
- **Neurons** — mouse 70M, human 86B. Lead: *"As baseballs, they'd fill Fenway Park…"* → mouse **"~2% of the stadium"**, human **"~28× the whole stadium"**. (Boston-specific; the ~1,230× count gap = the 2% → 28× jump. Replaced "stars in the Milky Way" — unfair vs 100–400B stars per Herculano-Houzel/Nature.) **Uses the WHOLE enclosed stadium volume, not the playing field** (Amy's call, 2026-07-06). **Math derived on `/citations`** ("Those neurons, as baseballs in Fenway Park"): 2.9" ball at 64% packing ≈ 0.33 L; Fenway enclosed volume ≈ 1M m³ (footprint ~18,000 m² × ~55 m to the light towers; rough, ~0.9–1.4M range); 70M → 22,900 m³ ≈ 2.3%; 86B → 28.1M m³ ≈ 28.1×. NB the earlier "8 ft deep / 50×" framing was field-footprint-only and is retired. (OpenAI's "buries Fenway 20–25×" was a cm³→m³ ÷1,000 unit error — off 1,000×.)
- **Synapses** — mouse **"250 billion"** (no `~`, for consistency with human), human **"100 trillion"**. **No anchors on the wall** (Amy removed them; `/scale-test` still has the "years to count" anchors).
- **Neuronal wiring** — lead *"If you lined up all the neuron branches end to end…"* → mouse **"~2,000 km"** (anchor "Boston to Miami", ~2,020 km; **miles dropped on the wall** — read odd next to km-only human), human **"~2 million km"** ("50× around the Earth"). `/scale-test` keeps `(~1,250 mi)` in its Boston-to-Miami anchor + a Moon secondary; `/citations` keeps `(~1,250 mi)` in the mouse-wiring heading.

`ReferenceTable.tsx` splits **myelinated (~176,000 km measured)** vs **all axon (~2M km est.)**.

**Card-5 copy** (`Explore.tsx` `NEURON_WALL_DESC` + `ScaleWall.tsx`): "One cell, thousands of connections. Neurons are the **most famous** cells of the brain. They come in thousands of varieties." ("most famous" not "primary" — glia roughly match neurons in number.) In attract mode the "Brains by the numbers" sub-label uses the same eyebrow treatment as "Stage N of 8".

`NeuronIcon.tsx` (on `/scale-test`) restates the same three figures next to a neuron glyph — its `STATS` array is a 4th place to keep in sync. Uses mouse synapses **~250B** (midpoint of the cited ~200–300B) to stay parallel with the other cards.

## Wiring estimate (the load-bearing number) — see `/citations`
density (**~4.4 km/mm³**, Braitenberg & Schüz 1998; cross-checked cat + MICrONS mouse) × volume (**~500,000 mm³** neocortical gray matter) ≈ **2.2M km**, + white-matter tracts (**~176,000 km**, Marner et al. 2003) → **~2–2.4M km total**. It's an **estimate** (only the myelinated ~10% is measured whole-brain; human H01 / Shapson-Coe et al. 2024 anchors the density; independent estimate ~850,000 km low end). Mouse ~2,000 km = same method × ~500 mm³ mouse brain (NIH/MICrONS 2025).
- **OPEN:** the exact **cortex-volume paper** for the 454/530 cm³ figures is not yet cited (flagged in amber on Step 2). Ask Amy for it.

## Data provenance (all real MICrONS)
- **12 featured cells** — MICrONS minnie65 `seg_m1300`, curated from microns-explorer.org/gallery-mm3. IDs in `src/data/neurons.ts` (`featuredNeurons`). Listed with types on `/citations`.
- **Functional/activity data** — the 108-cell calcium swarm: MICrONS **two-photon functional imaging**, session 9 / scan 4, planes 2/4/6, **DANDI:000402**, coregistered to minnie65. Built by `scripts/extract-functional-cells.py` → `public/data/activity-manifest.json` + `activity-traces.bin` + `public/meshes/activity/*.glb`.

## Video render (`scripts/render-activity-video.mjs`)
`npm run render-video --width 3628 --height 1600 --fps 30 --url http://localhost:3462/activity?capture=1` → `public/activity-loop.mp4` (**gitignored** via `public/*.mp4`). Loops seamlessly (360° orbit + calcium wrap over 30s).
- **MUST use GPU flags** (`--ignore-gpu-blocklist --enable-gpu-rasterization --use-angle=d3d11`) — already baked in. Without them headless Chromium uses SwiftShader (~18s/frame ≈ 4.5 hr); with them the RTX 3090 does it in ~5 min.
- **Run detached** (`nohup … & disown`) — it exceeds the Bash 10-min timeout. Monitor the log.
- `?capture=1` hides NavBar (NavBar checks the param). Verified clean at 3628×1600.

## CRITICAL: how to verify visuals
The **visible Chrome tab throttles rAF + background-tab setTimeout when unfocused** — so `/attract` looks frozen/erratic in a backgrounded tab AND in the Claude Code preview iframe. **Do NOT trust screenshots from those.** Instead use **headless Playwright** (not throttled), at the real **3628×1600** with the GPU flags, and drive it: click `[aria-label="Pause"]`, then N× `[aria-label="Next stage"]` to reach a stage (stage 5 = 4 Next clicks from stage 0), wait ~4s for camera/mesh, screenshot, downscale with ffmpeg to view. Throwaway scripts named `scripts/_*.mjs` (delete after; they're not gitignored).

## Working conventions
- After edits: `npx tsc -p tsconfig.app.json --noEmit`, then commit (end message with `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>`), push to `main`, wait for the deploy run, then verify the **live bundle** (`curl` the base, grep the served `assets/index-*.js` for the new string).
- Use **explicit `git add <files>`**, never `git add -A` blindly — large `.mp4` renders live in `public/` and must not be committed.
- Keep numbers/anchors in sync across `BrainStatsCompact`, `ScaleTest`, `ReferenceTable`, `NeuronIcon`, and `Explore` stage copy.

## Open items / next steps
1. **Cortex-volume citation** for `/citations` Step 2 (need the exact paper from Amy).
2. **Sync inner_cosmos** `/numbers` + `/citations` with the latest science-experiment changes (baseball/Fenway anchors, ~2,000 km mouse wiring, no-honesty-flag, cells table, functional data). inner_cosmos is behind.
3. **3-column "fly" version** of the stats (fly → mouse → human): fly ~140k neurons, ~54.5M synapses (FlyWire, Dorkenwald et al. 2024); fly *wiring* has no clean published figure — compute or leave "—".
4. **Wall stats legibility** — the left copy panel caps at ~640px (`w-[min(40rem,42vw)]`), so on 3628px the stat numbers are ~23px; may be too small from across a room. Option: widen the stage-5 panel + scale stats up (wall-only).
