import { Component } from '@angular/core';
import {
    DATA_DISPLAY_DEFAULT_OPTIONS,
    DataDisplayDefaultOptions,
} from '@aposin/ng-aquila/data-display';

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
})
export class DataDisplayCondensedExampleComponent {}
