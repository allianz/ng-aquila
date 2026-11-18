// url=<A1_FILE>?node-id=28642-29334
// source=projects/ng-aquila/src/notification-panel/notification-item/notification-item.component.ts
// component=NxNotificationPanelItemComponent
/// <reference types="@figma/code-connect/figma-types-no-require" />
import figma from 'figma';

const instance = figma.selectedInstance;

function findNested(root: Pick<typeof instance, 'findLayers'>, namePrefix: string) {
  const [found] = root.findLayers(
    (node) => node.type === 'INSTANCE' && node.name.startsWith(namePrefix),
    { traverseInstances: true },
  );
  return found && found.type === 'INSTANCE' ? found : undefined;
}

const read = instance.getEnum('Unread', { False: true, True: false });
const content = findNested(instance, 'Notification Content');

function iconNameOf(layerName: string) {
  const layer = content && findNested(content, layerName);
  const iconSwap = layer?.getInstanceSwap('Icon Name');
  return iconSwap?.type === 'INSTANCE'
    ? iconSwap.executeTemplate().metadata?.props?.name
    : undefined;
}

function renderMetadataIcon() {
  const attributes = 'size="s" class="nx-margin-right-2xs"';
  const iconName = iconNameOf('Functional Icon');
  return iconName
    ? figma.html`<nx-icon name="${iconName}" ${attributes} aria-hidden="true"></nx-icon>`
    : figma.html`<!-- The icon name is not available. Use <nx-icon name="…" ${attributes} aria-hidden="true"></nx-icon> -->`;
}

function renderMetadata(part: NonNullable<typeof content>) {
  const showIcon = part.getBoolean('Icon');
  const text = [
    part.getBoolean('Context Label') ? part.getString('Context Label Text') : undefined,
    part.getBoolean('Timestamp') ? part.getString('Timestamp Text') : undefined,
  ]
    .filter(Boolean)
    .join(' &middot; ');
  if (!showIcon && !text) {
    return '';
  }
  return figma.html`
  <nx-notification-item-metadata>
    ${showIcon ? renderMetadataIcon() : ''}${text}
  </nx-notification-item-metadata>`;
}

function renderDeleteButton() {
  const iconName = iconNameOf('Delete Button');
  return figma.html`
    <button nxPlainButton size="s" type="button" aria-label="Delete">
      ${
        iconName
          ? figma.html`<nx-icon name="${iconName}" aria-hidden="true"></nx-icon>`
          : figma.html`<!-- The icon name is not available. Use <nx-icon name="…" aria-hidden="true"></nx-icon> -->`
      }
    </button>`;
}

function renderActions(part: NonNullable<typeof content>, deletable: boolean) {
  const actions = part.getBoolean('Actions') ? part.getSlot('Actions Slot') : undefined;
  if (!actions?.length && !deletable) {
    return '';
  }
  return figma.html`
  <nx-notification-item-actions>${
    actions?.length
      ? figma.html`
    ${actions}`
      : ''
  }${deletable ? renderDeleteButton() : ''}
  </nx-notification-item-actions>`;
}

const metadata = content ? renderMetadata(content) : '';
const actions = content ? renderActions(content, content.getBoolean('Deletable')) : '';

function renderItem(part: NonNullable<typeof content>) {
  const clickable = !part.getBoolean('Actions') && !part.getBoolean('Deletable');
  const body = figma.html`${metadata}
  <nx-notification-item-content>${part.getString('Text')}</nx-notification-item-content>${actions}`;
  return clickable
    ? figma.html`<a nxNotificationPanelItem href="#"${read ? ' read' : ''}>${body}
</a>`
    : figma.html`<div nxNotificationPanelItem clickable="false"${read ? ' read' : ''}>${body}
</div>`;
}

const needsButton = content?.getBoolean('Deletable') ?? false;
const needsIcon =
  (needsButton && !!iconNameOf('Delete Button')) ||
  (content?.getBoolean('Icon') ?? !!iconNameOf('Delete Button'));

export default {
  example: content
    ? renderItem(content)
    : figma.html`<div nxNotificationPanelItem${read ? ' read' : ''}>
  <!-- Could not find Notification Content ⚛️ -->
</div>`,
  imports: [
    `import { ${[
      'NxNotificationPanelItemComponent',
      ...(metadata ? ['NxNotificationItemMetadataDirective'] : []),
      ...(content ? ['NxNotificationItemContentDirective'] : []),
      ...(actions ? ['NxNotificationItemActionsDirective'] : []),
    ].join(', ')} } from '@allianz/ng-aquila/notification-panel';`,
    ...(needsIcon ? ["import { NxIconComponent } from '@allianz/ng-aquila/icon';"] : []),
    ...(needsButton ? ["import { NxPlainButtonComponent } from '@allianz/ng-aquila/button';"] : []),
  ],
  id: 'nx-notification-panel-item',
  metadata: { nestable: true },
};
