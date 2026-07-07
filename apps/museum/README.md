# Inner Cosmos — Wall Display

A standalone, **frozen** build of [Inner Cosmos](https://github.com/amyleesterling/inner_cosmos)
tuned to run as a **non-interactive attract loop on a wall display** (built and
tested against **3628×1600**, a 2.27:1 ultrawide).

It runs the guided-zoom "Explore" experience — human brain → mouse brain →
visual cortex → a cubic millimeter of cortex → a single neuron → one synapse →
an action potential → the calcium-activity swarm — auto-advancing through all
nine stages and then looping forever. Every cell on screen is a real
EM-reconstructed MICrONS mesh, no illustration.

This is intentionally a **separate repo** from `inner_cosmos` so the interactive
site can keep evolving without touching the installation. Port improvements over
by hand when desired; there is no automatic mirror.

## Pages & links

All live under `https://amyleesterling.github.io/science-experiment/`.

| Page | Link | What it is |
| --- | --- | --- |
| Landing | [`/`](https://amyleesterling.github.io/science-experiment/) | Entry / title screen |
| Explore | [`/explore`](https://amyleesterling.github.io/science-experiment/explore) | Interactive guided zoom (drag-to-rotate, manual stepping) |
| Attract | [`/attract`](https://amyleesterling.github.io/science-experiment/attract) | The wall — auto-looping attract mode, no chrome |
| Wall launcher | [`/wall`](https://amyleesterling.github.io/science-experiment/wall) | Click-to-fullscreen wrapper around `/attract` |
| Meet the cells | [`/meet`](https://amyleesterling.github.io/science-experiment/meet) | Featured MICrONS cell gallery |
| Activity | [`/activity`](https://amyleesterling.github.io/science-experiment/activity) | Calcium-activity swarm finale |
| Brain | [`/brain`](https://amyleesterling.github.io/science-experiment/brain) · [`/brain/2`](https://amyleesterling.github.io/science-experiment/brain/2) | Brain overview scenes |
| Kindergarten | [`/kindergarten`](https://amyleesterling.github.io/science-experiment/kindergarten) | Kid-first walkthrough |
| Wonder | [`/wonder`](https://amyleesterling.github.io/science-experiment/wonder) | Wonder-facts page |
| Brains by the numbers | [`/scale-test`](https://amyleesterling.github.io/science-experiment/scale-test) | Neuron icon + mouse-vs-human stats (count-ups, Earth-wrap) |
| Scale wall | [`/scale-wall`](https://amyleesterling.github.io/science-experiment/scale-wall) | Preview of the wall's stats card 5 |
| Citations | [`/citations`](https://amyleesterling.github.io/science-experiment/citations) | Sources, calculations & the Fenway-baseball / wiring math |

**Related:** [interactive site repo `inner_cosmos`](https://github.com/amyleesterling/inner_cosmos) · [its live site](https://amyleesterling.github.io/inner_cosmos/) · [this repo](https://github.com/amyleesterling/science-experiment).

> Deep links (anything past `/`) return an HTTP 404 status on GitHub Pages but still serve the app shell — the SPA router takes over, so they load fine in a browser.

## The wall route

Everything runs at **`/attract`**:

- Auto-advances through the nine stages, then fades to black and restarts.
- No navigation, cursor, or on-screen controls — nothing but the experience.
- OrbitControls are disabled so stray input can't hijack the scripted camera.
- The 3D uses a fixed *vertical* field of view, so the ultrawide aspect keeps
  the subject framed and simply adds cinematic space on the sides. Typography is
  scaled up for legibility across a room.

The interactive `/explore` (drag-to-rotate, manual stage stepping, presentation
mode) is still present if you ever want it.

## Run it on the wall

Point a fullscreen/kiosk browser at the deployed `/attract` route:

```sh
chrome --kiosk --window-size=3628,1600 \
  "https://amyleesterling.github.io/science-experiment/attract"
```

## Local development

```sh
npm install
npm run dev        # then open http://localhost:5173/attract (or the printed port)
npm run build      # production build → dist/
```

## Deploy

Pushing to `main` triggers `.github/workflows/deploy.yml` (Vite build →
GitHub Pages). Live at `amyleesterling.github.io/science-experiment/`.
The `vite.config.ts` `base` is `/science-experiment/` for the project-Pages path,
and `index.html` is copied to `404.html` so a hard refresh on `/attract`
still loads the app.

## Data

Cell meshes ship as web-optimized `.glb` files in `public/meshes/`, produced
offline by `scripts/extract-meshes.py` from the MICrONS minnie65 (`seg_m1300`)
volume. The mouse brain is the Allen Institute CCF "root" compartment. The
inhibitory cell selection follows Schneider-Mizell et al. 2024. Built with
neuroglancer tooling.
