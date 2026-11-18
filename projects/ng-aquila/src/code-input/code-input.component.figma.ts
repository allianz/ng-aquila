// url=<A1_FILE>?node-id=70423-13398
// source=projects/ng-aquila/src/code-input/code-input.component.ts
// component=NxCodeInputComponent
/// <reference types="@figma/code-connect/figma-types-no-require" />
import type { InstanceHandle } from 'figma';
import figma from 'figma';

const instance = figma.selectedInstance;

// The code input has no properties of its own. The label lives on the form group pattern, the
// fields in its content slot, and the number of fields is the code length.
function findNested(root: Pick<typeof instance, 'findLayers'>, namePrefix: string) {
  const [found] = root.findLayers(
    (node) => node.type === 'INSTANCE' && node.name.startsWith(namePrefix),
    { traverseInstances: true },
  );
  return found && found.type === 'INSTANCE' ? found : undefined;
}
const pattern = findNested(instance, 'Form Group Pattern');

const fields = instance
  .findLayers((node) => node.type === 'INSTANCE' && node.name.startsWith('Code Input Field'), {
    traverseInstances: true,
  })
  .filter((node): node is InstanceHandle => node.type === 'INSTANCE');
const [field] = fields;

const stateMap = {
  Resting: undefined,
  'Resting Signal': 'error',
  Focus: undefined,
  'Focus Signal': 'error',
  Disabled: 'disabled',
  'Read-Only': 'readonly',
};
const state = pattern?.getEnum('State', stateMap) ?? field?.getEnum('State', stateMap);
const disabled = state === 'disabled';
const hasError = state === 'error';

const showLabel = pattern?.getBoolean('Label') ?? false;
const labelLayer = showLabel && pattern ? findNested(pattern, 'Label') : undefined;
const hintLayer = pattern?.getBoolean('Hint') ? findNested(pattern, 'Hint') : undefined;
const messageLayer =
  hasError && pattern?.getBoolean('Message') ? findNested(pattern, 'Plain Message') : undefined;

const hint = hintLayer?.getString('Text');

const missingParts = [
  ['Form Group Pattern', pattern],
  ['Code Input Field', field],
  ...(showLabel ? [['Label', labelLayer]] : []),
  ...(pattern?.getBoolean('Hint') ? [['Hint', hintLayer]] : []),
  ...(hasError && pattern?.getBoolean('Message') ? [['Plain Message', messageLayer]] : []),
]
  .filter(([, part]) => !part)
  .map(([name]) => name);
const missingNote = missingParts.length
  ? `<!-- Could not find ${missingParts.join(', ')} in Figma. This snippet may be incomplete. -->\n`
  : '';
const readonlyNote =
  state === 'readonly' ? '<!-- State "Read-Only" is not available in code yet -->\n' : '';

const attributes = `${fields.length && fields.length !== 6 ? ` [length]="${fields.length}"` : ''}${
  disabled ? ' disabled' : ''
}`;

// `nx-code-input` has no label of its own, so the label sits next to it.
const label = labelLayer
  ? figma.html`${labelLayer.executeTemplate().example}
`
  : '';
// In code the hint is an input of `nx-label`, but the nested label template cannot see the Hint layer.
const hintNote = hint ? `<!-- Hint: add hint="${hint}" to nx-label -->\n` : '';
const error = messageLayer
  ? figma.html`
  <nx-error>${messageLayer.getString('Text')}</nx-error>
`
  : '';

export default {
  example: figma.html`${missingNote}${readonlyNote}${hintNote}${label}<nx-code-input${attributes}>${error}</nx-code-input>`,
  imports: [
    "import { NxCodeInputComponent } from '@allianz/ng-aquila/code-input';",
    ...(messageLayer ? ["import { NxErrorComponent } from '@allianz/ng-aquila/base';"] : []),
  ],
  id: 'nx-code-input',
  metadata: { nestable: true },
};
