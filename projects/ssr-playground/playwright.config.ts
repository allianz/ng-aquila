import { defineConfig, devices } from '@playwright/test';

const baseURL = process.env['PLAYWRIGHT_TEST_BASE_URL'] ?? process.env['SSR_PLAYGROUND_URL'];
if (!baseURL) {
  throw new Error(
    'No base URL. With `ng e2e` this means `ng serve` failed to start: see its error above. To test a server you started yourself, set SSR_PLAYGROUND_URL.',
  );
}

export default defineConfig({
  testDir: './e2e',
  testMatch: '*.e2e.ts',
  outputDir: '../../dist/ssr-playground-e2e/test-results',
  fullyParallel: true,
  forbidOnly: !!process.env['CI'],
  reporter: process.env['CI']
    ? [
        ['github'],
        ['list'],
        ['html', { open: 'never', outputFolder: '../../dist/ssr-playground-e2e/report' }],
      ]
    : 'list',
  globalTeardown: './e2e/global-teardown.ts',
  use: {
    // `ng e2e` sets PLAYWRIGHT_TEST_BASE_URL; SSR_PLAYGROUND_URL points the test at a running server.
    baseURL,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        launchOptions: { executablePath: process.env['CHROME_BIN'] || undefined },
      },
    },
  ],
});
