// Minimal static file server for previewing dist/ locally.
// Behaves like GitHub Pages for the cases this site needs: directory URLs
// serve index.html and "/projects/nlr" redirects to "/projects/nlr/".
//
// Usage: node scripts/serve.mjs   (PORT=4000 to change the port)

import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const PORT = Number(process.env.PORT) || 3000;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
};

function send(res, status, body, headers = {}) {
  res.writeHead(status, { 'Content-Type': 'text/plain; charset=utf-8', ...headers });
  res.end(body);
}

const server = createServer(async (req, res) => {
  let pathname;
  try {
    pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  } catch {
    return send(res, 400, 'Bad request');
  }

  const filePath = path.join(ROOT, pathname);
  if (filePath !== ROOT && !filePath.startsWith(ROOT + path.sep)) {
    return send(res, 403, 'Forbidden');
  }

  try {
    let target = filePath;
    const info = await stat(target);
    if (info.isDirectory()) {
      if (!pathname.endsWith('/')) {
        return send(res, 301, 'Moved', { Location: `${pathname}/` });
      }
      target = path.join(target, 'index.html');
    }
    const body = await readFile(target);
    const type = MIME_TYPES[path.extname(target).toLowerCase()] ?? 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': type, 'Cache-Control': 'no-store' });
    res.end(body);
  } catch {
    send(res, 404, 'Not found');
  }
});

server.listen(PORT, () => {
  console.log(`Serving dist/ at http://localhost:${PORT}/  (Ctrl+C to stop)`);
});
