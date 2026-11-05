// url=<A1_FILE>?node-id=28102-22671
// source=projects/ng-aquila/src/progressbar/progressbar.component.ts
// component=NxProgressbarComponent
/// <reference types="@figma/code-connect/figma-types-no-require" />
import figma from 'figma';

const instance = figma.selectedInstance;

const colorScheme = instance.getEnum('Color Role', { Default: undefined, Positive: 'positive' });
const transparentBackground = instance.getEnum('Background', { Solid: false, Transparent: true });

// Figma has no value property and always draws the bar at about a quarter.
export default {
  example: figma.html`<nx-progressbar value="0.25"${colorScheme ? ` colorScheme="${colorScheme}"` : ''}${
    transparentBackground ? ' transparentBackground' : ''
  }></nx-progressbar>`,
  imports: ["import { NxProgressbarComponent } from '@allianz/ng-aquila/progressbar';"],
  id: 'nx-progressbar',
  metadata: { nestable: true },
};
