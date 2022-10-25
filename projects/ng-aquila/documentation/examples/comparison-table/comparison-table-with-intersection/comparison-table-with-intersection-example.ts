import { Component, OnDestroy, OnInit } from '@angular/core';
import { NxBreakpoints, NxViewportService } from '@aposin/ng-aquila/utils';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

/** @title Intersection example */
@Component({
    selector: 'comparison-table-with-intersection-example',
    templateUrl: './comparison-table-with-intersection-example.html',
    styleUrls: ['./comparison-table-with-intersection-example.css'],
})
export class ComparisonTableWithIntersectionExampleComponent
    implements OnInit, OnDestroy
{
    showOverviewSeparately = false;

    private readonly _destroyed = new Subject<void>();

    constructor(private readonly viewportService: NxViewportService) {}

    ngOnInit(): void {
        this.viewportService
            .max(NxBreakpoints.BREAKPOINT_MEDIUM)
            .pipe(takeUntil(this._destroyed))
            .subscribe(mobileBP => {
                this.showOverviewSeparately = mobileBP;
            });
    }

    ngOnDestroy(): void {
        this._destroyed.next();
        this._destroyed.complete();
    }
}
