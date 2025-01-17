import { Component } from '@angular/core';
import {
    NxColComponent,
    NxLayoutComponent,
    NxRowComponent,
} from '@aposin/ng-aquila/grid';

/**
 * @title Align content example
 */
@Component({
    selector: 'grid-align-content-example',
    templateUrl: './grid-align-content-example.html',
    styleUrls: ['./grid-align-content-example.css'],
    imports: [NxLayoutComponent, NxRowComponent, NxColComponent],
})
export class GridAlignContentExampleComponent {}
