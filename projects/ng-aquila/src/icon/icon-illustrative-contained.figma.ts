// url=<A1_FILE>?node-id=71005-14273
// source=projects/ng-aquila/src/icon/icon.component.ts
// component=NxIconComponent
/// <reference types="@figma/code-connect/figma-types-no-require" />
import figma from 'figma';

const instance = figma.selectedInstance;

const size = instance.getEnum('Size', { L: 'l', XL: 'xl', '2XL': '2xl' });
const colorRole = instance.getEnum('Color Role', {
  Default: 'default',
  Emphasis: 'emphasis',
  'Accent Subtle': 'accent-subtle',
  'Accent Attention': 'accent-attention',
});
const secondary = instance.getEnum('On-Color Role', {
  Primary: false,
  Secondary: true,
  Accent: false,
});
const disabled = instance.getEnum('State', { Resting: false, Disabled: true });

const accent = colorRole === 'accent-subtle' || colorRole === 'accent-attention';
const type = accent ? colorRole : secondary ? 'secondary' : undefined;
// `emphasis` draws the surface by itself, so it replaces `contained`.
const surface = colorRole === 'emphasis' ? 'emphasis' : 'contained';

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
  ...(accent
    ? ['Set accentColor="yellow | orange | red | purple | aqua | teal | green | gray" if not blue.']
    : []),
  ...(disabled ? ['State "Disabled" is not available in code yet.'] : []),
]
  .map((note) => `<!-- ${note} -->\n`)
  .join('');

export default {
  example: figma.html`${iconNote}${notes}<nx-icon name="${iconName ?? '…'}" ${surface}${
    type ? ` type="${type}"` : ''
  } size="${size}" aria-hidden="true"></nx-icon>`,
  imports: ["import { NxIconComponent } from '@allianz/ng-aquila/icon';"],
  id: 'nx-icon-illustrative-contained',
  metadata: { nestable: true, props: { name: iconName } },
};
