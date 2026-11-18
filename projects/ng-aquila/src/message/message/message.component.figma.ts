// url=<A1_FILE>?node-id=1-264
// source=projects/ng-aquila/src/message/message/message.component.ts
// component=NxMessageComponent
/// <reference types="@figma/code-connect/figma-types-no-require" />
import figma from 'figma';

const instance = figma.selectedInstance;

const [signal] = instance.findLayers(
  (n) => n.type === 'INSTANCE' && n.name.startsWith('Functional Signal Filled Icon Presets'),
  { traverseInstances: true },
);
const context =
  signal?.type === 'INSTANCE'
    ? signal.getEnum('Signal Type', {
        Info: 'info',
        Critical: 'critical',
        Positive: 'positive',
        Warning: 'warning',
      })
    : undefined;
const contextNote = context
  ? ''
  : '<!-- The signal type is not available. Set context to "info", "critical", "positive" or "warning". -->\n';

export default {
  example: figma.html`${contextNote}<nx-message${context ? ` context="${context}"` : ''} [contained]="false">
  ${instance.getString('Text')}
</nx-message>`,
  imports: ["import { NxMessageComponent } from '@allianz/ng-aquila/message';"],
  id: 'nx-message-plain',
  metadata: { nestable: true },
};
