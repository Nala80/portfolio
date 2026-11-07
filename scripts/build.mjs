// Generates the static site into dist/.
//
//   1. copy public/ as-is (images, favicon, later the CNAME file)
//   2. bundle src/styles/*.css into dist/assets/site.css (files are concatenated
//      in filename order, which is why they carry a numeric prefix)
//   3. render every page from src/site.js and write it to dist/<route>
//
// Usage: node scripts/build.mjs [outDir]

import { cp, mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildSite } from '../src/site.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PUBLIC_DIR = path.join(ROOT, 'public');
const STYLES_DIR = path.join(ROOT, 'src', 'styles');

/** Concatenates all stylesheets in src/styles in filename order. */
export async function bundleCss() {
  let files = [];
  try {
    files = (await readdir(STYLES_DIR)).filter((file) => file.endsWith('.css')).sort();
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }
  const parts = await Promise.all(
    files.map(async (file) => `/* ${file} */\n${await readFile(path.join(STYLES_DIR, file), 'utf8')}`),
  );
  return parts.join('\n');
}

/** Builds the full site into `outDir` and returns the list of written pages. */
export async function build({ outDir = path.join(ROOT, 'dist') } = {}) {
  await rm(outDir, { recursive: true, force: true });
  await mkdir(outDir, { recursive: true });
  await cp(PUBLIC_DIR, outDir, { recursive: true, filter: (source) => path.basename(source) !== '.gitkeep' });

  await mkdir(path.join(outDir, 'assets'), { recursive: true });
  await writeFile(path.join(outDir, 'assets', 'site.css'), await bundleCss());

  const pages = buildSite();
  for (const [route, html] of Object.entries(pages)) {
    const file = path.join(outDir, ...route.split('/'));
    await mkdir(path.dirname(file), { recursive: true });
    await writeFile(file, html);
  }
  return Object.keys(pages);
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  const outDir = process.argv[2] ? path.resolve(process.argv[2]) : undefined;
  const routes = await build({ outDir });
  console.log(`Built ${routes.length} page(s) into ${path.relative(ROOT, outDir ?? path.join(ROOT, 'dist')) || '.'}:`);
  for (const route of routes) console.log(`  ${route}`);
}
