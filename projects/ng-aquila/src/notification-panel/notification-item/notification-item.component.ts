import { FocusableOption, FocusMonitor, FocusOrigin } from '@angular/cdk/a11y';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, ElementRef, Input, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
    selector: 'nx-notification-panel-item, [nxNotificationPanelItem]',
    templateUrl: 'notification-item.component.html',
    styleUrls: ['./notification-item.component.scss'],
    host: {
        '[class.nx-notification-item--read]': 'read',
        '[class.nx-notification-item--clickable]': 'clickable',
        tabindex: '0',
        '(focus)': 'focus()',
        '(blur)': '_blur()',
    },
})
export class NxNotificationPanelItemComponent implements FocusableOption, OnDestroy {
    @Input() set read(value: BooleanInput) {
        this._read = coerceBooleanProperty(value);
    }
    get read() {
        return this._read;
    }
    private _read = false;

    @Input() set clickable(value: BooleanInput) {
        this._clickable = coerceBooleanProperty(value);
    }
    get clickable() {
        return this._clickable;
    }
    private _clickable = true;

    readonly focused = new Subject<NxNotificationPanelItemComponent>();

    private _hasFocus = false;

    constructor(
        private readonly _elementRef: ElementRef,
        private readonly _focusMonitor: FocusMonitor,
    ) {
        this._focusMonitor.monitor(this._elementRef);
    }

    ngOnDestroy(): void {
        this._focusMonitor.stopMonitoring(this._elementRef);
    }

    focus(focusOrigin?: FocusOrigin) {
        // the focus key manager calls this method with the focusOrigin
        // property. if it is not set we know the focus comes from another source
        // like the user using TAB to go through the list. Then we want to notify
        // the focus manager about this change of focus.
        if (typeof focusOrigin === 'undefined' && !this._hasFocus) {
            this.focused.next(this);
            this._hasFocus = true;
            this._focusMonitor.focusVia(this._elementRef, 'keyboard');
        }

        if (!this._hasFocus) {
            this._elementRef.nativeElement.focus();
            this._hasFocus = true;
        }
    }

    _blur() {
        this._hasFocus = false;
    }
}
