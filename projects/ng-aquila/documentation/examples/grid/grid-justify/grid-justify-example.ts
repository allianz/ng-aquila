import { Component } from '@angular/core';
import {
    NxColComponent,
    NxLayoutComponent,
    NxRowComponent,
} from '@aposin/ng-aquila/grid';

/**
 * @title Justify row example
 */
@Component({
    selector: 'grid-justify-example',
    templateUrl: './grid-justify-example.html',
    styleUrls: ['./grid-justify-example.css'],
    imports: [NxLayoutComponent, NxRowComponent, NxColComponent],
})
export class GridJustifyExampleComponent {}
