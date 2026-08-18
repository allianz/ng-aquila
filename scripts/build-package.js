import { execSync } from 'child_process';
import fs from 'fs-extra';
import chalk from 'chalk';

import { buildPackageThemes } from './build-package-themes.js';
import { buildPackageSchematics } from './build-package-schematics.js';

/**
 * Script to build and copy all necessary files for the
 * library dist package that is outside of the Angular CLI Build.
 * Full build used by build:lib / build / CI / releases. Includes:
 * + build css (build-package-themes.js)
 * + build schematics + copy the files (build-package-schematics.js)
 * + copy scss sources
 * + build mcp
 *
 * Invoked via build:package:full. For local dev/test, use the narrower
 * build:package:themes / build:package:schematics scripts instead of this
 * full build.
 */

buildPackageThemes();

buildPackageSchematics();

console.log('============================');
console.log('  Copying scss sources');
fs.copy(`projects/ng-aquila/src/shared-styles/theming`, `dist/ng-aquila/styles`);

console.log('============================');
console.log('  Copying other assets');
fs.copy('README.md', 'dist/ng-aquila/README.md');
fs.copy('LICENSE', 'dist/ng-aquila/LICENSE');

console.log('============================');
console.log('  Building MCP (generate resources, compile typescript and copying resources)');
try {
  execSync('npm run mcp:init', { stdio: 'inherit' });
} catch (err) {
  console.error(chalk.bold.red('Error during MCP build process.'));
  console.error(chalk.red(err));
  process.exit(1);
}
console.log('');
