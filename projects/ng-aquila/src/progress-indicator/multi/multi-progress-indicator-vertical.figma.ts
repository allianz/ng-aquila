// url=<A1_FILE>?node-id=71360-104792
// source=projects/ng-aquila/src/progress-indicator/multi/multi-progress-indicator.component.ts
// component=NxMultiProgressIndicatorComponent
/// <reference types="@figma/code-connect/figma-types-no-require" />
import figma from 'figma';

const instance = figma.selectedInstance;

const layout = instance.getEnum('Labels', { True: 'vertical', False: 'vertical-no-labels' });
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
    const critical =
      step.getEnum('State', {
        'Resting Critical': ' critical',
        'Hover Critical': ' critical',
        'Active Critical': ' critical',
      }) ?? '';
    return { status: status ?? '', critical, label: step.getString('Label Text') };
  });
const stepsHtml = steps.map(
  ({ status, critical, label }) => figma.html`
  <nx-multi-progress-step${status}${critical}>${label}</nx-multi-progress-step>`,
);
const missingNote = steps.length
  ? ''
  : '<!-- Could not find the steps in Figma. Add one nx-multi-progress-step per step. -->\n';
const criticalNote = steps.some((step) => step.critical)
  ? '<!-- Tell the user why a step is critical, for example with nxTooltip. Screen readers only announce it as not completed. -->\n'
  : '';

export default {
  example: figma.html`${missingNote}${criticalNote}<nx-multi-progress-indicator aria-label="…" layout="${layout}"${
    numbered ? '' : ' [numbered]="false"'
  }${colorScheme ? ` colorScheme="${colorScheme}"` : ''}>${stepsHtml}
</nx-multi-progress-indicator>`,
  imports: [
    "import { NxMultiProgressIndicatorComponent, NxMultiProgressStepComponent } from '@allianz/ng-aquila/progress-indicator';",
  ],
  id: 'nx-multi-progress-indicator-vertical',
  metadata: { nestable: true },
};
