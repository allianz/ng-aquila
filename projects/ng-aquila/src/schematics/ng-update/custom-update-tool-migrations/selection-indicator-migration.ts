// Custom migration for the v22 selection-indicator (`nx-checkbox-indicator`,
// `nx-radio-indicator`) breaking changes.
// See https://github.developer.allianz.io/ilt/ng-aquila/pull/1898
//
// Three coupled changes are handled here that the declarative `input-names` data
// cannot express on its own:
//
//   1. The `appearance` input was renamed to `colorScheme`.
//   2. Its values changed: the old default `'full'` became `'default'`, so the type
//      `NxIndicatorAppearance = 'full' | 'on-selection'` became
//      `NxSelectionIndicatorColorScheme = 'default' | 'on-selection'`.
//   3. The boolean `defaultAppearance` input was removed. Previously the on-selection
//      styling only applied when `appearance === 'on-selection'` AND `defaultAppearance`
//      was falsy (see the old `:not(.default-appearance).on-selection` selector). So a
//      truthy `defaultAppearance` collapses the result back to `colorScheme="default"`.
//
// Templates: statically resolvable usages are rewritten automatically and the removed
// `defaultAppearance` attribute is dropped. Property bindings whose value cannot be read
// from the source (`[appearance]="expr"`, `[defaultAppearance]="expr"`) are left untouched
// and reported as failures so the consumer migrates them by hand.
//
// TypeScript: every `NxIndicatorAppearance` type identifier is renamed to
// `NxSelectionIndicatorColorScheme`. This covers named imports, namespace-qualified usages
// (`ng.NxIndicatorAppearance`) and re-exports (`export { NxIndicatorAppearance } from ...`).
// The trade-off is that an identically named symbol from unrelated code would also be
// renamed, which we accept given how specific the name is.

import { Migration, parse5, ResolvedResource, TargetVersion } from '@angular/cdk/schematics';
import { Identifier, isIdentifier, Node } from 'typescript';

const OLD_TYPE = 'NxIndicatorAppearance';
const NEW_TYPE = 'NxSelectionIndicatorColorScheme';

const INDICATOR_TAGS = ['nx-checkbox-indicator', 'nx-radio-indicator'];

/** Classification of the old `appearance` input on a single element. */
type AppearanceUsage =
  | { kind: 'absent' }
  | { kind: 'dynamic' }
  | { kind: 'static'; value: string; start: number; length: number; leadingWhitespace: string };

/** Classification of the old `defaultAppearance` input on a single element. */
type DefaultAppearanceUsage =
  | { kind: 'false' }
  | { kind: 'true' }
  | { kind: 'dynamic' }
  | { kind: 'static'; start: number; length: number; truthy: boolean };

export class SelectionIndicatorMigration extends Migration<null> {
  enabled = this.targetVersion === TargetVersion.V22;

  override visitNode(node: Node): void {
    if (isIdentifier(node) && node.text === OLD_TYPE) {
      this._renameIdentifier(node);
    }
  }

  override visitTemplate(template: ResolvedResource): void {
    this._migrateIndicatorAttributes(template);
  }

  // --- TypeScript type rename ------------------------------------------------

  private _renameIdentifier(identifier: Identifier): void {
    const filePath = this.fileSystem.resolve(identifier.getSourceFile().fileName);
    this.fileSystem
      .edit(filePath)
      .remove(identifier.getStart(), identifier.getWidth())
      .insertRight(identifier.getStart(), NEW_TYPE);
  }

  // --- Template attribute migration -----------------------------------------

  private _migrateIndicatorAttributes(template: ResolvedResource): void {
    for (const startTag of this._findIndicatorStartTags(template.content)) {
      const tagText = template.content.slice(startTag.start, startTag.end);
      const appearance = parseAppearance(tagText);
      const defaultAppearance = parseDefaultAppearance(tagText);

      if (appearance.kind === 'dynamic' || defaultAppearance.kind === 'dynamic') {
        const { line, character } = template.getCharacterAndLineOfPosition(startTag.start);
        this.failures.push({
          filePath: template.filePath,
          position: { line, character },
          message: this._dynamicMessage(),
        });
        continue;
      }

      // The on-selection color scheme only survives when appearance was explicitly
      // 'on-selection' AND defaultAppearance was not truthy; everything else is 'default'.
      const isOnSelection =
        appearance.kind === 'static' &&
        appearance.value === 'on-selection' &&
        defaultAppearance.kind !== 'true' &&
        !(defaultAppearance.kind === 'static' && defaultAppearance.truthy);
      const newScheme = isOnSelection ? 'on-selection' : 'default';

      const recorder = this.fileSystem.edit(template.filePath);

      // Drop the removed `defaultAppearance` attribute (only the static form carries a span;
      // the true/false binding forms are resolved above and also need removing).
      const defaultSpan = defaultAppearanceSpan(tagText, defaultAppearance);
      if (defaultSpan) {
        recorder.remove(template.start + startTag.start + defaultSpan.start, defaultSpan.length);
      }

      // Rewrite the `appearance` attribute to `colorScheme` with the mapped value. When the
      // attribute was absent the resolved scheme is always 'default' (the new input default),
      // so there is nothing to add.
      if (appearance.kind === 'static') {
        recorder.remove(template.start + startTag.start + appearance.start, appearance.length);
        recorder.insertRight(
          template.start + startTag.start + appearance.start,
          `${appearance.leadingWhitespace}colorScheme="${newScheme}"`,
        );
      }
    }
  }

