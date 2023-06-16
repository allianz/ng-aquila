import { Component } from '@angular/core';

/**
 * @title Sticky Header Table
 */
@Component({
    selector: 'table-sticky-header-example',
    templateUrl: './table-sticky-header-example.html',
    styleUrls: ['./table-sticky-header-example.css'],
})
export class TableStickyHeaderExampleComponent {
    tableElements = [
        {
            product: 'Car',
            contractNumber: 1234,
            desc: 'This is a contract',
            endingAt: '1/3/2020',
        },
        {
            product: 'Health',
            contractNumber: 2423,
            desc: 'This is another contract',
            endingAt: '4/2/2020',
        },
        {
            product: 'Liability',
            contractNumber: 353455,
            desc: 'Lorem ipsum dolor sit amet, csis libero. ',
            endingAt: '6/2/2020',
        },
        {
            product: 'Pension',
            contractNumber: 22344,
            desc: 'This is a description of a contract',
            endingAt: '7/2/2027',
        },
    ];
}
