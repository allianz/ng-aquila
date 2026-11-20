// url=<A1_FILE>?node-id=70093-51187
// source=projects/ng-aquila/src/list/list.component.ts
// component=NxListComponent
/// <reference types="@figma/code-connect/figma-types-no-require" />
import type { ResultSection, SlotResult, TemplateStringResult } from 'figma';
import figma from 'figma';

const instance = figma.selectedInstance;

const type = instance.getEnum('Type', {
  Ordered: 'ordered',
  'Ordered Contained': 'ordered-circle',
  Unordered: 'unordered',
  Icon: 'unordered',
});
const tag = type === 'ordered' || type === 'ordered-circle' ? 'ol' : 'ul';
// Size M is the default (`normal`).
const size = instance.getEnum('Size', { S: 's', M: undefined });
const colorRole = instance.getEnum('Color Role', { Primary: undefined, Secondary: 'secondary' });
// Nested lists have no size or color role in Figma, but in code they need the parent's.
const sharedAttributes = `${size ? ` size="${size}"` : ''}${colorRole ? ` type="${colorRole}"` : ''}`;

interface ItemProps {
  kind: 'list-item';
  label: string;
  attributes: string;
  notes: string[];
  isIcon: boolean;
}
interface NestedListProps {
  kind: 'nested-list';
  tag: string;
  attribute: string;
}
interface Entry {
  item?: ItemProps;
  unknown?: ResultSection[];
  nested: TemplateStringResult[];
}

let hasIconItem = false;

function join(parts: TemplateStringResult[], separator: string): TemplateStringResult {
  return parts.reduce(
    (all, part, index) => (index ? figma.html`${all}${separator}${part}` : part),
    figma.html``,
  );
}

function renderEntry({ item, unknown, nested }: Entry, indent: string): TemplateStringResult {
  if (unknown) {
    return figma.html`${indent}${unknown}`;
  }
  const notes = (item?.notes ?? []).map((note) => `${indent}${note}\n`).join('');
  const open = `${notes}${indent}<li${item?.attributes ?? ''}>`;
  if (!nested.length) {
    return figma.html`${open}${item?.label ?? ''}</li>`;
  }
  const label = item ? `\n${indent}  ${item.label}` : '';
  return figma.html`${open}${label}
${join(nested, '\n')}
${indent}</li>`;
}

function renderList(
  listTag: string,
  attribute: string,
  slot: SlotResult | undefined,
  indent: string,
): TemplateStringResult {
  const entries: Entry[] = [];
  for (const node of slot?.connectedInstances ?? []) {
    const { example, metadata } = node.executeTemplate();
    const props = metadata?.props as ItemProps | NestedListProps | undefined;
    if (props?.kind === 'nested-list') {
      // Figma draws Level 2 after the item it belongs to; in HTML it goes inside that `<li>`.
      const last = entries[entries.length - 1];
      const parent = last && !last.unknown ? last : { nested: [] };
      if (parent !== last) {
        entries.push(parent);
      }
      parent.nested.push(
        renderList(props.tag, props.attribute, node.getSlot('Slot'), `${indent}    `),
      );
    } else if (props?.kind === 'list-item') {
      hasIconItem ||= props.isIcon;
      entries.push({ item: props, nested: [] });
    } else {
      entries.push({ unknown: example, nested: [] });
    }
  }

  const open = `${indent}<${listTag}${attribute}${sharedAttributes}>`;
  const close = `${indent}</${listTag}>`;
  // Fall back to the slot marker when the slot holds nothing with Code Connect (e.g. custom content).
  const content = entries.length
    ? join(
        entries.map((entry) => renderEntry(entry, `${indent}  `)),
        '\n',
      )
    : figma.html`${indent}  ${slot}`;
  return figma.html`${open}
${content}
${close}`;
}

const example = renderList(
  tag,
  type === 'ordered-circle' ? ' nxList="ordered-circle"' : ' nxList',
  instance.getSlot('Slot'),
  '',
);

export default {
  example,
  imports: [
    hasIconItem
      ? "import { NxListComponent, NxListIconComponent } from '@allianz/ng-aquila/list';"
      : "import { NxListComponent } from '@allianz/ng-aquila/list';",
  ],
  id: 'nx-list',
  metadata: { nestable: true },
};
