import { Component } from '@angular/core';
import {
    NxDataDisplayComponent,
    NxDataDisplayLabelComponent,
} from '@aposin/ng-aquila/data-display';
import {
    NxColComponent,
    NxLayoutComponent,
    NxRowComponent,
} from '@aposin/ng-aquila/grid';
import { NxLinkComponent } from '@aposin/ng-aquila/link';
import { NxListComponent } from '@aposin/ng-aquila/list';

/**
 * @title Standard data display example
 */
@Component({
    selector: 'data-display-standard-example',
    templateUrl: './data-display-standard-example.html',
    styleUrls: ['./data-display-standard-example.css'],
    standalone: true,
    imports: [
        NxLayoutComponent,
        NxRowComponent,
        NxColComponent,
        NxDataDisplayComponent,
        NxDataDisplayLabelComponent,
        NxLinkComponent,
        NxListComponent,
    ],
})
export class DataDisplayStandardExampleComponent {}
