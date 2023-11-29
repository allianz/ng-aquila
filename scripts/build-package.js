const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs-extra');
const { rimrafSync } = require('rimraf');
const { opensourceThemes } = require('./themes.js');
const glob = require('glob');

/**
 * Script to build and copy all necessary files for the
 * library dist package that is outside of the Angular CLI Build
 * Includes:
 * + build schematics + copy the files
 * + build css
 * + copy scss sources
 */

function compileTheme(theme) {
    execSync(`sass --no-source-map projects/ng-aquila/src/shared-styles/theming/prebuilt/${theme}.scss dist/ng-aquila/themes/${theme}.css`, {
        stdio: 'inherit',
    });
}

function compileAgGridTheme() {
    let nodeModulesPath = 'node_modules';
    // little trick to build it correctly when it is used as a git submodule
    if (fs.existsSync('../node_modules/ag-grid-community')) {
        nodeModulesPath = '../node_modules';
    }
    execSync(
        `sass --no-source-map --load-path=${nodeModulesPath} projects/ng-aquila/src/ag-grid/ag-theme-aquila.scss dist/ng-aquila/themes/ag-theme-aquila.css`,
        {
            stdio: 'inherit',
        },
    );
}

function globCopy(sourcePath, destinationPath, globPath) {
    const files = glob.sync(sourcePath + globPath, null);
    files.forEach(src => {
        const file = src.replace(sourcePath, '');
        fs.copySync(sourcePath + file, destinationPath + file);
    });
}

function compileSchematics() {
    rimrafSync('./dist/ng-aquila/schematics');

    execSync(`tsc -p ./projects/ng-aquila/tsconfig.schematics.json`, { stdio: 'inherit' });
    console.log('============================');
    console.log('  Copying schematic assets');
    globCopy('./projects/ng-aquila/src/schematics', './dist/ng-aquila/schematics', '/**/*.json');
}

console.log('============================');
console.log('  Building themes');
opensourceThemes.forEach(theme => {
    compileTheme(theme);
});
console.log('  Building ag-grid theme');
compileAgGridTheme();

console.log('============================');
console.log('  Building utility css');
['utilities', 'normalize', 'compatibility'].forEach(file => {
    execSync(`sass --no-source-map projects/ng-aquila/src/shared-styles/${file}.scss dist/ng-aquila/css/${file}.css`, { stdio: 'inherit' });
});
try {
    fs.readdirSync(path.join(__dirname, '../projects/ng-aquila/src/shared-styles/compatibility'), {})
        .map(file => file.replace('.scss', ''))
        .forEach(file => {
            execSync(`sass --no-source-map projects/ng-aquila/src/shared-styles/compatibility/${file}.scss dist/ng-aquila/css/compatibility/${file}.css`, {
                stdio: 'inherit',
            });
        });
} catch (e) {
    // suppress error if the optional compatibility folder does not exist
    if (e.code !== 'ENOENT') {
        console.error(e);
    }
}

console.log('============================');
console.log('  Building schematics');
compileSchematics();

console.log('============================');
console.log('  Copying scss sources');
fs.copy(`projects/ng-aquila/src/shared-styles/theming`, `dist/ng-aquila/styles`);

console.log('============================');
console.log('  Copying other assets');
fs.copy('README.md', 'dist/ng-aquila/README.md');
fs.copy('LICENSE', 'dist/ng-aquila/LICENSE');
globCopy('./projects/ng-aquila/src/schematics', './dist/ng-aquila/schematics', '/*/files/**');

console.log('============================');
console.log('');
