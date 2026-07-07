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
//      the same name can legitimately belong to either a single date control
//      (must stay) or an `nx-date-range` (must change). We classify each
//      `nx-formfield` by the date control in its subtree:
//        - contains an `<nx-date-range>`         -> range, key auto-rewritten
//        - contains a single-field control       -> single, key left untouched,
//          (`nx-datemask` / `input[nxDatefield]`)   no warning (unambiguous)
//        - contains neither                       -> undetermined, key left
//          untouched and a warning is logged
//      Occurrences outside a formfield (TypeScript identifiers, or templates not
//      following the formfield pattern) also cannot be proven, so we only warn
//      and let the consumer update the range-related usages manually.

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

/** Element tags of single-field (non-range) date controls. */
const SINGLE_FIELD_TAGS = ['nx-datemask'];
/** Attribute selectors of single-field (non-range) date controls. */
const SINGLE_FIELD_ATTRS = ['nxdatefield'];

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
   * Auto-rewrites old error keys inside an `nx-formfield` containing an
   * `<nx-date-range>`, stays silent for keys inside a formfield that
   * unambiguously holds a single-field date control, and warns about the rest.
   */
  private _migrateErrorKeysInTemplate(template: ResolvedResource): void {
    const { rangeSpans, singleFieldSpans } = this._findDateFormfieldSpans(template.content);

    for (const [oldKey, newKey] of AMBIGUOUS_ERROR_KEYS) {
      let index = template.content.indexOf(oldKey);
      while (index !== -1) {
        if (isWithinSpan(index, rangeSpans)) {
          this.fileSystem
            .edit(template.filePath)
            .remove(template.start + index, oldKey.length)
            .insertRight(template.start + index, newKey);
        } else if (!isWithinSpan(index, singleFieldSpans)) {
          const { line, character } = template.getCharacterAndLineOfPosition(index);
          this._logResourceWarning(template.filePath, line, character, oldKey);
        }
        index = template.content.indexOf(oldKey, index + oldKey.length);
      }
    }
  }

  /**
   * Classifies each `nx-formfield` by the date control in its subtree, returning
   * the spans of range formfields and of unambiguously single-field ones. A
   * formfield containing both is treated as a range.
   */
  private _findDateFormfieldSpans(content: string): {
    rangeSpans: Span[];
    singleFieldSpans: Span[];
  } {
    const fragment = parse5.parseFragment(content, { sourceCodeLocationInfo: true });
    const rangeSpans: Span[] = [];
    const singleFieldSpans: Span[] = [];

    const subtreeHas = (
      node: parse5.DefaultTreeAdapterMap['node'],
      predicate: (element: parse5.DefaultTreeAdapterMap['element']) => boolean,
    ): boolean => {
      if ('tagName' in node && predicate(node)) {
        return true;
      }
      return 'childNodes' in node && node.childNodes.some((child) => subtreeHas(child, predicate));
    };

    const isDateRange = (element: parse5.DefaultTreeAdapterMap['element']): boolean =>
      element.tagName === DATE_RANGE_TAG;
    const isSingleField = (element: parse5.DefaultTreeAdapterMap['element']): boolean =>
      SINGLE_FIELD_TAGS.includes(element.tagName) ||
      element.attrs.some((attr) => SINGLE_FIELD_ATTRS.includes(attr.name));

    const visit = (node: parse5.DefaultTreeAdapterMap['node']): void => {
      if ('tagName' in node && node.tagName === FORMFIELD_TAG && node.sourceCodeLocation) {
        const span: Span = [node.sourceCodeLocation.startOffset, node.sourceCodeLocation.endOffset];
        if (subtreeHas(node, isDateRange)) {
          rangeSpans.push(span);
        } else if (subtreeHas(node, isSingleField)) {
          singleFieldSpans.push(span);
        }
      }
      if ('childNodes' in node) {
        node.childNodes.forEach(visit);
      }
    };

    fragment.childNodes.forEach(visit);
    return { rangeSpans, singleFieldSpans };
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
