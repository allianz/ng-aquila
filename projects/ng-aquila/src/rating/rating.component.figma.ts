// url=<A1_FILE>?node-id=20563-277
// source=projects/ng-aquila/src/rating/rating.component.ts
// component=NxRatingComponent
/// <reference types="@figma/code-connect/figma-types-no-require" />
import figma from 'figma';

const instance = figma.selectedInstance;

const value = instance.getString('Rating');
// The code defaults to size "l", which Figma does not have, so the size is always written.
const size = instance.getEnum('Size', { S: 's', M: 'm' });

export default {
  example: figma.html`<nx-rating value="${value}" size="${size}" [interactive]="false"></nx-rating>`,
  imports: ["import { NxRatingComponent } from '@allianz/ng-aquila/rating';"],
  id: 'nx-rating',
  metadata: { nestable: true },
};
