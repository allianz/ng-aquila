// this is a custom migration schematic for the Angular CDK migration tool
// there is a separate one to update things like the angular.json

import { findAllSubstringIndices, Migration, ResolvedResource, TargetVersion, WorkspacePath } from '@angular/cdk/schematics';
import { ImportDeclaration, isImportDeclaration, Node, StringLiteral } from 'typescript';

export const OLD_APOSIN_MODULE = '@aposin/ng-aquila';
export const NEW_AQUILA_MODULE = '@allianz/ng-aquila';

export class PackageImportMigration extends Migration<null> {
    enabled = this.targetVersion === TargetVersion.V20;

    override visitNode(node: Node): void {
        if (isImportDeclaration(node)) {
            this._visitImportDeclaration(node);
        }
    }
    private _visitImportDeclaration(node: ImportDeclaration) {
        const module = (node.moduleSpecifier as StringLiteral).text;

        if (!module.includes(OLD_APOSIN_MODULE)) {
            return;
        }
        this.logger.info('visit import declaration: ' + module);
        this._updateImport(node.moduleSpecifier as StringLiteral);
    }

    private _updateImport(moduleSpecifier: StringLiteral) {
        const filePath = this.fileSystem.resolve(moduleSpecifier.getSourceFile().fileName);

        this.fileSystem
            .edit(filePath)
            .remove(moduleSpecifier.getStart() + 1, OLD_APOSIN_MODULE.length)
            .insertRight(moduleSpecifier.getStart() + 1, NEW_AQUILA_MODULE);
    }

    override visitStylesheet(stylesheet: ResolvedResource): void {
        findAllSubstringIndices(stylesheet.content, OLD_APOSIN_MODULE)
            .map(offset => stylesheet.start + offset)
            .forEach(start => this._replaceCssImport(stylesheet.filePath, start));
    }
    private _replaceCssImport(filePath: WorkspacePath, start: number): void {
        this.fileSystem.edit(filePath).remove(start, OLD_APOSIN_MODULE.length).insertRight(start, NEW_AQUILA_MODULE);
    }
}
