// Custom migration for the v22 avatar `attention` -> `prominence` breaking change.
//
// The boolean `attention` input was replaced by the string `prominence` input
// (`NxAvatarProminence` = `'subtle' | 'attention'`, default `'subtle'`). This is not
// expressible via the declarative `input-names` data because the value changes, not
// just the attribute name. The rewrites below are scoped to elements carrying the
// `nxAvatar` attribute so we never touch the identically named inputs on other
// components (e.g. `nx-icon`, `nx-badge`):
//
//   [attention]="true"   ->  prominence="attention"
//   attention (bare)     ->  prominence="attention"
//   [attention]="false"  ->  (removed — `subtle` is the new default)
//   [attention]="expr"   ->  [prominence]="(expr) ? 'attention' : 'subtle'" (+ warning)
//
// For the dynamic case we can only preserve behaviour with a ternary; a warning is
// emitted so the consumer can simplify the expression to the new `NxAvatarProminence`
// value if they prefer.

import {
  Migration,
  parse5,
  ResolvedResource,
  TargetVersion,
  WorkspacePath,
} from '@angular/cdk/schematics';

const AVATAR_ATTR = 'nxavatar';
const ATTENTION_ATTR = 'attention';
const ATTENTION_BINDING = '[attention]';

type Parse5Node = parse5.DefaultTreeAdapterMap['node'];
type Parse5Element = parse5.DefaultTreeAdapterMap['element'];

export class AvatarProminenceMigration extends Migration<null> {
  enabled = this.targetVersion === TargetVersion.V22;

  override visitTemplate(template: ResolvedResource): void {
    const fragment = parse5.parseFragment(template.content, { sourceCodeLocationInfo: true });
    this._forEachAvatarAttentionAttr(fragment, (element, attrName) => {
      this._migrateAttribute(template, element, attrName);
    });
  }

  /** Walks the fragment, invoking the callback for every `attention` attribute on an avatar element. */
  private _forEachAvatarAttentionAttr(
    root: Parse5Node,
    callback: (element: Parse5Element, attrName: string) => void,
  ): void {
    const visit = (node: Parse5Node): void => {
      if ('tagName' in node && this._isAvatar(node)) {
        for (const attr of node.attrs) {
          if (attr.name === ATTENTION_ATTR || attr.name === ATTENTION_BINDING) {
            callback(node, attr.name);
          }
        }
      }
      if ('childNodes' in node) {
        node.childNodes.forEach(visit);
      }
    };
    visit(root);
  }

  private _isAvatar(element: Parse5Element): boolean {
    return element.attrs.some((attr) => attr.name === AVATAR_ATTR);
  }

  private _migrateAttribute(
    template: ResolvedResource,
    element: Parse5Element,
    attrName: string,
  ): void {
    const location = element.sourceCodeLocation?.attrs?.[attrName];
    if (!location) {
      return;
    }

    const attr = element.attrs.find((a) => a.name === attrName)!;
    const value = attr.value.trim();
    const isBinding = attrName === ATTENTION_BINDING;
    const absoluteStart = template.start + location.startOffset;
    const length = location.endOffset - location.startOffset;

    // `[attention]="false"` -> drop the attribute; `subtle` is the new default.
    if (isBinding && value === 'false') {
      const whitespaceStart = this._precedingWhitespaceStart(
        template.content,
        location.startOffset,
      );
      this.fileSystem
        .edit(template.filePath)
        .remove(template.start + whitespaceStart, location.endOffset - whitespaceStart);
      return;
    }

    // Bare `attention` / `[attention]="true"` -> `prominence="attention"`.
    if (!isBinding || value === 'true') {
      this._replace(template.filePath, absoluteStart, length, `prominence="attention"`);
      return;
    }

    // Dynamic `[attention]="expr"` -> preserve behaviour with a ternary and warn.
    this._replace(
      template.filePath,
      absoluteStart,
      length,
      `[prominence]="(${value}) ? 'attention' : 'subtle'"`,
    );
    const { line, character } = template.getCharacterAndLineOfPosition(location.startOffset);
    this.logger.warn(
      `${template.filePath}:${line + 1}:${character + 1} - The avatar "attention" input was ` +
        `replaced by "prominence" (NxAvatarProminence = 'subtle' | 'attention'). The dynamic ` +
        `binding was rewritten to a ternary; consider simplifying it to bind a prominence value directly.`,
    );
  }

  private _replace(
    filePath: WorkspacePath,
    start: number,
    length: number,
    replacement: string,
  ): void {
    this.fileSystem.edit(filePath).remove(start, length).insertRight(start, replacement);
  }

  /** Returns the offset of the whitespace run immediately preceding the given offset. */
  private _precedingWhitespaceStart(content: string, offset: number): number {
    let start = offset;
    while (start > 0 && /\s/.test(content[start - 1])) {
      start--;
    }
    return start;
  }
}
