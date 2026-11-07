// Every image referenced in the HTML exists in public/ and is described for
// screen readers.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { findTags, pages, resolveUrl, targetExists } from './helpers.js';

for (const [route, html] of Object.entries(pages)) {
  const images = findTags(html, 'img');

  test(`${route}: every referenced image and stylesheet exists`, () => {
    for (const { src } of images) {
      const resolved = resolveUrl(route, src);
      assert.ok(!resolved.external && targetExists(resolved.target), `missing image ${src} (resolved to ${resolved.target})`);
    }
    for (const { href } of findTags(html, 'link')) {
      const resolved = resolveUrl(route, href);
      assert.ok(!resolved.external && targetExists(resolved.target), `missing <link> target ${href}`);
    }
  });

  test(`${route}: every <img> has alt text and intrinsic dimensions`, () => {
    for (const attrs of images) {
      assert.ok(attrs.alt && attrs.alt.trim().length > 0, `<img src="${attrs.src}"> needs alt text`);
      assert.match(attrs.width ?? '', /^\d+$/, `<img src="${attrs.src}"> needs a width (prevents layout shift)`);
      assert.match(attrs.height ?? '', /^\d+$/, `<img src="${attrs.src}"> needs a height (prevents layout shift)`);
    }
  });
}
