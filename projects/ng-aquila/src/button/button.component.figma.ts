// url=<A1_FILE>?node-id=66971-2743
// source=projects/ng-aquila/src/button/button.component.ts
// component=NxButtonComponent
/// <reference types="@figma/code-connect/figma-types-no-require" />
import figma from 'figma';

const instance = figma.selectedInstance;

const label = instance.getString('Label Text');
const iconOnly = instance.getEnum('Icon Only', { True: true, False: false });
const type = instance.getEnum('Type', {
  Primary: 'primary',
  Secondary: 'secondary',
  Tertiary: 'tertiary',
  Elevated: 'elevated',
});
const size = instance.getEnum('Size', { S: 'small', M: undefined });
const colorRole = instance.getEnum('Color Role', {
  Default: undefined,
  Critical: 'critical',
  'Accent Attention': 'accent-attention',
  'On-Accent Attention': 'on-accent-attention',
});
const state = instance.getEnum('State', {
  Resting: undefined,
  Hover: undefined,
  Active: undefined,
  Disabled: 'disabled',
  Loading: 'loading',
});

// The button needs a position attribute on `nx-icon`, so it reads the icon name from the
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

const attributes = figma.html`${iconOnly ? 'nxIconButton' : 'nxButton'}="${type === 'elevated' ? 'primary' : type}"${
  size ? ` size="${size}"` : ''
}${colorRole === 'critical' ? ' critical' : ''}${
  colorRole && colorRole !== 'critical' ? ` colorScheme="${colorRole}"` : ''
}${state ? ` ${state}` : ''}`;
const elevatedNote =
  type === 'elevated' ? '<!-- Type "Elevated" is not available in code yet -->\n' : '';

export default {
  example: iconOnly
    ? figma.html`${elevatedNote}<button ${attributes} type="button" aria-label="${label}">
  ${renderIcon('')}${indicator}
</button>`
    : figma.html`${elevatedNote}<button ${attributes} type="button">
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
    "import { NxButtonModule } from '@allianz/ng-aquila/button';",
    ...(showIcon && iconName ? ["import { NxIconModule } from '@allianz/ng-aquila/icon';"] : []),
    ...(showIndicator ? ["import { NxIndicatorModule } from '@allianz/ng-aquila/indicator';"] : []),
  ],
  id: 'nx-button',
  metadata: { nestable: true },
};
