import { execFileSync } from 'child_process';
import os from 'os';
import path from 'path';
import fs from 'fs-extra';
import { rimrafSync } from 'rimraf';
import chalk from 'chalk';

/**
 * Verifies the public Sass utilities shipped at `@allianz/ng-aquila/styles/utils`.
 *
 * Run after `npm run build:lib`. Nothing in this repository compiles the copied scss tree, so a
 * broken `@use` specifier in `dist` would otherwise only surface in a consumer's build.
 */

const DIST = 'dist/ng-aquila';
const UTILS_DIR = `${DIST}/styles/utils`;
const EXPECTED_FILES = ['_index.scss', 'breakpoints.scss', 'grid.scss'];
const SASS_CLI = path.resolve('node_modules/sass/sass.js');

const failures = [];

function check(description, fn) {
  try {
    fn();
    console.log(`  ${chalk.green('✓')} ${description}`);
  } catch (error) {
    failures.push({ description, error });
    console.log(`  ${chalk.red('✗')} ${description}`);
    console.log(`    ${chalk.red(error.message)}`);
  }
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

/** Compiles `source` against the package and returns { css } or { error }. */
function compileFixture(consumerRoot, source) {
  const entry = path.join(consumerRoot, 'fixture.scss');
  fs.writeFileSync(entry, source);
  try {
    const css = execFileSync(
      process.execPath,
      [
        SASS_CLI,
        '--no-source-map',
        `--load-path=${path.join(consumerRoot, 'node_modules')}`,
        entry,
      ],
      { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] },
    );
    return { css };
  } catch (error) {
    return { error: `${error.stderr ?? ''}${error.stdout ?? ''}` };
  }
}

console.log('============================');
console.log('  Testing styles package');

assert(
  fs.existsSync(UTILS_DIR),
  `${UTILS_DIR} does not exist - run "npm run build:lib" before this script.`,
);

// Keep the public surface explicit. A stray addition would silently create another supported
// deep-import path.
check(`${UTILS_DIR} contains exactly the expected files`, () => {
  const actual = fs.readdirSync(UTILS_DIR).sort();
  assert(
    JSON.stringify(actual) === JSON.stringify([...EXPECTED_FILES].sort()),
    `expected [${EXPECTED_FILES.join(', ')}] but found [${actual.join(', ')}]`,
  );
});

// The pre-existing theming entry point must keep working.
check('styles/theming.scss is still packaged', () => {
  assert(fs.existsSync(`${DIST}/styles/theming.scss`), `${DIST}/styles/theming.scss is missing`);
});

// Resolve the package the way a consumer does: through node_modules, under its scoped name.
const consumerRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'ng-aquila-styles-'));
const packageDir = path.join(consumerRoot, 'node_modules', '@allianz', 'ng-aquila');

