// url=<A1_FILE>?node-id=66175-58091
// source=projects/ng-aquila/src/indicator/indicator.component.ts
// component=NxIndicatorComponent
/// <reference types="@figma/code-connect/figma-types-no-require" />
import figma from 'figma';

const instance = figma.selectedInstance;

const text = instance.getString('Text');
// Figma draws the "+" only in the "2+ Characters" variants, whatever `Overflow Suffix` says.
const overflow =
  instance.getEnum('2+ Characters', { True: true, False: false }) &&
  instance.getBoolean('Overflow Suffix');
const size = instance.getEnum('Size', {
  S: 's',
  M: undefined,
  L: 'l',
  '800': '800',
  '1000': '1000',
  '1200': '1200',
  '1400': '1400',
  '1600': '1600',
  '1800': '1800',
  '2000': '2000',
});
const sizeNote = size === 'l' ? '<!-- Size "L" is not available in code yet -->\n' : '';
// Figma sets the color with the Signal Type variable mode, which templates cannot read.
const typeNote =
  '<!-- Set type="warning | positive | info" if the Signal Type variable mode is not Critical. -->\n';

export default {
  example: figma.html`${typeNote}${sizeNote}<nx-indicator${size && size !== 'l' ? ` size="${size}"` : ''}>${text}${
    overflow ? '+' : ''
  }</nx-indicator>`,
  imports: ["import { NxIndicatorComponent } from '@allianz/ng-aquila/indicator';"],
  id: 'nx-indicator-count',
  metadata: { nestable: true },
};
