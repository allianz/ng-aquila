import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { createServer, IncomingMessage, ServerResponse } from 'node:http';
import { extname, join, normalize, resolve } from 'node:path';

import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  createWebRequestFromNodeRequest,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';

const BROWSER_DIST = resolve(import.meta.dirname, '../browser');

const MIME_TYPES: Readonly<{ [key: string]: string }> = {
  '.css': 'text/css',
  '.html': 'text/html',
  '.ico': 'image/x-icon',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.map': 'application/json',
  '.mjs': 'text/javascript',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
};

const angularApp = new AngularNodeAppEngine();

const serveStatic = async (req: IncomingMessage, res: ServerResponse): Promise<boolean> => {
  const pathname = new URL(req.url ?? '/', 'http://localhost').pathname;
  const filePath = join(BROWSER_DIST, normalize(pathname));
  if (!filePath.startsWith(BROWSER_DIST)) {
    return false;
  }

  try {
    const stats = await stat(filePath);
    if (!stats.isFile()) {
      return false;
    }
    res.writeHead(200, {
      'Content-Type': MIME_TYPES[extname(filePath)] ?? 'application/octet-stream',
      'Content-Length': stats.size,
    });
    const stream = createReadStream(filePath).pipe(res);
    stream.on('error', (err) => {
      console.error(`static read failed for ${filePath}: ${(err as Error).message}`);
      res.destroy(err);
    });
    stream.pipe(res);
    return true;
  } catch {
    return false;
  }
};

export const reqHandler = createNodeRequestHandler(async (req, res, next) => {
  if (await serveStatic(req, res)) {
    return;
  }

  const response = await angularApp.handle(createWebRequestFromNodeRequest(req));
  if (!response) {
    next();
    return;
  }

  await writeResponseToNodeResponse(response, res);
});

if (isMainModule(import.meta.url)) {
  const port = Number(process.env['PORT'] ?? 4000);
  createServer((req, res) => {
    reqHandler(req, res, () => {
      res.writeHead(404).end('Not found');
    });
  }).listen(port, () =>
    // The sweep is started against this port by hand, so the banner has to be visible on stdout.
    // eslint-disable-next-line no-console
    console.log(`SSR playground listening on http://localhost:${port}`),
  );
}

export default reqHandler;
