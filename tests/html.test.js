import { test } from 'node:test';
import assert from 'node:assert/strict';
import { escapeHtml, html, raw } from '../src/components/html.js';

test('escapeHtml escapes the five HTML special characters', () => {
  assert.equal(escapeHtml(`<a href="x">Tom & Jerry's</a>`), '&lt;a href=&quot;x&quot;&gt;Tom &amp; Jerry&#39;s&lt;/a&gt;');
});

test('html escapes interpolated strings but keeps nested html as-is', () => {
  const inner = html`<em>${'<b>'}</em>`;
  assert.equal(html`<p>${inner}</p>`.toString(), '<p><em>&lt;b&gt;</em></p>');
});

test('html joins arrays and skips null, undefined and false', () => {
  const items = ['a', 'b'].map((item) => html`<li>${item}</li>`);
  assert.equal(html`<ul>${items}${null}${undefined}${false}</ul>`.toString(), '<ul><li>a</li><li>b</li></ul>');
});

test('html renders numbers and raw() output without escaping them', () => {
  assert.equal(html`${0} ${1.5} ${raw('&nbsp;')}`.toString(), '0 1.5 &nbsp;');
});
