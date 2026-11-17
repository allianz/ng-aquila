// url=<A1_FILE>?node-id=71400-9134
// source=projects/ng-aquila/src/progress-indicator/multi/multi-progress-indicator.component.ts
// component=NxMultiProgressIndicatorComponent
/// <reference types="@figma/code-connect/figma-types-no-require" />
import figma from 'figma';

const instance = figma.selectedInstance;

const numbered = instance.getEnum('Style', { Number: true, Checkmark: false });
const colorScheme = instance.getEnum('Color Role', { Default: undefined, Positive: 'positive' });

// The steps sit in the slot and have no template, so `getSlot()` would only return a marker.
const steps = instance
  .findLayers(
    (node) =>
      node.type === 'INSTANCE' &&
      (node.name === 'Step' || node.name.startsWith('Progress Indicator Step')),
    { traverseInstances: true },
  )
  .flatMap((node) => (node.type === 'INSTANCE' ? [node] : []))
  .map((step) => {
    const status = step.getEnum('Status', {
      Complete: ' completed',
      Current: ' current',
      Incomplete: '',
    });
    const critical = step.getString('State').includes('Critical') ? ' critical' : '';
    return figma.html`
  <nx-multi-progress-step${status ?? ''}${critical}>${step.getString('Label Text')}</nx-multi-progress-step>`;
  });
const missingNote = steps.length
  ? ''
  : '<!-- Could not find the steps in Figma. Add one nx-multi-progress-step per step. -->\n';

export default {
  example: figma.html`${missingNote}<nx-multi-progress-indicator aria-label="Name of the process" layout="horizontal-labels-below"${
    numbered ? '' : ' [numbered]="false"'
  }${colorScheme ? ` colorScheme="${colorScheme}"` : ''}>${steps}
</nx-multi-progress-indicator>`,
  imports: [
    "import { NxMultiProgressIndicatorComponent, NxMultiProgressStepComponent } from '@allianz/ng-aquila/progress-indicator';",
  ],
  id: 'nx-multi-progress-indicator-horizontal-labels-below',
  metadata: { nestable: true },
};
