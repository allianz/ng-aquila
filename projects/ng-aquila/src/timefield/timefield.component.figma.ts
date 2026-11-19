// url=<A1_FILE>?node-id=70576-8895
// source=projects/ng-aquila/src/timefield/timefield.component.ts
// component=NxTimefieldComponent
/// <reference types="@figma/code-connect/figma-types-no-require" />
import figma from 'figma';

const instance = figma.selectedInstance;

function findNested(namePrefix: string) {
  const [found] = instance.findLayers(
    (node) => node.type === 'INSTANCE' && node.name.startsWith(namePrefix),
    { traverseInstances: true },
  );
  return found && found.type === 'INSTANCE' ? found : undefined;
}

const twelveHourFormat = instance.getEnum('AM PM Control', { True: true, False: false });

// Apart from the AM/PM variant, everything lives on the nested "Text Input".
const field = findNested('Text Input');

const size = field?.getEnum('Size', { S: 's', M: undefined });
const state = field?.getEnum('State', {
  Resting: undefined,
  'Resting Signal': 'error',
  Focus: undefined,
  'Focus Signal': 'error',
  Disabled: 'disabled',
  'Read-Only': 'readonly',
});
const disabled = state === 'disabled';
const readonly = state === 'readonly';

const showLabel = field?.getBoolean('Label') ?? false;
const showHint = field?.getBoolean('Hint') ?? false;
// `Message` is on by default, but "Plain Message" exists only in the Signal variants.
const showMessage = state === 'error' && (field?.getBoolean('Message') ?? false);
const labelPart = showLabel ? findNested('Label') : undefined;
const hintPart = showHint ? findNested('Hint') : undefined;
const messagePart = showMessage ? findNested('Plain Message') : undefined;

const label = labelPart?.getString('Text');
const optional = labelPart?.getBoolean('Optional')
  ? labelPart.getString('↪️ Optional').replace(/^\((.*)\)$/, '$1')
  : undefined;
const hasInfo = labelPart?.getBoolean('Info Button') ?? false;
const hint = hintPart?.getString('Text');
const message = messagePart?.getString('Text');
const withTimepicker = field?.getBoolean('Postfix Button') ?? false;

const missingParts = [
  ['Text Input', true, field],
  ['Label', showLabel, labelPart],
  ['Hint', showHint, hintPart],
  ['Plain Message', showMessage, messagePart],
]
  .filter(([, shown, part]) => shown && !part)
  .map(([name]) => name);

const missingNote = missingParts.length
  ? `<!-- Could not find ${missingParts.join(', ')} in Figma. This snippet may be incomplete. -->\n`
  : '';

const attributes = [
  ...(label ? [`label="${label}"`] : []),
  ...(optional ? [`optionalLabel="${optional}"`] : []),
  ...(hint ? [`hint="${hint}"`] : []),
  ...(size ? [`size="${size}"`] : []),
  ...(withTimepicker ? ['withTimepicker'] : []),
  ...(twelveHourFormat ? ['twelveHourFormat'] : []),
  ...(disabled ? ['disabled'] : []),
  ...(readonly ? ['[readonly]="true"'] : []),
];

const content = [
  ...(hasInfo ? ['<nx-info-icon nxLabelInfo>…</nx-info-icon>'] : []),
  ...(message ? [`<nx-error>${message}</nx-error>`] : []),
];

const baseImports = [
  ...(hasInfo ? ['NxLabelInfoDirective'] : []),
  ...(message ? ['NxErrorComponent'] : []),
];

export default {
  example: figma.html`${missingNote}<nx-timefield
${attributes.map((attribute) => `  ${attribute}\n`).join('')}>${content
    .map((element) => `\n  ${element}`)
    .join('')}${content.length ? '\n' : ''}</nx-timefield>`,
  imports: [
    "import { NxTimefieldComponent } from '@allianz/ng-aquila/timefield';",
    ...(baseImports.length
      ? [`import { ${baseImports.join(', ')} } from '@allianz/ng-aquila/base';`]
      : []),
    ...(hasInfo ? ["import { NxInfoIconComponent } from '@allianz/ng-aquila/info-icon';"] : []),
  ],
  id: 'nx-timefield',
  metadata: { nestable: true },
};
