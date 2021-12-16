import { Component } from '@angular/core';
import { DATA_DISPLAY_DEFAULT_OPTIONS } from '@aposin/ng-aquila/data-display';

/**
 * @title Horizontal data display example
 */
@Component({
    selector: 'data-display-horizontal-example',
    templateUrl: './data-display-horizontal-example.html',
    // Only for this example. Import the NxExpertModule instead!
    providers: [
        {
            provide: DATA_DISPLAY_DEFAULT_OPTIONS,
            useValue: { size: 'medium' },
        },
    ],
})
export class DataDisplayHorizontalExampleComponent {}
