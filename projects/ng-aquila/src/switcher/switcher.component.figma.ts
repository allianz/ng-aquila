// url=<A1_FILE>?node-id=5-3305
// source=projects/ng-aquila/src/switcher/switcher.component.ts
// component=NxSwitcherComponent
/// <reference types="@figma/code-connect/figma-types-no-require" />
import figma from 'figma';

const instance = figma.selectedInstance;

const label = instance.getString('Label Text').trim();
const labelPosition = instance.getEnum('Label', { None: 'none', Before: 'left', After: undefined });
const checked = instance.getEnum('On', { True: true, False: false });
const state = instance.getEnum('State', {
  Resting: undefined,
  'Resting Signal': undefined,
  Hover: undefined,
  'Hover Signal': undefined,
  Active: undefined,
  'Active Signal': undefined,
  Disabled: 'disabled',
  'Read-Only': 'readonly',
});

const hintPart =
  labelPosition !== 'none' && instance.getBoolean('Hint')
    ? instance.findInstance('Hint')
    : undefined;
const hint = hintPart?.type === 'INSTANCE' ? hintPart.getString('Text').trim() : undefined;
const missingNote =
  hintPart && hint === undefined
    ? '<!-- Could not find Hint in Figma. This snippet may be incomplete. -->\n'
    : '';

const attributes = `${checked ? ' [checked]="true"' : ''}${
  labelPosition === 'left' ? ' labelPosition="left"' : ''
}${hintPart ? ` hint="${hint ?? '…'}"` : ''}${state ? ` ${state}` : ''}${
  labelPosition === 'none' ? ` ariaLabel="${label}"` : ''
}`;

export default {
  example: figma.html`${missingNote}<nx-switcher${attributes}>${labelPosition === 'none' ? '' : label}</nx-switcher>`,
  imports: ["import { NxSwitcherComponent } from '@allianz/ng-aquila/switcher';"],
  id: 'nx-switcher',
  metadata: { nestable: true },
};
