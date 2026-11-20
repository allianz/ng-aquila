// url=<A1_FILE>?node-id=67459-71061
// source=projects/ng-aquila/src/card/selectable-card.component.ts
// component=NxSelectableCardComponent
/// <reference types="@figma/code-connect/figma-types-no-require" />
import figma from 'figma';

const instance = figma.selectedInstance;

const selected = instance.getEnum('Selected', { True: true, False: false });
const indicator = instance.getEnum('Selection Indicator', {
  Checkbox: 'checkbox',
  'Radio Button': 'radio',
  '🧪 None (Lab)': 'none',
});
const elevated = instance.getEnum('Elevated', { True: true, False: false });
// Hover and Active are interaction states, and Signal is the error state.
const state = instance.getEnum('State', {
  Resting: undefined,
  Hover: undefined,
  Active: undefined,
  'Resting Signal': 'error',
  'Hover Signal': 'error',
  'Active Signal': 'error',
  Disabled: 'disabled',
});
const disabled = state === 'disabled';
const error = state === 'error';
const radio = indicator === 'radio';

// The code switches a card to radio mode when it sits in a group, and the group holds the selection.
const radioNote = radio
  ? '<!-- Place radio cards in one <nx-selectable-card-group> and give each a value. Select a card with the group value. -->\n'
  : '';
// The error state has no input: the forms API sets it when the control is invalid and touched or the form is submitted.
const errorNote = error
  ? `<!-- The error state comes from the Angular forms API. It shows when the control is invalid and touched or the form is submitted. -->\n`
  : '';
const indicatorNote =
  indicator === 'none'
    ? '<!-- A selectable card without a selection indicator is not available in code yet. -->\n'
    : '';

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

const attributes = `${selected && !radio ? ' checked' : ''}${showHighlight ? ' highlight' : ''}${
  elevated ? ' elevated' : ''
}${disabled ? ' disabled' : ''}`;

export default {
  example: figma.html`${radioNote}${errorNote}${indicatorNote}<nx-selectable-card${attributes}>${highlightHeader}
  ${instance.getSlot('Slot')}
</nx-selectable-card>`,
  imports: [
    `import { ${radio ? 'NxSelectableCardComponent, NxSelectableCardGroupComponent' : 'NxSelectableCardComponent'} } from '@allianz/ng-aquila/card';`,
  ],
  id: 'nx-selectable-card',
  metadata: { nestable: true },
};
