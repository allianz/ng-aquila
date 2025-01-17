import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NxBadgeComponent } from '@aposin/ng-aquila/badge';
import { NxLinkComponent } from '@aposin/ng-aquila/link';
import {
    NxExpandableTableCellComponent,
    NxExpandableTableDirective,
    NxExpandableTableRowComponent,
    NxHeaderCellDirective,
    NxTableCellComponent,
    NxTableComponent,
    NxTableRowComponent,
    NxToggleButtonComponent,
} from '@aposin/ng-aquila/table';

/**
 * @title Expandable Rows
 */
@Component({
    selector: 'table-expandable-example',
    templateUrl: './table-expandable-example.html',
    styleUrls: ['./table-expandable-example.css'],
    imports: [
        NxTableComponent,
        NxExpandableTableDirective,
        NxTableRowComponent,
        NxHeaderCellDirective,
        NxToggleButtonComponent,
        NxTableCellComponent,
        NxBadgeComponent,
        NxExpandableTableRowComponent,
        NxExpandableTableCellComponent,
        NxLinkComponent,
        RouterLink,
    ],
})
export class TableExpandableExampleComponent {
    tableElements = [
        {
            product: 'Car',
            contractNumber: 1234,
            endingAt: '1/3/2020',
            status: 'negative',
            statusText: 'open',
            sub: ['BMW', 'Audi'],
        },
        {
            product: 'Health',
            contractNumber: 2423,
            endingAt: '4/2/2020',
            status: 'active',
            statusText: 'accepted',
            sub: ['Critical illness', 'Personal accident'],
        },
        {
            product: 'Home',
            contractNumber: 22344,
            endingAt: '1/2/2027',
            status: 'critical',
            statusText: 'rejected',
            sub: ['Insurance', 'Mortgage'],
        },
    ];
}
