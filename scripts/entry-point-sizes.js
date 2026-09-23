import { gzipSync } from 'zlib';
import fs from 'fs-extra';
import path from 'path';
import glob from 'glob';

/**
 * Reports and compares the gzip size of every built entry point bundle and stylesheet.
 *
 *   report <dist-dir>... [--out=<sizes.json>]
 *     Measures every bundle and stylesheet under the given directories and prints a table of
 *     raw and gzip sizes, largest first. With `--out`, also writes the numbers as JSON for a
 *     later `diff` to read.
 *
 *   diff --before=<sizes_before.json> --after=<sizes_after.json>
 *     Prints a before/after/change table from two `report` JSONs -- only the files whose size
 *     moved, the big movers marked `!` -- and names the baseline it compared against. Reporting
 *     only, no pass/fail: a size change is information for the reviewer, not something the
 *     script has an opinion about.
 *
 */

/**
 * Gzip bytes a file has to move, in either direction, to be marked `!`. Absolute rather than a
 * percent because the download cost is what matters: 5 kB is 5 kB whether it lands on a 1 kB entry
 * point or a 40 kB one, where a percent makes the small one look alarming and lets the large one
 * pass unmarked. Purely a reading aid -- nothing branches on it, so moving it cannot make CI pass
 * or fail.
 */
const NOTABLE_BYTES = 5 * 1024;

/** ng-packagr flattens each entry point to `<flat-package-name>-<entry-point>.mjs`. */
const PREFIX = 'allianz-ng-aquila-';

function fail(message) {
  console.error(message);
  process.exit(1);
}

/**
 * Minimal `--flag=value` parser. Later flags win, so a wrapper npm script's flags can be
 * overridden on the command line; the positional is a list, so extra directories passed after
 * `npm run sizes --` are measured *in addition to* the ones the script supplies. Unknown flags
 * are rejected rather than ignored: a typo like `--baselne=x` would otherwise leave the real flag
 * unset and surface far from the mistake.
 */
function parseFlags(argv, spec, defaults, { positional = null } = {}) {
  const options = { ...defaults };

  for (const arg of argv) {
    if (!arg.startsWith('--')) {
      if (!positional) {
        fail(`Unexpected argument: ${arg}`);
      }
      options[positional].push(arg);
      continue;
    }

    const [name, ...rest] = arg.split('=');
    if (!spec.includes(name)) {
      fail(`Unknown argument: ${arg}\nExpected one of ${spec.join(', ')}`);
    }
    const value = rest.join('=');
    if (value === '') {
      fail(`${name} needs a value, as ${name}=<value>`);
    }
    options[name.replace(/^--/, '')] = value;
  }

  return options;
}

function formatBytes(bytes) {
  const sign = bytes < 0 ? '-' : '';
  const magnitude = Math.abs(bytes);
  if (magnitude < 1024) {
    return `${sign}${magnitude} B`;
  }
  return `${sign}${(magnitude / 1024).toFixed(1)} kB`;
}

function formatPercent(percent) {
  if (!Number.isFinite(percent)) {
    return 'new';
  }
  // An em dash rather than "0.0%" for what did not move, which after the changed-only filter is
  // just the total row. A tiny non-zero change still renders as "+0.0%", which reads correctly as
  // "grew, but barely".
  if (percent === 0) {
    return '—';
  }
  return `${percent > 0 ? '+' : ''}${percent.toFixed(1)}%`;
}

/**
 * Right-aligns every column but the first. Widths come from the content, so a long entry point
 * name cannot push the numbers out of alignment.
 */
function printTable(header, rows) {
  const all = [header, ...rows];
  const widths = header.map((_, column) =>
    Math.max(...all.map((row) => String(row[column] ?? '').length)),
  );
  const line = (row) =>
    row
      .map((cell, column) =>
        column === 0
          ? String(cell ?? '').padEnd(widths[column])
          : String(cell ?? '').padStart(widths[column]),
      )
      .join('  ')
      .trimEnd();

  console.log(line(header));
  for (const row of rows) {
    console.log(line(row));
  }
}

/** Github action publishes a step output. A no-op outside Actions. */
function setActionsOutput(name, value) {
  const file = process.env.GITHUB_OUTPUT;
  if (!file) {
    return;
  }
  fs.appendFileSync(file, `${name}=${value}\n`);
}

// --- report ------------------------------------------------------------------------------

/**
 * Names a measured file, keyed on the file type rather than on where it sits.
 *
 * `.mjs` is the bare entry point name (`datefield`): ng-packagr's flat names are unique by
 * construction, the `allianz-ng-aquila-` prefix carries no information when all 95 share it, and
 * keeping the key means an older baseline JSON still diffs against a new report instead of
 * reporting 95 removals and 95 additions.
 *
 * `.css` is its path relative to the scanned root (`themes/aquila.css`,
 * `css/compatibility/legacy.css`), which groups the stylesheets in the sorted table and shows the
 * nesting. Every such name contains a `/` and ends in `.css`, so the two families cannot collide.
 */
