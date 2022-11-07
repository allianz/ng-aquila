import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
    DATA_DISPLAY_DEFAULT_OPTIONS,
    DataDisplayDefaultOptions,
} from '@aposin/ng-aquila/data-display';

const options: DataDisplayDefaultOptions = {
    size: 'medium', // expert mode default size
};

/**
 * @title Breakdown table expert example
 */
@Component({
    selector: 'breakdown-table-expert-example',
    templateUrl: './breakdown-table-expert-example.html',
    styleUrls: ['./breakdown-table-expert-example.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: DATA_DISPLAY_DEFAULT_OPTIONS,
            useValue: options,
        },
    ],
})
export class BreakdownTableExpertExampleComponent {}
