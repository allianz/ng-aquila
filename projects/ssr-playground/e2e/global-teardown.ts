import type { FullConfig } from '@playwright/test';

// A component throwing from a timer after its render was sent escapes the `ErrorHandler`, so no page
// can report it. server.ts collects those errors and serves them here.
export default async function globalTeardown(config: FullConfig) {
  const baseURL = config.projects[0].use.baseURL;
  const errors: string[] = await (await fetch(new URL('/__ssr-playground/errors', baseURL))).json();
  if (errors.length > 0) {
    throw new Error(
      `The SSR server reported ${errors.length} error(s) outside a render:\n\n${errors.join('\n\n')}`,
    );
  }
}
