import { execSync } from 'child_process';
import fs from 'fs-extra';
import { rimrafSync } from 'rimraf';
import glob from 'glob';
import { pathToFileURL } from 'url';

/**
 * Compiles the schematics dist output consumed by the schematics tests
 * (spec_dir in projects/ng-aquila/src/schematics/test/jasmine.json) and by
 * the published package. Kept independent of the theme/MCP build steps.
 */

function globCopy(sourcePath, destinationPath, globPath) {
  const files = glob.sync(sourcePath + globPath, null);
  files.forEach((src) => {
    const file = src.replace(sourcePath, '');
    fs.copySync(sourcePath + file, destinationPath + file);
  });
}

export function buildPackageSchematics() {
  console.log('============================');
  console.log('  Building schematics');
  rimrafSync('./dist/ng-aquila/schematics');

  execSync(`tsc -p ./projects/ng-aquila/tsconfig.schematics.json`, { stdio: 'inherit' });

  console.log('============================');
  console.log('  Copying schematic assets');
  globCopy('./projects/ng-aquila/src/schematics', './dist/ng-aquila/schematics', '/**/*.json');
  globCopy('./projects/ng-aquila/src/schematics', './dist/ng-aquila/schematics', '/*/files/**');
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  buildPackageSchematics();
}
