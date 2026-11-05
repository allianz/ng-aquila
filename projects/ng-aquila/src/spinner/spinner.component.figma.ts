// url=<A1_FILE>?node-id=67109-8671
// source=projects/ng-aquila/src/spinner/spinner.component.ts
// component=NxSpinnerComponent
/// <reference types="@figma/code-connect/figma-types-no-require" />
import figma from 'figma';

const instance = figma.selectedInstance;

const size = instance.getEnum('Size', { S: undefined, M: 'm', L: 'l' });
const inverse = instance.getEnum('Color Role', { Default: false, 'On-Accent Attention': true });

export default {
  example: figma.html`<nx-spinner${size ? ` size="${size}"` : ''}${inverse ? ' inverse' : ''}></nx-spinner>`,
  imports: ["import { NxSpinnerComponent } from '@allianz/ng-aquila/spinner';"],
  id: 'nx-spinner',
  metadata: { nestable: true },
};
