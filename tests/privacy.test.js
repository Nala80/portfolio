// Privacy rule: no email address and no phone number anywhere on the site.
// Contact goes through LinkedIn only.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { PUBLIC_DIR, allAttributes, css, pages, visibleText } from './helpers.js';

const EMAIL = /[a-z0-9._%+-]+@[a-z0-9-]+(?:\.[a-z0-9-]+)*\.[a-z]{2,}/i;
const PHONE_PATTERNS = [
  // International: +31 6 12345678, 0031 20 123 4567, +31 (0)6-1234 5678
  /(?:\+|\b00)\d{1,3}(?:[\s().-]*\d){7,}/,
  // Dutch national: 06 12345678, 020-1234567, 0612345678
  /\b0\d(?:[\s-]?\d){8}\b/,
  // Anything else that looks like a phone number: 10+ digits with single separators
  /\d(?:[\s()-]{0,2}\d){9,}/,
];
const CONTACT_SCHEMES = /\b(?:mailto|tel|sms|callto):/i;

// SVG geometry is numbers by nature; it is not readable content.
const GEOMETRY_ATTRIBUTES = new Set([
  'd', 'points', 'viewbox', 'transform', 'x', 'y', 'x1', 'x2', 'y1', 'y2', 'cx', 'cy', 'r', 'rx', 'ry',
  'width', 'height', 'dx', 'dy', 'stroke-dasharray', 'stroke-width', 'font-size', 'offset',
]);

/** Returns a description of the first email/phone found in `text`, or null. */
function findContactDetail(text) {
  const email = text.match(EMAIL);
  if (email) return `email address "${email[0]}"`;
  for (const pattern of PHONE_PATTERNS) {
    const phone = text.match(pattern);
    if (phone) return `phone number "${phone[0]}"`;
  }
  return null;
}

/** Readable text plus every non-geometry attribute value of an HTML document. */
function scannableParts(html) {
  const parts = [visibleText(html)];
  for (const [name, value] of allAttributes(html)) {
    if (!GEOMETRY_ATTRIBUTES.has(name)) parts.push(value);
  }
  return parts;
}

test('the detector catches common email and phone formats', () => {
  const samples = [
    'name@example.com',
    'first.last+cv@school.ac.nl',
    'Call +31 6 12345678',
    '+31 (0)20 123 4567',
    '0031 6 1234 5678',
    '06-12345678',
    '06 1234 5678',
    '0612345678',
    '020 123 4567',
    '(555) 123-4567 ext',
  ];
  for (const sample of samples) {
    assert.ok(findContactDetail(sample), `should flag: ${sample}`);
  }
});

test('the detector does not flag the figures used on the site', () => {
  const samples = [
    'R² 0.43 (Random Forest on test data)',
    '+1.22 workload score in Climb',
    'r = 0.55 pupil size vs altitude error (session 5)',
    '2023 – 2027 (expected)',
    '10 sessions × 6 pilots × 6 files',
    'Alpha +2.66, Charlie +2.48, Foxtrot +2.12, Bravo +1.73, Echo +1.08 bpm per session; Delta −0.74',
    'PCA explains 41.8% + 24.5% of variance',
    'r = 0.43 session 1, 0.55 session 5, 0.03 session 9',
    '20 Jan 2025 · 6 Feb 2025 · Jun 2025',
  ];
  for (const sample of samples) {
    assert.equal(findContactDetail(sample), null, `should not flag: ${sample}`);
  }
});

for (const [route, html] of Object.entries(pages)) {
  test(`${route} contains no email address or phone number`, () => {
    assert.doesNotMatch(html, CONTACT_SCHEMES, 'no mailto:/tel: links');
    for (const part of scannableParts(html)) {
      const found = findContactDetail(part);
      assert.equal(found, null, `found ${found} in ${route}`);
    }
  });
}

test('the stylesheet contains no email address or phone number', () => {
  assert.doesNotMatch(css, EMAIL);
  assert.doesNotMatch(css, CONTACT_SCHEMES);
  // Only strings and comments can carry readable text in CSS; numbers elsewhere are values.
  for (const [text] of css.matchAll(/"[^"]*"|'[^']*'|\/\*[\s\S]*?\*\//g)) {
    const found = findContactDetail(text);
    assert.equal(found, null, `found ${found} in the CSS bundle`);
  }
});

test('text files in public/ contain no email address or phone number', () => {
  const textFiles = readdirSync(PUBLIC_DIR, { recursive: true })
    .map(String)
    .filter((file) => /\.(svg|txt|html|json|xml|webmanifest)$|(^|[\\/])CNAME$/i.test(file));
  for (const file of textFiles) {
    const content = readFileSync(path.join(PUBLIC_DIR, file), 'utf8');
    assert.doesNotMatch(content, EMAIL, `email address in public/${file}`);
    assert.doesNotMatch(content, CONTACT_SCHEMES, `contact link in public/${file}`);
  }
});
