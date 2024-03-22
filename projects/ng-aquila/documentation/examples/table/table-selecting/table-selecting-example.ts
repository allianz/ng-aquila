import { SelectionModel } from '@angular/cdk/collections';
import { formatDate } from '@angular/common';
import { Component, Inject, LOCALE_ID, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

interface Contract {
    product: string;
    contractNumber: number;
    website: string;
    endingAt: Date;
    status: string;
    statusText: string;
}

/**
 * @title Multi Row Selection
 */
@Component({
    selector: 'table-selecting-example',
    templateUrl: './table-selecting-example.html',
    styleUrls: ['./table-selecting-example.css'],
})
export class TableSelectingExampleComponent implements OnDestroy {
    private readonly _destroyed = new Subject<void>();

    showSelected = false;

    activateSelected = true;
    activeRow?: Contract;
    filterValue = '';

    page = 1;
    elementsPerPage = 5;
    numSelectedPage = 0;
    currentlyShownPageElements!: Contract[];
    currentlyAvailableElements!: Contract[];

    constructor(@Inject(LOCALE_ID) private readonly localeId: string) {
        this.currentlyAvailableElements = this.tableElements;
        this.selection.changed
            .pipe(takeUntil(this._destroyed))
            .subscribe(r => this.updateNumPageSelected());
        // init first page on page load
        this.updatePage();
    }

    tableElements: Contract[] = [
        {
            product: 'Car',
            contractNumber: 1234,
            website: 'www.example.com',
            endingAt: new Date('1/3/2020'),
            status: 'negative',
            statusText: 'open',
        },
        {
            product: 'Health',
            contractNumber: 2423,
            website: 'www.allianz.com',
            endingAt: new Date('4/2/2020'),
            status: 'positive',
            statusText: 'accepted',
        },
        {
            product: 'Auto',
            contractNumber: 353455,
            website: 'www.example.com',
            endingAt: new Date('6/2/2020'),
            status: 'positive',
            statusText: 'accepted',
        },
        {
            product: 'Home',
            contractNumber: 22344,
            website: 'www.example.org',
            endingAt: new Date('1/2/2027'),
            status: 'critical',
            statusText: 'rejected',
        },
        {
            product: 'Travel',
            contractNumber: 76344,
            website: 'www.allianz.com',
            endingAt: new Date('8/3/2026'),
            status: 'negative',
            statusText: 'open',
        },
        {
            product: 'Renters',
            contractNumber: 32344,
            website: 'www.example.org',
            endingAt: new Date('1/2/2027'),
            status: 'positive',
            statusText: 'accepted',
        },
        {
            product: 'Pet',
            contractNumber: 87444,
            website: 'www.allianz.com',
            endingAt: new Date('1/2/2027'),
            status: 'critical',
            statusText: 'rejected',
        },
        {
            product: 'Business',
            contractNumber: 91102,
            website: 'www.example.org',
            endingAt: new Date('1/2/2027'),
            status: 'negative',
            statusText: 'open',
        },
        {
            product: 'Motorcycle',
            contractNumber: 58172,
            website: 'www.allianz.com',
            endingAt: new Date('1/2/2027'),
            status: 'critical',
            statusText: 'rejected',
        },
        {
            product: 'Dental',
            contractNumber: 11298,
            website: 'www.example.org',
            endingAt: new Date('2/3/2026'),
            status: 'negative',
            statusText: 'open',
        },
        {
            product: 'Vision',
            contractNumber: 76122,
            website: 'www.allianz.com',
            endingAt: new Date('11/12/2029'),
            status: 'critical',
            statusText: 'rejected',
        },
        {
            product: 'Disability',
            contractNumber: 12411,
            website: 'www.example.org',
            endingAt: new Date('1/12/2028'),
            status: 'negative',
            statusText: 'open',
        },
        {
            product: 'Critical Illness',
            contractNumber: 36711,
            website: 'www.allianz.com',
            endingAt: new Date('1/3/2028'),
            status: 'negative',
            statusText: 'open',
        },
        {
            product: 'Earthquake',
            contractNumber: 47591,
            website: 'www.example.org',
            endingAt: new Date('12/2/2025'),
            status: 'positive',
            statusText: 'accepted',
        },
        {
            product: 'Flood',
            contractNumber: 41874,
            website: 'www.example.org',
            endingAt: new Date('12/2/2025'),
            status: 'positive',
            statusText: 'accepted',
        },
    ];

    selection = new SelectionModel<Contract>(true, []);

    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.tableElements.length;
        return numSelected === numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection of the page. */
    toggleAllPage() {
        const isAllPageSelected = this.isAllPageSelected();
        this.currentlyShownPageElements.forEach(row => {
            if (isAllPageSelected) {
                this.selection.deselect(row);
            } else {
                this.selection.select(row);
            }
        });
    }

    isAllPageSelected() {
        return (
            this.numSelectedPage === this.elementsPerPage ||
            this.currentlyAvailableElements.length === this.numSelectedPage
        );
    }

    somePageSelected() {
        return (
            this.numSelectedPage > 0 &&
            this.numSelectedPage < this.elementsPerPage &&
            this.numSelectedPage < this.currentlyAvailableElements.length
        );
    }

    updateNumPageSelected() {
        this.numSelectedPage = this.currentlyShownPageElements.filter(row =>
            this.selection.isSelected(row),
        )?.length;
    }

    selectAll() {
        this.tableElements.forEach(row => this.selection.select(row));
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

    onFilterValueChange(value: string) {
        this.page = 1;
        this.filterData(value);
    }

    filterData(filterValue: string) {
        const filterRegexp = new RegExp(filterValue, 'i');
        const dateFormat = 'dd/MM/yyyy';

        this.currentlyAvailableElements = this.tableElements.filter(
            tableRowObject =>
                Object.values(tableRowObject).some(propertyValue =>
                    filterRegexp.test(
                        propertyValue instanceof Date
                            ? formatDate(
                                  propertyValue,
                                  dateFormat,
                                  this.localeId,
                              )
                            : String(propertyValue),
                    ),
                ),
        );

        this.updatePage();
    }

    updatePage() {
        const indexMin = (this.page - 1) * this.elementsPerPage;
        const indexMax = indexMin + this.elementsPerPage;
        this.currentlyShownPageElements =
            this.currentlyAvailableElements.filter(
                (x, index) => index >= indexMin && index < indexMax,
            );
        this.updateNumPageSelected();
    }

    /** Marks a row as active without changing this.selection */
    activateRow(row: Contract) {
        this.activeRow = row;
    }

    ngOnDestroy(): void {
        this._destroyed.next();
        this._destroyed.complete();
    }
}
