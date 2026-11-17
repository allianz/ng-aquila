// url=<A1_FILE>?node-id=1-1279
// source=projects/ng-aquila/src/icon/status-icon/status-icon.component.ts
// component=NxStatusIconComponent
/// <reference types="@figma/code-connect/figma-types-no-require" />
import figma from 'figma';

const instance = figma.selectedInstance;

const size = instance.getEnum('Size', { S: 's', M: 'm' });

// The signal type belongs to the nested icon preset, which has no exposed property.
const [preset] = instance.findLayers(
  (node) => node.type === 'INSTANCE' && 'Signal Type' in node.properties,
  { traverseInstances: true },
);
const type =
  preset?.type === 'INSTANCE'
    ? preset.getEnum('Signal Type', {
        Positive: 'positive',
        Critical: 'critical',
        Warning: 'warning',
        Info: 'info',
      })
    : undefined;
const missingNote = type
  ? ''
  : '<!-- Could not find the signal type in Figma. Set type="positive | critical | warning | info". -->\n';

export default {
  example: figma.html`${missingNote}<nx-status-icon type="${type ?? 'info'}" size="${size}"></nx-status-icon>`,
  imports: ["import { NxStatusIconComponent } from '@allianz/ng-aquila/icon';"],
  id: 'nx-status-icon-functional',
  metadata: { nestable: true, props: { type } },
};
