import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';

/**
  This components is a collapsible menu for usage on smaller devices.
  Can contain any content, but usually [nxMenuLink], [nxMenuGroup] and [nxAction].
*/
@Component({
    selector: 'nx-menu',
    templateUrl: 'menu.html',
    styleUrls: ['menu.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[attr.aria-expanded]': 'open',
    },
})
export class NxMenuComponent {
    private _open = false;

    /** Whether the menu is open or closed. */
    @Input()
    set open(value: BooleanInput) {
        const open = coerceBooleanProperty(value);
        if (open !== this._open) {
            this._open = open;
            this._cdr.markForCheck();
        }
    }

    get open(): boolean {
        return this._open;
    }

    /* Toggles the open state of the menu. */
    toggle() {
        this.open = !this.open;
    }

    constructor(private readonly _cdr: ChangeDetectorRef) {}
}
