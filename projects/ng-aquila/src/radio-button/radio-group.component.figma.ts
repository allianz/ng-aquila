// url=<A1_FILE>?node-id=71451-21992
// source=projects/ng-aquila/src/radio-button/radio-button.ts
// component=NxRadioGroupComponent
/// <reference types="@figma/code-connect/figma-types-no-require" />
import type { InstanceHandle } from 'figma';
import figma from 'figma';

const instance = figma.selectedInstance;

function asInstance(node: ReturnType<InstanceHandle['findInstance']> | undefined) {
  return node?.type === 'INSTANCE' ? node : undefined;
}

const group = asInstance(instance.findInstance('Form Group Pattern 📦'));

const state = group?.getEnum('State', {
  Resting: undefined,
  'Resting Signal': undefined,
  Disabled: 'disabled',
  'Read-Only': 'readonly',
});
const groupLocked = state === 'disabled' || state === 'readonly';

const showLabel = group?.getBoolean('Label') ?? false;
const showHint = group?.getBoolean('Hint') ?? false;
// `Message` is on by default, but "Plain Message" exists only in the Resting Signal variant.
const showMessage = group?.getString('State') === 'Resting Signal' && group.getBoolean('Message');
const label = showLabel ? asInstance(group?.findInstance('Label')) : undefined;
const hintPart = showHint ? asInstance(group?.findInstance('Hint')) : undefined;
const messagePart = showMessage ? asInstance(group?.findInstance('Plain Message')) : undefined;
const hasInfo = label?.getBoolean('Info Button') ?? false;
const hint = hintPart?.getString('Text');
const message = messagePart?.getString('Text');

const missingParts = [
  ['Form Group Pattern 📦', true, group],
  ['Label', showLabel, label],
  ['Hint', showHint, hintPart],
  ['Plain Message', showMessage, messagePart],
]
  .filter(([, shown, part]) => shown && !part)
  .map(([name]) => name);

const missingNote = missingParts.length
  ? `<!-- Could not find ${missingParts.join(', ')} in Figma. This snippet may be incomplete. -->\n`
  : '';

function renderLabel(labelInstance: InstanceHandle): string {
  const text = labelInstance.getString('Text');
  const optional = labelInstance.getBoolean('Optional')
    ? labelInstance.getString('↪️ Optional').replace(/^\(|\)$/g, '')
    : '';
  const attributes = `${optional ? ` optionalLabel="${optional}"` : ''}${hint ? ` hint="${hint}"` : ''}`;
  const content = hasInfo
    ? `\n    ${text}\n    <nx-info-icon nxLabelInfo><!-- help text --></nx-info-icon>\n  `
    : text;
  return `\n  <nx-label${attributes}>${content}</nx-label>`;
}

const radios = (
  group?.findLayers((node) => node.type === 'INSTANCE' && node.name === 'Radio Button') ?? []
).filter((node): node is InstanceHandle => node.type === 'INSTANCE');

function renderRadio(radio: InstanceHandle): string {
  const text = radio.getString('Label Text');
  const hasLabel = radio.getEnum('Label', { True: true, False: false });
  const radioState = radio.getEnum('State', {
    Resting: undefined,
    'Resting Signal': undefined,
    Hover: undefined,
    'Hover Signal': undefined,
    Active: undefined,
    'Active Signal': undefined,
    Disabled: 'disabled',
    'Read-Only': 'readonly',
  });
  const attributes = `value="${text}"${radioState && !groupLocked ? ` ${radioState}` : ''}`;
  return hasLabel
    ? `\n  <nx-radio ${attributes}>${text}</nx-radio>`
    : `\n  <nx-radio ${attributes} ariaLabel="${text}"></nx-radio>`;
}

const selected = radios.find((radio) => radio.getEnum('Selected', { True: true, False: false }));
const groupAttributes = `${selected ? ` value="${selected.getString('Label Text')}"` : ''}${
  groupLocked ? ` ${state}` : ''
}`;

const baseImports = [
  ...(label ? ['NxLabelComponent'] : []),
  ...(hasInfo ? ['NxLabelInfoDirective'] : []),
  ...(message ? ['NxErrorComponent'] : []),
];

export default {
  example: figma.html`${missingNote}<nx-radio-group${groupAttributes}>${label ? renderLabel(label) : ''}${radios
    .map(renderRadio)
    .join('')}${message ? `\n  <nx-error>${message}</nx-error>` : ''}
</nx-radio-group>`,
  imports: [
    "import { NxRadioGroupComponent, NxRadioComponent } from '@allianz/ng-aquila/radio-button';",
    ...(baseImports.length
      ? [`import { ${baseImports.join(', ')} } from '@allianz/ng-aquila/base';`]
      : []),
    ...(hasInfo ? ["import { NxInfoIconComponent } from '@allianz/ng-aquila/info-icon';"] : []),
  ],
  id: 'nx-radio-group',
  metadata: { nestable: true },
};
