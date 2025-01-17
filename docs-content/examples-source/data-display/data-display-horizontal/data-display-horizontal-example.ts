import { Component } from '@angular/core';
import {
    DATA_DISPLAY_DEFAULT_OPTIONS,
    DataDisplayDefaultOptions,
    NxDataDisplayComponent,
    NxDataDisplayLabelComponent,
} from '@aposin/ng-aquila/data-display';
import {
    NxColComponent,
    NxLayoutComponent,
    NxRowComponent,
} from '@aposin/ng-aquila/grid';
import { NxHeadlineComponent } from '@aposin/ng-aquila/headline';
import { NxLinkComponent } from '@aposin/ng-aquila/link';
import { NxListComponent } from '@aposin/ng-aquila/list';

const options: DataDisplayDefaultOptions = {
    size: 'medium', // expert mode default size
};

/**
 * @title Horizontal data display example
 */
@Component({
    selector: 'data-display-horizontal-example',
    templateUrl: './data-display-horizontal-example.html',
    styleUrls: ['./data-display-horizontal-example.css'],
    providers: [
        {
            provide: DATA_DISPLAY_DEFAULT_OPTIONS,
            useValue: options,
        },
    ],
    imports: [
        NxLayoutComponent,
        NxRowComponent,
        NxColComponent,
        NxHeadlineComponent,
        NxDataDisplayComponent,
        NxDataDisplayLabelComponent,
        NxLinkComponent,
        NxListComponent,
    ],
})
export class DataDisplayHorizontalExampleComponent {}
