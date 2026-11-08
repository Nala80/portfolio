// Content checks for the NLR case study: the confirmed details must not regress.

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

test('the NLR page follows the four process steps in order', () => {
  assert.deepEqual(
    nlr.chapters.map((chapter) => chapter.step),
    ['Clean & merge', 'Engineer features', 'Analyse', 'Model'],
  );
  const positions = nlr.chapters.map((chapter) => html.indexOf(`id="${chapter.id}"`));
  assert.ok(positions.every((position) => position > -1), 'every chapter is on the page');
  assert.deepEqual([...positions].sort((a, b) => a - b), positions, 'chapters appear in process order');
});

test('the workload chart is captioned as pilot Delta, sessions 1, 5 and 9', () => {
  const workload = nlr.chapters.find((chapter) => chapter.figure?.src.endsWith('workload-per-phase.png'));
  assert.ok(workload, 'the workload chart is shown');
  assert.match(workload.figure.caption, /Delta/);
  assert.match(workload.figure.caption, /sessions 1, 5 and 9/);
});

test('each chart is shown once and every chart file in public/ is used', () => {
  const charts = findTags(html, 'img').map((img) => img.src).filter((src) => src.includes('images/nlr/'));
  assert.equal(new Set(charts).size, charts.length, 'no chart is repeated');
  assert.equal(charts.length, nlr.chapters.filter((chapter) => chapter.figure).length);
});

test('the NLR page is written as a team project', () => {
  assert.doesNotMatch(text, /my contribution/i);
  assert.match(text, /5 students/);
});
