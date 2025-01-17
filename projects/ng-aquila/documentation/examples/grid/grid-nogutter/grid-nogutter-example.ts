import { Component } from '@angular/core';
import {
    NxColComponent,
    NxLayoutComponent,
    NxRowComponent,
} from '@aposin/ng-aquila/grid';

/**
 * @title Current tier of the grid
 */
@Component({
    selector: 'grid-nogutter-example',
    templateUrl: './grid-nogutter-example.html',
    styleUrls: ['./grid-nogutter-example.css'],
    imports: [NxLayoutComponent, NxRowComponent, NxColComponent],
})
export class GridNogutterExampleComponent {}
