// Deployment guard rails: CI tests before it builds, and a custom-domain file,
// once added, is valid.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { PUBLIC_DIR, ROOT } from './helpers.js';

const workflow = readFileSync(path.join(ROOT, '.github', 'workflows', 'deploy.yml'), 'utf8');

test('CI runs the tests before building, and only deploys from main', () => {
  assert.ok(workflow.indexOf('npm test') > -1, 'runs npm test');
  assert.ok(workflow.indexOf('npm test') < workflow.indexOf('npm run build'), 'tests run before the build');
  assert.match(workflow, /needs: test/);
  assert.match(workflow, /needs: build/);
  assert.match(workflow, /if: github\.ref == 'refs\/heads\/main'/);
  assert.match(workflow, /path: dist/);
});

test('the project needs no npm install', () => {
  const pkg = JSON.parse(readFileSync(path.join(ROOT, 'package.json'), 'utf8'));
  assert.equal(pkg.dependencies, undefined, 'no runtime dependencies');
  assert.equal(pkg.devDependencies, undefined, 'no dev dependencies');
  assert.doesNotMatch(workflow, /npm (ci|install)/);
});

test('public/CNAME, if present, holds exactly one bare domain name', { skip: !existsSync(path.join(PUBLIC_DIR, 'CNAME')) }, () => {
  const content = readFileSync(path.join(PUBLIC_DIR, 'CNAME'), 'utf8').trim();
  assert.match(content, /^(?!-)[a-z0-9-]+(\.[a-z0-9-]+)+$/i, 'a domain such as nalawi.info, without https:// or a path');
});
