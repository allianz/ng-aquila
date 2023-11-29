import { FocusMonitor } from '@angular/cdk/a11y';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Directive, ElementRef, Input, OnDestroy } from '@angular/core';

export type NxMenuButtonType = 'root' | 'nested';

/**
 * @title MenuButton
 */
@Component({
    selector: '[nxMenuButton]',
    templateUrl: 'menu-button.component.html',
    styleUrls: ['menu-button.component.scss'],
    host: {
        '[class.is-expanded]': 'expandable && expanded',
        '[class.is-expandable]': 'expandable',
        '[attr.aria-expanded]': 'expandable ? expanded : null',
        '[class.nx-menu-button--nested]': 'type === "nested"',
        '[class.nx-menu-button--root]': 'type === "root"',
        class: 'nx-menu-button',
    },
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NxMenuButtonComponent implements OnDestroy {
    /** Whether this menu button is expandable or not. Will add a caret icon. */
    @Input() set expandable(value: BooleanInput) {
        this._expandable = coerceBooleanProperty(value);
        this._cdr.markForCheck();
    }
    get expandable(): boolean {
        return this._expandable;
    }
    private _expandable = false;

    /**
     * Whether this menu button is expanded or not.
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

    /**
     * The type of this menu button.
     * Can be `primary` or `secondary`, defaults to `primary`.
     */
    @Input('menuButtonType') set type(value: NxMenuButtonType) {
        if (value === 'root' || value === 'nested') {
            this._type = value;
            this._cdr.markForCheck();
        }
    }
    get type(): NxMenuButtonType {
        return this._type;
    }
    private _type: NxMenuButtonType = 'root';

    constructor(
        private readonly _cdr: ChangeDetectorRef,
        private readonly _focusMonitor: FocusMonitor,
        private readonly _elementRef: ElementRef,
    ) {
        this._focusMonitor.monitor(this._elementRef);
    }

    ngOnDestroy(): void {
        this._focusMonitor.stopMonitoring(this._elementRef);
    }
}

/**
 * Icon that can be added to a [nxButton].
 */
@Directive({
    selector: '[nxMenuButtonIcon]',
    host: {
        class: 'nx-menu-button__icon',
    },
})
export class NxMenuButtonIconDirective {}
