// url=<A1_FILE>?node-id=70718-63947
// source=projects/ng-aquila/src/toggle-button/toggle-button-group.component.ts
// component=NxToggleButtonGroupComponent
/// <reference types="@figma/code-connect/figma-types-no-require" />
import figma from 'figma';

const instance = figma.selectedInstance;

// The group has no properties of its own, everything lives on the nested form group pattern.
function findNested(root: Pick<typeof instance, 'findLayers'>, namePrefix: string) {
  const [found] = root.findLayers(
    (node) => node.type === 'INSTANCE' && node.name.startsWith(namePrefix),
    { traverseInstances: true },
  );
  return found && found.type === 'INSTANCE' ? found : undefined;
}
const pattern = findNested(instance, 'Form Group Pattern');

const state = pattern?.getEnum('State', {
  Resting: undefined,
  'Resting Signal': undefined,
  Disabled: 'disabled',
  'Read-Only': 'readonly',
});
const showLabel = pattern?.getBoolean('Label') ?? false;
const labelLayer = showLabel && pattern ? findNested(pattern, 'Label') : undefined;
const hintLayer = pattern?.getBoolean('Hint') ? findNested(pattern, 'Hint') : undefined;
const messageLayer =
  pattern?.getString('State') === 'Resting Signal' && pattern.getBoolean('Message')
    ? findNested(pattern, 'Plain Message')
    : undefined;

const hint = hintLayer?.getString('Text');
const optional = labelLayer?.getBoolean('Optional')
  ? labelLayer.getString('↪️ Optional').replace(/^\((.*)\)$/, '$1')
  : undefined;
const showInfo = labelLayer?.getBoolean('Info Button') ?? false;
const slot = pattern?.getSlot('Content Slot');
const buttons = slot?.connectedInstances ?? [];
const content = buttons.length
  ? buttons.reduce(
      (html, button, index) =>
        figma.html`${html}${index ? '\n  ' : ''}${button.executeTemplate().example}`,
      figma.html``,
    )
  : slot;

const missingParts = [
  ['Form Group Pattern', pattern],
  ...(showLabel ? [['Label', labelLayer]] : []),
  ...(pattern?.getBoolean('Hint') ? [['Hint', hintLayer]] : []),
  ...(pattern?.getString('State') === 'Resting Signal' && pattern.getBoolean('Message')
    ? [['Plain Message', messageLayer]]
    : []),
]
  .filter(([, part]) => !part)
  .map(([name]) => name);
const missingNote = missingParts.length
  ? `<!-- Could not find ${missingParts.join(', ')} in Figma. This snippet may be incomplete. -->\n`
  : '';

const label = labelLayer
  ? figma.html`
  <nx-label${optional ? ` optionalLabel="${optional}"` : ''}${hint ? ` hint="${hint}"` : ''}>${labelLayer.getString('Text')}${
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
  ...(labelLayer ? ['NxLabelComponent'] : []),
  ...(showInfo ? ['NxLabelInfoDirective'] : []),
  ...(messageLayer ? ['NxErrorComponent'] : []),
];

export default {
  example: figma.html`${missingNote}<nx-toggle-button-group${state ? ` ${state}` : ''}>${label}
  ${content}${error}
</nx-toggle-button-group>`,
  imports: [
    "import { NxToggleButtonComponent, NxToggleButtonGroupComponent } from '@allianz/ng-aquila/toggle-button';",
    ...(baseImports.length
      ? [`import { ${baseImports.join(', ')} } from '@allianz/ng-aquila/base';`]
      : []),
    ...(showInfo ? ["import { NxInfoIconComponent } from '@allianz/ng-aquila/info-icon';"] : []),
  ],
  id: 'nx-toggle-button-group',
  metadata: { nestable: true },
};
