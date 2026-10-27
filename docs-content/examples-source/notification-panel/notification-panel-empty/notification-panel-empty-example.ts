import {
  NxButtonComponent,
  NxIconButtonComponent,
  NxPlainButtonComponent,
} from '@allianz/ng-aquila/button';
import { NxCopytextComponent } from '@allianz/ng-aquila/copytext';
import { NxHeadlineComponent } from '@allianz/ng-aquila/headline';
import { NxIconComponent } from '@allianz/ng-aquila/icon';
import {
  NxNotificationItemContentDirective,
  NxNotificationItemHeaderDirective,
  NxNotificationItemMetadataDirective,
  NxNotificationPanelComponent,
  NxNotificationPanelItemComponent,
  NxNotificationPanelTriggerDirective,
} from '@allianz/ng-aquila/notification-panel';
import { NxBodyTextComponent } from '@allianz/ng-aquila/text';
import {
  afterNextRender,
  Component,
  ElementRef,
  inject,
  Injector,
  signal,
  viewChild,
  viewChildren,
} from '@angular/core';

interface ExampleNotification {
  id: number;
  category: string;
  age: string;
  text: string;
}

/**
 * @title Empty state
 */
@Component({
  selector: 'notification-panel-empty-example',
  templateUrl: './notification-panel-empty-example.html',
  styleUrls: ['./notification-panel-empty-example.css'],
  imports: [
    NxIconButtonComponent,
    NxButtonComponent,
    NxPlainButtonComponent,
    NxNotificationPanelTriggerDirective,
    NxIconComponent,
    NxNotificationPanelComponent,
    NxNotificationPanelItemComponent,
    NxNotificationItemHeaderDirective,
    NxNotificationItemMetadataDirective,
    NxNotificationItemContentDirective,
    NxCopytextComponent,
    NxHeadlineComponent,
    NxBodyTextComponent,
  ],
})
export class NotificationPanelEmptyExampleComponent {
  readonly notifications = signal<ExampleNotification[]>([]);
  private _nextId = 0;
  private readonly _injector = inject(Injector);
  private readonly _removeButtons = viewChildren<
    string,
    ElementRef<HTMLElement>
  >('removeButton', { read: ElementRef });
  private readonly _emptyState = viewChild<string, ElementRef<HTMLElement>>(
    'emptyState',
    { read: ElementRef },
  );

  addNotification() {
    this.notifications.update((notifications) => [
      ...notifications,
      {
        id: this._nextId++,
        category: 'Offers',
        age: 'just now',
        text: 'A new offer has been created for your account.',
      },
    ]);
  }

  removeNotification(index: number) {
    this.notifications.update((notifications) =>
      notifications.filter((_, i) => i !== index),
    );

    // The focused remove button is destroyed, so hand focus to the next one or the empty state.
    afterNextRender(
      () => {
        const buttons = this._removeButtons();
        const target = buttons.length
          ? buttons[Math.min(index, buttons.length - 1)]
          : this._emptyState();
        target?.nativeElement.focus();
      },
      { injector: this._injector },
    );
  }

  // Nothing else in the empty panel is tabbable, so keep focus here like the populated panel does.
  keepFocusInEmptyState(event: KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault();
    }
  }
}
