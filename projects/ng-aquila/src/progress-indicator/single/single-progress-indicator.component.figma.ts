// url=<A1_FILE>?node-id=28101-22571
// source=projects/ng-aquila/src/progress-indicator/single/single-progress-indicator.component.ts
// component=NxSingleProgressIndicatorComponent
/// <reference types="@figma/code-connect/figma-types-no-require" />
import figma from 'figma';

const instance = figma.selectedInstance;

const bar = instance.findInstance('Progress Bar');
const colorScheme =
  bar.type === 'INSTANCE'
    ? bar.getEnum('Color Role', { Default: undefined, Positive: 'positive' })
    : undefined;
const transparentBackground =
  bar.type === 'INSTANCE' && bar.getEnum('Background', { Solid: false, Transparent: true });
const barNote =
  bar.type === 'INSTANCE'
    ? ''
    : '<!-- Could not find the Progress Bar in Figma. Check colorScheme and transparentBackground. -->\n';

const start = instance.findText('Start', { traverseInstances: true });
const startText = start.type === 'TEXT' ? start.textContent : '';
// The code builds "Step X of Y" from value and max by itself, so only other text is projected.
const [, current, total] = startText.match(/^Step (\d+) of (\d+)$/) ?? [];
const label = current
  ? ''
  : figma.html`
  ${startText || '<!-- Could not find the label in Figma. -->'}
`;
const valueNote = current ? '' : '<!-- Set value and max to the current and the total step. -->\n';

const showEnd = instance.getBoolean('Label End');
const end = showEnd ? instance.findText('End', { traverseInstances: true }) : undefined;
const labelEnd = end?.type === 'TEXT' ? end.textContent : undefined;
const endNote =
  showEnd && !labelEnd ? '<!-- Could not find the end label in Figma. Set labelEnd="…". -->\n' : '';

export default {
  example: figma.html`${barNote}${valueNote}${endNote}<nx-single-progress-indicator [value]="${current ?? '1'}" [max]="${total ?? '4'}"${
    colorScheme ? ` colorScheme="${colorScheme}"` : ''
  }${transparentBackground ? ' transparentBackground' : ''}${
    labelEnd ? ` labelEnd="${labelEnd}"` : ''
  }>${label}</nx-single-progress-indicator>`,
  imports: [
    "import { NxSingleProgressIndicatorComponent } from '@allianz/ng-aquila/progress-indicator';",
  ],
  id: 'nx-single-progress-indicator',
  metadata: { nestable: true },
};
