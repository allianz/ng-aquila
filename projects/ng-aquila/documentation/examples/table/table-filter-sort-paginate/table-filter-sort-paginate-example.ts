import { Component, Injectable } from '@angular/core';
import { SortEvent, SortDirection, NxSortHeaderIntl } from '@aposin/ng-aquila/table';

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
    sortAscendingAriaLabel = 'sort ascending by';
    sortDescendingAriaLabel = 'sort descending by';
}

/**
 * @title Advanced example for sorting, filtering and pagination
 */
@Component({
    selector: 'table-filter-sort-paginate-example',
    templateUrl: './table-filter-sort-paginate-example.html',
    styleUrls: ['./table-filter-sort-paginate-example.css'],
    providers: [{ provide: NxSortHeaderIntl, useClass: MyIntl }],
})
export class TableFilterSortPaginateExampleComponent {
    tableElements: Contract[] = [
        {
            product: 'Car',
            contractNumber: 1234,
            desc: 'this is a contract',
            website: 'www.example.com',
            endingAt: new Date('1/3/2020'),
            status: 'negative',
            statusText: 'open',
        },
        {
            product: 'AA',
            contractNumber: 334,
            desc: 'this is a contract',
            website: 'www.aposin.org',
            endingAt: new Date('1/3/2019'),
            status: 'negative',
            statusText: 'open',
        },
        {
            product: 'BB',
            contractNumber: 6643,
            desc: 'this is a contract',
            website: 'www.example.com',
            endingAt: new Date('1/3/2020'),
            status: 'negative',
            statusText: 'open',
        },
        {
            product: 'DD',
            contractNumber: 1288,
            desc: 'this is a contract',
            website: 'www.example.com',
            endingAt: new Date('1/12/2018'),
            status: 'negative',
            statusText: 'open',
        },
        {
            product: 'DDE',
            contractNumber: 1456,
            desc: 'this is a contract',
            website: 'www.example.com',
            endingAt: new Date('1/11/2020'),
            status: 'negative',
            statusText: 'open',
        },
        {
            product: 'GG',
            contractNumber: 122,
            desc: 'this is a contract',
            website: 'www.example.org',
            endingAt: new Date('12/6/2020'),
            status: 'negative',
            statusText: 'open',
        },
        {
            product: 'JK',
            contractNumber: 1422,
            desc: 'this is a contract',
            website: 'www.aposin.org',
            endingAt: new Date('1/3/2020'),
            status: 'negative',
            statusText: 'open',
        },
        {
            product: 'M',
            contractNumber: 1225,
            desc: 'this is a contract',
            website: 'www.example.org',
            endingAt: new Date('4/5/2020'),
            status: 'negative',
            statusText: 'open',
        },
        {
            product: 'L',
            contractNumber: 1313,
            desc: 'this is a contract',
            website: 'www.aposin.org',
            endingAt: new Date('1/4/2020'),
            status: 'negative',
            statusText: 'open',
        },
        {
            product: 'Legal',
            contractNumber: 2423,
            desc: 'this is another contract',
            website: 'www.aposin.org',
            endingAt: new Date('4/2/2020'),
            status: 'active',
            statusText: 'processing',
        },
        {
            product: 'CC',
            contractNumber: 4356,
            desc: 'this is a contract',
            website: 'www.example.com',
            endingAt: new Date('1/9/2020'),
            status: 'negative',
            statusText: 'open',
        },
        {
            product: 'Health',
            contractNumber: 353455,
            desc: 'Lorem ipsum dolor sit amet, csis libero. ',
            website: 'www.aposin.org',
            endingAt: new Date('6/2/2017'),
            status: 'positive',
            statusText: 'accepted',
        },
        {
            product: 'Car',
            contractNumber: 22344,
            desc: 'this is a description of a contract',
            website: 'www.example.com',
            endingAt: new Date('1/20/2027'),
            status: 'critical',
            statusText: 'rejected',
        },
    ];

    currentlyShownPageElements!: Contract[];
    currentlyAvailableElements: Contract[];

    page: number = 1;
    filterValue: string = '';
    elementsPerPage: number = 5;

    /**
     * Sorts the table data by a certain category.
     */
    sortTable(sort: SortEvent) {
        this.currentlyAvailableElements = this.currentlyAvailableElements.sort(
            (a: { [key: string]: any }, b: { [key: string]: any }) => {
                if (sort.active in a && sort.active in b) {
                    return this.compare(a[sort.active], b[sort.active], sort.direction);
                }
                return 0;
            },
        );

        this.updatePage();
    }

    compare(a: number | string | Date, b: number | string | Date, direction: SortDirection) {
        return (a < b ? -1 : 1) * (direction === 'asc' ? 1 : -1);
    }

    constructor() {
        this.currentlyAvailableElements = this.tableElements;
        // init first page on page load
        this.updatePage();
    }

    onFilterValueChange(value: string) {
        this.filterData(value);
    }

    filterData(filterValue: string) {
        this.currentlyAvailableElements = this.tableElements.filter(tableRowObject => {
            return Object.values(tableRowObject).some(propertyValue =>
                new RegExp(filterValue, 'i').test(String(propertyValue)),
            );
        });

        this.updatePage();
    }

    updatePage() {
        const indexMin = (this.page - 1) * this.elementsPerPage;
        const indexMax = indexMin + this.elementsPerPage;
        this.currentlyShownPageElements = this.currentlyAvailableElements.filter(
            (x, index) => index >= indexMin && index < indexMax,
        );
    }

    prevPage() {
        this.page--;
        this.updatePage();
    }

    nextPage() {
        this.page++;
        this.updatePage();
    }

    goToPage(n: number) {
        this.page = n;
        this.updatePage();
    }
}
