import { DocCollection, Processor } from 'dgeni';

import {
  getContentSlots,
  getHostSelectors,
  getSelectorKeys,
  splitSelectorList,
} from '../common/content-slots';
import { CategorizedClassDoc, ContentSlotTarget } from '../common/dgeni-definitions';
import { getDocumentPackageInfo } from './component-grouper';

/**
 * Processor that resolves the content projection slots of every component and directive.
 *
 * The `<ng-content>` tags of a template are listed on the doc as `contentSlots`, and the
 * `select` of each slot is matched against the selectors of all documented directives and
 * components so that the template can link from a slot to the API of what goes into it.
 */
export class ContentSlotLinker implements Processor {
  name = 'content-slot-linker';
  $runAfter = ['categorizer'];
  $runBefore = ['component-grouper'];

  $process(docs: DocCollection) {
    const directiveDocs = docs.filter(
      (doc) => doc.isComponent || doc.isDirective,
    ) as CategorizedClassDoc[];

    const selectorIndex = this._buildSelectorIndex(directiveDocs);

    directiveDocs.forEach((doc) => {
      doc.contentSlots = getContentSlots(doc);
      doc.contentSlotSelectors = getHostSelectors(doc);
      doc.contentSlots.forEach(
        (slot) => (slot.targets = this._resolveTargets(slot.select, selectorIndex, doc)),
      );
    });

    this._reportDescriptionCoverage(directiveDocs);
  }

  /**
   * Reports how many slots are still missing an `@slot` description, so that the descriptions can
   * be written component by component without having to guess what is left. Which slots those are
   * is only listed when `DOCS_SLOT_REPORT` is set, to keep a normal build readable.
   */
  private _reportDescriptionCoverage(directiveDocs: CategorizedClassDoc[]) {
    const slots = directiveDocs.flatMap((doc) =>
      (doc.contentSlots ?? []).map((slot) => ({ doc, slot })),
    );
    const undocumented = slots.filter(({ slot }) => !slot.description);

    if (undocumented.length === 0) {
      return;
    }

    console.warn(
      `Warning: ${undocumented.length} of ${slots.length} content slots have no description. ` +
        'Document a slot with an <!-- @slot … --> comment in front of its <ng-content>, ' +
        'or set DOCS_SLOT_REPORT=1 to list the slots that are missing one.',
    );

    if (process.env.DOCS_SLOT_REPORT) {
      undocumented.forEach(({ doc, slot }) =>
        console.warn(`  no description: ${doc.name} ${slot.isDefault ? '(default)' : slot.select}`),
      );
    }
  }

  /** Indexes all documented directives and components by the selectors they can be matched by. */
  private _buildSelectorIndex(
    directiveDocs: CategorizedClassDoc[],
  ): Map<string, ContentSlotTarget[]> {
    const index = new Map<string, ContentSlotTarget[]>();

    directiveDocs.forEach((doc) => {
      const target: ContentSlotTarget = {
        name: doc.name,
        groupName: getDocumentPackageInfo(doc as any).name,
      };

      (doc.directiveSelectors ?? []).forEach((selector) =>
        getSelectorKeys(selector).forEach((key) => {
          const targets = index.get(key) ?? [];

          if (!targets.some((existing) => existing.name === target.name)) {
            targets.push(target);
          }

          index.set(key, targets);
        }),
      );
    });

    return index;
  }

  /**
   * Resolves the directives and components that the given `select` projects. Every selector of
   * the list is looked up by its most specific key first, so that `button[nxFoo]` prefers the
   * directive that declares exactly that over every directive that only declares `[nxFoo]`.
   */
  private _resolveTargets(
    select: string,
    selectorIndex: Map<string, ContentSlotTarget[]>,
    hostDoc: CategorizedClassDoc,
  ): ContentSlotTarget[] {
    const targets: ContentSlotTarget[] = [];

    splitSelectorList(select).forEach((selector) => {
      const matches = getSelectorKeys(selector)
        .map((key) => selectorIndex.get(key))
        .find((candidates) => candidates !== undefined);

      (matches ?? []).forEach((match) => {
        // A component that projects its own selector, like a recursive tree node, would
        // otherwise link to the section the reader is already looking at.
        if (match.name !== hostDoc.name && !targets.some((target) => target.name === match.name)) {
          targets.push(match);
        }
      });
    });

    return targets;
  }
}
