// url=<A1_FILE>?node-id=66953-59274
// source=projects/ng-aquila/src/button/plain-button.component.ts
// component=NxPlainButtonComponent
/// <reference types="@figma/code-connect/figma-types-no-require" />
import figma from 'figma';

const instance = figma.selectedInstance;

const label = instance.getString('Label Text');
const iconOnly = instance.getEnum('Icon Only', { True: true, False: false });
const variant = instance.getEnum('Type', { Primary: undefined, Secondary: 'secondary' });
const size = instance.getEnum('Size', { S: 's', M: undefined });
const colorRole = instance.getEnum('Color Role', {
  Default: undefined,
  Critical: 'critical',
  'On-Accent Attention': 'on-accent-attention',
  'On-Brand': 'on-brand',
});
const disabled = instance.getEnum('State', {
  Resting: false,
  Hover: false,
  Active: false,
  Disabled: true,
});

// The plain button needs a position attribute on `nx-icon`, so it reads the icon name from the
// icon template instead of reusing that template's snippet.
const iconSwap = instance.getInstanceSwap('Icon Name');
const iconTemplate =
  iconSwap && iconSwap.type === 'INSTANCE' ? iconSwap.executeTemplate() : undefined;
const iconName = iconTemplate?.metadata?.props?.name;
const iconStart = !iconOnly && instance.getBoolean('Icon Start');
const iconEnd = !iconOnly && instance.getBoolean('Icon End');
const showIcon = iconOnly || iconStart || iconEnd;
function renderIcon(position: string) {
  if (iconName) {
    return figma.html`<nx-icon name="${iconName}"${position} aria-hidden="true"></nx-icon>`;
  }
  return figma.html`<!-- The icon name is not available. Use <nx-icon name="…"${position} aria-hidden="true"></nx-icon> -->${
    iconTemplate
      ? figma.html`
  ${iconTemplate.example}`
      : ''
  }`;
}

const showIndicator = iconOnly && instance.getBoolean('Indicator');
const indicatorText = showIndicator
  ? instance.findText('Text', { traverseInstances: true })
  : undefined;
const indicator = showIndicator
  ? figma.html`
  <nx-indicator position="over-icon">${indicatorText?.type === 'TEXT' ? indicatorText.textContent : ''}</nx-indicator>`
  : '';

const attributes = figma.html`nxPlainButton${variant ? ` variant="${variant}"` : ''}${
  size ? ` size="${size}"` : ''
}${colorRole === 'critical' ? ' critical' : ''}${
  colorRole && colorRole !== 'critical' ? ` colorScheme="${colorRole}"` : ''
}${disabled ? ' disabled' : ''}`;

export default {
  example: iconOnly
    ? figma.html`<button ${attributes} type="button" aria-label="${label}">
  ${renderIcon('')}${indicator}
</button>`
    : figma.html`<button ${attributes} type="button">
  ${
    iconStart
      ? figma.html`${renderIcon(' nxIconPositionStart')}
  `
      : ''
  }${label}${
    iconEnd
      ? figma.html`
  ${renderIcon(' nxIconPositionEnd')}`
      : ''
  }
</button>`,
  imports: [
    "import { NxPlainButtonComponent } from '@allianz/ng-aquila/button';",
    ...(showIcon && iconName ? ["import { NxIconComponent } from '@allianz/ng-aquila/icon';"] : []),
    ...(showIndicator
      ? ["import { NxIndicatorComponent } from '@allianz/ng-aquila/indicator';"]
      : []),
  ],
  id: 'nx-plain-button',
  metadata: { nestable: true },
};
