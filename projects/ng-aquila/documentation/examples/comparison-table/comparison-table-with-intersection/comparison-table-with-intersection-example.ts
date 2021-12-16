import { Component } from '@angular/core';
import { NxBreakpoints, NxViewportService } from '@aposin/ng-aquila/utils';

/** @title Intersection example */
@Component({
    selector: 'comparison-table-with-intersection-example',
    templateUrl: './comparison-table-with-intersection-example.html',
    styleUrls: ['./comparison-table-with-intersection-example.css'],
})
export class ComparisonTableWithIntersectionExampleComponent {
    showOverviewSeparately: boolean = false;

    constructor(private viewportService: NxViewportService) {
        this.viewportService
            .max(NxBreakpoints.BREAKPOINT_MEDIUM)
            .subscribe(isMaximumMedium => (this.showOverviewSeparately = isMaximumMedium));
    }
}
