import { Component } from '@angular/core';
import { DATA_DISPLAY_DEFAULT_OPTIONS } from '@aposin/ng-aquila/data-display';

/**
 * @title Expert data display example
 */
@Component({
    selector: 'data-display-expert-example',
    templateUrl: './data-display-expert-example.html',
    // Only for this example. Import the NxExpertModule instead!
    providers: [
        {
            provide: DATA_DISPLAY_DEFAULT_OPTIONS,
            useValue: { size: 'medium' },
        },
    ],
})
export class DataDisplayExpertExampleComponent {}
