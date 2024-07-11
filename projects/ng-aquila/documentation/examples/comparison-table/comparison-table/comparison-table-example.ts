import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
} from '@angular/core';
import {
    NxButtonComponent,
    NxPlainButtonComponent,
} from '@aposin/ng-aquila/button';
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
import { NxSpinnerComponent } from '@aposin/ng-aquila/spinner';
import { NxSwipebarComponent } from '@aposin/ng-aquila/swipebar';

/** @title Basic example */
@Component({
    selector: 'comparison-table-example',
    templateUrl: './comparison-table-example.html',
    styleUrls: ['./comparison-table-example.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        NxSpinnerComponent,
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
        NxButtonComponent,
    ],
})
export class ComparisonTableExampleComponent implements OnInit {
    loading = true;

    constructor(private readonly _cdr: ChangeDetectorRef) {}

    ngOnInit(): void {
        this.reload();
    }

    reload() {
        this.loading = true;

        setTimeout(() => {
            this.loading = false;
            this._cdr.markForCheck();
        }, 2000);
    }
}
