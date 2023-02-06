import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NxCheckboxModule } from '@aposin/ng-aquila/checkbox';
import { NxHeadlineModule } from '@aposin/ng-aquila/headline';
import { NxPhoneInputModule } from '@aposin/ng-aquila/phone-input';

import { ExamplesSharedModule } from '../examples-shared.module';
import { PhoneInputCountryCodeExampleComponent } from './phone-input-country-code/phone-input-country-code-example';
import { PhoneInputDisabledExampleComponent } from './phone-input-disabled/phone-input-disabled-example';
import { PhoneInputExpertExampleComponent } from './phone-input-expert/phone-input-expert-example';
import { PhoneInputFocusOutExampleComponent } from './phone-input-focus-out/phone-input-focus-out-example';
import { PhoneInputFormattingExampleComponent } from './phone-input-formatting/phone-input-formatting-example';
import { PhoneInputFormsExampleComponent } from './phone-input-forms/phone-input-forms-example';
import { PhoneInputI18nExampleComponent } from './phone-input-i18n/phone-input-i18n-example';
import { PhoneInputRetailExampleComponent } from './phone-input-retail/phone-input-retail-example';
import { PhoneInputValidationExampleComponent } from './phone-input-validation/phone-input-validation-example';

const EXAMPLES = [
    PhoneInputRetailExampleComponent,
    PhoneInputExpertExampleComponent,
    PhoneInputDisabledExampleComponent,
    PhoneInputI18nExampleComponent,
    PhoneInputValidationExampleComponent,
    PhoneInputFormattingExampleComponent,
    PhoneInputFormsExampleComponent,
    PhoneInputCountryCodeExampleComponent,
    PhoneInputFocusOutExampleComponent,
];

@NgModule({
    imports: [
        NxPhoneInputModule,
        ExamplesSharedModule,
        FormsModule,
        ReactiveFormsModule,
        NxHeadlineModule,
        NxCheckboxModule,
    ],
    declarations: [EXAMPLES],
    exports: [EXAMPLES],
})
export class PhoneInputExamplesModule {
    static components() {
        return {
            'phone-input-retail': PhoneInputRetailExampleComponent,
            'phone-input-expert': PhoneInputExpertExampleComponent,
            'phone-input-disabled': PhoneInputDisabledExampleComponent,
            'phone-input-i18n': PhoneInputI18nExampleComponent,
            'phone-input-validation': PhoneInputValidationExampleComponent,
            'phone-input-formatting': PhoneInputFormattingExampleComponent,
            'phone-input-forms': PhoneInputFormsExampleComponent,
            'phone-input-country-code': PhoneInputCountryCodeExampleComponent,
            'phone-input-focus-out': PhoneInputFocusOutExampleComponent,
        };
    }
}
