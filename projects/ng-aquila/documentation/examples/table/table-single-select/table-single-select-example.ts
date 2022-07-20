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
 * @title Single Row Selection
 */
@Component({
    selector: 'table-single-select-example',
    templateUrl: './table-single-select-example.html',
    styleUrls: ['./table-single-select-example.css'],
})
export class TableSingleSelectExampleComponent {
    showSelected = false;

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

    selection = new SelectionModel<Contract>(false, []);
}
