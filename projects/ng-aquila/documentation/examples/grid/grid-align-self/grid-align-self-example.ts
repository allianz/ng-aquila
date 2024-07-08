import { Component } from '@angular/core';
import {
    NxColComponent,
    NxLayoutComponent,
    NxRowComponent,
} from '@aposin/ng-aquila/grid';

/**
 * @title Align self example
 */
@Component({
    selector: 'grid-align-self-example',
    templateUrl: './grid-align-self-example.html',
    styleUrls: ['./grid-align-self-example.css'],
    standalone: true,
    imports: [NxLayoutComponent, NxRowComponent, NxColComponent],
})
export class GridAlignSelfExampleComponent {}
