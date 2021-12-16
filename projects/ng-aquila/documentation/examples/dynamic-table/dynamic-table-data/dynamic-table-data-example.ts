import { Component } from '@angular/core';

/**
 * @title Table Data Example
 */
@Component({
    selector: 'dynamic-table-data-example',
    templateUrl: './dynamic-table-data-example.html',
    styleUrls: ['./dynamic-table-data-example.css'],
})
export class DynamicTableDataExampleComponent {
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
}
