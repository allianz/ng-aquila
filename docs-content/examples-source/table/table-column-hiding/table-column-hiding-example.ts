import {
    CdkDragDrop,
    moveItemInArray,
    transferArrayItem,
} from '@angular/cdk/drag-drop';
import { ChangeDetectorRef, Component } from '@angular/core';

/**
 * @title Table Column Options
 */
@Component({
    selector: 'table-column-hiding-example',
    templateUrl: './table-column-hiding-example.html',
    styleUrls: ['./table-column-hiding-example.css'],
})
export class TableCoumnHidingExampleComponent {
    constructor(private readonly _cdr: ChangeDetectorRef) {}
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

    options = [
        { label: 'Product', value: 'product' },
        { label: 'Contract Number', value: 'contractNumber' },
        { label: 'Description', value: 'desc' },
        { label: 'Website', value: 'website' },
        { label: 'Ending At', value: 'endingAt' },
        { label: 'Status', value: 'statusText' },
    ];

    selected = [
        'product',
        'website',
        'endingAt',
        'statusText',
        'contractNumber',
        'desc',
    ];

    drop(event: CdkDragDrop<any[]>) {
        if (event.previousContainer === event.container) {
            moveItemInArray(
                event.container.data,
                event.previousIndex,
                event.currentIndex,
            );
        } else {
            transferArrayItem(
                event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex,
            );
        }
        this._cdr.detectChanges();
    }
}
