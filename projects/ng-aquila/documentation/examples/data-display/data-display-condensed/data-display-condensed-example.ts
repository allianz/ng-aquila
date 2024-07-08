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
import { NxLinkComponent } from '@aposin/ng-aquila/link';
import { NxListComponent } from '@aposin/ng-aquila/list';

const options: DataDisplayDefaultOptions = {
    size: 'medium', // expert mode default size
};

/**
 * @title Condensed data display example
 */
@Component({
    selector: 'data-display-condensed-example',
    templateUrl: './data-display-condensed-example.html',
    styleUrls: ['./data-display-condensed-example.css'],
    providers: [
        {
            provide: DATA_DISPLAY_DEFAULT_OPTIONS,
            useValue: options,
        },
    ],
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
export class DataDisplayCondensedExampleComponent {}
