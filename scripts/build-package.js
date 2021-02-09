const { execSync } = require('child_process');
const cpx = require('cpx');
const { promisify } = require('util');
const rimraf = promisify(require('rimraf'));
const { opensourceThemes } = require('./themes.js');

/**
 * Script to build and copy all necessary files for the
 * library dist package that is outside of the Angular CLI Build
 * Includes:
 * + build schematics + copy the files
 * + build css
 * + copy scss sources
 */


function compileTheme(theme) {
  execSync(`sass --no-source-map projects/ng-aquila/src/shared-styles/theming/prebuilt/${theme}.scss dist/ng-aquila/themes/${theme}.css`, { stdio: 'inherit' });
}


function compileSchematics() {
  rimraf.sync('./dist/ng-aquila/schematics');

  execSync(`tsc -p ./projects/ng-aquila/tsconfig.schematics.json`, {stdio: 'inherit'});
  console.log('Copying schematic assets');
  cpx.copySync('./projects/ng-aquila/src/schematics/**/*.json', './dist/ng-aquila/schematics')
}

console.log("====================");
console.log("  Building themes");
opensourceThemes.forEach(theme => {
  compileTheme(theme);
});

console.log("========================");
console.log("  Building utility css");
['utilities', 'normalize', 'compatibility'].forEach(file => {
    execSync(`sass --no-source-map projects/ng-aquila/src/shared-styles/${file}.scss dist/ng-aquila/css/${file}.css`, {stdio: 'inherit'});
})

console.log("========================");
console.log("  Building schematics");
compileSchematics()

console.log("========================");
console.log("  Copying scss sources");
cpx.copy(`projects/ng-aquila/src/shared-styles/theming/**/*`, `dist/ng-aquila/styles`);

console.log("========================");
console.log("  Copying other assets");
cpx.copy('README.md', 'dist/ng-aquila');
cpx.copy('LICENSE', 'dist/ng-aquila');
