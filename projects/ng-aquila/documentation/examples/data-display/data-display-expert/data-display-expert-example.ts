import { Component } from '@angular/core';
import { DATA_DISPLAY_DEFAULT_OPTIONS } from '@aposin/ng-aquila/data-display';

/**
 * @title Expert data display example
 */
@Component({
    selector: 'data-display-expert-example',
    templateUrl: './data-display-expert-example.html',
    styleUrls: ['./data-display-expert-example.css'],
    providers: [
        {
            provide: DATA_DISPLAY_DEFAULT_OPTIONS,
            useValue: { size: 'medium' },
        },
    ],
})
export class DataDisplayExpertExampleComponent {}
