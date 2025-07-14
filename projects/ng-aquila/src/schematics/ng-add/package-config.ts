/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { Tree } from '@angular-devkit/schematics';

/**
 * Sorts the keys of the given object.
 * @returns A new object instance with sorted keys.
 */
function sortObjectByKeys(obj: any) {
  return Object.entries(obj)
    .sort()
    .reduce((result: any, [key, value]) => (result[key] = value) && result, {});
}

/** Adds a package to the package.json in the given host tree. */
export function addPackageToPackageJson(tree: Tree, pkg: string, version: string): Tree {
  if (tree.exists('package.json')) {
    const sourceText = tree.read('package.json')!.toString('utf-8');
    const json = JSON.parse(sourceText);

    if (!json.dependencies) {
      json.dependencies = {};
    }

    if (!json.dependencies[pkg]) {
      json.dependencies[pkg] = version;
      json.dependencies = sortObjectByKeys(json.dependencies);
    }

    tree.overwrite('package.json', JSON.stringify(json, null, 2));
  }

  return tree;
}

/** Gets the version of the specified package by looking at the package.json in the given tree. */
export function getPackageVersionFromPackageJson(tree: Tree, name: string): string | null {
  if (!tree.exists('package.json')) {
    return null;
  }

  const packageJson = JSON.parse(tree.read('package.json')!.toString('utf8'));

  if (packageJson.dependencies?.[name]) {
    return packageJson.dependencies[name];
  }

  return null;
}
