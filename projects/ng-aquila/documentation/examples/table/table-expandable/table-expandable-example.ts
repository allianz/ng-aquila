import { NgFor } from '@angular/common';
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
    standalone: true,
    imports: [
        NxTableComponent,
        NxExpandableTableDirective,
        NxTableRowComponent,
        NxHeaderCellDirective,
        NxToggleButtonComponent,
        NgFor,
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
            desc: 'This is a contract',
            website: 'www.example.com',
            endingAt: '1/3/2020',
            status: 'negative',
            statusText: 'open',
        },
        {
            product: 'Health',
            contractNumber: 2423,
            desc: 'This is another contract',
            website: 'www.allianz.com',
            endingAt: '4/2/2020',
            status: 'active',
            statusText: 'accepted',
        },
        {
            product: 'Car',
            contractNumber: 353455,
            desc: 'Lorem ipsum dolor sit amet, csis libero. ',
            website: 'www.example.com',
            endingAt: '6/2/2020',
            status: 'positive',
            statusText: 'accepted',
        },
        {
            product: 'Home',
            contractNumber: 22344,
            desc: 'This is a description of a contract',
            website: 'www.example.org',
            endingAt: '1/2/2027',
            status: 'critical',
            statusText: 'rejected',
        },
    ];
}
