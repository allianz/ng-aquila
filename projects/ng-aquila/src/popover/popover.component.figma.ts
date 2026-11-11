// url=<A1_FILE>?node-id=70504-62678
// source=projects/ng-aquila/src/popover/popover.component.ts
// component=NxPopoverComponent
/// <reference types="@figma/code-connect/figma-types-no-require" />
import figma from 'figma';

const instance = figma.selectedInstance;

// The popover opens away from its arrow. Clock positions 11-1 put the arrow on the top edge,
// 2-4 on the right, 5-7 on the bottom and 8-10 on the left. The code centers the arrow on the side
// edges, so the corner positions exist only in Figma.
const direction = instance.getEnum('Pointer', {
  None: undefined,
  "11 o'clock": 'bottom',
  "12 o'clock": 'bottom',
  "1 o'clock": 'bottom',
  "2 o'clock": 'left',
  "3 o'clock": 'left',
  "4 o'clock": 'left',
  "5 o'clock": 'top',
  "6 o'clock": 'top',
  "7 o'clock": 'top',
  "8 o'clock": 'right',
  "9 o'clock": 'right',
  "10 o'clock": 'right',
});
const hideArrow = instance.getString('Pointer') === 'None';

// Headline, Closable and the slots belong to the nested dialog, header and footer instances.
function findNested(namePrefix: string) {
  const [found] = instance.findLayers(
    (node) => node.type === 'INSTANCE' && node.name.startsWith(namePrefix),
    {
      traverseInstances: true,
    },
  );
  return found && found.type === 'INSTANCE' ? found : undefined;
}
const dialog = findNested('Popover Dialog');
const header = findNested('Popover Header');
const footer = findNested('Popover Footer');

// Header type "None" draws only the close button, so the headline is hidden whatever `Headline` says.
const showTitle = header?.getString('Type') !== 'None' && (header?.getBoolean('Headline') ?? false);
const title = showTitle ? header?.getString('Headline Text') : undefined;

// The status icon template sets `metadata.props.type`. Until it exists, Figma returns its own placeholder.
const showIcon = showTitle && header?.getString('Type') === 'Headline + Icon';
const [signalIcon] =
  showIcon && header
    ? header.findLayers(
        (node) => node.type === 'INSTANCE' && node.name.startsWith('Signal Icon Functional'),
        { traverseInstances: true },
      )
    : [];
const iconTemplate = signalIcon?.type === 'INSTANCE' ? signalIcon.executeTemplate() : undefined;
const icon = iconTemplate
  ? iconTemplate.metadata?.props?.type
    ? iconTemplate.example
    : figma.html`<!-- The status icon is not available. Use <nx-status-icon type="…"></nx-status-icon> -->
    ${iconTemplate.example}`
  : undefined;

const missingParts = [
  ['Popover Dialog', dialog],
  ['Popover Header', header],
  ['Popover Footer', footer],
  ...(showIcon ? [['Signal Icon Functional', signalIcon]] : []),
]
  .filter(([, part]) => !part)
  .map(([name]) => name);
const missingNote = missingParts.length
  ? `<!-- Could not find ${missingParts.join(', ')} in Figma. This snippet may be incomplete. -->\n`
  : '';
const closable = header?.getBoolean('Closable') ?? true;
const content = dialog?.getSlot('Content Slot');
const showActions = footer?.getEnum('Footer', { True: true, False: false }) ?? false;
const actions = showActions ? footer?.getSlot('Slot') : undefined;

const triggerAttributes = figma.html`[nxPopoverTriggerFor]="popover"${
  direction ? ` nxPopoverDirection="${direction}"` : ''
}${closable ? '' : ' nxPopoverCloseable="false"'}${hideArrow ? ' hidePopoverArrow' : ''}`;

const popoverImports = [
  'NxPopoverComponent',
  'NxPopoverTriggerDirective',
  ...(showTitle ? ['NxPopoverTitleDirective'] : []),
  'NxPopoverMainContentDirective',
  ...(showActions ? ['NxPopoverActionsDirective'] : []),
];

export default {
  example: figma.html`${missingNote}<button nxButton type="button" ${triggerAttributes}>
  Open
</button>

<nx-popover #popover>${
    showTitle
      ? figma.html`
  <div nxPopoverTitle>${
    icon
      ? figma.html`
    ${icon}`
      : ''
  }
    <h3 nxHeadline="subsection-small">${title}</h3>
  </div>`
      : ''
  }
  <div nxPopoverMainContent>
    ${content}
  </div>${
    showActions
      ? figma.html`
  <div nxPopoverActions alignment="right">
    ${actions}
  </div>`
      : ''
  }
</nx-popover>`,
  imports: [
    "import { NxButtonComponent } from '@allianz/ng-aquila/button';",
    ...(showTitle ? ["import { NxHeadlineComponent } from '@allianz/ng-aquila/headline';"] : []),
    `import { ${popoverImports.join(', ')} } from '@allianz/ng-aquila/popover';`,
  ],
  id: 'nx-popover',
  metadata: { nestable: true },
};
