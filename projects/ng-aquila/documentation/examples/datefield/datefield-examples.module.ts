import { NxInputModule } from '@aposin/ng-aquila/input';
import { NxMessageModule } from '@aposin/ng-aquila/message';
import { NxSwitcherModule } from '@aposin/ng-aquila/switcher';
import { NxMomentDateModule } from '@aposin/ng-aquila/moment-date-adapter';
import { NxDatefieldModule } from '@aposin/ng-aquila/datefield';

import { NgModule } from '@angular/core';
import { DatefieldBasicExampleComponent } from './datefield-basic/datefield-basic-example';
import { DatefieldDisabledExampleComponent } from './datefield-disabled/datefield-disabled-example';
import { DatefieldFilterExampleComponent } from './datefield-filter/datefield-filter-example';
import { DatefieldFormatInjectionExampleComponent } from './datefield-format-injection/datefield-format-injection-example';
import { DatefieldFormattingExampleComponent } from './datefield-formatting/datefield-formatting-example';
import { DatefieldInjectionTokenExampleComponent } from './datefield-injection-token/datefield-injection-token-example';
import { DatefieldIsoExampleComponent } from './datefield-iso/datefield-iso-example';
import { DatefieldLocalizeDateExampleComponent } from './datefield-localize-date/datefield-localize-date-example';
import { DatefieldLocalizeTextsExampleComponent } from './datefield-localize-texts/datefield-localize-texts-example';
import { DatefieldManualExampleComponent } from './datefield-manual/datefield-manual-example';
import { DatefieldMinMaxExampleComponent } from './datefield-min-max/datefield-min-max-example';
import { DatefieldParsingExampleComponent } from './datefield-parsing/datefield-parsing-example';
import { DatefieldRangeExampleComponent } from './datefield-range/datefield-range-example';
import { DatefieldReactiveExampleComponent } from './datefield-reactive/datefield-reactive-example';
import { DatefieldStartviewExampleComponent } from './datefield-startview/datefield-startview-example';
import { DatefieldToggleFocusExampleComponent } from './datefield-toggle-focus/datefield-toggle-focus-example';
import { ExamplesSharedModule } from '../examples-shared.module';

const EXAMPLES = [
    DatefieldBasicExampleComponent,
    DatefieldDisabledExampleComponent,
    DatefieldFilterExampleComponent,
    DatefieldFormatInjectionExampleComponent,
    DatefieldFormattingExampleComponent,
    DatefieldInjectionTokenExampleComponent,
    DatefieldIsoExampleComponent,
    DatefieldLocalizeDateExampleComponent,
    DatefieldLocalizeTextsExampleComponent,
    DatefieldManualExampleComponent,
    DatefieldMinMaxExampleComponent,
    DatefieldParsingExampleComponent,
    DatefieldRangeExampleComponent,
    DatefieldReactiveExampleComponent,
    DatefieldStartviewExampleComponent,
    DatefieldToggleFocusExampleComponent,
];

@NgModule({
    imports: [
        NxDatefieldModule,
        NxMomentDateModule,
        NxInputModule,
        NxSwitcherModule,
        NxMessageModule,
        ExamplesSharedModule,
    ],
    declarations: [EXAMPLES],
    exports: [EXAMPLES],
})
export class DatefieldExamplesModule {
    static components() {
        return {
            'datefield-basic': DatefieldBasicExampleComponent,
            'datefield-disabled': DatefieldDisabledExampleComponent,
            'datefield-filter': DatefieldFilterExampleComponent,
            'datefield-format-injection': DatefieldFormatInjectionExampleComponent,
            'datefield-formatting': DatefieldFormattingExampleComponent,
            'datefield-injection-token': DatefieldInjectionTokenExampleComponent,
            'datefield-iso': DatefieldIsoExampleComponent,
            'datefield-localize-date': DatefieldLocalizeDateExampleComponent,
            'datefield-localize-texts': DatefieldLocalizeTextsExampleComponent,
            'datefield-manual': DatefieldManualExampleComponent,
            'datefield-min-max': DatefieldMinMaxExampleComponent,
            'datefield-parsing': DatefieldParsingExampleComponent,
            'datefield-range': DatefieldRangeExampleComponent,
            'datefield-reactive': DatefieldReactiveExampleComponent,
            'datefield-startview': DatefieldStartviewExampleComponent,
            'datefield-toggle-focus': DatefieldToggleFocusExampleComponent,
        };
    }
}
