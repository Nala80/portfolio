// Content and diagram checks for the PRICE case study.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { price } from '../src/data/price.js';
import { RADAR, radarLayout } from '../src/components/diagrams/radar.js';
import { PUBLIC_DIR, findTags, pages, visibleText } from './helpers.js';

const html = pages['projects/price/index.html'];
const text = visibleText(html);

test('the PRICE page shows the intro and the logo', () => {
  assert.ok(text.includes(price.intro));
  assert.ok(findTags(html, 'img').some((img) => img.src.endsWith('images/price/logo.png')));
});

test('the wireframes are left out of the page and the repository', () => {
  assert.doesNotMatch(html, /wireframe/i);
  const priceImages = readdirSync(path.join(PUBLIC_DIR, 'images', 'price'));
  assert.deepEqual(priceImages.filter((file) => /wireframe/i.test(file)), []);
  assert.ok(!existsSync(path.join(PUBLIC_DIR, 'images', 'price', 'wireframe-data.png')));
});

test('the page has the cross-section and radar diagrams as accessible inline SVG', () => {
  const svgs = findTags(html, 'svg');
  assert.equal(svgs.length, 2);
  for (const svg of svgs) {
    assert.equal(svg.role, 'img');
    assert.ok(svg['aria-labelledby'], 'svg is labelled by its <title> and <desc>');
  }
  assert.match(html, /T1<\/tspan> · outer edge/);
  assert.match(html, /T2<\/tspan> · middle/);
  assert.match(html, /T3<\/tspan> · inner edge/);
});

test('the radar template has six axes and no scores', () => {
  assert.equal(price.radar.axes.length, 6);
  const radar = html.slice(html.indexOf('class="diagram radar"'));
  const svg = radar.slice(0, radar.indexOf('</svg>'));
  assert.equal([...svg.matchAll(/class="radar-axis"/g)].length, 6);
  assert.doesNotMatch(svg, /radar-score|radar-value/, 'no data polygon');
});

test('every radar axis label fits inside the SVG viewBox', () => {
  // Generous width estimate: 0.6 em per character for the system sans-serif.
  const estimateWidth = (line) => line.length * RADAR.fontSize * 0.6;
  for (const label of radarLayout(price.radar.axes)) {
    for (const [index, line] of label.lines.entries()) {
      const width = estimateWidth(line);
      const left = label.anchor === 'start' ? label.x : label.anchor === 'end' ? label.x - width : label.x - width / 2;
      const right = left + width;
      const baseline = label.baselines[index];
      const box = RADAR.viewBox;
      assert.ok(left >= box.x && right <= box.x + box.width, `"${line}" spans x ${left.toFixed(0)}–${right.toFixed(0)}, viewBox x ${box.x}–${box.x + box.width}`);
      assert.ok(baseline - RADAR.fontSize >= box.y && baseline + 5 <= box.y + box.height, `"${line}" baseline ${baseline} outside viewBox y ${box.y}–${box.y + box.height}`);
    }
  }
});

test('the PRICE page does not claim results', () => {
  assert.doesNotMatch(text, /\b(we|I) (achieved|delivered|reduced|increased|improved|evaluated|advised)\b/i);
  assert.equal((text.match(/JavaScript/g) ?? []).length, 1, 'the tech stack is mentioned once');
});
