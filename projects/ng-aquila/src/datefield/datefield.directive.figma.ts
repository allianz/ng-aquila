// url=<A1_FILE>?node-id=70571-15241
// source=projects/ng-aquila/src/datefield/datefield.directive.ts
// component=NxDatefieldDirective
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

// The date input has no properties of its own. Everything lives on the nested "Text Input".
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
const placeholder = field?.getBoolean('Placeholder')
  ? field.getString('Placeholder Text')
  : undefined;
const hint = hintPart?.getString('Text');
const message = messagePart?.getString('Text');
const toggle = field?.getBoolean('Postfix Button') ?? false;

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

const formfieldAttributes = `${label ? ` label="${label}"` : ''}${
  optional ? ` optionalLabel="${optional}"` : ''
}${size ? ` size="${size}"` : ''}`;

const inputAttributes = [
  'nxDatefield',
  'nxInput',
  ...(toggle ? ['[datepicker]="picker"'] : []),
  ...(placeholder ? [`placeholder="${placeholder}"`] : []),
  ...(label ? [] : ['nxAriaLabel="…"']),
  ...(disabled ? [state] : []),
  ...(readonly ? ['[readonly]="true"'] : []),
];

const datefieldImports = [
  'NxDatefieldDirective',
  ...(toggle ? ['NxDatepickerComponent', 'NxDatepickerToggleComponent'] : []),
];
const formfieldImports = [
  'NxFormfieldComponent',
  ...(hint ? ['NxFormfieldHintDirective'] : []),
  ...(message ? ['NxFormfieldErrorDirective'] : []),
  ...(toggle ? ['NxFormfieldSuffixDirective'] : []),
];
const baseImports = [
  ...(hasInfo ? ['NxLabelInfoDirective'] : []),
  ...(message ? ['NxErrorComponent'] : []),
];

export default {
  example: figma.html`${missingNote}<nx-formfield${formfieldAttributes}>
  <input
${inputAttributes.map((attribute) => `    ${attribute}\n`).join('')}  />${
    hasInfo ? '\n  <nx-info-icon nxLabelInfo>…</nx-info-icon>' : ''
  }${hint ? `\n  <span nxFormfieldHint>${hint}</span>` : ''}${
    message ? `\n  <nx-error nxFormfieldError>${message}</nx-error>` : ''
  }${
    toggle
      ? '\n  <nx-datepicker-toggle [for]="picker" nxFormfieldSuffix></nx-datepicker-toggle>\n  <nx-datepicker #picker></nx-datepicker>'
      : ''
  }
</nx-formfield>`,
  imports: [
    `import { ${datefieldImports.join(', ')} } from '@allianz/ng-aquila/datefield';`,
    `import { ${formfieldImports.join(', ')} } from '@allianz/ng-aquila/formfield';`,
    "import { NxInputDirective } from '@allianz/ng-aquila/input';",
    ...(baseImports.length
      ? [`import { ${baseImports.join(', ')} } from '@allianz/ng-aquila/base';`]
      : []),
    ...(hasInfo ? ["import { NxInfoIconComponent } from '@allianz/ng-aquila/info-icon';"] : []),
  ],
  id: 'nx-datefield',
  metadata: { nestable: true },
};
