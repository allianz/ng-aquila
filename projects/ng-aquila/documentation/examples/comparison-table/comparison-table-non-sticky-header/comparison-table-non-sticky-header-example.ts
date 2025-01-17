import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NxPlainButtonComponent } from '@aposin/ng-aquila/button';
import {
    NxComparisonTableCell,
    NxComparisonTableComponent,
    NxComparisonTableDescriptionCell,
    NxComparisonTablePopularCell,
    NxComparisonTableRowDirective,
    NxComparisonTableSelectButton,
} from '@aposin/ng-aquila/comparison-table';
import { NxIconComponent } from '@aposin/ng-aquila/icon';
import {
    NxPopoverComponent,
    NxPopoverTriggerDirective,
} from '@aposin/ng-aquila/popover';
import { NxSwipebarComponent } from '@aposin/ng-aquila/swipebar';

/** @title Non-sticky Header example */
@Component({
    selector: 'comparison-table-example-non-sticky-header',
    templateUrl: './comparison-table-non-sticky-header-example.html',
    styleUrls: ['./comparison-table-non-sticky-header-example.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
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
    ],
})
export class ComparisonTableNonStickyHeaderExampleComponent {}
