import { chain, Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import { ProjectDefinition, updateWorkspace } from '@schematics/angular/utility';

function addNewPackage(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const pkgPath = '/package.json';
    if (!tree.exists(pkgPath)) {
      return tree;
    }
    const pkgBuffer = tree.read(pkgPath);
    if (!pkgBuffer) {
      return tree;
    }
    const pkg = JSON.parse(pkgBuffer.toString());
    pkg.dependencies = pkg.dependencies || {};
    if (!pkg.dependencies['@allianz/ng-aquila']) {
      pkg.dependencies['@allianz/ng-aquila'] = '^20.0.0';
    }
    tree.overwrite(pkgPath, JSON.stringify(pkg, null, 2));
    context.addTask(new NodePackageInstallTask());
    return tree;
  };
}

function removeOldPackage(): Rule {
  return (tree: Tree) => {
    const pkgPath = '/package.json';
    if (!tree.exists(pkgPath)) {
      return tree;
    }
    const pkgBuffer = tree.read(pkgPath);
    if (!pkgBuffer) {
      return tree;
    }
    const pkg = JSON.parse(pkgBuffer.toString());
    if (pkg.dependencies && pkg.dependencies['@allianz/ng-aquila']) {
      delete pkg.dependencies['@allianz/ng-aquila'];
    }
    tree.overwrite(pkgPath, JSON.stringify(pkg, null, 2));
    return tree;
  };
}

function updateAngularJsonImports(): Rule {
  return async (tree, context) =>
    updateWorkspace((workspace) => {
      workspace.projects.forEach((project: ProjectDefinition) => {
        project.targets.forEach((target) => {
          ['styles', 'assets'].forEach((assetType) => {
            const stylesOrAssets = target.options?.[assetType];
            if (Array.isArray(stylesOrAssets)) {
              stylesOrAssets.forEach((style, index: number) => {
                if (typeof style === 'string') {
                  stylesOrAssets[index] = style.replace('@allianz/ng-aquila', '@allianz/ng-aquila');
                } else if (style && typeof style === 'object' && (style as any).input) {
                  const styleCopy = { ...style };
                  (styleCopy as any).input = (style as any).input.replace(
                    '@allianz/ng-aquila',
                    '@allianz/ng-aquila',
                  );
                  stylesOrAssets[index] = styleCopy;
                }
              });
            }
          });
        });
      });
    });
}

export default function (): Rule {
  return chain([removeOldPackage(), addNewPackage(), updateAngularJsonImports()]);
}
