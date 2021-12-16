import { Directive, ElementRef } from '@angular/core';

@Directive({ selector: '[nxTreeNodeActionItem]', host: { '[attr.tabindex]': '-1' } })
export class NxTreeNodeActionItem {
    constructor(private _elementRef: ElementRef<HTMLElement>) {}

    focus() {
        this._elementRef.nativeElement.focus();
    }
}
