// The site makes no requests to other hosts: no CDNs, web fonts, trackers or
// embeds. The only links that leave the site are LinkedIn and GitHub.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { css, findTags, pages, resolveUrl } from './helpers.js';

// Deliberately written out here instead of read from src/data/profile.js, so a
// change to the data can never silently widen what is allowed.
const ALLOWED_LINKS = [
  (url) => url.href === 'https://www.linkedin.com/in/nalawi-woldeyohannes',
  (url) => url.origin === 'https://github.com' && /^\/Nala80(\/|$)/.test(url.pathname),
];

// Elements and attributes that make the browser fetch something.
const RESOURCE_ATTRIBUTES = {
  img: ['src', 'srcset'],
  source: ['src', 'srcset'],
  script: ['src'],
  link: ['href'],
  iframe: ['src'],
  video: ['src', 'poster'],
  audio: ['src'],
  embed: ['src'],
  object: ['data'],
  image: ['href', 'xlink:href'],
  use: ['href', 'xlink:href'],
  form: ['action'],
};

function urlsIn(attrName, value) {
  if (attrName === 'srcset') return value.split(',').map((candidate) => candidate.trim().split(/\s+/)[0]);
  return [value];
}

for (const [route, html] of Object.entries(pages)) {
  test(`${route} loads every resource from the site itself`, () => {
    for (const [tag, attributes] of Object.entries(RESOURCE_ATTRIBUTES)) {
      for (const attrs of findTags(html, tag)) {
        for (const attrName of attributes) {
          if (!(attrName in attrs)) continue;
          for (const value of urlsIn(attrName, attrs[attrName])) {
            assert.equal(resolveUrl(route, value).external, false, `<${tag} ${attrName}="${value}"> loads from another host`);
          }
        }
      }
    }
    assert.doesNotMatch(html, /http-equiv="refresh"/i, 'no meta refresh redirects');
  });

  test(`${route} only links off-site to LinkedIn and GitHub`, () => {
    for (const { href } of findTags(html, 'a')) {
      if (href === undefined) continue;
      const resolved = resolveUrl(route, href);
      if (!resolved.external) continue;
      assert.ok(ALLOWED_LINKS.some((allowed) => allowed(resolved.url)), `unexpected external link: ${href}`);
    }
  });

  test(`${route} opens external links safely`, () => {
    for (const attrs of findTags(html, 'a')) {
      if (!attrs.href || !resolveUrl(route, attrs.href).external) continue;
      assert.match(attrs.rel ?? '', /noopener/, `${attrs.href} needs rel="noopener"`);
    }
  });
}

test('the stylesheet loads nothing from other hosts', () => {
  assert.doesNotMatch(css, /@import/i, 'no @import');
  for (const [, value] of css.matchAll(/url\(\s*['"]?([^'")]+)['"]?\s*\)/gi)) {
    assert.ok(value.startsWith('data:') || !/^(?:[a-z]+:)?\/\//i.test(value), `external url() in CSS: ${value}`);
  }
});
