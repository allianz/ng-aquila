// url=<A1_FILE>?node-id=66649-34700
// source=projects/ng-aquila/src/info-icon/info-icon.component.ts
// component=NxInfoIconComponent
/// <reference types="@figma/code-connect/figma-types-no-require" />
import figma from 'figma';

// The text context properties only size the icon to the text next to it, and "Opened" is a
// visual state, so no Figma property has a code equivalent.
export default {
  example: figma.html`<nx-info-icon>
  <!-- Popover content -->
</nx-info-icon>`,
  imports: ["import { NxInfoIconComponent } from '@allianz/ng-aquila/info-icon';"],
  id: 'nx-info-icon',
  metadata: { nestable: true },
};