try {
  fs.ensureDirSync(path.dirname(packageDir));
  fs.copySync(DIST, packageDir);

  check('the public entry point compiles and emits the expected queries', () => {
    const { css, error } = compileFixture(
      consumerRoot,
      `@use '@allianz/ng-aquila/styles/utils' as aquila;

.a {
  @include aquila.media-breakpoint-up(medium) { color: red; }
}
.b {
  @include aquila.media-breakpoint-down(medium) { color: green; }
}
.c {
  @include aquila.container-breakpoint-up(large) { color: blue; }
}
.d {
  @include aquila.media-breakpoint-between(medium, large) { color: purple; }
}
.e {
  @include aquila.media-breakpoint-only(medium) { color: orange; }
}
.f {
  @include aquila.container-breakpoint-down(medium) { color: black; }
}
`,
    );
    assert(!error, `compilation failed:\n${error}`);
    assert(css.includes('@media (min-width: 704px)'), `missing min-width query in:\n${css}`);
    assert(css.includes('@media (max-width: 991px)'), `missing max-width query in:\n${css}`);
    assert(css.includes('@container (min-width: 992px)'), `missing container query in:\n${css}`);
    assert(
      css.includes('@media (min-width: 704px) and (max-width: 1279px)'),
      `missing between query in:\n${css}`,
    );
    assert(
      css.includes('@media (min-width: 704px) and (max-width: 991px)'),
      `missing only query in:\n${css}`,
    );
    assert(
      css.includes('@container (max-width: 991px)'),
      `missing container max-width query in:\n${css}`,
    );
  });

  check('the public functions and grid variables are forwarded by the entry point', () => {
    const { css, error } = compileFixture(
      consumerRoot,
      `@use '@allianz/ng-aquila/styles/utils' as aquila;
@use '@allianz/ng-aquila/styles/utils/grid' as grid;
@use 'sass:map';

@if aquila.breakpoint-next(unknown) != null {
  @error 'Expected an unknown breakpoint to have no successor.';
}

.a {
  min-width: aquila.breakpoint-min(medium);
  max-width: aquila.breakpoint-max(medium);
  --next: #{aquila.breakpoint-next(medium)};
  --infix: #{aquila.breakpoint-infix(medium)};
  --short: #{map.get(aquila.$grid-breakpoints-short, m)};
  --columns: #{aquila.$grid-columns};
  --gutter: #{map.get(aquila.$grid-gutter-widths, small)};
  --gutter-large: #{grid.$grid-gutter-width-large};
  --gutter-base: #{grid.$grid-gutter-width-base};
  --gutter-mobile: #{grid.$grid-gutter-width-mobile};
}
`,
    );
    assert(!error, `compilation failed:\n${error}`);
    assert(css.includes('min-width: 704px'), `missing breakpoint-min result in:\n${css}`);
    assert(css.includes('max-width: 991px'), `missing breakpoint-max result in:\n${css}`);
    assert(css.includes('--next: large'), `missing breakpoint-next result in:\n${css}`);
    assert(css.includes('--infix: -medium'), `missing breakpoint-infix result in:\n${css}`);
    assert(css.includes('--short: 704px'), `missing short breakpoint value in:\n${css}`);
    assert(css.includes('--columns: 12'), `missing grid column count in:\n${css}`);
    assert(
      css.includes('--gutter: var(--grid-gutter-width-mobile, 16px)'),
      `missing grid gutter value in:\n${css}`,
    );
    assert(
      css.includes('--gutter-large: var(--grid-gutter-width-large, 32px)'),
      `missing large grid gutter in:\n${css}`,
    );
    assert(
      css.includes('--gutter-base: var(--grid-gutter-width-base, 32px)'),
      `missing base grid gutter in:\n${css}`,
    );
    assert(
      css.includes('--gutter-mobile: var(--grid-gutter-width-mobile, 16px)'),
      `missing mobile grid gutter in:\n${css}`,
    );
  });

  // The internal wrapper must not be published at all.
  check('the internal breakpoint.scss wrapper is not published', () => {
    const { error } = compileFixture(
      consumerRoot,
      `@use '@allianz/ng-aquila/styles/utils/breakpoint' as bp;`,
    );
    assert(error, 'expected the import to fail, but it compiled');
    assert(/Can't find stylesheet/i.test(error), `expected a resolution error, got:\n${error}`);
  });

  // Defense in depth: bypass the entry point, import the real shipped dependency directly, and
  // confirm the legacy mixin is genuinely absent. Asserting on the *specific* error keeps a typo in
  // the fixture from passing this check.
  check('respond-to is unreachable through the shipped breakpoints.scss', () => {
    const { error } = compileFixture(
      consumerRoot,
      `@use '@allianz/ng-aquila/styles/utils/breakpoints' as bp;

.a { @include bp.respond-to('medium') { color: red; } }
`,
    );
    assert(error, 'expected respond-to to be undefined, but the fixture compiled');
    assert(/Undefined mixin/i.test(error), `expected an "Undefined mixin" error, got:\n${error}`);
    assert(
      !/Can't find stylesheet/i.test(error),
      `the fixture failed to resolve the stylesheet instead of proving respond-to is absent:\n${error}`,
    );
  });
} finally {
  rimrafSync(consumerRoot);
}

if (failures.length > 0) {
  console.log('');
  console.error(chalk.bold.red(`${failures.length} styles package check(s) failed.`));
  process.exit(1);
}

console.log(chalk.green('  All styles package checks passed.'));
