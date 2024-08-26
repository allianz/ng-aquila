import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NxCheckboxModule } from '@aposin/ng-aquila/checkbox';
import { NxDropdownModule } from '@aposin/ng-aquila/dropdown';
import { NxFormfieldModule } from '@aposin/ng-aquila/formfield';
import { NxHeadlineModule } from '@aposin/ng-aquila/headline';
import { NxInputModule } from '@aposin/ng-aquila/input';
import { NxLicencePlateModule } from '@aposin/ng-aquila/licence-plate';

import { ExamplesSharedModule } from '../examples-shared.module';
import { LicencePlateDisabledExampleComponent } from './licence-plate-disabled/licence-plate-disabled-example';
import { LicencePlateEuroExampleComponent } from './licence-plate-euro/licence-plate-euro-example';
import { LicencePlateExpertExampleComponent } from './licence-plate-expert/licence-plate-expert-example';
import { LicencePlateExpertStatesExampleComponent } from './licence-plate-expert-states/licence-plate-expert-states-example';
import { LicencePlateNgmodelExampleComponent } from './licence-plate-ngmodel/licence-plate-ngmodel-example';
import { LicencePlateOtherExampleComponent } from './licence-plate-other/licence-plate-other-example';
import { LicencePlateReactiveExampleComponent } from './licence-plate-reactive/licence-plate-reactive-example';
import { LicencePlateSeasonalExampleComponent } from './licence-plate-seasonal/licence-plate-seasonal-example';
import { LicencePlateSpecialExampleComponent } from './licence-plate-special/licence-plate-special-example';
import { LicencePlateStandardExampleComponent } from './licence-plate-standard/licence-plate-standard-example';

const EXAMPLES = [
    LicencePlateStandardExampleComponent,
    LicencePlateSeasonalExampleComponent,
    LicencePlateSpecialExampleComponent,
    LicencePlateOtherExampleComponent,
    LicencePlateEuroExampleComponent,
    LicencePlateNgmodelExampleComponent,
    LicencePlateReactiveExampleComponent,
    LicencePlateExpertStatesExampleComponent,
    LicencePlateDisabledExampleComponent,
    LicencePlateExpertExampleComponent,
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
        EXAMPLES,
    ],
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
            'licence-plate-ngmodel': LicencePlateNgmodelExampleComponent,
            'licence-plate-reactive': LicencePlateReactiveExampleComponent,
            'licence-plate-expert': LicencePlateExpertExampleComponent,
            'licence-plate-expert-states':
                LicencePlateExpertStatesExampleComponent,
            'licence-plate-disabled': LicencePlateDisabledExampleComponent,
        };
    }
}
