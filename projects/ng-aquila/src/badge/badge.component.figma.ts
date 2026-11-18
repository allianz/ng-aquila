// url=<A1_FILE>?node-id=67735-56359
// source=projects/ng-aquila/src/badge/badge.component.ts
// component=NxBadgeComponent
/// <reference types="@figma/code-connect/figma-types-no-require" />
import figma from 'figma';

const instance = figma.selectedInstance;

const text = instance.getEnum('2+ Characters', { True: true, False: false })
  ? instance.getString('Label Text')
  : instance.getString('Character Text');
const colorRole = instance.getEnum('Color Role', {
  'Accent Subtle': 'accent-subtle',
  'Accent Attention': 'accent-attention',
  'Signal Subtle': 'signal-subtle',
  'Signal Attention': 'signal-attention',
  Brand: 'brand',
});
const disabled = instance.getEnum('State', { Resting: false, Disabled: true });

// The accent color and the signal type are Figma variable modes, which templates cannot read.
const signal = colorRole === 'signal-subtle' || colorRole === 'signal-attention';
const attention = colorRole === 'accent-attention' || colorRole === 'signal-attention';
const colorAttribute = colorRole === 'brand' ? ' accentColor="brand"' : '';
const colorNote =
  colorRole === 'brand'
    ? ''
    : signal
      ? '<!-- Set type="critical | warning | positive | info" to match the Signal Type variable mode. -->\n'
      : '<!-- Set accentColor="yellow | orange | red | purple | aqua | blue | teal | green | gray" to match the Accent Color variable mode. -->\n';
const iconNote = instance.getBoolean('🧪 Icon (Lab)')
  ? '<!-- A badge with an icon is not available in code yet. -->\n'
  : '';

export default {
  example: figma.html`${colorNote}${iconNote}<nx-badge${colorAttribute}${
    attention ? ' prominence="attention"' : ''
  }${disabled ? ' disabled' : ''}>${text}</nx-badge>`,
  imports: ["import { NxBadgeComponent } from '@allianz/ng-aquila/badge';"],
  id: 'nx-badge',
  metadata: { nestable: true },
};