function nameFor(root, file) {
  if (file.endsWith('.css')) {
    return path.relative(root, file).replace(/\\/g, '/');
  }
  return path
    .basename(file, '.mjs')
    .replace(new RegExp(`^${PREFIX}`), '')
    .replace(/^allianz-ng-aquila$/, 'ng-aquila');
}

function collectSizes(roots) {
  const sizes = {};

  for (const root of roots) {
    if (!fs.existsSync(root)) {
      fail(`No such directory: ${root}. Run "npm run build:lib" first.`);
    }

    // Both globs recurse, so pointing at the package root is enough and a newly added output
    // folder is measured rather than silently going unwatched. Nothing else in the package matches:
    // the rest is `.d.ts`, `.mjs.map`, per-entry-point `package.json` and copied `.scss` sources.
    const files = [...glob.sync(`${root}/**/*.mjs`), ...glob.sync(`${root}/**/*.css`)].sort();
    if (files.length === 0) {
      fail(`No *.mjs or *.css files in ${root}. Run "npm run build:lib" first.`);
    }

    for (const file of files) {
      const name = nameFor(root, file);
      // Loud rather than a silently overwritten row. The way this happens is a second directory of
      // flat bundles appearing (an `esm2022/` beside `fesm2022/`), which would need a naming rule
      // decision, not a guess.
      if (sizes[name]) {
        fail(`Two files measured as "${name}"; the last was ${file}`);
      }
      const contents = fs.readFileSync(file);
      sizes[name] = { raw: contents.length, gzip: gzipSync(contents).length };
    }
  }

  return sizes;
}

/**
 * `report <dist-dir>... [--out=<sizes.json>]`
 *
 * Measures the given directories and prints the table on stdout, sorted by gzip size so the
 * expensive entry points are at the top, with a `total` row last. The table is always printed;
 * `--out` additionally writes `{ generatedAt, commit, sizes }` for `diff` to consume. The
 * "written to" confirmation goes to stderr, keeping stdout to just the table for CI to publish.
 */
function report(argv) {
  const options = parseFlags(argv, ['--out'], { roots: [], out: null }, { positional: 'roots' });

  if (options.roots.length === 0) {
    fail('Usage: entry-point-sizes.js report <package-dir>... [--out=<path>]');
  }

  // Normalised once, so a trailing slash cannot reach the glob. glob wants forward slashes even
  // on Windows, hence the separator swap rather than path.normalize.
  const roots = options.roots.map((dir) => dir.replace(/\\/g, '/').replace(/\/+$/, ''));
  const sizes = collectSizes(roots);

  const rows = Object.entries(sizes).sort((a, b) => b[1].gzip - a[1].gzip);
  const total = rows.reduce(
    (sum, [, size]) => ({ raw: sum.raw + size.raw, gzip: sum.gzip + size.gzip }),
    { raw: 0, gzip: 0 },
  );

  printTable(
    ['file', 'raw', 'gzip'],
    [
      ...rows.map(([name, size]) => [name, formatBytes(size.raw), formatBytes(size.gzip)]),
      ['total', formatBytes(total.raw), formatBytes(total.gzip)],
    ],
  );
  console.log('');
  console.log(`${rows.length} files in ${roots.join(', ')}`);

  if (options.out) {
    fs.ensureDirSync(path.dirname(options.out));
    fs.writeJsonSync(
      options.out,
      {
        generatedAt: new Date().toISOString(),
        // Recording the commit is what makes a surprising delta diagnosable later -- a baseline
        // is usually from some earlier main commit, not the pull request's merge base.
        commit: process.env.GITHUB_SHA ?? null,
        sizes,
      },
      { spaces: 2 },
    );
    console.error(`Sizes written to ${options.out}`);
  }
}

// --- diff --------------------------------------------------------------------------------

/** Reads a sizes JSON. Missing or malformed is fatal -- there is nothing to fall back to. */
function readSizes(file) {
  if (!fs.existsSync(file)) {
    fail(`No sizes file at ${file}. Write one with "report <package-dir>... --out=${file}".`);
  }

  let parsed;
  try {
    parsed = fs.readJsonSync(file);
  } catch (error) {
    fail(`Could not read ${file}: ${error.message}`);
  }
  if (!parsed || typeof parsed.sizes !== 'object' || parsed.sizes === null) {
    fail(`${file} is not a sizes file (no "sizes" key)`);
  }
  return parsed;
}

