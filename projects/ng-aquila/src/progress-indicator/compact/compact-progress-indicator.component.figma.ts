// url=<A1_FILE>?node-id=28120-6116
// source=projects/ng-aquila/src/progress-indicator/compact/compact-progress-indicator.component.ts
// component=NxCompactProgressIndicatorComponent
/// <reference types="@figma/code-connect/figma-types-no-require" />
import figma from 'figma';

const instance = figma.selectedInstance;

// Figma draws only the trigger, so the steps come from its "X/Y Label" text.
const button = instance.findInstance('Plain Button', { traverseInstances: true });
const text = button.type === 'INSTANCE' ? button.getString('Label Text') : '';
const counter = text.match(/^\s*(\d+)\s*(?:\/|of)\s*(\d+)/);
const [match, current, total] = counter ?? [];
const expandLabel = match ? text.slice(match.length).trim() : '';
const stepCount = total ? Number(total) : 3;
const steps = Array.from(
  { length: stepCount },
  (_, index) => figma.html`
  <nx-multi-progress-step>Step ${index + 1}</nx-multi-progress-step>`,
);
const note = current
  ? ''
  : '<!-- Could not read the step counter (for example "1/3") from the Figma label. Set [currentStep] and add one nx-multi-progress-step per step. -->\n';
const expand = instance.findInstance('Expand', { traverseInstances: true });
const prominenceNote =
  expand.type === 'INSTANCE' && expand.getString('Prominence') === 'Default'
    ? '<!-- Prominence "Default" is not available in code yet -->\n'
    : '';

export default {
  example: figma.html`${note}${prominenceNote}<nx-compact-progress-indicator aria-label="Name of the process" [currentStep]="${current ?? '1'}"${
    expandLabel && expandLabel !== 'steps' ? ` expandLabel="${expandLabel}"` : ''
  }>${steps}
</nx-compact-progress-indicator>`,
  imports: [
    "import { NxCompactProgressIndicatorComponent, NxMultiProgressStepComponent } from '@allianz/ng-aquila/progress-indicator';",
  ],
  id: 'nx-compact-progress-indicator',
  metadata: { nestable: true },
};
