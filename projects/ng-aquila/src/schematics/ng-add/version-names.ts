import { addPackageToPackageJson } from './package-config';
import { Tree } from '@angular-devkit/schematics';

export const aquilaVersion = loadPackageVersionGracefully('@aposin/ng-aquila');

// fetch the version defined in modules
function loadPackageVersionGracefully(packageName: string): string | null {
  try {
    return require(`${packageName}/package.json`).version;
  } catch {
    return null;
  }
}

export function installAllPeerDependencies(host: Tree) {
  // key/value pair: package name/version
  try {
    const peerDependencies = require(`@aposin/ng-aquila/package.json`).peerDependencies;
    for (const packageName in peerDependencies) {
      if (peerDependencies.hasOwnProperty(packageName)) {
        addPackageToPackageJson(host, packageName, peerDependencies[packageName]);
      }
    }
  } catch (e) {
    // we reuse ng-add in unit tests. this should never fail when run with the angular cli
    // as the library package will be downloaded before hand.
    console.log('WARNING NG-AQUILA PACKAGE AND PACKAGE.JSON NOT FOUND IS IT RUNNING IN TESTS?');
  }

}
