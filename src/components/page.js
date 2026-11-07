import { html } from './html.js';
import { siteHeader } from './header.js';
import { siteFooter } from './footer.js';

/**
 * Full HTML document shared by every page.
 *
 * `root` is the relative path from the page back to the site root ('./' for the
 * home page, '../../' for projects/nlr/). All links and assets are relative, so
 * the same build works at nala80.github.io/portfolio/ and at a custom domain.
 */
export function page({ title, description, root, profile, content, year = new Date().getFullYear() }) {
  return html`<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${description}">
<meta name="author" content="${profile.name}">
<meta name="color-scheme" content="dark">
<meta name="theme-color" content="#0b0b0c">
<meta property="og:type" content="website">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<link rel="icon" href="${root}favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="${root}assets/site.css">
</head>
<body>
<a class="skip-link" href="#main">Skip to content</a>
${siteHeader({ root, profile })}
<main id="main">
${content}
</main>
${siteFooter({ profile, year })}
</body>
</html>
`.toString();
}
