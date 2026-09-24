# weather-app

A weather forecast site built for [The Odin Project's Weather App project](https://www.theodinproject.com/lessons/node-path-javascript-weather-app):
search any location, toggle °F/°C, with loading + error states and a background that reflects current conditions.
Powered by the [Visual Crossing Timeline API](https://www.visualcrossing.com/resources/documentation/weather-api/timeline-weather-api/).

**Live:** `https://hanssantos02.github.io/weather-app/`

> Built as a strategic-programming exercise: plan → spike → process → wire → display → harden → ship.
> See `SPEC.md`, `lessons/`, and `learning-records/` for the paper trail.

## API key (read this first)

There is no backend, so there is nowhere to hide a key — and none is committed.
On first search the app **prompts for a Visual Crossing key** and stores it in that browser's
`localStorage` only (`vcKey`). Get a free key:

1. Create an account at [visualcrossing.com](https://www.visualcrossing.com/).
2. Copy your key from the account page.
3. Paste it at the prompt. You won't be asked again in that browser.

To use a different key later, clear the site's `localStorage` (DevTools → Application) and search again.

## Run it

Requires **Node ≥ 18** (see `.nvmrc`). Then:

```bash
npm install
npm start        # dev server with HMR at localhost:8080
```

## Scripts

| Script                 | What it does                                               |
| ---------------------- | ---------------------------------------------------------- |
| `npm start`            | Dev server (`webpack.dev.js`) with HMR at `localhost:8080` |
| `npm run build`        | Production build to `dist/` (`webpack.prod.js`)            |
| `npm run preview`      | Build + serve `dist/` locally                              |
| `npm run lint`         | ESLint check                                               |
| `npm run lint:fix`     | ESLint auto-fix                                            |
| `npm run format`       | Prettier rewrite                                           |
| `npm run format:check` | Prettier check (used in CI)                                |
| `npm run deploy`       | Manual deploy of `dist/` to `gh-pages` branch              |

## Project structure

```
├── src/
│   ├── index.html          # search form, unit toggle, weather card, status region
│   ├── api.js              # fetchWeather() + localStorage key handling
│   ├── process.js          # toContract(): raw JSON → small app object
│   ├── ui.js               # render(), setStatus(), clearCard()
│   ├── index.js            # state (lastLocation/unit) + event wiring
│   ├── styles/main.css     # app shell, card, toggle, spinner, data-conditions themes
│   └── assets/logo.svg
├── lessons/                # course notes, one HTML file per step
├── reference/              # API cheatsheet
├── learning-records/       # decision log
├── SPEC.md                 # user stories, data contract, module split (gitignored)
```

Vanilla JS + Babel + webpack 5, ESLint + Prettier, GitHub Pages deploy.

## Deploy (GitHub Pages)

**Automatic (active):** push to `main` → `deploy.yml` builds and publishes `dist/`.
One-time setup: **Settings → Pages → Source: GitHub Actions**.

**Manual:** `npm run deploy` pushes `dist/` to the `gh-pages` branch.

## Troubleshooting

- **Prompted for a key on the live site:** expected — your dev `localStorage` doesn't travel with the deploy. Paste a key once per browser.
- **`HTTP 400/401`:** bad location spelling (400) or missing/invalid key (401). Clear `localStorage` to re-enter the key.
- **Blank page after deploy:** check the Actions tab for a failed build; run `npm run build` locally first.
