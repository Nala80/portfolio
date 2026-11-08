// Case studies read as a story of the process, not as a list of findings:
// prose chapters, a process line that links to them, and no bullet lists.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { projects } from '../src/data/projects.js';
import { findTags, pages, resolveUrl } from './helpers.js';

const caseStudyRoutes = projects
  .filter((project) => project.caseStudy)
  .map((project) => resolveUrl('index.html', project.caseStudy).target);

/** The <main> element's HTML. */
const mainOf = (html) => html.slice(html.indexOf('<main'), html.indexOf('</main>'));

for (const route of caseStudyRoutes) {
  const main = mainOf(pages[route]);

  test(`${route} tells the story in prose, without bullet lists`, () => {
    // Topic lines, key figures and the process line are lists in the markup
    // but read as a line of text or numbers, not as bullets.
    const withoutInlineLists = main
      .replace(/<ul class="tag-list"[\s\S]*?<\/ul>/g, '')
      .replace(/<ul class="stats[\s\S]*?<\/ul>/g, '')
      .replace(/<nav class="flow"[\s\S]*?<\/nav>/g, '');
    assert.doesNotMatch(withoutInlineLists, /<li\b/, 'no bullet or numbered lists in the content');
  });

  test(`${route} has a process line that links to every chapter`, () => {
    const flow = main.slice(main.indexOf('<nav class="flow"'), main.indexOf('</nav>', main.indexOf('<nav class="flow"')));
    const targets = findTags(flow, 'a').map((a) => a.href.slice(1));
    assert.ok(targets.length >= 3, 'at least three steps');
    for (const id of targets) {
      assert.match(main, new RegExp(`<section class="section chapter" id="${id}"`), `chapter #${id} exists`);
    }
  });

  test(`${route} uses no numbered labels`, () => {
    assert.doesNotMatch(main, />\s*0\d\s*</, 'no "01"-style labels');
  });
}
