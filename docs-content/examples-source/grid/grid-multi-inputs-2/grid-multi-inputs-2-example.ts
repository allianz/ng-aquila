import { Component } from '@angular/core';
import {
    NxColComponent,
    NxLayoutComponent,
    NxRowComponent,
} from '@aposin/ng-aquila/grid';

/**
 * @title Multiple inputs example 2
 */
@Component({
    selector: 'grid-multi-inputs-2-example',
    templateUrl: './grid-multi-inputs-2-example.html',
    styleUrls: ['./grid-multi-inputs-2-example.css'],
    imports: [NxLayoutComponent, NxRowComponent, NxColComponent],
})
export class GridMultiInputs2ExampleComponent {}
