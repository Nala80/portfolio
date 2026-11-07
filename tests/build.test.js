import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { mkdtemp, rm } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from '../scripts/build.mjs';

const PUBLIC_DIR = fileURLToPath(new URL('../public', import.meta.url));

const EXPECTED_ROUTES = ['index.html', 'projects/nlr/index.html', 'projects/price/index.html'];

test('the build writes every page, the stylesheet and the public assets to the output folder', async () => {
  const outDir = await mkdtemp(path.join(os.tmpdir(), 'portfolio-build-'));
  try {
    const routes = await build({ outDir });
    for (const route of EXPECTED_ROUTES) {
      assert.ok(routes.includes(route), `${route} is part of the build`);
    }
    for (const route of routes) {
      const file = path.join(outDir, ...route.split('/'));
      assert.ok(existsSync(file), `${route} was written`);
      assert.match(readFileSync(file, 'utf8'), /^<!doctype html>/i, `${route} is an HTML document`);
    }
    assert.ok(existsSync(path.join(outDir, 'assets', 'site.css')), 'stylesheet bundle exists');
    const publicFiles = readdirSync(PUBLIC_DIR, { recursive: true })
      .map(String)
      .filter((name) => statSync(path.join(PUBLIC_DIR, name)).isFile() && path.basename(name) !== '.gitkeep');
    for (const name of publicFiles) {
      assert.ok(existsSync(path.join(outDir, name)), `public/${name} is copied as-is`);
    }
  } finally {
    await rm(outDir, { recursive: true, force: true });
  }
});
