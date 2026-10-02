# Daksh Chugh — 3D Portfolio

Plain HTML/CSS/JS + Three.js (from CDN), with no build step.

## Features
- 10k-particle scene that morphs per section: sphere → "DC" → "#52" → galaxy → DNA helix → torus knot → "LET'S TALK". The mouse repels particles.
- Hacker terminal easter egg: press `~` or click `>_` (try `help`, `projects`, `sudo hire-daksh`)
- Typing role rotator, scrambling headings, animated counters, 3D tilt cards, magnetic buttons, scroll progress bar
- Mobile friendly; respects "reduce motion"

## Edit content
Everything lives in **`data.js`**. Search for `TODO` to find details still to fill in.

## Run locally
```
python -m http.server 8000
```
Open http://localhost:8000. Opening index.html directly won't work, because ES modules need a server.

## Deploy free on GitHub Pages
1. Repo: https://github.com/dakshchugh315-source/Portfolio (Settings → Pages → branch `main`, folder `/root`)
2. Push changes: `git add -A && git commit -m "msg" && git push`
3. Live at https://dakshchugh315-source.github.io/Portfolio/
