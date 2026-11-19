// url=<A1_FILE>?node-id=67409-27744
// source=projects/ng-aquila/src/card/card.component.ts
// component=NxCardComponent
/// <reference types="@figma/code-connect/figma-types-no-require" />
import figma from 'figma';

const instance = figma.selectedInstance;

const elevated = instance.getEnum('Elevated', { True: true, False: false });
// Hover and Active are interaction states, and Signal is the error state.
const disabled = instance.getEnum('State', {
  Resting: false,
  Hover: false,
  Active: false,
  'Resting Signal': false,
  'Hover Signal': false,
  'Active Signal': false,
  Disabled: true,
});

// The highlight Accent Color is a variable mode, and the code has one fixed highlight color.
const showHighlight = instance.getBoolean('Highlight');
const [highlight] = showHighlight
  ? instance.findLayers((n) => n.type === 'INSTANCE' && n.name.startsWith('Highlight'), {
      traverseInstances: true,
    })
  : [];
const highlightInstance = highlight?.type === 'INSTANCE' ? highlight : undefined;
const highlightText = highlightInstance?.getString('Text');
const showInfo = highlightInstance?.getBoolean('Info Button') ?? false;
const [infoButton] = showInfo
  ? (highlightInstance?.findLayers(
      (n) => n.type === 'INSTANCE' && n.name.startsWith('Info Button'),
      {
        traverseInstances: true,
      },
    ) ?? [])
  : [];
const infoTemplate = infoButton?.type === 'INSTANCE' ? infoButton.executeTemplate() : undefined;
const highlightLabel = highlightText ?? '<!-- Could not find the Highlight in Figma. -->';
const infoBlock = !showInfo
  ? ''
  : infoTemplate
    ? figma.html`
    ${infoTemplate.example}`
    : `
    <!-- Could not find the Info Button in Figma. -->`;
const highlightHeader = !showInfo
  ? showHighlight
    ? figma.html`
  <div nxHighlightHeader>${highlightLabel}</div>`
    : ''
  : figma.html`
  <div nxHighlightHeader>
    ${highlightLabel}${infoBlock}
  </div>`;

const attributes = `${showHighlight ? ' highlight' : ''}${elevated ? ' elevated' : ''}${
  disabled ? ' disabled' : ''
}`;

export default {
  example: figma.html`<nx-card${attributes}>${highlightHeader}
  ${instance.getSlot('Slot')}
</nx-card>`,
  imports: ["import { NxCardComponent } from '@allianz/ng-aquila/card';"],
  id: 'nx-card',
  metadata: { nestable: true },
};
