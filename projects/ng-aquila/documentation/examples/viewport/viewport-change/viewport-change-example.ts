import { Component, OnDestroy, ViewChild } from '@angular/core';
import { NxSidebarComponent } from '@aposin/ng-aquila/sidebar';
import { NxBreakpoints, NxViewportService } from '@aposin/ng-aquila/utils';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

/**
 * @title Viewport Change example
 */
@Component({
    selector: 'viewport-change-example',
    templateUrl: './viewport-change-example.html',
    styleUrls: ['./viewport-change-example.css'],
})
export class ViewportChangeExampleComponent implements OnDestroy {
    @ViewChild('sidebar') sidebar!: NxSidebarComponent;

    readonly actions = [
        {
            icon: 'file-text',
            label: 'All Files',
            query: { a: 1 },
        },
        {
            icon: 'calendar',
            label: 'Calendar',
            query: { a: 2 },
        },
        {
            icon: 'mail-o',
            label: 'Email',
            query: { a: 3 },
        },
        {
            icon: 'user-o',
            label: 'My Profile',
            query: { a: 4 },
        },
        {
            icon: 'file',
            label: 'Recent Downloads',
            query: { a: 5 },
        },
    ];

    private readonly _destroyed = new Subject<void>();

    constructor(private readonly viewportService: NxViewportService) {
        this.viewportService
            .min(NxBreakpoints.BREAKPOINT_MEDIUM)
            .pipe(takeUntil(this._destroyed))
            .subscribe(isGreaterThanMedium => {
                if (isGreaterThanMedium && !this.sidebar.open) {
                    this.sidebar.expand();
                } else if (!isGreaterThanMedium) {
                    // don't trigger unneeded close() and expand()
                    if (this.sidebar.open) {
                        this.sidebar.close();
                    }
                }
            });
    }

    ngOnDestroy(): void {
        this._destroyed.next();
        this._destroyed.complete();
    }
}
