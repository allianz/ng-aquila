import { FocusMonitor } from '@angular/cdk/a11y';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';

export interface NxExpandable {
    /** Indicates if this expandable instance is open or not.  */
    expanded: BehaviorSubject<boolean>;

    /** Toggles the open state. */
    toggle(): void;

    /** Expands this component. */
    expand(): void;

    /** Closes this component. */
    close(): void;
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
    _expanded = false;

    @ViewChild('button') _buttonElement!: ElementRef;

    /**
     * This is the expandable target that will be toggled when the user clicks the button.
     */
    @Input()
    set target(value: NxExpandable) {
        this._target = value;

        this._subscription?.unsubscribe();

        if (this._target) {
            this._subscription = this._target.expanded.subscribe(expanded => {
                this._expanded = expanded;
                this._cdr.markForCheck();
            });
        }
    }
    _target!: NxExpandable;

    @Input()
    set ariaLabel(value: string) {
        this._ariaLabel = value;
        this._cdr.markForCheck();
    }
    _ariaLabel = '';

    private _subscription = Subscription.EMPTY;

    constructor(private _cdr: ChangeDetectorRef, private _focusMonitor: FocusMonitor) {}

    ngAfterViewInit() {
        this._focusMonitor.monitor(this._buttonElement);
    }

    _onClick() {
        if (this._target) {
            this._target.toggle();
        }
    }

    ngOnDestroy() {
        this._subscription?.unsubscribe();
        this._focusMonitor.stopMonitoring(this._buttonElement);
    }
}
