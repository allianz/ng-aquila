import { FocusMonitor } from '@angular/cdk/a11y';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { NgIf } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ElementRef, Input, OnDestroy } from '@angular/core';
import { NxIconModule } from '@aposin/ng-aquila/icon';

import { NxActionIconDirective } from './action-icon.directive';

@Component({
    selector: '[nxAction]',
    templateUrl: 'action.component.html',
    styleUrls: ['action.component.scss'],
    host: {
        '[class.is-expanded]': 'expanded',
        '[class.is-selected]': 'selected',
        '[class.is-expandable]': 'expandable',
        class: 'nx-action',
    },
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgIf, NxIconModule],
})
export class NxActionComponent implements OnDestroy, AfterViewInit {
    @ContentChild(NxActionIconDirective) _iconChild!: NxActionIconDirective;

    /** Whether this action is selected or not.  */
    @Input() set selected(value: BooleanInput) {
        this._selected = coerceBooleanProperty(value);
        this._cdr.markForCheck();
    }
    get selected() {
        return this._selected;
    }
    private _selected = false;

    /** Whether this action is expandable or not. Will add a caret icon. */
    @Input() set expandable(value: BooleanInput) {
        this._expandable = coerceBooleanProperty(value);
        this._cdr.markForCheck();
    }
    get expandable() {
        return this._expandable;
    }
    private _expandable = false;

    /**
     * Whether this action is expanded or not.
     *
     * Only works in combination with the `expandable` option set to `true`.
     */
    @Input() set expanded(value: BooleanInput) {
        this._expanded = coerceBooleanProperty(value);
        this._cdr.markForCheck();
    }
    get expanded() {
        return this._expanded;
    }
    private _expanded = false;

    constructor(
        private readonly _cdr: ChangeDetectorRef,
        private readonly _elementRef: ElementRef,
        private readonly _focusMonitor: FocusMonitor,
    ) {}

    ngAfterViewInit(): void {
        this._focusMonitor.monitor(this._elementRef);
    }

    ngOnDestroy(): void {
        this._focusMonitor.stopMonitoring(this._elementRef);
    }
}
