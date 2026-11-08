# Portfolio — Nalawi Woldeyohannes

Personal portfolio site: a static site generated from data files with plain Node.js.
No framework, no build tool and no dependencies — a clean checkout runs straight away.

**Live:** https://nala80.github.io/portfolio/

## Commands

Requires Node.js 20 or newer. There is no `npm install` step.

| Command         | What it does                                                         |
| --------------- | -------------------------------------------------------------------- |
| `npm test`      | Runs the checks in `tests/` with the built-in `node:test` runner     |
| `npm run build` | Generates the site into `dist/`                                      |
| `npm start`     | Builds, then serves `dist/` at http://localhost:3000 (`PORT` to change) |

## Folder structure

```
src/
  data/          Content as plain JS objects: profile, projects, skills, nlr, price
  components/    Small functions that turn data into HTML (hero, project entry, figure, …)
    diagrams/    Inline SVG diagrams (PRICE cross-section, radar template)
  pages/         One function per page, composing components with data
  styles/        Hand-written CSS, concatenated in filename order (01-tokens … 07-diagrams)
  site.js        The route table: which pages exist and where they are written
scripts/
  build.mjs      Copies public/, bundles the CSS, renders every route into dist/
  serve.mjs      Tiny static server for local preview
tests/           node:test checks (see below)
public/          Static assets copied as-is: images, favicon, later the CNAME file
.github/workflows/deploy.yml   CI: test → build → deploy to GitHub Pages
```

### Why it is built this way

- **Data-driven design / separation of concerns.** Content lives in `src/data/` and never
  contains markup. Changing a project means editing one data file; the layout does not move.
- **Component-based architecture.** Each component is a pure function: data in, HTML out.
  They compose like UI components in a framework, but without one. Pure functions are
  easy to test and easy to reason about.
- **Safe by default.** Components use a small `html` tagged template
  (`src/components/html.js`) that escapes every interpolated value unless it is itself
  HTML from another component, so content can never break the markup.
- **Relative links everywhere.** Every page knows its depth (`root`), so the same build
  works at `nala80.github.io/portfolio/` and later at the custom domain.
- **Zero dependencies.** Nothing to install, nothing to update, nothing that can break the
  build in a year. Node's standard library covers file handling, the dev server and testing.

## Tests

`npm test` runs on the in-memory output of `buildSite()` plus one real build into a temp
folder:

| File                | Checks                                                                          |
| ------------------- | ------------------------------------------------------------------------------- |
| `build.test.js`     | The home, NLR and PRICE pages, the CSS bundle and `public/` all end up in the output |
| `privacy.test.js`   | No email address, phone number, `mailto:` or `tel:` in any page, the CSS or `public/` text files |
| `external.test.js`  | No resource loads from other hosts; the only off-site links are LinkedIn and GitHub |
| `links.test.js`     | Every internal link and `#anchor` resolves; element ids are unique              |
| `assets.test.js`    | Every referenced image exists in `public/`; every `<img>` has alt text and dimensions |
| `projects.test.js`  | Projects follow the data order; every case-study link points to a generated page |
| `pages.test.js`     | Each page is a complete English document with one `<h1>` and a `<main>`         |
| `case-studies.test.js` | Case studies are prose chapters linked from a process line; no bullet lists or numbered labels |
| `nlr.test.js`       | Confirmed NLR details stay correct: key figures, process order, the Delta caption, team voice |
| `price.test.js`     | Diagrams are accessible SVG; radar labels fit the viewBox; wireframes left out; no claimed results |
| `deploy.test.js`    | CI tests before building; no `npm install`; `public/CNAME` is valid once added  |
| `html.test.js`      | The escaping template behaves as intended                                       |

## Deploying to GitHub Pages

The workflow in `.github/workflows/deploy.yml` runs on every push and pull request:
tests on Node 20, 22 and 24, then a build. Pushes to `main` are also deployed.

One-time setup: in the repository go to **Settings → Pages → Build and deployment** and set
**Source** to **GitHub Actions**. After that every merge into `main` publishes the site.

## Custom domain (`nalawi.info`) — once the domain is bought

Do these steps only after owning the domain.

1. **Add `public/CNAME`** containing one line, just the domain:
   ```
   nalawi.info
   ```
   The build copies it into `dist/`. GitHub Pages reads it to know which domain the site
   answers to. (`deploy.test.js` checks the file holds a bare domain.)
2. **Set the DNS records at the registrar.** For the apex domain `nalawi.info`, add four
   `A` records (and optionally four `AAAA` records for IPv6):

   | Type   | Name | Value                  |
   | ------ | ---- | ---------------------- |
   | `A`    | `@`  | `185.199.108.153`      |
   | `A`    | `@`  | `185.199.109.153`      |
   | `A`    | `@`  | `185.199.110.153`      |
   | `A`    | `@`  | `185.199.111.153`      |
   | `AAAA` | `@`  | `2606:50c0:8000::153`  |
   | `AAAA` | `@`  | `2606:50c0:8001::153`  |
   | `AAAA` | `@`  | `2606:50c0:8002::153`  |
   | `AAAA` | `@`  | `2606:50c0:8003::153`  |
   | `CNAME`| `www`| `nala80.github.io`     |

   Remove any default parking records the registrar created for `@` and `www`.
   Check GitHub's current list at docs.github.com → "Managing a custom domain for your
   GitHub Pages site" before adding them.
3. **Enter the domain in Settings → Pages → Custom domain** (`nalawi.info`) and save.
   GitHub runs a DNS check; propagation can take up to 24 hours.
4. **Tick "Enforce HTTPS"** on the same page once the certificate is issued (the box is
   greyed out until then, usually within an hour of the DNS check passing).
5. Optional: verify the domain under your GitHub account settings → Pages, so nobody else
   can claim it for their Pages site.

Because all links are relative, no code changes are needed when the domain goes live.
