// url=<A1_FILE>?node-id=70340-40125
// source=projects/ng-aquila/src/licence-plate/licence-plate.validator.ts
// component=NxLicencePlateValidatorDirective
/// <reference types="@figma/code-connect/figma-types-no-require" />
import figma from 'figma';

const instance = figma.selectedInstance;

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

const region = instance.getString('Region');
const placeholder = instance.getBoolean('Placeholder')
  ? instance.getString('Placeholder Text')
  : undefined;
const season = instance.getBoolean('Season');
const seasonStart = toMonth(instance.getString('Season Start'));
const seasonEnd = toMonth(instance.getString('Season End'));
// `Message` is on by default, but the Signal Button exists only in the Signal variants.
const showSignal = error && instance.getBoolean('Message');

const formfieldAttributes = ['inline', ...(size ? [`size="${size}"`] : [])];

const inputAttributes = [
  'nxInput',
  `nxLicensePlate="${season ? 'de_season' : 'de_standard'}"`,
  ...(placeholder ? [`placeholder="${placeholder}"`] : []),
  ...(disabled ? ['disabled'] : []),
  ...(readonly ? ['readonly'] : []),
  'nxAriaLabel="…"',
];

const signalButton = showSignal
  ? instance.findLayers(
      (node) => node.type === 'INSTANCE' && node.name.startsWith('Signal Button'),
      { traverseInstances: true },
    )[0]
  : undefined;
const signalTemplate =
  signalButton?.type === 'INSTANCE' ? signalButton.executeTemplate() : undefined;

const formfieldImports = [
  'NxFormfieldComponent',
  'NxFormfieldPrefixDirective',
  ...(season || showSignal ? ['NxFormfieldSuffixDirective'] : []),
  ...(error ? ['NxFormfieldErrorDirective'] : []),
];
const licencePlateImports = [
  'NxLicencePlateValidatorDirective',
  'NxLicencePlateEuroPrefixComponent',
  ...(season ? ['NxLicencePlateSeasonSuffixComponent'] : []),
];

export default {
  example: figma.html`<nx-formfield ${formfieldAttributes.join(' ')}>
  <nx-licence-plate-euro-prefix nxFormfieldPrefix>${region}</nx-licence-plate-euro-prefix>
  <input ${inputAttributes.join(' ')} />${
    season
      ? `\n  <nx-licence-plate-season-suffix nxFormfieldSuffix [startMonth]="${seasonStart}" [endMonth]="${seasonEnd}"></nx-licence-plate-season-suffix>`
      : ''
  }${
    signalTemplate
      ? figma.html`
  <!-- Add nxFormfieldSuffix and an aria-label to the signal button -->
  ${signalTemplate.example}`
      : showSignal
        ? '\n  <!-- Could not find Signal Button in Figma. Add <nx-signal-button nxFormfieldSuffix> here. -->'
        : ''
  }${error ? '\n  <nx-error nxFormfieldError><!-- error message --></nx-error>' : ''}
</nx-formfield>`,
  imports: [
    `import { ${formfieldImports.join(', ')} } from '@allianz/ng-aquila/formfield';`,
    "import { NxInputDirective } from '@allianz/ng-aquila/input';",
    `import { ${licencePlateImports.join(', ')} } from '@allianz/ng-aquila/licence-plate';`,
    ...(error ? ["import { NxErrorComponent } from '@allianz/ng-aquila/base';"] : []),
    ...(signalTemplate
      ? ["import { NxSignalButtonComponent } from '@allianz/ng-aquila/signal-button';"]
      : []),
  ],
  id: 'nx-licence-plate-inline',
  metadata: { nestable: true },
};
