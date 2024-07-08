import { NgIf, NgTemplateOutlet } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
    NxExpansionPanelComponent,
    NxExpansionPanelHeaderComponent,
    NxExpansionPanelTitleDirective,
} from '@aposin/ng-aquila/accordion';
import { NxPlainButtonComponent } from '@aposin/ng-aquila/button';
import {
    NxComparisonTableCell,
    NxComparisonTableComponent,
    NxComparisonTableDescriptionCell,
    NxComparisonTableIntersectionCell,
    NxComparisonTablePopularCell,
    NxComparisonTableRowDirective,
    NxComparisonTableRowGroupDirective,
    NxComparisonTableSelectButton,
} from '@aposin/ng-aquila/comparison-table';
import { NxIconComponent } from '@aposin/ng-aquila/icon';
import { NxListComponent, NxListIconComponent } from '@aposin/ng-aquila/list';
import {
    NxPopoverComponent,
    NxPopoverTriggerDirective,
} from '@aposin/ng-aquila/popover';
import { NxSwipebarComponent } from '@aposin/ng-aquila/swipebar';
import { NxBreakpoints, NxViewportService } from '@aposin/ng-aquila/utils';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

/** @title Intersection example */
@Component({
    selector: 'comparison-table-with-intersection-example',
    templateUrl: './comparison-table-with-intersection-example.html',
    styleUrls: ['./comparison-table-with-intersection-example.css'],
    standalone: true,
    imports: [
        NgIf,
        NxExpansionPanelComponent,
        NxExpansionPanelHeaderComponent,
        NxExpansionPanelTitleDirective,
        NgTemplateOutlet,
        NxSwipebarComponent,
        NxComparisonTableComponent,
        NxComparisonTableRowDirective,
        NxComparisonTablePopularCell,
        NxPlainButtonComponent,
        NxPopoverTriggerDirective,
        NxIconComponent,
        NxPopoverComponent,
        NxComparisonTableCell,
        NxComparisonTableSelectButton,
        NxComparisonTableDescriptionCell,
        NxComparisonTableIntersectionCell,
        NxComparisonTableRowGroupDirective,
        NxListComponent,
        NxListIconComponent,
    ],
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
