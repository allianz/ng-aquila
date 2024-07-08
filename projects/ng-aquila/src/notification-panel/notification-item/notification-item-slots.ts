import { Directive } from '@angular/core';

@Directive({
    selector: 'nx-notification-item-metadata',
    standalone: true,
})
export class NxNotificationItemMetadataDirective {}

@Directive({
    selector: 'nx-notification-item-content',
    standalone: true,
})
export class NxNotificationItemContentDirective {}

@Directive({
    selector: 'nx-notification-item-actions',
    standalone: true,
})
export class NxNotificationItemActionsDirective {}

@Directive({
    selector: 'nx-notification-header',
    standalone: true,
})
export class NxNotificationItemHeaderDirective {}
