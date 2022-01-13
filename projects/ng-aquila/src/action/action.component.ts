import { Component, Input, ChangeDetectionStrategy, ChangeDetectorRef, ContentChild, ElementRef, OnDestroy } from '@angular/core';
import { coerceBooleanProperty, BooleanInput } from '@angular/cdk/coercion';
import { NxActionIconDirective } from './action-icon.directive';
import { FocusMonitor } from '@angular/cdk/a11y';

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
})
export class NxActionComponent implements OnDestroy {
    @ContentChild(NxActionIconDirective) _iconChild!: NxActionIconDirective;

    /** Whether this action is selected or not.  */
    @Input()
    set selected(value: BooleanInput) {
        this._selected = coerceBooleanProperty(value);
        this._cdr.markForCheck();
    }
    get selected() {
        return this._selected;
    }
    private _selected: boolean = false;

    /** Whether this action is expandable or not. Will add a caret icon. */
    @Input()
    set expandable(value: BooleanInput) {
        this._expandable = coerceBooleanProperty(value);
        this._cdr.markForCheck();
    }
    get expandable() {
        return this._expandable;
    }
    private _expandable: boolean = false;

    /** Whether this action is expanded or not.
    Only works in combination with the `expandable` option set to `true`.
   */
    @Input()
    set expanded(value: BooleanInput) {
        this._expanded = coerceBooleanProperty(value);
        this._cdr.markForCheck();
    }
    get expanded() {
        return this._expanded;
    }
    private _expanded: boolean = false;

    constructor(private _cdr: ChangeDetectorRef, private _elementRef: ElementRef, private _focusMonitor: FocusMonitor) {
        this._focusMonitor.monitor(this._elementRef);
    }

    ngOnDestroy() {
        this._focusMonitor.stopMonitoring(this._elementRef);
    }
}
