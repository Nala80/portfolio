// Assembles the site: maps every output route to the HTML of its page.
// Pages are added here as they are built.

/** @returns {Record<string, string>} route (relative to dist/) -> HTML */
export function buildSite() {
  return {
    'index.html': `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><title>Nalawi Woldeyohannes</title></head>
<body><p>Portfolio under construction.</p></body>
</html>
`,
  };
}
