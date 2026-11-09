# Portfolio — Nalawi Woldeyohannes

Personal portfolio site: a static site generated from data files with plain Node.js.
No framework, no build tool and no dependencies — a clean checkout runs straight away.

**Live:** https://www.nalawi.info/

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
public/          Static assets copied as-is: images, favicon, the CNAME file
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
  works at `nala80.github.io/portfolio/` and at `www.nalawi.info`.
- **Zero dependencies.** Nothing to install, nothing to update, nothing that can break the
  build in a year. Node's standard library covers file handling, the dev server and testing.

## Tests

`npm test` runs on the in-memory output of `buildSite()` plus one real build into a temp
folder:

| File                | Checks                                                                          |
| ------------------- | ------------------------------------------------------------------------------- |
| `build.test.js`     | The home, NLR and PRICE pages, the CSS bundle and `public/` all end up in the output |
| `privacy.test.js`   | No email address, phone number, `mailto:` or `tel:` in any page, the CSS or `public/` text files |
| `external.test.js`  | No resource loads from other hosts; the only off-site link is LinkedIn |
| `links.test.js`     | Every internal link and `#anchor` resolves; element ids are unique              |
| `assets.test.js`    | Every referenced image exists in `public/`; every `<img>` has alt text and dimensions |
| `projects.test.js`  | Projects are listed newest first; every case-study link points to a generated page |
| `pages.test.js`     | Each page is a complete English document with one `<h1>` and a `<main>`         |
| `case-studies.test.js` | Case studies are prose chapters linked from a process line and end with a plain-prose reflection; no bullet lists or numbered labels |
| `nlr.test.js`       | Confirmed NLR details stay correct: key figures, process order, the Delta caption, team voice |
| `price.test.js`     | Diagrams are accessible SVG; the example radar is labelled illustrative and its labels fit the viewBox; wireframes left out; no claimed results |
| `deploy.test.js`    | CI tests before building; no `npm install`; `public/CNAME` holds a bare domain name    |
| `html.test.js`      | The escaping template behaves as intended                                       |

## Deploying to GitHub Pages

The workflow in `.github/workflows/deploy.yml` runs on every push and pull request:
tests on Node 20, 22 and 24, then a build. Pushes to `main` are also deployed.

One-time setup: in the repository go to **Settings → Pages → Build and deployment** and set
**Source** to **GitHub Actions**. After that every merge into `main` publishes the site.

## Custom domain (`www.nalawi.info`)

The site is served by GitHub Pages at `www.nalawi.info`; the domain is registered at
mijn.host. The bare domain `nalawi.info` and the old `nala80.github.io/portfolio/`
address both redirect to `www`.

- **`public/CNAME`** holds the domain (`www.nalawi.info`). Because this site deploys
  with GitHub Actions, GitHub Pages does not read the file: the domain that counts is the
  one in **Settings → Pages → Custom domain**. The file records the domain in the
  repository, and `deploy.test.js` checks it holds a bare domain name.
- **DNS records at mijn.host** (DNS settings of `nalawi.info`):

  | Type    | Name  | Value                  |
  | ------- | ----- | ---------------------- |
  | `CNAME` | `www` | `nala80.github.io`     |
  | `A`     | `@`   | `185.199.108.153`      |
  | `A`     | `@`   | `185.199.109.153`      |
  | `A`     | `@`   | `185.199.110.153`      |
  | `A`     | `@`   | `185.199.111.153`      |
  | `AAAA`  | `@`   | `2606:50c0:8000::153`  |
  | `AAAA`  | `@`   | `2606:50c0:8001::153`  |
  | `AAAA`  | `@`   | `2606:50c0:8002::153`  |
  | `AAAA`  | `@`   | `2606:50c0:8003::153`  |

  No other `A`, `AAAA` or `CNAME` records for `@` or `www` (such as the host's
  default parking records) may stay next to these. Records for email (`MX`, `TXT`) are
  unaffected. GitHub's current list of addresses is at docs.github.com → "Managing a
  custom domain for your GitHub Pages site".
- **HTTPS**: "Enforce HTTPS" is ticked in Settings → Pages. GitHub issues and renews the
  certificate itself.

Because all links are relative, no code changes are needed when the domain goes live.
