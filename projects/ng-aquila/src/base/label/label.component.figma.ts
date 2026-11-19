// url=<A1_FILE>?node-id=1-254
// source=projects/ng-aquila/src/base/label/label.component.ts
// component=NxLabelComponent
/// <reference types="@figma/code-connect/figma-types-no-require" />
import figma from 'figma';

const instance = figma.selectedInstance;

const text = instance.getString('Text');
// The label adds the parentheses itself, Figma has them in the text.
const optionalLabel = instance.getBoolean('Optional')
  ? instance
      .getString('↪️ Optional')
      .trim()
      .replace(/^\((.*)\)$/, '$1')
  : undefined;
const hasInfo = instance.getBoolean('Info Button');
const disabled = instance.getEnum('State', { Disabled: true });
const infoInstance = hasInfo ? instance.findConnectedInstance('nx-info-icon') : undefined;
const infoTemplate = infoInstance?.executeTemplate();
const info = infoTemplate
  ? figma.html`
  ${infoTemplate.example}`
  : '\n  <nx-info-icon nxLabelInfo>\n    <!-- popover text goes here -->\n  </nx-info-icon>';

export default {
  example: figma.html`<nx-label${disabled ? ' disabled' : ''}${
    optionalLabel ? ` optionalLabel="${optionalLabel}"` : ''
  }>
  ${text}${hasInfo ? info : ''}
</nx-label>`,
  imports: [
    hasInfo
      ? "import { NxLabelComponent, NxLabelInfoDirective } from '@allianz/ng-aquila/base';"
      : "import { NxLabelComponent } from '@allianz/ng-aquila/base';",
    ...(hasInfo ? ["import { NxInfoIconComponent } from '@allianz/ng-aquila/info-icon';"] : []),
  ],
  id: 'nx-label',
  metadata: { nestable: true },
};
