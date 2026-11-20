// url=<A1_FILE>?node-id=70093-51542
// source=projects/ng-aquila/src/list/list-icon.component.ts
// component=NxListIconComponent
/// <reference types="@figma/code-connect/figma-types-no-require" />
import figma from 'figma';

const instance = figma.selectedInstance;

// One Figma item covers every list type. Only icon items need `nxListIcon`; the list numbers the
// others itself, so the Figma `Number` texts are not used.
const label = instance.getString('Label');
const isIcon = instance.getString('Type') === 'Icon';

const iconSwap = isIcon ? instance.getInstanceSwap('Icon') : undefined;
const iconTemplate =
  iconSwap && iconSwap.type === 'INSTANCE' ? iconSwap.executeTemplate() : undefined;
const iconName = iconTemplate?.metadata?.props?.name;

const notes = [
  instance.getString('State') === 'Disabled' &&
    '<!-- State "Disabled" is not available in code -->',
  isIcon && !iconName && '<!-- The icon name is not available. Set nxListIcon="…" -->',
].filter((note): note is string => !!note);
const attributes = isIcon ? ` nxListIcon="${iconName ?? '…'}"` : '';

export default {
  example: figma.html`${notes.map((note) => `${note}\n`).join('')}<li${attributes}>${label}</li>`,
  imports: isIcon ? ["import { NxListIconComponent } from '@allianz/ng-aquila/list';"] : [],
  id: 'nx-list-item',
  // The list template renders its items from these props, so it can put a nested list inside the `<li>`.
  metadata: { nestable: true, props: { kind: 'list-item', label, attributes, notes, isIcon } },
};
