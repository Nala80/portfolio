// Every page is a complete, well-formed English document.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { findTags, pages } from './helpers.js';

for (const [route, html] of Object.entries(pages)) {
  test(`${route} is a complete English HTML document`, () => {
    assert.match(html, /^<!doctype html>/i);
    assert.match(html, /<html lang="en">/);
    assert.match(html, /<meta name="viewport" content="width=device-width, initial-scale=1">/);
    assert.match(html, /<title>[^<]{10,}<\/title>/, 'has a meaningful <title>');
    const description = findTags(html, 'meta').find((meta) => meta.name === 'description');
    assert.ok(description?.content?.length > 30, 'has a meta description');
    assert.match(html, /<\/html>\s*$/);
  });

  test(`${route} has exactly one <h1> and a <main> landmark`, () => {
    assert.equal(findTags(html, 'h1').length, 1);
    assert.equal(findTags(html, 'main').length, 1);
  });
}
