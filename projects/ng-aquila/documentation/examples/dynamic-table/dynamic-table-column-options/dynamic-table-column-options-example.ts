import {
    CdkDrag,
    CdkDragDrop,
    CdkDropList,
    moveItemInArray,
} from '@angular/cdk/drag-drop';
import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NxButtonComponent } from '@aposin/ng-aquila/button';
import {
    NxCheckboxComponent,
    NxCheckboxGroupComponent,
} from '@aposin/ng-aquila/checkbox';
import {
    NxContextMenuComponent,
    NxContextMenuItemComponent,
    NxContextMenuItemWrapComponent,
    NxContextMenuTriggerDirective,
} from '@aposin/ng-aquila/context-menu';
import {
    NxDynamicTableColumnDefinition,
    NxDynamicTableComponent,
} from '@aposin/ng-aquila/dynamic-table';
import { NxIconComponent } from '@aposin/ng-aquila/icon';

/**
 * @title Table Column Options Example
 */
@Component({
    selector: 'dynamic-table-column-options-example',
    templateUrl: './dynamic-table-column-options-example.html',
    styleUrls: ['./dynamic-table-column-options-example.css'],
    standalone: true,
    imports: [
        NxButtonComponent,
        NxContextMenuTriggerDirective,
        NxContextMenuComponent,
        NxCheckboxGroupComponent,
        CdkDropList,
        FormsModule,
        NxContextMenuItemWrapComponent,
        NgFor,
        NxContextMenuItemComponent,
        CdkDrag,
        NxIconComponent,
        NxCheckboxComponent,
        NxDynamicTableComponent,
    ],
})
export class DynamicTableColumnOptionsExampleComponent {
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

    columns: NxDynamicTableColumnDefinition[] = [
        { title: 'Code', key: 'code', type: 'string' },
        { title: 'Company', key: 'company', type: 'string' },
        { title: 'Price', key: 'price', type: 'numeric' },
        { title: 'Change Percent', key: 'changePercent', type: 'numeric' },
        { title: 'Change', key: 'change', type: 'numeric' },
        { title: 'Lorem Ipsum', key: 'lorem', type: 'string' },
    ];

    selected = ['code', 'company', 'price', 'changePercent', 'change', 'lorem'];

    get displayedColumns() {
        return this.columns.filter(column =>
            this.selected.some(selected => column.key === selected),
        );
    }

    drop(event: CdkDragDrop<string[], any>) {
        moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
    }
}
