// Custom migration for the Angular CDK update tool.
// The `@allianz/ng-aquila/config/allianz-one` entry point was removed:
//
//   - `ALLIANZ_ONE` and `AllianzOneOptions` moved to the dedicated token entry
//     point `@allianz/ng-aquila/config/allianz-one/token`.
//     This is a behaviour-preserving path swap, so it is migrated automatically.
//   - `NxAllianzOneModule` was dropped from open source ng-aquila entirely. A1
//     activation now lives in ngx-brand-kit as `NxA1ThemeModule`
//     (`@allianz/ngx-brand-kit/config`). The import is rewritten in place — the
//     symbol is renamed and the path swapped — but this is NOT a 1:1 swap: the
//     ngx-brand-kit module applies a larger set of A1 defaults.

import { Migration, TargetVersion } from '@angular/cdk/schematics';
import {
  ImportDeclaration,
  isImportDeclaration,
  isNamedImports,
  NamedImports,
  Node,
  StringLiteral,
} from 'typescript';

/** Entry point that was removed. */
export const OLD_ENTRY_POINT = '@allianz/ng-aquila/config/allianz-one';
/** Entry point the token and interface are now live in. */
export const TOKEN_ENTRY_POINT = '@allianz/ng-aquila/config/allianz-one/token';
/** Entry point A1 theme activation now lives in (ngx-brand-kit). */
export const A1_THEME_ENTRY_POINT = '@allianz/ngx-brand-kit/config';

/** The removed module symbol and its ngx-brand-kit replacement. */
export const REMOVED_MODULE_SYMBOL = 'NxAllianzOneModule';
export const REPLACEMENT_MODULE_SYMBOL = 'NxA1ThemeModule';

export class MoveAllianzOneTokenImportMigration extends Migration<null> {
  enabled = this.targetVersion === TargetVersion.V22;

  override visitNode(node: Node): void {
    if (isImportDeclaration(node)) {
      this._visitImportDeclaration(node);
    }
  }

  private _visitImportDeclaration(node: ImportDeclaration): void {
    const moduleSpecifier = node.moduleSpecifier as StringLiteral;

    // Match the old entry point exactly so we don't touch the `/token` path or
    // unrelated deeper sub-paths.
    if (moduleSpecifier.text !== OLD_ENTRY_POINT) {
      return;
    }

    const namedBindings = node.importClause?.namedBindings;

    // The entry point only ever exposed named exports. Anything else (a default or namespace import) can't be reasoned about, so flag it for a manual fix.
    if (!namedBindings || !isNamedImports(namedBindings)) {
      this.createFailureAtNode(node, this._removalMessage());
      return;
    }

    // If the removed `NxAllianzOneModule` is imported, we update the entry point and variable name.
    const importsRemovedModule = namedBindings.elements.some(
      (element) => (element.propertyName ?? element.name).text === REMOVED_MODULE_SYMBOL,
    );
    if (importsRemovedModule) {
      this._replaceModuleName(node, moduleSpecifier);
      return;
    }

    // Token-only import (`ALLIANZ_ONE` / `AllianzOneOptions`): a safe path swap.
    this._replaceModuleSpecifier(moduleSpecifier);
  }

  /** Swaps only the module path string, keeping quotes and spacing intact. */
  private _replaceModuleSpecifier(moduleSpecifier: StringLiteral): void {
    const filePath = this.fileSystem.resolve(moduleSpecifier.getSourceFile().fileName);
    this.fileSystem
      .edit(filePath)
      // +1 to skip the opening quote character.
      .remove(moduleSpecifier.getStart() + 1, OLD_ENTRY_POINT.length)
      .insertRight(moduleSpecifier.getStart() + 1, TOKEN_ENTRY_POINT);
  }

  /**
   * Rewrites a `NxAllianzOneModule` import in place: renames the symbol to
   * `NxA1ThemeModule` and swaps the path to the ngx-brand-kit config entry point.
   */
  private _replaceModuleName(node: ImportDeclaration, moduleSpecifier: StringLiteral): void {
    const elements = (node.importClause!.namedBindings as NamedImports).elements;
    const index = elements.findIndex(
      (element) => (element.propertyName ?? element.name).text === REMOVED_MODULE_SYMBOL,
    );
    const element = elements[index];
    const identifier = element.propertyName ?? element.name;

    // If mixed imports are used, we want to remove it from the import statement and add the new module name in the new line instead.
    const isMixedImport = elements.length > 1;
    const filePath = this.fileSystem.resolve(moduleSpecifier.getSourceFile().fileName);
    if (isMixedImport) {
      // Remove the old symbol together with its adjacent comma so we don't leave a dangling `{, ...}` or `{..., }` behind.
      let removeStart: number;
      let removeEnd: number;
      if (index === 0) {
        // First element: consume the trailing comma/whitespace up to the next element.
        removeStart = element.getStart();
        removeEnd = elements[index + 1].getStart();
      } else {
        // Later element: consume the leading comma/whitespace from the previous element.
        removeStart = elements[index - 1].getEnd();
        removeEnd = element.getEnd();
      }
      this.fileSystem
        .edit(filePath)
        .remove(removeStart, removeEnd - removeStart)
        .remove(moduleSpecifier.getStart() + 1, OLD_ENTRY_POINT.length)
        .insertRight(moduleSpecifier.getStart() + 1, TOKEN_ENTRY_POINT)
        .insertRight(
          moduleSpecifier.getEnd() + 1,
          `\nimport { ${REPLACEMENT_MODULE_SYMBOL} } from '${A1_THEME_ENTRY_POINT}';`,
        );
    } else {
      this.fileSystem
        .edit(filePath)
        .remove(identifier.getStart(), REMOVED_MODULE_SYMBOL.length)
        .insertRight(identifier.getStart(), REPLACEMENT_MODULE_SYMBOL)
        // +1 to skip the opening quote character.
        .remove(moduleSpecifier.getStart() + 1, OLD_ENTRY_POINT.length)
        .insertRight(moduleSpecifier.getStart() + 1, A1_THEME_ENTRY_POINT);
    }
  }

  /** Message pointing the developer at both replacement targets. */
  private _removalMessage(): string {
    return (
      `The "${OLD_ENTRY_POINT}" entry point was removed. ` +
      `Import "ALLIANZ_ONE"/"AllianzOneOptions" from "${TOKEN_ENTRY_POINT}". ` +
      `"${REMOVED_MODULE_SYMBOL}" no longer exists — activate A1 with ` +
      `"${REPLACEMENT_MODULE_SYMBOL}" or "provideA1Theme()" from "${A1_THEME_ENTRY_POINT}" ` +
      `(note these apply additional defaults beyond the old module).`
    );
  }
}
