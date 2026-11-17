// url=<A1_FILE>?node-id=5-4521
// source=projects/ng-aquila/src/toggle-button/toggle-button.component.ts
// component=NxToggleButtonComponent
/// <reference types="@figma/code-connect/figma-types-no-require" />
import figma from 'figma';

const instance = figma.selectedInstance;

const label = instance.getString('Label Text');
// "On" and the "Signal" states come from the value and the error state of the group.
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

export default {
  example: figma.html`<nx-toggle-button value="${label}"${state ? ` ${state}` : ''}>${label}</nx-toggle-button>`,
  imports: ["import { NxToggleButtonComponent } from '@allianz/ng-aquila/toggle-button';"],
  id: 'nx-toggle-button',
  metadata: { nestable: true },
};
