import { Component } from '@angular/core';
import {
    NxColComponent,
    NxLayoutComponent,
    NxRowComponent,
} from '@aposin/ng-aquila/grid';

/**
 * @title Column order example
 */
@Component({
    selector: 'grid-col-order-example',
    templateUrl: './grid-col-order-example.html',
    styleUrls: ['./grid-col-order-example.css'],
    imports: [NxLayoutComponent, NxRowComponent, NxColComponent],
})
export class GridColOrderExampleComponent {}
