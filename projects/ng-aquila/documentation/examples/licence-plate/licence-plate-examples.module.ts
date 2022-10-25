import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NxCheckboxModule } from '@aposin/ng-aquila/checkbox';
import { NxDropdownModule } from '@aposin/ng-aquila/dropdown';
import { NxFormfieldModule } from '@aposin/ng-aquila/formfield';
import { NxHeadlineModule } from '@aposin/ng-aquila/headline';
import { NxInputModule } from '@aposin/ng-aquila/input';
import { NxLicencePlateModule } from '@aposin/ng-aquila/licence-plate';

import { ExamplesSharedModule } from '../examples-shared.module';
import { LicencePlateDisabledExample } from './licence-plate-disabled/licence-plate-disabled-example';
import { LicencePlateEuroExampleComponent } from './licence-plate-euro/licence-plate-euro-example';
import { LicencePlateExpertExample } from './licence-plate-expert/licence-plate-expert-example';
import { LicencePlateExpertStatesExample } from './licence-plate-expert-states/licence-plate-expert-states-example';
import { LicencePlateNgmodelExample } from './licence-plate-ngmodel/licence-plate-ngmodel-example';
import { LicencePlateOtherExampleComponent } from './licence-plate-other/licence-plate-other-example';
import { LicencePlateReactiveExample } from './licence-plate-reactive/licence-plate-reactive-example';
import { LicencePlateSeasonalExampleComponent } from './licence-plate-seasonal/licence-plate-seasonal-example';
import { LicencePlateSpecialExampleComponent } from './licence-plate-special/licence-plate-special-example';
import { LicencePlateStandardExampleComponent } from './licence-plate-standard/licence-plate-standard-example';

const EXAMPLES = [
    LicencePlateStandardExampleComponent,
    LicencePlateSeasonalExampleComponent,
    LicencePlateSpecialExampleComponent,
    LicencePlateOtherExampleComponent,
    LicencePlateEuroExampleComponent,
    LicencePlateNgmodelExample,
    LicencePlateReactiveExample,
    LicencePlateExpertStatesExample,
    LicencePlateDisabledExample,
    LicencePlateExpertExample,
];

@NgModule({
    imports: [
        NxLicencePlateModule,
        ExamplesSharedModule,
        FormsModule,
        ReactiveFormsModule,
        NxHeadlineModule,
        NxCheckboxModule,
        NxDropdownModule,
        NxFormfieldModule,
        NxInputModule,
    ],
    declarations: [EXAMPLES],
    exports: [EXAMPLES],
})
export class LicencePlateExamplesModule {
    static components() {
        return {
            'licence-plate-standard': LicencePlateStandardExampleComponent,
            'licence-plate-seasonal': LicencePlateSeasonalExampleComponent,
            'licence-plate-special': LicencePlateSpecialExampleComponent,
            'licence-plate-other': LicencePlateOtherExampleComponent,
            'licence-plate-euro': LicencePlateEuroExampleComponent,
            'licence-plate-ngmodel': LicencePlateNgmodelExample,
            'licence-plate-reactive': LicencePlateReactiveExample,
            'licence-plate-expert': LicencePlateExpertExample,
            'licence-plate-expert-states': LicencePlateExpertStatesExample,
            'licence-plate-disabled': LicencePlateDisabledExample,
        };
    }
}
