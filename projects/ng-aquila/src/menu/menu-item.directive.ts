import { Directive, Input } from '@angular/core';

/**
 * This is a menu item is used to structure content whithin a menu.
 */
@Directive({
    selector: '[nxMenuItem]',
    host: {
        class: 'nx-menu__item',
        '[class.nx-menu__item--small]': 'size === "s"',
        '[class.nx-menu__item--large]': 'size === "l"',
    },
})
export class NxMenuItemDirective {
    @Input('nxMenuItem') set size(value: string) {
        this._size = value === 'l' ? 'l' : 's';
    }
    get size(): string {
        return this._size;
    }
    private _size = 's';
}
