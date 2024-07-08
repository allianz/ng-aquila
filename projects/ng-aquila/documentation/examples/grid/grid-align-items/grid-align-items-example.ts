import { Component } from '@angular/core';
import {
    NxColComponent,
    NxLayoutComponent,
    NxRowComponent,
} from '@aposin/ng-aquila/grid';

/**
 * @title Align items example
 */
@Component({
    selector: 'grid-align-items-example',
    templateUrl: './grid-align-items-example.html',
    styleUrls: ['./grid-align-items-example.css'],
    standalone: true,
    imports: [NxLayoutComponent, NxRowComponent, NxColComponent],
})
export class GridAlignItemsExampleComponent {}
