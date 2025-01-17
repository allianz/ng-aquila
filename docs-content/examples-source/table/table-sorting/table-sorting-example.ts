import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NxBadgeComponent } from '@aposin/ng-aquila/badge';
import { NxLinkComponent } from '@aposin/ng-aquila/link';
import {
    NxHeaderCellDirective,
    NxSortDirective,
    NxSortHeaderComponent,
    NxTableCellComponent,
    NxTableComponent,
    NxTableRowComponent,
    SortDirection,
    SortEvent,
} from '@aposin/ng-aquila/table';

interface Contract {
    product: string;
    contractNumber: number;
    desc: string;
    website: string;
    endingAt: Date;
    status: string;
    statusText: string;
}

/**
 * @title Sorting example
 */
@Component({
    selector: 'table-sorting-example',
    templateUrl: './table-sorting-example.html',
    styleUrls: ['table-sorting-example.css'],
    imports: [
        NxTableComponent,
        NxSortDirective,
        NxTableRowComponent,
        NxSortHeaderComponent,
        NxHeaderCellDirective,
        NxTableCellComponent,
        NxLinkComponent,
        RouterLink,
        NxBadgeComponent,
        DatePipe,
    ],
})
export class TableSortingExampleComponent {
    tableElements: Contract[] = [
        {
            product: 'Car',
            contractNumber: 1234,
            desc: 'This is a contract',
            website: 'www.example.com',
            endingAt: new Date('1/3/2020'),
            status: 'negative',
            statusText: 'open',
        },
        {
            product: 'Health',
            contractNumber: 2423,
            desc: 'This is another contract',
            website: 'www.allianz.com',
            endingAt: new Date('4/2/2020'),
            status: 'active',
            statusText: 'processing',
        },
        {
            product: 'Car',
            contractNumber: 353455,
            desc: 'Lorem ipsum dolor sit amet, csis libero. ',
            website: 'www.example.com',
            endingAt: new Date('6/2/2020'),
            status: 'positive',
            statusText: 'accepted',
        },
        {
            product: 'Home',
            contractNumber: 22344,
            desc: 'This is a description of a contract',
            website: 'www.example.org',
            endingAt: new Date('1/20/2027'),
            status: 'critical',
            statusText: 'rejected',
        },
    ];

    /**
     * Sorts the table data by a certain category.
     */
    sortTable(sort: SortEvent) {
        this.tableElements = this.tableElements.sort(
            (a: { [key: string]: any }, b: { [key: string]: any }) => {
                if (sort.active in a && sort.active in b) {
                    return this.compare(
                        a[sort.active],
                        b[sort.active],
                        sort.direction,
                    );
                }
                return 0;
            },
        );
    }

    compare(
        a: number | string | Date,
        b: number | string | Date,
        direction: SortDirection,
    ) {
        if (a < b) {
            return direction === 'asc' ? -1 : 1;
        } else if (a > b) {
            return direction === 'asc' ? 1 : -1;
        }
        return 0;
    }
}
