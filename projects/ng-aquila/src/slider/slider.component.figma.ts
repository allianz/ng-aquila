// url=<A1_FILE>?node-id=70581-20540
// source=projects/ng-aquila/src/slider/slider.component.ts
// component=NxSliderComponent
/// <reference types="@figma/code-connect/figma-types-no-require" />
import figma from 'figma';

const instance = figma.selectedInstance;

// The slider has no properties of its own. The label lives on the form group pattern, the slider
// itself on "Slider States", which sits in the pattern's content slot.
function findNested(root: Pick<typeof instance, 'findLayers'>, namePrefix: string) {
  const [found] = root.findLayers(
    (node) => node.type === 'INSTANCE' && node.name.startsWith(namePrefix),
    { traverseInstances: true },
  );
  return found && found.type === 'INSTANCE' ? found : undefined;
}
const pattern = findNested(instance, 'Form Group Pattern');
const slider = findNested(instance, 'Slider States');

const stateMap = {
  Resting: undefined,
  'Resting Signal': 'error',
  Disabled: 'disabled',
  'Read-Only': 'readonly',
};
const state = slider?.getEnum('State', stateMap);
const disabled = state === 'disabled';

const showLabel = pattern?.getBoolean('Label') ?? false;
const labelLayer = showLabel && pattern ? findNested(pattern, 'Label') : undefined;
const hintLayer = pattern?.getBoolean('Hint') ? findNested(pattern, 'Hint') : undefined;
const messageLayer =
  state === 'error' && pattern?.getBoolean('Message')
    ? findNested(pattern, 'Plain Message')
    : undefined;

const labelText = labelLayer?.getString('Text');
const hint = hintLayer?.getString('Text');
const optional = labelLayer?.getBoolean('Optional')
  ? labelLayer.getString('↪️ Optional').replace(/^\((.*)\)$/, '$1')
  : undefined;
const showInfo = labelLayer?.getBoolean('Info Button') ?? false;
// A plain label fits the `label` input. Anything richer needs a projected `nx-label`.
const projectLabel = !!labelLayer && (!!optional || !!hint || showInfo);

const showRangeLabels = slider?.getBoolean('Range Labels') ?? true;
// Numeric range label text becomes the bound itself, any other text a label formatter.
function rangeAttribute(property: string, boundInput: string, formatterInput: string) {
  const text = slider?.getString(property).trim() ?? '';
  if (text !== '' && Number.isFinite(Number(text))) {
    return `\n  [${boundInput}]="${Number(text)}"`;
  }
  if (text === '' || !showRangeLabels) {
    return '';
  }
  const literal = text.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/"/g, '&quot;');
  return `\n  [${formatterInput}]="() => '${literal}'"`;
}
const minAttribute = rangeAttribute('Label Start Text', 'min', 'labelMinFormatter');
const maxAttribute = rangeAttribute('Label End Text', 'max', 'labelMaxFormatter');

const missingParts = [
  ['Form Group Pattern', pattern],
  ['Slider States', slider],
  ...(showLabel ? [['Label', labelLayer]] : []),
]
  .filter(([, part]) => !part)
  .map(([name]) => name);
const missingNote = missingParts.length
  ? `<!-- Could not find ${missingParts.join(', ')} in Figma. This snippet may be incomplete. -->\n`
  : '';
const readonlyNote =
  state === 'readonly' ? '<!-- State "Read-Only" is not available in code yet -->\n' : '';

const attributes = `${minAttribute}${maxAttribute}${showRangeLabels ? '' : '\n  [hideLabels]="true"'}${disabled ? '\n  [disabled]="true"' : ''}${
  labelText && !projectLabel ? `\n  label="${labelText}"` : ''
}\n  [(value)]="value"`;

const label = projectLabel
  ? figma.html`
  <nx-label${disabled ? ' disabled' : ''}${optional ? ` optionalLabel="${optional}"` : ''}${
    hint ? ` hint="${hint}"` : ''
  }>${labelText}${
    showInfo
      ? figma.html`
    <nx-info-icon nxLabelInfo>…</nx-info-icon>
  `
      : ''
  }</nx-label>`
  : '';
const error = messageLayer
  ? figma.html`
  <nx-error>${messageLayer.getString('Text')}</nx-error>`
  : '';
const baseImports = [
  ...(projectLabel ? ['NxLabelComponent'] : []),
  ...(showInfo ? ['NxLabelInfoDirective'] : []),
  ...(messageLayer ? ['NxErrorComponent'] : []),
];

export default {
  example: figma.html`${missingNote}${readonlyNote}<nx-slider${attributes}>${label}${error}
</nx-slider>`,
  imports: [
    "import { NxSliderComponent } from '@allianz/ng-aquila/slider';",
    ...(baseImports.length
      ? [`import { ${baseImports.join(', ')} } from '@allianz/ng-aquila/base';`]
      : []),
    ...(showInfo ? ["import { NxInfoIconComponent } from '@allianz/ng-aquila/info-icon';"] : []),
  ],
  id: 'nx-slider',
  metadata: { nestable: true },
};
