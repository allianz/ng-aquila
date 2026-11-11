// url=<A1_FILE>?node-id=70093-50635
// source=projects/ng-aquila/src/data-display/data-display/data-display.component.ts
// component=NxDataDisplayComponent
/// <reference types="@figma/code-connect/figma-types-no-require" />
import figma from 'figma';

const instance = figma.selectedInstance;

// Size M is the A1 default (`DATA_DISPLAY_DEFAULT_OPTIONS`).
const size = instance.getEnum('Size', { S: 's', M: undefined });
const type = instance.getString('Type');

// The label and value texts are not exposed as properties, so they are read from the nested parts.
function findNested(namePrefix: string) {
  const [found] = instance.findLayers(
    (node) => node.type === 'INSTANCE' && node.name.startsWith(namePrefix),
    { traverseInstances: true },
  );
  return found && found.type === 'INSTANCE' ? found : undefined;
}
function readText(part: ReturnType<typeof findNested>, layerName: string) {
  const text = part?.findText(layerName);
  return text?.type === 'TEXT' ? text.textContent.trim() : undefined;
}
const labelPart = findNested('Data Display Label');
const label = readText(labelPart, 'Label');
const valuePart = type === 'Text' ? findNested('Data Display Value') : undefined;
const linkInstance = type === 'Link' ? instance.findInstance('Link') : undefined;
const linkPart = linkInstance?.type === 'INSTANCE' ? linkInstance : undefined;

const missingParts = [
  ['Data Display Label', labelPart],
  ...(type === 'Text' ? [['Data Display Value', valuePart]] : []),
  ...(type === 'Link' ? [['Link', linkPart]] : []),
]
  .filter(([, part]) => !part)
  .map(([name]) => name);
const missingNote = missingParts.length
  ? `<!-- Could not find ${missingParts.join(', ')} in Figma. This snippet may be incomplete. -->\n`
  : '';

// `nxStyle="text"` lets the link inherit the size of the data display, as in the documentation.
const content =
  type === 'Link'
    ? figma.html`
  <nx-link nxStyle="text">
    <a href="#">${linkPart?.getString('Text')?.trim() ?? '…'}</a>
  </nx-link>
`
    : type === 'Slot'
      ? figma.html`
  ${instance.getSlot('Slot')}
`
      : (readText(valuePart, 'Value') ?? '');

export default {
  example: figma.html`${missingNote}<nx-data-display${label !== undefined ? ` label="${label}"` : ''}${
    size ? ` size="${size}"` : ''
  }>${content}</nx-data-display>`,
  imports: [
    "import { NxDataDisplayComponent } from '@allianz/ng-aquila/data-display';",
    ...(type === 'Link' ? ["import { NxLinkComponent } from '@allianz/ng-aquila/link';"] : []),
  ],
  id: 'nx-data-display',
  metadata: { nestable: true },
};
