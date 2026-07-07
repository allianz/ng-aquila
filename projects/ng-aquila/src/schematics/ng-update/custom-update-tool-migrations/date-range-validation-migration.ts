// Custom migration for the v22 `nx-date-range` validation breaking changes.
// See https://github.developer.allianz.io/ilt/ng-aquila/pull/1898
//
// The declarative `input-names` data handles the template input renames
// (`[minDate]` -> `[minStartDate]`, `[maxDate]` -> `[maxEndDate]`). This
// migration covers the cases the declarative tooling cannot express:
//
//   1. `NxDateRangeValidators.min(...)` / `.max(...)` static calls, which were
//      renamed to `.minStart(...)` / `.maxEnd(...)`. These are auto-rewritten —
//      `NxDateRangeValidators` no longer exposes `min`/`max`, so any such call
//      unambiguously refers to the renamed range validators.
//
//   2. The `nxDatefieldMin` / `nxDatefieldMax` validation error keys, which
//      became `nxDateRangeMinStart` / `nxDateRangeMaxEnd` for ranges. These keys
//      are still emitted by the single-field `NxDateValidators.min`/`.max`, so
//      the same name can legitimately belong to either a single `nx-datefield`
//      (must stay) or an `nx-date-range` (must change). When a key appears inside
//      an `nx-formfield` whose subtree contains an `<nx-date-range>`, the control
//      is unambiguously a range and the key is auto-rewritten. Anywhere else
//      (TypeScript identifiers, or templates not following the formfield pattern)
//      the context cannot be proven, so we only warn and let the consumer update
//      the range-related usages manually.

import {
  Migration,
  parse5,
  ResolvedResource,
  TargetVersion,
  WorkspacePath,
} from '@angular/cdk/schematics';
import {
  CallExpression,
  Identifier,
  isCallExpression,
  isPropertyAccessExpression,
  Node,
  PropertyAccessExpression,
} from 'typescript';

const RANGE_VALIDATORS_CLASS = 'NxDateRangeValidators';
const FORMFIELD_TAG = 'nx-formfield';
const DATE_RANGE_TAG = 'nx-date-range';

/** Renamed static methods on `NxDateRangeValidators` (old name -> new name). */
const VALIDATOR_METHOD_RENAMES = new Map<string, string>([
  ['min', 'minStart'],
  ['max', 'maxEnd'],
]);

/** Error keys that changed for ranges but are shared with the single datefield. */
const AMBIGUOUS_ERROR_KEYS = new Map<string, string>([
  ['nxDatefieldMin', 'nxDateRangeMinStart'],
  ['nxDatefieldMax', 'nxDateRangeMaxEnd'],
]);

/** A `[startOffset, endOffset)` span within a template's content. */
type Span = [number, number];

export class DateRangeValidationMigration extends Migration<null> {
  enabled = this.targetVersion === TargetVersion.V22;

  override visitNode(node: Node): void {
    if (isCallExpression(node)) {
      this._visitValidatorCall(node);
    }
    this._warnOnErrorKeyIdentifier(node);
  }

  override visitTemplate(template: ResolvedResource): void {
    this._migrateErrorKeysInTemplate(template);
  }

  /** Rewrites `NxDateRangeValidators.min(...)` / `.max(...)` to the new names. */
  private _visitValidatorCall(node: CallExpression): void {
    if (!isPropertyAccessExpression(node.expression)) {
      return;
    }

    const propertyAccess = node.expression as PropertyAccessExpression;
    const methodName = propertyAccess.name.text;
    const newMethodName = VALIDATOR_METHOD_RENAMES.get(methodName);

    if (!newMethodName || propertyAccess.expression.getText() !== RANGE_VALIDATORS_CLASS) {
      return;
    }

    const filePath = this.fileSystem.resolve(propertyAccess.getSourceFile().fileName);
    this.fileSystem
      .edit(filePath)
      .remove(propertyAccess.name.getStart(), methodName.length)
      .insertRight(propertyAccess.name.getStart(), newMethodName);
  }

  /** Warns when an old error key appears as a TypeScript identifier. */
  private _warnOnErrorKeyIdentifier(node: Node): void {
    if (!isPropertyAccessExpression(node)) {
      return;
    }
    const keyName = (node.name as Identifier).text;
    if (AMBIGUOUS_ERROR_KEYS.has(keyName)) {
      this.createFailureAtNode(node, this._errorKeyMessage(keyName));
    }
  }

  /**
   * Auto-rewrites old error keys that sit inside an `nx-formfield` containing an
   * `<nx-date-range>`, and warns about any remaining occurrences.
   */
  private _migrateErrorKeysInTemplate(template: ResolvedResource): void {
    const rangeFormfieldSpans = this._findRangeFormfieldSpans(template.content);

    for (const [oldKey, newKey] of AMBIGUOUS_ERROR_KEYS) {
      let index = template.content.indexOf(oldKey);
      while (index !== -1) {
        if (isWithinSpan(index, rangeFormfieldSpans)) {
          this.fileSystem
            .edit(template.filePath)
            .remove(template.start + index, oldKey.length)
            .insertRight(template.start + index, newKey);
        } else {
          const { line, character } = template.getCharacterAndLineOfPosition(index);
          this._logResourceWarning(template.filePath, line, character, oldKey);
        }
        index = template.content.indexOf(oldKey, index + oldKey.length);
      }
    }
  }

  /** Finds the spans of all `nx-formfield` elements whose subtree contains an `nx-date-range`. */
  private _findRangeFormfieldSpans(content: string): Span[] {
    const fragment = parse5.parseFragment(content, { sourceCodeLocationInfo: true });
    const spans: Span[] = [];

    const subtreeHasDateRange = (node: parse5.DefaultTreeAdapterMap['node']): boolean => {
      if ('tagName' in node && node.tagName === DATE_RANGE_TAG) {
        return true;
      }
      return 'childNodes' in node && node.childNodes.some(subtreeHasDateRange);
    };

    const visit = (node: parse5.DefaultTreeAdapterMap['node']): void => {
      if ('tagName' in node && node.tagName === FORMFIELD_TAG) {
        const location = node.sourceCodeLocation;
        if (location && subtreeHasDateRange(node)) {
          spans.push([location.startOffset, location.endOffset]);
        }
      }
      if ('childNodes' in node) {
        node.childNodes.forEach(visit);
      }
    };

    fragment.childNodes.forEach(visit);
    return spans;
  }

  private _errorKeyMessage(oldKey: string): string {
    return (
      `Found usage of the "${oldKey}" validation error key. For "nx-date-range" controls ` +
      `this key was renamed to "${AMBIGUOUS_ERROR_KEYS.get(oldKey)}". Single "nx-datefield" ` +
      `controls still use "${oldKey}", so please update only the range-related usages manually.`
    );
  }

  private _logResourceWarning(
    filePath: WorkspacePath,
    line: number,
    character: number,
    oldKey: string,
  ): void {
    this.logger.warn(`${filePath}:${line + 1}:${character + 1} - ${this._errorKeyMessage(oldKey)}`);
  }
}

/** Whether the given offset falls inside any of the provided spans. */
function isWithinSpan(offset: number, spans: Span[]): boolean {
  return spans.some(([start, end]) => offset >= start && offset < end);
}
