// Every internal link points to something the build actually generates.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { findTags, idsOn, pages, resolveUrl, targetExists } from './helpers.js';

for (const [route, html] of Object.entries(pages)) {
  test(`${route} has no broken internal links`, () => {
    for (const { href } of findTags(html, 'a')) {
      assert.ok(href, `<a> without href on ${route}`);
      const resolved = resolveUrl(route, href);
      if (resolved.external) continue;
      assert.ok(targetExists(resolved.target), `${href} on ${route} points to missing ${resolved.target}`);
      if (resolved.fragment && resolved.target in pages) {
        assert.ok(idsOn(pages[resolved.target]).has(resolved.fragment), `${href} on ${route}: no element with id "${resolved.fragment}"`);
      }
    }
  });

  test(`${route} has unique element ids`, () => {
    const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
    assert.deepEqual(ids.filter((id, index) => ids.indexOf(id) !== index), [], 'duplicate ids');
  });
}
