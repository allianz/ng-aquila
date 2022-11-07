import { Component } from '@angular/core';
import { NxDynamicTableColumnDefinition } from '@aposin/ng-aquila/dynamic-table';

/**
 * @title Table Event Example
 */
@Component({
    selector: 'dynamic-table-event-example',
    templateUrl: './dynamic-table-event-example.html',
    styleUrls: ['./dynamic-table-event-example.css'],
})
export class DynamicTableEventExampleComponent {
    data = [
        {
            code: 'AAC ',
            company: 'Honda',
            price: '$1.38 ',
            change: '-0.01 ',
            changePercent: '-0.36% ',
            sample: '$0.00 ',
            lorem: 'ab lreom ',
        },
        {
            code: 'AAD ',
            company: 'Abacus',
            price: '$1.15 ',
            change: '+2.01 ',
            changePercent: '+45.00% ',
            sample: '$0.00 ',
            lorem: 'ab ipsum ',
        },
        {
            code: 'AAC ',
            company: 'Aditya',
            price: '$2.22 ',
            change: '-1.21 ',
            changePercent: '+5.00% ',
            sample: '$0.00 ',
            lorem: 'ab tyuy ',
        },
        {
            code: 'ABC ',
            company: 'Acrux Limited',
            price: '$1.50 ',
            change: '-0.01 ',
            changePercent: '±0% ',
            sample: '$0.00 ',
            lorem: 'mad<br>abdi ',
        },
        {
            code: 'AGK ',
            company: 'Adamus',
            price: '$3.12 ',
            change: '-0.01 ',
            changePercent: '-1.00% ',
            sample: '$0.00 ',
            lorem: 'ab tyuy ',
        },
    ];

    displayedColumns: NxDynamicTableColumnDefinition[] = [
        { title: 'Code', key: 'code', type: 'string' },
        { title: 'Company', key: 'company', type: 'string' },
        { title: 'Price', key: 'price', type: 'numeric' },
        { title: 'Change Percent', key: 'changePercent', type: 'numeric' },
        { title: 'Change', key: 'change', type: 'numeric' },
        { title: 'Lorem Ipsum', key: 'lorem', type: 'string' },
    ];

    modalOpen = false;
    basicModalBody = '';

    handleRowClick(row: unknown): void {
        this.basicModalBody = JSON.stringify(row);
        this.toggleModal();
    }

    toggleModal() {
        this.modalOpen = !this.modalOpen;
    }
}
