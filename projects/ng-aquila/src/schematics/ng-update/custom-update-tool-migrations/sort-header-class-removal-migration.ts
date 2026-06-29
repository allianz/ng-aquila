import {
  findAllSubstringIndices,
  Migration,
  ResolvedResource,
  TargetVersion,
} from '@angular/cdk/schematics';
import { isStringLiteralLike, Node, SourceFile } from 'typescript';

/** CSS classes removed from nx-sort-header in v22. */
const REMOVED_CLASSES = [
  'nx-sort-header__icons-container',
  'nx-sort-header__unsorted',
  'nx-sort-header__ascend',
  'nx-sort-header__descend',
];

/**
 * Migration that warns when removed nx-sort-header CSS classes are found in
 * templates, stylesheets or TypeScript string literals.
 *
 * The classes were removed in v22. Users should use `nx-sort-header` instead
 * when querying the sort header element.
 */
export class SortHeaderClassRemovalMigration extends Migration<null> {
  enabled = this.targetVersion === TargetVersion.V22;

  override visitNode(node: Node): void {
    if (!isStringLiteralLike(node)) {
      return;
    }
    const { text } = node;
    const sourceFile = node.getSourceFile() as SourceFile;
    const filePath = this.fileSystem.resolve(sourceFile.fileName);
    const fileContent = sourceFile.getFullText();

    for (const className of REMOVED_CLASSES) {
      findAllSubstringIndices(text, className).forEach((offset) => {
        // offset is relative to the string content; adjust by the opening quote position
        const absoluteOffset = node.getStart() + 1 + offset;
        this.failures.push({
          filePath,
          position: this._positionFromOffset(fileContent, absoluteOffset),
          message: this._buildMessage(className),
        });
      });
    }
  }

  override visitTemplate(template: ResolvedResource): void {
    if (!template.inline) {
      this._reportRemovedClasses(template);
    }
  }

  override visitStylesheet(stylesheet: ResolvedResource): void {
    if (!stylesheet.inline) {
      this._reportRemovedClasses(stylesheet);
    }
  }

  private _reportRemovedClasses(resource: ResolvedResource): void {
    for (const className of REMOVED_CLASSES) {
      findAllSubstringIndices(resource.content, className).forEach((offset) => {
        this.failures.push({
          filePath: resource.filePath,
          position: this._positionFromOffset(resource.content, offset),
          message: this._buildMessage(className),
        });
      });
    }
  }

  private _buildMessage(className: string): string {
    return (
      `The sort header CSS class "${className}" has been removed in v22. ` +
      `Use the host-level class "nx-sort-header" to query the sort header element instead.`
    );
  }

  private _positionFromOffset(
    content: string,
    offset: number,
  ): { line: number; character: number } {
    const lines = content.slice(0, offset).split('\n');
    return { line: lines.length - 1, character: lines[lines.length - 1].length };
  }
}
