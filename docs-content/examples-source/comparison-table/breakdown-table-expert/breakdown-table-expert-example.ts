import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NxCopytextComponent } from '@aposin/ng-aquila/copytext';
import {
    DATA_DISPLAY_DEFAULT_OPTIONS,
    DataDisplayDefaultOptions,
    NxDataDisplayComponent,
} from '@aposin/ng-aquila/data-display';
import {
    NxColComponent,
    NxLayoutComponent,
    NxRowComponent,
} from '@aposin/ng-aquila/grid';
import { NxHeadlineComponent } from '@aposin/ng-aquila/headline';

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
    standalone: true,
    imports: [
        NxLayoutComponent,
        NxRowComponent,
        NxColComponent,
        NxCopytextComponent,
        NxHeadlineComponent,
        NxDataDisplayComponent,
        CurrencyPipe,
    ],
})
export class BreakdownTableExpertExampleComponent {}