/** Compares two size maps on gzip. Added and removed files are reported as `new` / `removed`. */
function computeDiff(before, after) {
  const names = [...new Set([...Object.keys(before), ...Object.keys(after)])];
  const rows = [];

  for (const name of names) {
    const a = before[name]?.gzip ?? null;
    const b = after[name]?.gzip ?? null;

    if (a === null) {
      rows.push({ name, status: 'new', before: null, after: b, delta: b, percent: Infinity });
    } else if (b === null) {
      rows.push({ name, status: 'removed', before: a, after: null, delta: -a, percent: -100 });
    } else {
      const delta = b - a;
      const percent = a === 0 ? Infinity : (delta / a) * 100;
      rows.push({
        name,
        status: delta > 0 ? 'grew' : delta < 0 ? 'shrank' : 'same',
        before: a,
        after: b,
        delta,
        percent,
      });
    }
  }

  // Biggest movement first; equal movements keep a stable alphabetical order rather than whatever
  // the name union produced.
  rows.sort((x, y) => Math.abs(y.delta) - Math.abs(x.delta) || x.name.localeCompare(y.name));

  const sum = (key) => rows.reduce((t, row) => t + (row[key] ?? 0), 0);
  const totalBefore = sum('before');
  const totalAfter = sum('after');

  return {
    rows,
    // The whole library is ~100 entry points and a pull request moves a handful, so the table
    // reports only those; the totals row still covers everything measured.
    changed: rows.filter((row) => row.status !== 'same'),
    // Every status included: `delta` is a real byte count for an added or removed file too, which
    // is the point of measuring in bytes rather than in a percent those two cannot have.
    notable: rows.filter((row) => Math.abs(row.delta) >= NOTABLE_BYTES),
    totals: {
      before: totalBefore,
      after: totalAfter,
      percent: totalBefore === 0 ? Infinity : ((totalAfter - totalBefore) / totalBefore) * 100,
    },
  };
}

/**
 * `diff --before=<sizes.json> --after=<sizes.json>`
 *
 * Compares two `report` JSONs on gzip size and prints the table on stdout: only the files whose
 * size moved, biggest movement first, added/removed/shrunk files included, anything past
 * NOTABLE_BYTES marked `!`, then a summary line and the baseline's provenance. Under Actions it
 * also sets `has-changes`.
 */
function diffCommand(argv) {
  const options = parseFlags(argv, ['--before', '--after'], { before: null, after: null });

  if (!options.before || !options.after) {
    fail('Usage: entry-point-sizes.js diff --before=<sizes.json> --after=<sizes.json>');
  }

  const before = readSizes(options.before);
  const after = readSizes(options.after);
  const diff = computeDiff(before.sizes, after.sizes);
  const marked = new Set(diff.notable.map((row) => row.name));

  printTable(
    ['file', 'before', 'after', 'change', ''],
    [
      ...diff.changed.map((row) => [
        row.name,
        row.before === null ? '—' : formatBytes(row.before),
        row.after === null ? '—' : formatBytes(row.after),
        row.status === 'removed' ? 'removed' : formatPercent(row.percent),
        marked.has(row.name) ? '!' : '',
      ]),
      [
        'total',
        formatBytes(diff.totals.before),
        formatBytes(diff.totals.after),
        formatPercent(diff.totals.percent),
        '',
      ],
    ],
  );

  console.log('');
  // The count of what was left out, so a short table reads as "nothing else moved" rather than
  // "the other rows went missing".
  const unchanged = diff.rows.length - diff.changed.length;
  if (diff.changed.length === 0) {
    console.log(`No file changed size; all ${unchanged} measured file(s) are unchanged.`);
  } else {
    const big = diff.notable.length
      ? `, ${diff.notable.length} by ${formatBytes(NOTABLE_BYTES)} or more (marked !)`
      : '';
    console.log(
      `${diff.changed.length} file(s) changed size${big}. ${unchanged} unchanged file(s) not shown.`,
    );
  }

  // A baseline written outside Actions has no commit, so fall back to its timestamp rather than
  // claiming a provenance it does not have.
  const provenance = before.commit
    ? `commit ${before.commit.slice(0, 7)}`
    : `${before.generatedAt.replace('T', ' ').slice(0, 16)} UTC`;
  console.log(`Compared against ${path.basename(options.before)} (${provenance}).`);

  // One output, because the workflow only ever needs the yes/no: it publishes this report
  // verbatim rather than composing its own message, and the count is already in the text above.
  setActionsOutput('has-changes', diff.changed.length > 0);
}

// --- dispatch ----------------------------------------------------------------------------

const [operation, ...argv] = process.argv.slice(2);

if (operation === 'report') {
  report(argv);
} else if (operation === 'diff') {
  diffCommand(argv);
} else {
  fail(
    [
      operation ? `Unknown operation: ${operation}` : 'No operation given',
      '',
      'Usage:',
      '  report <dist-dir>... [--out=<sizes.json>]',
      '      Print raw and gzip sizes of every bundle and stylesheet found in given directory.',
      '      --out also writes them as JSON, for diff to compare later.',
      '',
      '  diff --before=<sizes.json> --after=<sizes.json>',
      '      Compare two of those JSONs; lists only the files whose size changed, and marks',
      `      a change of ${formatBytes(NOTABLE_BYTES)} or more with !.`,
    ].join('\n'),
  );
}
