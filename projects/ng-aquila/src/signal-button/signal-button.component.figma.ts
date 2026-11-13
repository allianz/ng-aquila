// url=<A1_FILE>?node-id=66569-10385
// source=projects/ng-aquila/src/signal-button/signal-button.component.ts
// component=NxSignalButtonComponent
/// <reference types="@figma/code-connect/figma-types-no-require" />
import figma from 'figma';

const instance = figma.selectedInstance;

const size = instance.getEnum('Size', { S: 's', M: undefined });
const disabled = instance.getEnum('State', {
  Resting: false,
  Hover: false,
  Active: false,
  Disabled: true,
});

// The signal type belongs to the nested icon preset, which has no exposed property.
const [iconPreset] = instance.findLayers(
  (node) =>
    node.type === 'INSTANCE' && node.name.startsWith('Functional Signal Filled Icon Presets'),
  { traverseInstances: true },
);
const context =
  iconPreset?.type === 'INSTANCE'
    ? iconPreset.getEnum('Signal Type', {
        Positive: 'positive',
        Critical: 'critical',
        Warning: 'warning',
        Info: 'info',
      })
    : undefined;
const missingNote = context
  ? ''
  : '<!-- Could not find the signal type in Figma. Set context="positive | critical | warning | info". -->\n';

export default {
  example: figma.html`${missingNote}<nx-signal-button${context ? ` context="${context}"` : ''}${
    size ? ` size="${size}"` : ''
  }${disabled ? ' disabled' : ''}>
  <!-- Popover content -->
</nx-signal-button>`,
  imports: ["import { NxSignalButtonComponent } from '@allianz/ng-aquila/signal-button';"],
  id: 'nx-signal-button',
  metadata: { nestable: true },
};
