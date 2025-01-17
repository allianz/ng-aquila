import { Overlay, ScrollStrategy } from '@angular/cdk/overlay';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NxErrorComponent } from '@aposin/ng-aquila/base';
import {
    NX_DATEPICKER_SCROLL_STRATEGY,
    NxDatefieldDirective,
    NxDatepickerComponent,
    NxDatepickerToggleComponent,
} from '@aposin/ng-aquila/datefield';
import {
    NxFormfieldComponent,
    NxFormfieldErrorDirective,
    NxFormfieldSuffixDirective,
} from '@aposin/ng-aquila/formfield';
import {
    NxColComponent,
    NxLayoutComponent,
    NxRowComponent,
} from '@aposin/ng-aquila/grid';
import { NxInputDirective } from '@aposin/ng-aquila/input';
import { Moment } from 'moment';

function scrollStrategyFactory(overlay: Overlay): () => ScrollStrategy {
    return () => overlay.scrollStrategies.close();
}

/**
 * @title Scroll Strategy Provider Example
 */
@Component({
    selector: 'datefield-scroll-strategy-provider-example',
    templateUrl: './datefield-scroll-strategy-provider-example.html',
    styleUrls: ['./datefield-scroll-strategy-provider-example.css'],
    providers: [
        {
            provide: NX_DATEPICKER_SCROLL_STRATEGY,
            useFactory: scrollStrategyFactory,
            deps: [Overlay],
        },
    ],
    imports: [
        NxLayoutComponent,
        NxRowComponent,
        NxColComponent,
        NxFormfieldComponent,
        NxDatefieldDirective,
        NxInputDirective,
        FormsModule,
        NxDatepickerToggleComponent,
        NxFormfieldSuffixDirective,
        NxDatepickerComponent,
        NxErrorComponent,
        NxFormfieldErrorDirective,
    ],
})
export class DatefieldScrollStrategyProviderExampleComponent {
    currentDate: Moment | null = null;
}
