// Custom migration for the v22 badge breaking change.
//
// The badge `colorScheme` input was renamed to `accentColor` and its type
// `NxBadgeColorScheme` to `NxBadgeAccentColor`. The template attribute rename is handled
// declaratively (see `badgeInputNameChanges` in `../data/input-names.ts`, scoped to
// `nx-badge`); this migration only covers the TypeScript type rename, which the declarative
// data cannot express.
//
// We simply rewrite every identifier named `NxBadgeColorScheme`, regardless of how it was
// imported. Because a namespace-qualified reference such as `badge.NxBadgeColorScheme` carries
// `NxBadgeColorScheme` as its own identifier node (which the tree walk visits), this single
// check covers named imports, aliased imports (`{ NxBadgeColorScheme as Foo }` — only the real
// name is touched), type-position usages (`let x: NxBadgeColorScheme`) and namespace imports
// alike. String literals are left untouched since they are not identifiers.
//
// Tradeoff: a consumer who happens to define their own unrelated `NxBadgeColorScheme` symbol
// (from a non-ng-aquila package) would also be renamed. Given the `Nx`-prefixed, library-specific
// name this collision is very unlikely, and the codemod output is reviewed by the consumer, so
// this leniency is intentional.

import { Migration, TargetVersion } from '@angular/cdk/schematics';
import { Identifier, isIdentifier, Node } from 'typescript';

const OLD_TYPE = 'NxBadgeColorScheme';
const NEW_TYPE = 'NxBadgeAccentColor';

export class BadgeAccentColorMigration extends Migration<null> {
  enabled = this.targetVersion === TargetVersion.V22;

  override visitNode(node: Node): void {
    if (isIdentifier(node) && node.text === OLD_TYPE) {
      this._renameIdentifier(node);
    }
  }

  private _renameIdentifier(identifier: Identifier): void {
    const filePath = this.fileSystem.resolve(identifier.getSourceFile().fileName);
    this.fileSystem
      .edit(filePath)
      .remove(identifier.getStart(), identifier.getWidth())
      .insertRight(identifier.getStart(), NEW_TYPE);
  }
}
