import { FocusMonitor } from '@angular/cdk/a11y';
import { Component, Input, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Subscription, BehaviorSubject } from 'rxjs';

export interface NxExpandable {
    /** Indicates if this expandable instance is open or not.  */
    expanded: BehaviorSubject<boolean>;

    /** Toggles the open state. */
    toggle: () => void;

    /** Expands this component. */
    expand: () => void;

    /** Closes this component. */
    close: () => void;
}

/**
 * This toggle button can be clicked and toggles expandable elements.
 * e.g. it can toggle a expandable table row or anything else that implements the `NxExpandable` interface.
 */
@Component({
    selector: 'nx-toggle-button',
    templateUrl: './toggle-button.component.html',
    styleUrls: ['./toggle-button.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NxToggleButtonComponent implements AfterViewInit, OnDestroy {
    _expanded: boolean = false;

    @ViewChild('button') _buttonElement!: ElementRef;

    /**
     * This is the expandable target that will be toggled when the user clicks the button.
     */
    @Input()
    set target(value: NxExpandable) {
        this._target = value;

        if (this._subscription) {
            this._subscription.unsubscribe();
        }

        if (this._target) {
            this._subscription = this._target.expanded.subscribe(expanded => {
                this._expanded = expanded;
                this._changeDetectorRef.markForCheck();
            });
        }
    }
    _target!: NxExpandable;

    @Input()
    set ariaLabel(value: string) {
        this._ariaLabel = value;
        this._changeDetectorRef.markForCheck();
    }
    _ariaLabel: string = '';

    private _subscription!: Subscription;

    constructor(private _changeDetectorRef: ChangeDetectorRef, private _focusMonitor: FocusMonitor) {}

    ngAfterViewInit() {
        this._focusMonitor.monitor(this._buttonElement);
    }

    _onClick() {
        if (this._target) {
            this._target.toggle();
        }
    }

    ngOnDestroy() {
        if (this._subscription) {
            this._subscription.unsubscribe();
        }
        this._focusMonitor.stopMonitoring(this._buttonElement);
    }
}
