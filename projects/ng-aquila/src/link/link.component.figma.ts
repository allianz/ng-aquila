// url=<A1_FILE>?node-id=67324-16987
// source=projects/ng-aquila/src/link/link.component.ts
// component=NxLinkComponent
/// <reference types="@figma/code-connect/figma-types-no-require" />
import figma from 'figma';

const instance = figma.selectedInstance;

const label = instance.getString('Text').trim();
const iconOnly = instance.getEnum('Icon Only', { True: true, False: false });
// Size M is the A1 default (`large`).
const size = instance.getEnum('Size', { M: undefined, S: 'small' });
const type = instance.getEnum('Color Role', { Primary: undefined, Secondary: 'secondary' });
const prominence = instance.getEnum('Prominence', { Default: undefined, Subtle: 'subtle' });
const disabled = instance.getEnum('State', {
  Resting: false,
  Hover: false,
  Active: false,
  Disabled: true,
});

// Reads the icon name from the icon template, like the button does.
const iconSwap = instance.getInstanceSwap('Icon Name');
const iconTemplate =
  iconSwap && iconSwap.type === 'INSTANCE' ? iconSwap.executeTemplate() : undefined;
const iconName = iconTemplate?.metadata?.props?.name;
const iconStart = !iconOnly && instance.getBoolean('Icon Start');
const iconEnd = !iconOnly && instance.getBoolean('Icon End');
const showIcon = iconOnly || iconStart || iconEnd;
const icon = iconName
  ? figma.html`<nx-icon name="${iconName}" aria-hidden="true"></nx-icon>`
  : figma.html`<!-- The icon name is not available. Use <nx-icon name="…" aria-hidden="true"></nx-icon> -->${
      iconTemplate
        ? figma.html`
    ${iconTemplate.example}`
        : ''
    }`;

// `icon-right` moves the icon with CSS, so the icon always comes first in the markup.
const nxStyle = iconOnly ? 'icon-only' : iconEnd && !iconStart ? 'icon-right' : undefined;
const bothIconsNote =
  iconStart && iconEnd
    ? '<!-- A link shows one icon, at the start or the end. Icon Start and Icon End are both on in Figma. -->\n'
    : '';

const linkAttributes = `${nxStyle ? ` nxStyle="${nxStyle}"` : ''}${size ? ` size="${size}"` : ''}${
  type ? ` type="${type}"` : ''
}${prominence ? ` prominence="${prominence}"` : ''}`;
const anchorAttributes = `${disabled ? ' aria-disabled="true"' : ' href="#"'}${
  iconOnly ? ` aria-label="${label}"` : ''
}`;

export default {
  example: figma.html`${bothIconsNote}<nx-link${linkAttributes}>
  <a${anchorAttributes}>${
    showIcon
      ? figma.html`
    ${icon}`
      : ''
  }${
    iconOnly
      ? figma.html`
  `
      : showIcon
        ? figma.html`
    ${label}
  `
        : label
  }</a>
</nx-link>`,
  imports: [
    "import { NxLinkComponent } from '@allianz/ng-aquila/link';",
    ...(showIcon && iconName ? ["import { NxIconComponent } from '@allianz/ng-aquila/icon';"] : []),
  ],
  id: 'nx-link',
  metadata: { nestable: true },
};
