import { Component, Injectable } from '@angular/core';
import {
    NxSortHeaderIntl,
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

@Injectable()
export class MyIntl extends NxSortHeaderIntl {
    sortAscendingAriaLabel = 'click to sort ascending';
    sortDescendingAriaLabel = 'click to sort descending';
    sortedAscendingAriaLabel = 'sorted ascending by';
    sortedDescendingAriaLabel = 'sorted descending by';
}

/**
 * @title Sorting example
 */
@Component({
    selector: 'table-sorting-example',
    templateUrl: './table-sorting-example.html',
    styleUrls: ['table-sorting-example.css'],
    providers: [{ provide: NxSortHeaderIntl, useClass: MyIntl }],
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
        return (a < b ? -1 : 1) * (direction === 'asc' ? 1 : -1);
    }
}
