// Content checks for the NLR case study: the details that were explicitly
// confirmed or corrected must not regress.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { nlr } from '../src/data/nlr.js';
import { findTags, pages, visibleText } from './helpers.js';

const route = 'projects/nlr/index.html';
const html = pages[route];
const text = visibleText(html);

test('the NLR page shows the lead question and all four key figures', () => {
  assert.ok(text.includes(nlr.leadQuestion));
  for (const figure of ['~360', 'R² 0.43', '+1.22', 'r = 0.55']) {
    assert.ok(text.includes(figure), `key figure ${figure}`);
  }
});

test('the NLR page has the four approach steps and five numbered results', () => {
  assert.equal(nlr.approach.length, 4);
  assert.equal(nlr.results.length, 5);
  for (let number = 1; number <= 5; number += 1) {
    assert.match(html, new RegExp(`id="result-${number}"`));
  }
});

test('the workload chart is captioned as pilot Delta, sessions 1, 5 and 9', () => {
  const workload = nlr.results[0].figures.find((figure) => figure.src.endsWith('workload-per-phase.png'));
  assert.ok(workload, 'workload chart is in result 1');
  assert.match(workload.caption, /Delta/);
  assert.match(workload.caption, /sessions 1, 5 and 9/);
});

test('result 2 (EEG and instructor ratings) is text only', () => {
  assert.equal(nlr.results[1].figures.length, 0);
});

test('all nine NLR charts are shown exactly once', () => {
  const charts = findTags(html, 'img').map((img) => img.src).filter((src) => src.includes('images/nlr/'));
  assert.equal(charts.length, 9);
  assert.equal(new Set(charts).size, 9);
});

test('the NLR page is written as a team project', () => {
  assert.doesNotMatch(text, /my contribution/i);
  assert.match(text, /5 students/);
});
