import { Component } from '@angular/core';
import {
    NxColComponent,
    NxLayoutComponent,
    NxRowComponent,
} from '@aposin/ng-aquila/grid';

/**
 * @title Multiple inputs example 1
 */
@Component({
    selector: 'grid-multi-inputs-1-example',
    templateUrl: './grid-multi-inputs-1-example.html',
    styleUrls: ['./grid-multi-inputs-1-example.css'],
    imports: [NxLayoutComponent, NxRowComponent, NxColComponent],
})
export class GridMultiInputs1ExampleComponent {}
