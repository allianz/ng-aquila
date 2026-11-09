// url=<A1_FILE>?node-id=5-3638
// source=projects/ng-aquila/src/radio-button/radio-button.ts
// component=NxRadioComponent
/// <reference types="@figma/code-connect/figma-types-no-require" />
import figma from 'figma';

const instance = figma.selectedInstance;

const labelText = instance.getString('Label Text');
const hasLabel = instance.getEnum('Label', { True: true, False: false });
const checked = instance.getEnum('Selected', { True: true, False: false });
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

const attributes = `${checked ? ' [checked]="true"' : ''}${
  state === 'disabled' || state === 'readonly' ? ` ${state}` : ''
}`;

export default {
  example: hasLabel
    ? figma.html`<nx-radio${attributes}>${labelText}</nx-radio>`
    : figma.html`<nx-radio${attributes} ariaLabel="${labelText}"></nx-radio>`,
  imports: ["import { NxRadioComponent } from '@allianz/ng-aquila/radio-button';"],
  id: 'nx-radio',
  metadata: { nestable: true },
};
