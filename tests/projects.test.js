// The project cards on the home page and the case-study pages stay in sync.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { projects } from '../src/data/projects.js';
import { findTags, pages, resolveUrl } from './helpers.js';

const home = pages['index.html'];

test('the home page shows every project, in the order of the data file', () => {
  const positions = projects.map((project) => home.indexOf(`id="project-${project.id}"`));
  assert.ok(positions.every((position) => position > -1), 'every project has a card');
  assert.deepEqual([...positions].sort((a, b) => a - b), positions, 'cards follow the data order');
});

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** "Feb 2025 – Jun 2026" -> 2025.08 (start date as a sortable number) */
function startOf(period) {
  const [, month, year] = period.match(/^([A-Z][a-z]{2}) (\d{4})/);
  return Number(year) + MONTHS.indexOf(month) / 12;
}

test('projects are listed in chronological order, oldest first', () => {
  const starts = projects.map((project) => startOf(project.period));
  assert.deepEqual([...starts].sort((a, b) => a - b), starts);
});

test('every project link points to a page that is actually generated', () => {
  for (const project of projects.filter((p) => p.caseStudy)) {
    const target = resolveUrl('index.html', project.caseStudy).target;
    assert.ok(target in pages, `${project.id}: case study ${project.caseStudy} is not generated`);
  }
  const projectLinks = findTags(home, 'a').filter((a) => a.href?.includes('projects/'));
  for (const { href } of projectLinks) {
    assert.ok(resolveUrl('index.html', href).target in pages, `home links to ${href}, which is not generated`);
  }
});

test('every case-study page links back to the home page', () => {
  for (const project of projects.filter((p) => p.caseStudy)) {
    const route = resolveUrl('index.html', project.caseStudy).target;
    const backLinks = findTags(pages[route], 'a').filter((a) => resolveUrl(route, a.href).target === 'index.html');
    assert.ok(backLinks.length > 0, `${route} has no link back home`);
  }
});
