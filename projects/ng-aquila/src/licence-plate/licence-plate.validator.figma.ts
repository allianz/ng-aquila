// url=<A1_FILE>?node-id=18844-8871
// source=projects/ng-aquila/src/licence-plate/licence-plate.validator.ts
// component=NxLicencePlateValidatorDirective
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

function toMonth(text: string): string {
  const month = Number.parseInt(text, 10);
  return Number.isNaN(month) ? '1' : String(month);
}

const size = instance.getEnum('Size', { S: 's', M: undefined });
const state = instance.getEnum('State', {
  Resting: undefined,
  'Resting Signal': 'error',
  Focus: undefined,
  'Focus Signal': 'error',
  Disabled: 'disabled',
  'Read-Only': 'readonly',
});
const disabled = state === 'disabled';
const readonly = state === 'readonly';
const error = state === 'error';

const showLabel = instance.getBoolean('Label');
const labelPart = showLabel ? findNested('Label') : undefined;
const showHint = instance.getBoolean('Hint');
const hintPart = showHint ? findNested('Hint') : undefined;
// "Plain Message" exists only in the Signal variants.
const messagePart = error ? findNested('Plain Message') : undefined;

const label = labelPart?.getString('Text');
const optional = labelPart?.getBoolean('Optional')
  ? labelPart.getString('↪️ Optional').replace(/^\((.*)\)$/, '$1')
  : undefined;
const hasInfo = labelPart?.getBoolean('Info Button') ?? false;
const infoPart = hasInfo
  ? labelPart?.findLayers(
      (node) => node.type === 'INSTANCE' && node.name.startsWith('Info Button'),
      {
        traverseInstances: true,
      },
    )[0]
  : undefined;
const infoTemplate = infoPart?.type === 'INSTANCE' ? infoPart.executeTemplate() : undefined;
const region = instance.getString('Region');
const placeholder = instance.getBoolean('Placeholder')
  ? instance.getString('Placeholder Text')
  : undefined;
const value = instance.getBoolean('Filled') ? instance.getString('Filled Text') : undefined;
const season = instance.getBoolean('Season');
const seasonStart = toMonth(instance.getString('Season Start'));
const seasonEnd = toMonth(instance.getString('Season End'));
const hint = hintPart?.getString('Text');
const message = messagePart?.getString('Text');

// Plain Message has no type of its own; its icon's Signal Type follows the Signal Type variable mode.
const [signalIcon] =
  messagePart?.findLayers(
    (node) =>
      node.type === 'INSTANCE' && node.name.startsWith('Functional Signal Filled Icon Presets'),
    { traverseInstances: true },
  ) ?? [];
const status =
  signalIcon?.type === 'INSTANCE'
    ? signalIcon.getEnum('Signal Type', {
        Critical: undefined,
        Positive: 'positive',
        Warning: 'warning',
        Info: 'info',
      })
    : undefined;

const missingParts = [
  ['Label', showLabel, labelPart],
  ['Info Button', hasInfo, infoPart],
  ['Hint', showHint, hintPart],
  ['Plain Message', error, messagePart],
]
  .filter(([, shown, part]) => shown && !part)
  .map(([name]) => name);

const missingNote = missingParts.length
  ? `<!-- Could not find ${missingParts.join(', ')} in Figma. This snippet may be incomplete. -->\n`
  : '';

const formfieldAttributes = [
  ...(label ? [`label="${label}"`] : []),
  ...(optional ? [`optionalLabel="${optional}"`] : []),
  ...(size ? [`size="${size}"`] : []),
  ...(status ? [`status="${status}"`] : []),
];

const inputAttributes = [
  'nxInput',
  `nxLicensePlate="${season ? 'de_season' : 'de_standard'}"`,
  ...(placeholder ? [`placeholder="${placeholder}"`] : []),
  ...(value ? [`value="${value}"`] : []),
  ...(disabled ? ['disabled'] : []),
  ...(readonly ? ['readonly'] : []),
];

const formfieldImports = [
  'NxFormfieldComponent',
  'NxFormfieldPrefixDirective',
  ...(season ? ['NxFormfieldSuffixDirective'] : []),
  ...(hint ? ['NxFormfieldHintDirective'] : []),
  ...(error && !status ? ['NxFormfieldErrorDirective'] : []),
];
const licencePlateImports = [
  'NxLicencePlateValidatorDirective',
  'NxLicencePlateEuroPrefixComponent',
  ...(season ? ['NxLicencePlateSeasonSuffixComponent'] : []),
];
const baseImports = [
  ...(hasInfo ? ['NxLabelInfoDirective'] : []),
  ...(error && !status ? ['NxErrorComponent'] : []),
];
const messageLine = !error
  ? ''
  : status
    ? `\n  <span nxFormfieldStatusMessage>${message || '…'}</span>`
    : `\n  <nx-error nxFormfieldError>${message || '…'}</nx-error>`;

export default {
  example: figma.html`${missingNote}<nx-formfield ${formfieldAttributes.join(' ')}>${
    infoTemplate
      ? figma.html`
  <!-- Add nxLabelInfo to the info icon -->
  ${infoTemplate.example}`
      : ''
  }
  <nx-licence-plate-euro-prefix nxFormfieldPrefix>${region}</nx-licence-plate-euro-prefix>
  <input ${inputAttributes.join(' ')} />${
    season
      ? `\n  <nx-licence-plate-season-suffix nxFormfieldSuffix [startMonth]="${seasonStart}" [endMonth]="${seasonEnd}"></nx-licence-plate-season-suffix>`
      : ''
  }${hint ? `\n  <span nxFormfieldHint>${hint}</span>` : ''}${messageLine}
</nx-formfield>`,
  imports: [
    `import { ${formfieldImports.join(', ')} } from '@allianz/ng-aquila/formfield';`,
    "import { NxInputDirective } from '@allianz/ng-aquila/input';",
    `import { ${licencePlateImports.join(', ')} } from '@allianz/ng-aquila/licence-plate';`,
    ...(baseImports.length
      ? [`import { ${baseImports.join(', ')} } from '@allianz/ng-aquila/base';`]
      : []),
  ],
  id: 'nx-licence-plate',
  metadata: { nestable: true },
};
