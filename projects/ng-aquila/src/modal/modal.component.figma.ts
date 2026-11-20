// url=<A1_FILE>?node-id=70488-51363
// source=projects/ng-aquila/src/modal/dialog/dialog.service.ts
// component=NxDialogService
/// <reference types="@figma/code-connect/figma-types-no-require" />
import type { InstanceHandle } from 'figma';
import figma from 'figma';

const instance = figma.selectedInstance;

function findNested(namePrefix: string): InstanceHandle | undefined {
  const [found] = instance.findLayers(
    (node) => node.type === 'INSTANCE' && node.name.startsWith(namePrefix),
    { traverseInstances: true },
  );
  return found?.type === 'INSTANCE' ? found : undefined;
}

const dialog = findNested('Modal Fullscreen') ?? findNested('Modal Dialog');
const header = findNested('Modal Header');
const footer = findNested('Modal Footer');

const headerType = header?.getEnum('Type', {
  None: 'none',
  Headline: 'headline',
  'Headline + Icon': 'icon',
} as const);
// `Type=None` draws only the close button, so its default-true `Headline` does not count.
const headline =
  header && headerType !== 'none' && header.getBoolean('Headline')
    ? header.getString('Headline Text')
    : undefined;
const hasFooter = footer?.getEnum('Footer', { True: true, False: false }) ?? false;

const body = instance.getSlot('Content Slot');
const actions = hasFooter
  ? footer
      ?.findConnectedInstances((node) => node.codeConnectId() === 'nx-button', {
        traverseInstances: true,
      })
      .map((button) => (button.type === 'INSTANCE' ? button.executeTemplate().example : []))
  : undefined;

const missingParts = [
  ['Modal Dialog', dialog],
  ['Modal Header', header],
  ['Modal Footer', footer],
]
  .filter(([, part]) => !part)
  .map(([name]) => name);
const missingNote = missingParts.length
  ? `<!-- Could not find ${missingParts.join(', ')} in Figma. This snippet may be incomplete. -->\n`
  : '';

// The signal icon is a swapped component without properties, so its status cannot be read.
const headerNote =
  headerType === 'icon'
    ? '<!-- Set status to success, info, error or warning to match the icon -->\n  '
    : '';
const closableNote = header?.getBoolean('Closable')
  ? '<!-- To show the close button, open with dialogService.open(modalTemplate, { showCloseIcon: true }) -->\n'
  : '';
const title = headline
  ? figma.html`
  ${headerNote}<h2 nxModalTitle${headerType === 'icon' ? ' status="…"' : ''}>${headline}</h2>`
  : '';
const overflow = instance.getEnum('Overflow', {
  None: 'none',
  Top: 'top',
  Bottom: 'bottom',
  'Top + Bottom': 'both',
} as const);
const titleScrolls = overflow === 'none' || overflow === 'bottom';
const overflowNote =
  overflow === 'bottom' ? '<!-- Overflow "Bottom" is not available in code yet -->\n' : '';
const scrollable = overflow !== undefined && overflow !== 'none';
const content = figma.html`
  <div nxModalContent${scrollable ? ' tabindex="0"' : ''}>${titleScrolls ? title : ''}
    ${body ?? ''}
  </div>`;
const footerActions = hasFooter
  ? figma.html`
  <div nxModalActions>
    ${actions ?? ''}
  </div>`
  : '';

export default {
  example: figma.html`${missingNote}${overflowNote}${closableNote}<ng-template #modalTemplate>${titleScrolls ? '' : title}${content}${footerActions}
</ng-template>`,
  imports: [
    `import { ${[
      ...(headline ? ['NxModalTitleComponent'] : []),
      'NxModalContentDirective',
      ...(hasFooter ? ['NxModalActionsDirective'] : []),
    ].join(', ')} } from '@allianz/ng-aquila/modal';`,
  ],
  id: 'nx-modal',
  metadata: { nestable: false },
};
