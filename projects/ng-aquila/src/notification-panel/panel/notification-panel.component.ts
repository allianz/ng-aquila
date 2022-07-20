import { FocusKeyManager } from '@angular/cdk/a11y';
import { AfterContentInit, Component, ContentChildren, OnDestroy, QueryList, TemplateRef, ViewChild } from '@angular/core';
import { merge, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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
export class NxNotificationPanelComponent implements OnDestroy, AfterContentInit {
    @ViewChild(TemplateRef)
    templateRef!: TemplateRef<any>;

    @ContentChildren(NxNotificationPanelItemComponent, { descendants: true }) items!: QueryList<NxNotificationPanelItemComponent>;

    private _keyManager!: FocusKeyManager<NxNotificationPanelItemComponent>;

    private readonly _destroyed = new Subject<void>();

    ngAfterContentInit(): void {
        this._initKeyManager();
    }

    ngOnDestroy(): void {
        this._destroyed.next();
        this._destroyed.complete();
    }

    private _initKeyManager() {
        this._keyManager = new FocusKeyManager<NxNotificationPanelItemComponent>(this.items).withVerticalOrientation().withHorizontalOrientation('ltr');

        if (this.items.length > 0) {
            merge(...this.items.map(item => item.focused))
                .pipe(takeUntil(this._destroyed))
                .subscribe(item => {
                    this._keyManager.updateActiveItem(item);
                });
        }
    }

    _handleKeydown(event: KeyboardEvent) {
        this._keyManager.onKeydown(event);
    }
}
