import { ChangeDetectionStrategy, Component } from '@angular/core';

/** @title Non-sticky Header example */
@Component({
    selector: 'comparison-table-example-non-sticky-header',
    templateUrl: './comparison-table-non-sticky-header-example.html',
    styleUrls: ['./comparison-table-non-sticky-header-example.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComparisonTableNonStickyHeaderExampleComponent {}
