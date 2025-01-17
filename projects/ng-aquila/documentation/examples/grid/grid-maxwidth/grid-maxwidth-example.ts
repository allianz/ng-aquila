import { Component } from '@angular/core';
import {
    NxColComponent,
    NxLayoutComponent,
    NxRowComponent,
} from '@aposin/ng-aquila/grid';

/**
 * @title Max width example
 */
@Component({
    selector: 'grid-maxwidth-example',
    templateUrl: './grid-maxwidth-example.html',
    styleUrls: ['./grid-maxwidth-example.css'],
    imports: [NxLayoutComponent, NxRowComponent, NxColComponent],
})
export class GridMaxwidthExampleComponent {}
