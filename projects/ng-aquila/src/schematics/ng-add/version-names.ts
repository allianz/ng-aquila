import { Tree } from '@angular-devkit/schematics';

import { addPackageToPackageJson } from './package-config';

export const aquilaVersion = loadPackageVersionGracefully('@aposin/ng-aquila');

// fetch the version defined in modules
function loadPackageVersionGracefully(packageName: string): string | null {
    try {
        return require(`${packageName}/package.json`).version;
    } catch {
        return null;
    }
}

export function installAllPeerDependencies(tree: Tree): void {
    // key/value pair: package name/version
    try {
        const peerDependencies = require(`@aposin/ng-aquila/package.json`).peerDependencies;
        for (const packageName in peerDependencies) {
            if ({}.hasOwnProperty.call(peerDependencies, packageName)) {
                addPackageToPackageJson(tree, packageName, peerDependencies[packageName]);
            }
        }
    } catch (e) {
        // we reuse ng-add in unit tests. this should never fail when run with the angular cli
        // as the library package will be downloaded before hand.
        console.warn('WARNING NG-AQUILA PACKAGE AND PACKAGE.JSON NOT FOUND IS IT RUNNING IN TESTS?');
    }
}