  /** Finds the `<tag ...>` open-tag spans of every selection indicator in the template. */
  private _findIndicatorStartTags(content: string): { start: number; end: number }[] {
    const fragment = parse5.parseFragment(content, { sourceCodeLocationInfo: true });
    const spans: { start: number; end: number }[] = [];

    const visit = (node: parse5.DefaultTreeAdapterMap['node']): void => {
      if ('tagName' in node && INDICATOR_TAGS.includes(node.tagName)) {
        const startTag = node.sourceCodeLocation?.startTag;
        if (startTag) {
          spans.push({ start: startTag.startOffset, end: startTag.endOffset });
        }
      }
      if ('childNodes' in node) {
        node.childNodes.forEach(visit);
      }
    };

    fragment.childNodes.forEach(visit);
    return spans;
  }

  private _dynamicMessage(): string {
    return (
      `Found a selection indicator (${INDICATOR_TAGS.join(' / ')}) with a bound ` +
      `"[appearance]" and/or "[defaultAppearance]" input. The "appearance" input was renamed ` +
      `to "colorScheme" (values "full" -> "default", "on-selection" unchanged) and ` +
      `"defaultAppearance" was removed. Because the bound value cannot be resolved ` +
      `automatically, please update this usage manually: use colorScheme="on-selection" only ` +
      `when the old appearance was "on-selection" and defaultAppearance was falsy, otherwise ` +
      `colorScheme="default".`
    );
  }
}

/** A leading-whitespace-inclusive attribute matcher, so removals do not leave stray spaces. */
function matchAttribute(tagText: string, regex: RegExp): RegExpExecArray | null {
  return regex.exec(tagText);
}

/** Reads the old `appearance` input from a start-tag's text. */
function parseAppearance(tagText: string): AppearanceUsage {
  // Property binding — value is an Angular expression we cannot statically evaluate.
  if (/\[appearance\]\s*=/.test(tagText)) {
    return { kind: 'dynamic' };
  }
  // Static attribute `appearance="value"` (single or double quoted). The leading-whitespace
  // group is captured so it can be preserved on the rewritten attribute, and the negative
  // lookbehind keeps us from matching the `appearance` inside `[appearance]`/`defaultAppearance`.
  const match = matchAttribute(tagText, /(\s*)(?<![\w[])appearance\s*=\s*(?:"([^"]*)"|'([^']*)')/);
  if (match) {
    const value = (match[2] ?? match[3] ?? '').trim();
    return {
      kind: 'static',
      value,
      start: match.index,
      length: match[0].length,
      leadingWhitespace: match[1] ?? '',
    };
  }
  return { kind: 'absent' };
}

/** Reads the old `defaultAppearance` input from a start-tag's text. */
function parseDefaultAppearance(tagText: string): DefaultAppearanceUsage {
  // Property binding: only literal `true`/`false` are resolvable, anything else is dynamic.
  const binding = /\[defaultAppearance\]\s*=\s*(?:"([^"]*)"|'([^']*)')/.exec(tagText);
  if (binding) {
    const value = (binding[1] ?? binding[2] ?? '').trim();
    if (value === 'true') {
      return { kind: 'true' };
    }
    if (value === 'false') {
      return { kind: 'false' };
    }
    return { kind: 'dynamic' };
  }

  // Static attribute: bare `defaultAppearance`, or `defaultAppearance="..."`. A value of
  // "false" is treated as falsy, presence otherwise is treated as truthy.
  const staticMatch = /\s*(?<!\[)defaultAppearance\b(?:\s*=\s*(?:"([^"]*)"|'([^']*)'))?/.exec(
    tagText,
  );
  if (staticMatch) {
    const value = (staticMatch[1] ?? staticMatch[2] ?? '').trim();
    return {
      kind: 'static',
      start: staticMatch.index,
      length: staticMatch[0].length,
      truthy: value !== 'false',
    };
  }

  return { kind: 'false' };
}

/** Returns the span of the `defaultAppearance` attribute that must be removed, if any. */
function defaultAppearanceSpan(
  tagText: string,
  usage: DefaultAppearanceUsage,
): { start: number; length: number } | null {
  if (usage.kind === 'static') {
    return { start: usage.start, length: usage.length };
  }
  if (usage.kind === 'true' || usage.kind === 'false') {
    const binding = /\s*\[defaultAppearance\]\s*=\s*(?:"[^"]*"|'[^']*')/.exec(tagText);
    if (binding) {
      return { start: binding.index, length: binding[0].length };
    }
  }
  return null;
}
