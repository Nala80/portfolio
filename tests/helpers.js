// Shared helpers for the test suite. Not a test file itself (no `.test.` in the name).
//
// The tests work on the in-memory output of buildSite(), so they need no build
// step; tests/build.test.js separately checks the real build into a temp folder.

import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildSite } from '../src/site.js';
import { bundleCss } from '../scripts/build.mjs';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const PUBLIC_DIR = path.join(ROOT, 'public');

/** route (e.g. "projects/nlr/index.html") -> generated HTML */
export const pages = buildSite();
export const routes = Object.keys(pages);
export const css = await bundleCss();

/** Files the build creates besides the pages. */
const GENERATED_ASSETS = new Set(['assets/site.css']);

const ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' };

export function decodeEntities(text) {
  return text.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (match, code) => {
    if (code[0] === '#') {
      const value = code[1].toLowerCase() === 'x' ? parseInt(code.slice(2), 16) : parseInt(code.slice(1), 10);
      return String.fromCodePoint(value);
    }
    return ENTITIES[code.toLowerCase()] ?? match;
  });
}

/** All start tags `<name ...>` in the HTML, with their attributes decoded. */
export function findTags(html, name) {
  const tags = [];
  const tagPattern = new RegExp(`<${name}\\b([^>]*)>`, 'gi');
  for (const [, attrText] of html.matchAll(tagPattern)) {
    const attrs = {};
    for (const [, key, value] of attrText.matchAll(/([^\s=/]+)(?:\s*=\s*"([^"]*)")?/g)) {
      attrs[key.toLowerCase()] = value === undefined ? '' : decodeEntities(value);
    }
    tags.push(attrs);
  }
  return tags;
}

/** Every attribute of every element, as [attributeName, value] pairs. */
export function allAttributes(html) {
  const pairs = [];
  for (const [, attrText] of html.matchAll(/<[a-z][\w:-]*\b([^>]*)>/gi)) {
    for (const [, key, value] of attrText.matchAll(/([^\s=/]+)\s*=\s*"([^"]*)"/g)) {
      pairs.push([key.toLowerCase(), decodeEntities(value)]);
    }
  }
  return pairs;
}

/** The text a visitor can read: tags, scripts and styles removed. */
export function visibleText(html) {
  const withoutCode = html.replace(/<(script|style)\b[\s\S]*?<\/\1>/gi, ' ');
  return decodeEntities(withoutCode.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ');
}

const BASE = 'https://site.invalid/';

/**
 * Resolves an href/src as the browser would from the page at `fromRoute`.
 * Returns { external: true, url } for anything that leaves the site, otherwise
 * { external: false, target, fragment } where target is a path inside dist/.
 */
export function resolveUrl(fromRoute, href) {
  const url = new URL(href, BASE + fromRoute);
  if (url.origin !== new URL(BASE).origin) return { external: true, url };
  let target = decodeURIComponent(url.pathname.slice(1));
  if (target === '' || target.endsWith('/')) target += 'index.html';
  return { external: false, url, target, fragment: decodeURIComponent(url.hash.slice(1)) };
}

/** True when `target` (a path inside dist/) is a generated page or asset, or a file in public/. */
export function targetExists(target) {
  return target in pages || GENERATED_ASSETS.has(target) || existsSync(path.join(PUBLIC_DIR, ...target.split('/')));
}

/** All id attributes on a page. */
export function idsOn(html) {
  return new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]));
}
