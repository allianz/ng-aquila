import { NgModule } from '@angular/core';
import { NxErrorModule } from '@aposin/ng-aquila/base';
import { NxTimefieldModule } from '@aposin/ng-aquila/timefield';

import { ExamplesSharedModule } from '../examples-shared.module';
import { TimefieldDisabledExampleComponent } from './timefield-disabled/timefield-disabled-example';
import { TimefieldFormatTogglerExampleComponent } from './timefield-format-toggler/timefield-format-toggler-example';
import { TimefieldLocalizeExampleComponent } from './timefield-localize/timefield-localize-example';
import { TimefieldNegativeExampleComponent } from './timefield-negative/timefield-negative-example';
import { TimefieldReactiveExampleComponent } from './timefield-reactive/timefield-reactive-example';
import { TimefieldTemplateDrivenExampleComponent } from './timefield-template-driven/timefield-template-driven-example';

const EXAMPLES = [
    TimefieldDisabledExampleComponent,
    TimefieldFormatTogglerExampleComponent,
    TimefieldLocalizeExampleComponent,
    TimefieldNegativeExampleComponent,
    TimefieldReactiveExampleComponent,
    TimefieldTemplateDrivenExampleComponent,
];

@NgModule({
    imports: [NxTimefieldModule, ExamplesSharedModule, NxErrorModule],
    declarations: [EXAMPLES],
    exports: [EXAMPLES],
})
export class TimefieldExamplesModule {
    static components() {
        return {
            'timefield-disabled': TimefieldDisabledExampleComponent,
            'timefield-format-toggler': TimefieldFormatTogglerExampleComponent,
            'timefield-localize': TimefieldLocalizeExampleComponent,
            'timefield-negative': TimefieldNegativeExampleComponent,
            'timefield-reactive': TimefieldReactiveExampleComponent,
            'timefield-template-driven':
                TimefieldTemplateDrivenExampleComponent,
        };
    }
}
