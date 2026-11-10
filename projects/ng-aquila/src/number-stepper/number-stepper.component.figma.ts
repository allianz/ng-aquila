// url=<A1_FILE>?node-id=70580-15488
// source=projects/ng-aquila/src/number-stepper/number-stepper.component.ts
// component=NxNumberStepperComponent
/// <reference types="@figma/code-connect/figma-types-no-require" />
import type { InstanceHandle } from 'figma';
import figma from 'figma';

interface LabelModel {
  readonly text: string;
  readonly optional?: string;
  readonly hint?: string;
  readonly info: boolean;
}

interface NumberStepperModel {
  readonly size?: 'm';
  readonly state?: 'error' | 'disabled' | 'readonly';
  readonly label?: LabelModel;
  readonly prefix?: string;
  readonly suffix?: string;
  readonly message?: string;
  readonly missingParts: readonly string[];
}

function readLabel(labelLayer: InstanceHandle, hint: string | undefined): LabelModel {
  return {
    text: labelLayer.getString('Text'),
    optional: labelLayer.getBoolean('Optional')
      ? labelLayer.getString('↪️ Optional').replace(/^\((.*)\)$/, '$1')
      : undefined,
    hint,
    info: labelLayer.getBoolean('Info Button'),
  };
}

// The number stepper has no properties of its own. Label, hint and message live on the form group
// pattern, size and state on "Number Stepper States" in its content slot.
function readModel(instance: InstanceHandle): NumberStepperModel {
  function findNested(namePrefix: string) {
    const [found] = instance.findLayers(
      (node) => node.type === 'INSTANCE' && node.name.startsWith(namePrefix),
      { traverseInstances: true },
    );
    return found && found.type === 'INSTANCE' ? found : undefined;
  }

  const pattern = findNested('Form Group Pattern');
  const stepper = findNested('Number Stepper States');
  const field = findNested('Text Input Inline');

  const state = stepper?.getEnum('State', {
    Resting: undefined,
    'Resting Signal': 'error',
    Disabled: 'disabled',
    'Read-Only': 'readonly',
  } as const);

  const showLabel = pattern?.getBoolean('Label') ?? false;
  const showHint = pattern?.getBoolean('Hint') ?? false;
  // `Message` is on by default, but "Plain Message" exists only in the pattern's Signal variant.
  const showMessage = state === 'error' && (pattern?.getBoolean('Message') ?? false);
  const labelLayer = showLabel ? findNested('Label') : undefined;
  const hintLayer = showHint ? findNested('Hint') : undefined;
  const messageLayer = showMessage ? findNested('Plain Message') : undefined;

  const parts: readonly (readonly [string, unknown])[] = [
    ['Form Group Pattern', pattern],
    ['Number Stepper States', stepper],
    ['Text Input Inline', field],
    ...(showLabel ? [['Label', labelLayer] as const] : []),
    ...(showHint ? [['Hint', hintLayer] as const] : []),
    ...(showMessage ? [['Plain Message', messageLayer] as const] : []),
  ];

  return {
    size: stepper?.getEnum('Size', { S: undefined, M: 'm' } as const),
    state,
    label: labelLayer ? readLabel(labelLayer, hintLayer?.getString('Text')) : undefined,
    prefix: field?.getBoolean('Prefix Unit') ? field.getString('Prefix Unit Text') : undefined,
    suffix: field?.getBoolean('Postfix Unit') ? field.getString('Postfix Unit Text') : undefined,
    message: messageLayer?.getString('Text'),
    missingParts: parts.filter(([, part]) => !part).map(([name]) => name),
  };
}

// A plain label fits the `label` input. Anything richer needs a projected `nx-label`.
function isProjectedLabel({ optional, hint, info }: LabelModel): boolean {
  return !!optional || !!hint || info;
}

function renderMissingNote({ missingParts }: NumberStepperModel): string {
  return missingParts.length
    ? `<!-- Could not find ${missingParts.join(', ')} in Figma. This snippet may be incomplete. -->\n`
    : '';
}

function renderAttributes({ size, state, label }: NumberStepperModel): string {
  return [
    size ? `size="${size}"` : '',
    label && !isProjectedLabel(label) ? `label="${label.text}"` : '',
    label ? '' : 'inputAriaLabel="…"',
    state === 'disabled' || state === 'readonly' ? state : '',
  ]
    .filter(Boolean)
    .map((attribute) => `\n  ${attribute}`)
    .join('');
}

function renderLabel({ label, state }: NumberStepperModel): string {
  if (!label || !isProjectedLabel(label)) {
    return '';
  }
  const attributes = `${state === 'disabled' ? ' disabled' : ''}${
    label.optional ? ` optionalLabel="${label.optional}"` : ''
  }${label.hint ? ` hint="${label.hint}"` : ''}`;
  const info = label.info
    ? `\n    <nx-info-icon nxLabelInfo${state === 'disabled' ? ' disabled' : ''}>…</nx-info-icon>\n  `
    : '';
  return `\n  <nx-label${attributes}>${label.text}${info}</nx-label>`;
}

function renderContent(model: NumberStepperModel): string {
  const { prefix, suffix, message } = model;
  return [
    renderLabel(model),
    prefix ? `\n  <nx-number-stepper-prefix>${prefix}</nx-number-stepper-prefix>` : '',
    suffix ? `\n  <nx-number-stepper-suffix>${suffix}</nx-number-stepper-suffix>` : '',
    message ? `\n  <nx-error>${message}</nx-error>` : '',
  ].join('');
}

function renderImports({ label, prefix, suffix, message }: NumberStepperModel): string[] {
  const stepperImports = [
    'NxNumberStepperComponent',
    ...(prefix ? ['NxNumberStepperPrefixDirective'] : []),
    ...(suffix ? ['NxNumberStepperSuffixDirective'] : []),
  ];
  const baseImports = [
    ...(label && isProjectedLabel(label) ? ['NxLabelComponent'] : []),
    ...(label?.info ? ['NxLabelInfoDirective'] : []),
    ...(message ? ['NxErrorComponent'] : []),
  ];
  return [
    `import { ${stepperImports.join(', ')} } from '@allianz/ng-aquila/number-stepper';`,
    ...(baseImports.length
      ? [`import { ${baseImports.join(', ')} } from '@allianz/ng-aquila/base';`]
      : []),
    ...(label?.info ? ["import { NxInfoIconComponent } from '@allianz/ng-aquila/info-icon';"] : []),
  ];
}

const model = readModel(figma.selectedInstance);
const attributes = renderAttributes(model);

export default {
  example: figma.html`${renderMissingNote(model)}<nx-number-stepper${attributes}${attributes ? '\n' : ''}>${renderContent(model)}
</nx-number-stepper>`,
  imports: renderImports(model),
  id: 'nx-number-stepper',
  metadata: { nestable: true },
};
