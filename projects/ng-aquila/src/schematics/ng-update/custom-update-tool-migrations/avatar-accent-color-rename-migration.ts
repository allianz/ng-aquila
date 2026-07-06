// Custom migration for the v22 avatar `NxAvatarAccent` -> `NxAvatarAccentColor`
// type rename.
//
// The declarative CDK `classNames` data only rewrites identifiers that are
// imported from `@angular/material` / `@angular/cdk` (see
// `@angular/cdk/schematics/ng-update/typescript/module-specifiers`), so it cannot
// touch `@allianz/ng-aquila` symbols. This custom migration rewrites the type
// reference, guarded on the identifier originating from an `@allianz/ng-aquila`
// import so we never rename an unrelated, identically named symbol.

import { Migration, TargetVersion } from '@angular/cdk/schematics';
import {
  ImportDeclaration,
  isIdentifier,
  isImportDeclaration,
  isNamedImports,
  Node,
  SourceFile,
  StringLiteral,
} from 'typescript';

const AQUILA_MODULE = '@allianz/ng-aquila';
const OLD_NAME = 'NxAvatarAccent';
const NEW_NAME = 'NxAvatarAccentColor';

export class AvatarAccentColorRenameMigration extends Migration<null> {
  enabled = this.targetVersion === TargetVersion.V22;

  /** Caches, per source file, whether it imports `NxAvatarAccent` from `@allianz/ng-aquila`. */
  private readonly _filesImportingSymbol = new Map<string, boolean>();

  override visitNode(node: Node): void {
    if (!isIdentifier(node) || node.text !== OLD_NAME) {
      return;
    }

    // Only rewrite identifiers in files that actually import the symbol from
    // `@allianz/ng-aquila`. This keeps a same-named local symbol untouched.
    if (!this._importsSymbolFromAquila(node.getSourceFile())) {
      return;
    }

    const filePath = this.fileSystem.resolve(node.getSourceFile().fileName);
    this.fileSystem
      .edit(filePath)
      .remove(node.getStart(), node.getWidth())
      .insertRight(node.getStart(), NEW_NAME);
  }

  private _importsSymbolFromAquila(sourceFile: SourceFile): boolean {
    const cached = this._filesImportingSymbol.get(sourceFile.fileName);
    if (cached !== undefined) {
      return cached;
    }

    const imported = sourceFile.statements.some(
      (statement) =>
        isImportDeclaration(statement) &&
        (statement.moduleSpecifier as StringLiteral).text.includes(AQUILA_MODULE) &&
        this._importClauseHasSymbol(statement),
    );

    this._filesImportingSymbol.set(sourceFile.fileName, imported);
    return imported;
  }

  private _importClauseHasSymbol(node: ImportDeclaration): boolean {
    const namedBindings = node.importClause?.namedBindings;
    if (!namedBindings || !isNamedImports(namedBindings)) {
      return false;
    }
    // Matches both `import { NxAvatarAccent }` and aliased `import { NxAvatarAccent as X }`.
    return namedBindings.elements.some(
      (element) => element.name.text === OLD_NAME || element.propertyName?.text === OLD_NAME,
    );
  }
}
