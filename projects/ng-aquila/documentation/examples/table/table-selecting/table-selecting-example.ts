import { SelectionModel } from '@angular/cdk/collections';
import { Component } from '@angular/core';

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
export class TableSelectingExampleComponent {
    showSelected: boolean = false;

    activateSelected: boolean = true;
    activeRow: Contract | undefined;

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
            website: 'www.aposin.org',
            endingAt: new Date('4/2/2020'),
            status: 'positive',
            statusText: 'accepted',
        },
        {
            product: 'Car',
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
    ];

    selection = new SelectionModel<Contract>(true, []);

    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.tableElements.length;
        return numSelected === numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    toggleAll() {
        this.isAllSelected()
            ? this.selection.clear()
            : this.tableElements.forEach(row => this.selection.select(row));
    }

    /** marks a row as active without changing this.selection */
    activateRow(row: Contract) {
        this.activeRow = row;
    }
}
