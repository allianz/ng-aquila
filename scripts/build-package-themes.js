import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs-extra';
import { themes } from './themes.js';

import { fileURLToPath, pathToFileURL } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Compiles the theme and utility CSS consumed directly by ng serve/ng test
 * (karma.conf.js loads dist/ng-aquila/css/normalize.css and
 * dist/ng-aquila/themes/aquila.css). Kept independent of the schematics
 * and MCP build steps so local dev/test don't pay for those.
 */

export function compileTheme(theme) {
  execSync(
    `sass --no-source-map projects/ng-aquila/src/shared-styles/theming/prebuilt/${theme}.scss dist/ng-aquila/themes/${theme}.css`,
    {
      stdio: 'inherit',
    },
  );
}

export function compileAgGridTheme() {
  let nodeModulesPath = 'node_modules';
  // little trick to build it correctly when it is used as a git submodule
  if (fs.existsSync('../node_modules/ag-grid-community')) {
    nodeModulesPath = '../node_modules';
  }
  ['ag-theme-aquila', 'theming-api-aquila'].forEach((file) => {
    execSync(
      `sass --no-source-map --load-path=${nodeModulesPath} projects/ng-aquila/src/ag-grid/${file}.scss dist/ng-aquila/themes/${file}.css`,
      {
        stdio: 'inherit',
      },
    );
  });
}

export function buildPackageThemes() {
  console.log('============================');
  console.log('  Building themes');
  themes.opensourceThemes.forEach((theme) => {
    compileTheme(theme);
  });
  console.log('  Building ag-grid theme');
  compileAgGridTheme();

  console.log('============================');
  console.log('  Building utility css');
  ['utilities', 'normalize', 'compatibility'].forEach((file) => {
    execSync(
      `sass --no-source-map projects/ng-aquila/src/shared-styles/${file}.scss dist/ng-aquila/css/${file}.css`,
      { stdio: 'inherit' },
    );
  });
  try {
    fs.readdirSync(
      path.join(__dirname, '../projects/ng-aquila/src/shared-styles/compatibility'),
      {},
    )
      .map((file) => file.replace('.scss', ''))
      .forEach((file) => {
        execSync(
          `sass --no-source-map projects/ng-aquila/src/shared-styles/compatibility/${file}.scss dist/ng-aquila/css/compatibility/${file}.css`,
          {
            stdio: 'inherit',
          },
        );
      });
  } catch (e) {
    // suppress error if the optional compatibility folder does not exist
    if (e.code !== 'ENOENT') {
      console.error(e);
      throw e;
    }
  }
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  buildPackageThemes();
}
