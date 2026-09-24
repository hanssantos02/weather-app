# repo-template

Minimal template: **vanilla JS + Babel + webpack 5** with dev server, **ESLint + Prettier**, and **GitHub Pages** deploy.

> Note on `webpack-serve`: that package is deprecated. This template uses its official replacement —
> `webpack-dev-server` via `webpack serve` (`npm start`). Same workflow, maintained package.

## Use this template

**Option A — GitHub UI (recommended):** open this repo on GitHub → **Use this template** → **Create a new repository**.
(Repo Settings → enable **Template repository** on this repo first, so the button shows up.)

**Option B — clone:**

```bash
git clone git@github.com:hanssantos02/repo-template.git my-app
cd my-app
rm -rf .git && git init && git add -A && git commit -m "chore: init from template"
npm install
npm start
```

Requires **Node ≥ 18** (see `.nvmrc`, pinned to Node 22). Use `nvm use` if you have nvm.

## Scripts

| Script                 | What it does                                               |
| ---------------------- | ---------------------------------------------------------- |
| `npm start`            | Dev server (`webpack.dev.js`) with HMR at `localhost:8080` |
| `npm run dev`          | Same as start, without auto-open                           |
| `npm run build`        | Production build to `dist/` (`webpack.prod.js`)            |
| `npm run preview`      | Build + serve `dist/` locally                              |
| `npm run lint`         | ESLint check                                               |
| `npm run lint:fix`     | ESLint auto-fix                                            |
| `npm run format`       | Prettier rewrite                                           |
| `npm run format:check` | Prettier check (used in CI)                                |
| `npm run clean`        | Remove `dist/`                                             |
| `npm run deploy`       | Manual deploy of `dist/` to `gh-pages` branch              |

## Project structure

```
├── src/
│   ├── index.html          # HtmlWebpackPlugin template
│   ├── index.js            # entry, demo counter
│   ├── styles/main.css     # demo styles (style-loader in dev, extracted in prod)
│   └── assets/logo.svg     # bundled via asset modules (import or <img src>)
├── public/
│   ├── favicon.svg         # injected via HtmlWebpackPlugin
│   └── .nojekyll           # copied to dist for GitHub Pages
├── webpack.common.js       # shared config (Babel, assets, HTML, public/ copy)
├── webpack.dev.js          # dev: source maps, HMR devServer
├── webpack.prod.js         # prod: CSS extract/minify, hashed filenames, splitChunks
├── babel.config.json       # @babel/preset-env
├── eslint.config.js        # ESLint flat config + eslint-config-prettier
├── .prettierrc.json        # Prettier settings
├── .github/workflows/
│   ├── ci.yml              # lint + format:check + build on push/PR
│   └── deploy.yml          # build dist/ and deploy via GitHub Pages on main
```

## Styling & assets

- `import './styles/main.css'` — `style-loader` in dev, extracted + minified CSS file in prod.
- Images/fonts: `import logo from './assets/logo.svg'` or `<img src="./assets/logo.svg">` in HTML
  (`html-loader` + asset modules; files < 8 KB are inlined, larger ones emitted to `assets/`).
- Anything in `public/` is copied verbatim to `dist/` (e.g. `.nojekyll`, robots.txt).

## Deploy (GitHub Pages)

Two supported paths — pick one:

**A. Automatic (already wired):** push to `main` → `deploy.yml` builds and publishes `dist/` via the
official `deploy-pages` action. One-time setup in the new repo: **Settings → Pages → Source: GitHub Actions**.

**B. Manual:** `npm run deploy` pushes `dist/` to the `gh-pages` branch (uses the `gh-pages` package).
Then set **Settings → Pages → Source: Deploy from a branch → `gh-pages`**.

**Base path:** `output.publicPath` defaults to `'auto'`, so project pages
(`username.github.io/repo-name/`) work without config. To pin a base instead:
`PUBLIC_PATH=/my-app/ npm run build`.

## ESLint + Prettier

- `eslint.config.js` (flat config): recommended JS rules, browser+node globals, `eslint-config-prettier` last.
- `.prettierrc.json`: 2-space, single quotes, semicolons, LF. VS Code settings in `.vscode/` enable
  format-on-save + fix-on-save (install the recommended extensions).
- CI runs `npm run lint` and `npm run format:check`.

## Customizing

- Port: `devServer.port` in `webpack.dev.js` (default `8080`).
- Browsers: `targets` in `babel.config.json`.
- Title/meta: `src/index.html`. Favicon: replace `public/favicon.svg`.
- Rename: update `name`/`description` in `package.json` and this README.

## Troubleshooting

- **`"type"` field in `package.json`:** leave it unset (as shipped). Setting `"type": "commonjs"`
  makes webpack 5 treat every `.js` file as `javascript/dynamic` and the build fails on `import`
  statements; setting `"type": "module"` breaks the `require`-based webpack configs. If you need ESM
  for your own scripts, use `.mjs` files instead.
