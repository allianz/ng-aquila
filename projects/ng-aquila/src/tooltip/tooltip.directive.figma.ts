// url=<A1_FILE>?node-id=23735-26116
// source=projects/ng-aquila/src/tooltip/tooltip.directive.ts
// component=NxTooltipDirective
/// <reference types="@figma/code-connect/figma-types-no-require" />
import figma from 'figma';

const instance = figma.selectedInstance;

const text = instance.getString('Text');
// The tooltip opens away from its arrow, like the popover. Corner positions round to their
// side. The code always draws the arrow, so "None" exists only in Figma.
const position = instance.getEnum('Pointer Position', {
  None: undefined,
  "11 o'clock": 'bottom',
  "12 o'clock": 'bottom',
  "1 o'clock": 'bottom',
  "2 o'clock": 'left',
  "3 o'clock": 'left',
  "4 o'clock": 'left',
  "5 o'clock": 'top',
  "6 o'clock": 'top',
  "7 o'clock": 'top',
  "8 o'clock": 'right',
  "9 o'clock": 'right',
  "10 o'clock": 'right',
});

export default {
  example: figma.html`<button nxButton type="button" nxTooltip="${text}"${
    position ? ` nxTooltipPosition="${position}"` : ''
  }>
  Open
</button>`,
  imports: [
    "import { NxButtonComponent } from '@allianz/ng-aquila/button';",
    "import { NxTooltipDirective } from '@allianz/ng-aquila/tooltip';",
  ],
  id: 'nx-tooltip',
  metadata: { nestable: true },
};
