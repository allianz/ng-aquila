import { Rule, Tree } from '@angular-devkit/schematics';

/**
 * Migration schematic to replace 'iban' with 'ibantools' in package.json
 */
export default function replaceIbanjsInPackageJson(): Rule {
  return (tree: Tree) => {
    const pkgPath = '/package.json';
    if (!tree.exists(pkgPath)) {
      return tree;
    }
    const pkgBuffer = tree.read(pkgPath);
    if (!pkgBuffer) {
      return tree;
    }
    const pkg = JSON.parse(pkgBuffer.toString('utf-8'));

    let changed = false;
    // Remove 'iban' from dependencies
    if (pkg.dependencies && pkg.dependencies['iban']) {
      delete pkg.dependencies['iban'];
      changed = true;
    }
    // Remove 'iban' from devDependencies
    if (pkg.devDependencies && pkg.devDependencies['iban']) {
      delete pkg.devDependencies['iban'];
      changed = true;
    }
    // Add 'ibantools' if not present
    if (pkg.dependencies && !pkg.dependencies['ibantools']) {
      pkg.dependencies['ibantools'] = '^4.5.1';
      changed = true;
    }
    if (changed) {
      tree.overwrite(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
    }
    return tree;
  };
}
