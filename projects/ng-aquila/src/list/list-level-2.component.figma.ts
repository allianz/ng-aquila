// url=<A1_FILE>?node-id=70093-53852
// source=projects/ng-aquila/src/list/list.component.ts
// component=NxListComponent
/// <reference types="@figma/code-connect/figma-types-no-require" />
import figma from 'figma';

const instance = figma.selectedInstance;

const type = instance.getEnum('Type', {
  Ordered: 'ordered',
  'Ordered Contained': 'ordered-circle',
  Unordered: 'unordered',
  Icon: 'unordered',
});
const tag = type === 'ordered' || type === 'ordered-circle' ? 'ol' : 'ul';
const attribute = type === 'ordered-circle' ? ' nxList="ordered-circle"' : ' nxList';
const slot = instance.getSlot('Slot');
const items = (slot?.connectedInstances ?? []).reduce(
  (rendered, item) => figma.html`${rendered}
  ${item.executeTemplate().example}`,
  figma.html``,
);

export default {
  // Level 2 has no size or color role: in code the nested list repeats the parent's `size` and `type`.
  example: figma.html`<!-- Nest this list inside the parent <li> and repeat the parent's size and type -->
<${tag}${attribute}>${items}
</${tag}>`,
  imports: ["import { NxListComponent } from '@allianz/ng-aquila/list';"],
  id: 'nx-list-level-2',
  metadata: { nestable: true, props: { kind: 'nested-list', tag, attribute } },
};
