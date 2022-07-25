import { FocusMonitor } from '@angular/cdk/a11y';
import { ChangeDetectionStrategy, Component, ElementRef, OnDestroy } from '@angular/core';

@Component({
    template: '<ng-content></ng-content>',
    styleUrls: ['card.scss'],
    selector: 'nx-card',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'nx-card',
    },
})
export class NxCardComponent implements OnDestroy {
    constructor(private readonly _elementRef: ElementRef, private readonly _focusMonitor: FocusMonitor) {
        // we still listen for focus in case the user set a tabindex on the element
        // the focus monitor only adds the cdk-keyboard-focus class if the element is focusable
        // meaning it needs a tabindex in this case
        this._focusMonitor.monitor(this._elementRef);
    }

    ngOnDestroy(): void {
        this._focusMonitor.stopMonitoring(this._elementRef);
    }
}
