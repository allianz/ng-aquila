import { Component } from '@angular/core';
import {
    NxColComponent,
    NxLayoutComponent,
    NxRowComponent,
} from '@aposin/ng-aquila/grid';

/**
 * @title One input example
 */
@Component({
    selector: 'grid-one-input-example',
    templateUrl: './grid-one-input-example.html',
    styleUrls: ['./grid-one-input-example.css'],
    imports: [NxLayoutComponent, NxRowComponent, NxColComponent],
})
export class GridOneInputExampleComponent {}
