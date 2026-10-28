import { CategorizedClassDoc } from '../common/api-doc-definitions';
import { ComponentGroup } from './component-grouper';

/** Page listing the content projection slots of one component group. */
export class ContentSlotPage {
  docType = 'contentSlotPage';

  /** Name of the component group the slots belong to. */
  name: string;

  /** Name of the entry point, which is also the id of the docs page. */
  packageName: string;

  /** Unique id for the page. */
  id: string;

  /** Directives and components of the group that project content into slots. */
  contentSlotClasses: CategorizedClassDoc[];

  constructor(group: ComponentGroup) {
    this.name = group.name;
    this.packageName = group.packageName;
    this.id = `content-slots-${group.name}`;
    this.contentSlotClasses = group.contentSlotClasses;
  }
}

/**
 * Renders the slots of a component group to a page of its own, next to the api page. Only groups
 * that actually have slots get a page, so the viewer can hide the tab for all the others.
 */
export class ContentSlotPager {
  process(groups: ComponentGroup[]): ContentSlotPage[] {
    return groups
      .filter((group) => group.contentSlotClasses.length)
      .map((group) => new ContentSlotPage(group));
  }
}
