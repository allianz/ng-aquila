import { Component } from '@angular/core';
import {
    NxComparisonTableCell,
    NxComparisonTableComponent,
    NxComparisonTableDescriptionCell,
    NxComparisonTableRowDirective,
    NxComparisonTableSelectButton,
} from '@aposin/ng-aquila/comparison-table';
import {
    NxDropdownComponent,
    NxDropdownItemComponent,
} from '@aposin/ng-aquila/dropdown';
import { NxFormfieldComponent } from '@aposin/ng-aquila/formfield';
import { NxIconComponent } from '@aposin/ng-aquila/icon';
import { NxSwipebarComponent } from '@aposin/ng-aquila/swipebar';

/** @title Add custom form elements to the table */
@Component({
    selector: 'comparison-table-form-elements-example',
    templateUrl: './comparison-table-form-elements-example.html',
    styleUrls: ['./comparison-table-form-elements-example.css'],
    standalone: true,
    imports: [
        NxSwipebarComponent,
        NxComparisonTableComponent,
        NxComparisonTableRowDirective,
        NxComparisonTableCell,
        NxComparisonTableSelectButton,
        NxComparisonTableDescriptionCell,
        NxIconComponent,
        NxFormfieldComponent,
        NxDropdownComponent,
        NxDropdownItemComponent,
    ],
})
export class ComparisonTableFormElementsExampleComponent {}
