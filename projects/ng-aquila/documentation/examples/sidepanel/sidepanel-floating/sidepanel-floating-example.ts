import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { NxBreakpoints, NxViewportService } from '@aposin/ng-aquila/utils';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

/**
 * @title Floating sidepanel example
 */
@Component({
    selector: 'sidepanel-floating-example',
    templateUrl: './sidepanel-floating-example.html',
    styleUrls: ['sidepanel-floating-example.css'],
})
export class SidepanelFloatingExampleComponent implements OnDestroy {
    opened = true;
    isGreaterThanSmall = true;

    private readonly _destroyed = new Subject<void>();

    constructor(
        readonly viewportService: NxViewportService,
        private readonly _cdr: ChangeDetectorRef,
    ) {
        this.viewportService
            .min(NxBreakpoints.BREAKPOINT_SMALL)
            .pipe(takeUntil(this._destroyed))
            .subscribe(isGreaterThanSmall => {
                // only do something if the width has changed between small and bigger
                if (isGreaterThanSmall !== this.isGreaterThanSmall) {
                    this.isGreaterThanSmall = isGreaterThanSmall;
                    if (isGreaterThanSmall && !this.opened) {
                        this.opened = true;
                    } else if (!isGreaterThanSmall && this.opened) {
                        this.opened = false;
                    }
                    this._cdr.detectChanges();
                }
            });
    }

    ngOnDestroy(): void {
        this._destroyed.next();
        this._destroyed.complete();
    }
}
