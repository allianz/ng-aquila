// url=<A1_FILE>?node-id=1-1321
// source=projects/ng-aquila/src/icon/icon.component.ts
// component=NxIconComponent
/// <reference types="@figma/code-connect/figma-types-no-require" />
import figma from 'figma';

const instance = figma.selectedInstance;

const size = instance.getEnum('Size', { S: 's', M: 'm' });
const type = instance.getEnum('Color Role', {
  Primary: 'primary',
  Secondary: 'secondary',
  'Accent Attention': 'accent-attention',
});
const disabled = instance.getEnum('State', { Resting: false, Disabled: true });

const iconSwap = instance.getInstanceSwap('Icon Name');
const iconTemplate =
  iconSwap && iconSwap.type === 'INSTANCE' ? iconSwap.executeTemplate() : undefined;
const iconName = iconTemplate?.metadata?.props?.name;
// The icon template writes its own comment for icons without a code name. For icons without a
// template, Figma's placeholder is the only hint which icon was picked.
const iconNote = iconName
  ? ''
  : iconTemplate && 'name' in (iconTemplate.metadata?.props ?? {})
    ? figma.html`${iconTemplate.example}\n`
    : figma.html`<!-- The icon name is not available. Set name="…". -->\n${
        iconTemplate ? figma.html`${iconTemplate.example}\n` : ''
      }`;

const notes = [
  // Figma sets the accent color with a variable mode, which templates cannot read.
  ...(type === 'accent-attention'
    ? ['Set accentColor="yellow | orange | red | purple | aqua | teal | green | gray" if not blue.']
    : []),
  ...(disabled ? ['State "Disabled" is not available in code yet.'] : []),
]
  .map((note) => `<!-- ${note} -->\n`)
  .join('');

export default {
  example: figma.html`${iconNote}${notes}<nx-icon name="${iconName ?? '…'}"${
    type ? ` type="${type}"` : ''
  } size="${size}" aria-hidden="true"></nx-icon>`,
  imports: ["import { NxIconComponent } from '@allianz/ng-aquila/icon';"],
  id: 'nx-icon-filetype',
  metadata: { nestable: true, props: { name: iconName } },
};
