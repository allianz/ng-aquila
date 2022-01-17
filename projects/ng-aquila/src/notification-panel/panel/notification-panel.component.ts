import { FocusKeyManager } from '@angular/cdk/a11y';
import { AfterContentInit, Component, ContentChildren, QueryList, TemplateRef, ViewChild } from '@angular/core';
import { merge } from 'rxjs';
import { NxNotificationPanelItemComponent } from './../notification-item/notification-item.component';

@Component({
    selector: 'nx-notification-panel',
    templateUrl: 'notification-panel.component.html',
    styleUrls: ['./notification-panel.component.scss'],
    exportAs: 'nxNotificationPanel',
    host: {
        '[class.nx-notification-panel]': 'true',
        '(keydown)': '_handleKeydown($event)',
    },
})
export class NxNotificationPanelComponent implements AfterContentInit {
    @ViewChild(TemplateRef)
    templateRef!: TemplateRef<any>;

    @ContentChildren(NxNotificationPanelItemComponent, { descendants: true }) items!: QueryList<NxNotificationPanelItemComponent>;

    private _keyManager!: FocusKeyManager<NxNotificationPanelItemComponent>;

    ngAfterContentInit() {
        this._initKeyManager();
    }

    private _initKeyManager() {
        this._keyManager = new FocusKeyManager<NxNotificationPanelItemComponent>(this.items).withVerticalOrientation().withHorizontalOrientation('ltr');

        if (this.items.length > 0) {
            merge(...this.items.map(item => item.focused)).subscribe(item => {
                this._keyManager.updateActiveItem(item);
            });
        }
    }

    _handleKeydown(event: KeyboardEvent) {
        this._keyManager.onKeydown(event);
    }
}
