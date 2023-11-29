import { FocusMonitor } from '@angular/cdk/a11y';
import { Directive, ElementRef, OnDestroy } from '@angular/core';

/**
 * This is a menu link.
 * It adds styling to a link and is usually used within a [nxMenuItem].
 */
@Directive({
    selector: 'a[nxMenuLink]',
    host: {
        class: 'nx-menu__link',
    },
})
export class NxMenuLinkDirective implements OnDestroy {
    constructor(
        private readonly _elementRef: ElementRef,
        private readonly _focusMonitor: FocusMonitor,
    ) {
        this._focusMonitor.monitor(this._elementRef);
    }

    ngOnDestroy(): void {
        this._focusMonitor.stopMonitoring(this._elementRef);
    }
}
