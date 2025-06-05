import { Component } from '@angular/core';
import { NxPlainButtonComponent } from '@aposin/ng-aquila/button';
import { NxCheckboxComponent } from '@aposin/ng-aquila/checkbox';
import {
    NxComparisonTableCell,
    NxComparisonTableComponent,
    NxComparisonTableDescriptionCell,
    NxComparisonTableIntersectionCell,
    NxComparisonTableRowDirective,
    NxComparisonTableSelectButton,
} from '@aposin/ng-aquila/comparison-table';
import {
    NxDropdownComponent,
    NxDropdownItemComponent,
} from '@aposin/ng-aquila/dropdown';
import { NxFormfieldComponent } from '@aposin/ng-aquila/formfield';
import { NxIconComponent } from '@aposin/ng-aquila/icon';
import { NxInputDirective } from '@aposin/ng-aquila/input';
import { NxListComponent, NxListIconComponent } from '@aposin/ng-aquila/list';
import {
    NxPopoverComponent,
    NxPopoverTriggerDirective,
} from '@aposin/ng-aquila/popover';

/** @title Disabled Columns example */
@Component({
    selector: 'comparison-table-disabled-columns-example',
    templateUrl: './comparison-table-disabled-columns-example.html',
    styleUrls: ['./comparison-table-disabled-columns-example.css'],
    imports: [
        NxComparisonTableComponent,
        NxComparisonTableRowDirective,
        NxComparisonTableCell,
        NxComparisonTableSelectButton,
        NxComparisonTableDescriptionCell,
        NxPlainButtonComponent,
        NxPopoverTriggerDirective,
        NxIconComponent,
        NxPopoverComponent,
        NxComparisonTableIntersectionCell,
        NxListComponent,
        NxListIconComponent,
        NxFormfieldComponent,
        NxDropdownComponent,
        NxDropdownItemComponent,
        NxInputDirective,
        NxCheckboxComponent,
    ],
})
export class ComparisonTableDisabledColumnsExampleComponent {
    disableColumn = true;
}
