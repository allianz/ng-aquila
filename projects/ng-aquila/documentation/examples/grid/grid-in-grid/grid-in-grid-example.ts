import { Component } from '@angular/core';
import {
    NxColComponent,
    NxLayoutComponent,
    NxRowComponent,
} from '@aposin/ng-aquila/grid';

/**
 * @title Grid in grid example
 */
@Component({
    selector: 'grid-in-grid-example',
    templateUrl: './grid-in-grid-example.html',
    styleUrls: ['./grid-in-grid-example.css'],
    standalone: true,
    imports: [NxLayoutComponent, NxRowComponent, NxColComponent],
})
export class GridInGridExampleComponent {}
