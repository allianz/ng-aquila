import { Component } from '@angular/core';
import {
    NxColComponent,
    NxLayoutComponent,
    NxRowComponent,
} from '@aposin/ng-aquila/grid';

/**
 * @title Offset example
 */
@Component({
    selector: 'grid-offset-example',
    templateUrl: './grid-offset-example.html',
    styleUrls: ['./grid-offset-example.css'],
    standalone: true,
    imports: [NxLayoutComponent, NxRowComponent, NxColComponent],
})
export class GridOffsetExampleComponent {}
