// Custom migration for the v22 rename of the text entry point's accent color
// component. `NxAttentionColorComponent` became `NxAccentColorComponent`, its
// selector `[nx-attention-color]` became `[nx-accent-color]`, and the exported
// `NxAttentionColorOption` type / `NX_ATTENTION_COLOR_VALUES` const were renamed
// accordingly. The `@allianz/ng-aquila/text` entry point name is unchanged.
//
// The declarative CDK data files cannot express this rename:
//
//   1. The `classNames` migration only rewrites identifiers imported from
//      `@angular/material` / `@angular/cdk` (hardcoded module specifiers), so it
//      never fires for `@allianz/ng-aquila` imports. We rename the three exported
//      identifiers here instead. Rather than anchoring on the import, we rewrite
//      every occurrence of the old identifier text: the three names all carry
//      Aquila's `Nx`/`NX_` prefix and are globally unique — no unrelated symbol
//      embeds them — so a raw-token rename is collision-free and, unlike import
//      anchoring, also covers namespace member access (`text.NxAttentionColorOption`),
//      named re-exports (`export { NxAttentionColorOption } from ...`), and aliased
//      imports without any per-file bookkeeping.
//
//   2. The selector and the `nx-attention-color--negative` modifier class share
//      the `nx-attention-color` prefix. Splitting them across the `attributeSelectors`
//      and `cssSelectors` data files makes both passes edit the same offset and
//      corrupt the file. A single substring replacement of `nx-attention-color`
//      handles both cleanly: the modifier is a superstring, so replacing the
//      prefix yields `nx-accent-color--negative`, and each occurrence is rewritten
//      exactly once. The `nx-` prefix keeps the string unambiguous — it does not
//      appear in the retained `color-attention-*` design tokens.

import {
  findAllSubstringIndices,
  Migration,
  ResolvedResource,
  TargetVersion,
  WorkspacePath,
} from '@angular/cdk/schematics';
import { Identifier, isIdentifier, isStringLiteralLike, Node } from 'typescript';

/**
 * Exported identifier renames (old name -> new name). A `Map` is used rather
 * than a plain object so a lookup for an identifier that happens to collide
 * with an `Object.prototype` member (`toString`, `constructor`, ...) returns
 * `undefined` instead of the inherited native method.
 */
const IDENTIFIER_RENAMES = new Map<string, string>([
  ['NxAttentionColorComponent', 'NxAccentColorComponent'],
  ['NxAttentionColorOption', 'NxAccentColorOption'],
  ['NX_ATTENTION_COLOR_VALUES', 'NX_ACCENT_COLOR_VALUES'],
]);

/** Selector / modifier-class substring rename (old -> new). */
const SELECTOR_REPLACE = 'nx-attention-color';
const SELECTOR_REPLACE_WITH = 'nx-accent-color';

export class AttentionColorRenameMigration extends Migration<null> {
  enabled = this.targetVersion === TargetVersion.V22;

  override visitNode(node: Node): void {
    if (isIdentifier(node)) {
      this._visitIdentifierReference(node);
    } else if (isStringLiteralLike(node)) {
      this._visitSelectorInStringLiteral(node);
    }
  }

  override visitTemplate(template: ResolvedResource): void {
    this._replaceSelectorOccurrences(template.filePath, template.start, template.content);
  }

  override visitStylesheet(stylesheet: ResolvedResource): void {
    this._replaceSelectorOccurrences(stylesheet.filePath, stylesheet.start, stylesheet.content);
  }

  /**
   * Renames every occurrence of a renamed identifier. The old names are globally
   * unique `Nx`/`NX_`-prefixed tokens, so matching on raw text covers plain
   * references, import/export specifiers, aliased-import module-side names, and
   * namespace member access without touching any unrelated symbol.
   */
  private _visitIdentifierReference(identifier: Identifier): void {
    const newName = IDENTIFIER_RENAMES.get(identifier.text);
    if (!newName) {
      return;
    }
    const filePath = this.fileSystem.resolve(identifier.getSourceFile().fileName);
    this.fileSystem
      .edit(filePath)
      .remove(identifier.getStart(), identifier.getWidth())
      .insertRight(identifier.getStart(), newName);
  }

  /** Rewrites the selector inside any string literal (e.g. `querySelector('[nx-attention-color]')`). */
  private _visitSelectorInStringLiteral(node: Node): void {
    const filePath = this.fileSystem.resolve(node.getSourceFile().fileName);
    findAllSubstringIndices(node.getText(), SELECTOR_REPLACE)
      .map((offset) => node.getStart() + offset)
      .forEach((start) => this._replaceSelectorAt(filePath, start));
  }

  /** Rewrites every selector/modifier occurrence in a template or stylesheet. */
  private _replaceSelectorOccurrences(
    filePath: WorkspacePath,
    baseStart: number,
    content: string,
  ): void {
    findAllSubstringIndices(content, SELECTOR_REPLACE)
      .map((offset) => baseStart + offset)
      .forEach((start) => this._replaceSelectorAt(filePath, start));
  }

  private _replaceSelectorAt(filePath: WorkspacePath, start: number): void {
    this.fileSystem
      .edit(filePath)
      .remove(start, SELECTOR_REPLACE.length)
      .insertRight(start, SELECTOR_REPLACE_WITH);
  }
}
