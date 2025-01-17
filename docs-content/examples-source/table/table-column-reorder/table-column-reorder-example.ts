import {
    CdkDrag,
    CdkDragDrop,
    CdkDropList,
    moveItemInArray,
} from '@angular/cdk/drag-drop';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
} from '@angular/core';
import {
    NxHeaderCellDirective,
    NxTableCellComponent,
    NxTableComponent,
    NxTableRowComponent,
} from '@aposin/ng-aquila/table';

@Component({
    selector: 'table-column-reorder-example',
    templateUrl: './table-column-reorder-example.html',
    styleUrls: ['./table-column-reorder-example.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        NxTableComponent,
        NxTableRowComponent,
        CdkDropList,
        NxHeaderCellDirective,
        CdkDrag,
        NxTableCellComponent,
    ],
})
export class TableColumnReorderExampleComponent {
    header = [
        { title: 'ID', field: 'id' },
        { title: 'Product', field: 'product' },
        { title: 'Contract Number', field: 'contractNumber' },
        { title: 'Ending Date', field: 'endingDate' },
        { title: 'Status', field: 'status' },
    ];
    content: any = [
        {
            id: 1,
            product: 'Product A',
            contractNumber: 'A123',
            endingDate: '2024-12-31',
            status: 'Active',
        },
        {
            id: 2,
            product: 'Product B',
            contractNumber: 'B456',
            endingDate: '2023-06-30',
            status: 'Expired',
        },
        {
            id: 3,
            product: 'Product C',
            contractNumber: 'C789',
            endingDate: '2022-12-31',
            status: 'Cancelled',
        },
        {
            id: 4,
            product: 'Product D',
            contractNumber: 'D101',
            endingDate: '2025-06-30',
            status: 'Active',
        },
        {
            id: 5,
            product: 'Product E',
            contractNumber: 'E202',
            endingDate: '2024-12-31',
            status: 'Expired',
        },
    ];

    drop(event: CdkDragDrop<string[]>) {
        moveItemInArray(this.header, event.previousIndex, event.currentIndex);
        this.cdr.markForCheck();
    }

    constructor(private readonly cdr: ChangeDetectorRef) {}
}
