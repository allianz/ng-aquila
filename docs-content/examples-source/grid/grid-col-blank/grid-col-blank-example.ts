import { Component } from '@angular/core';
import {
    NxColComponent,
    NxLayoutComponent,
    NxRowComponent,
} from '@aposin/ng-aquila/grid';

/**
 * @title nxCol example
 */
@Component({
    selector: 'grid-col-blank-example',
    templateUrl: './grid-col-blank-example.html',
    styleUrls: ['./grid-col-blank-example.css'],
    imports: [NxLayoutComponent, NxRowComponent, NxColComponent],
})
export class GridColBlankExampleComponent {}
