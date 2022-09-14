import { NgModule } from '@angular/core';
import { NxDropdownModule } from '@aposin/ng-aquila/dropdown';
import { NxInputModule } from '@aposin/ng-aquila/input';
import { NxNaturalLanguageFormModule } from '@aposin/ng-aquila/natural-language-form';

import { ExamplesSharedModule } from '../examples-shared.module';
import { NaturalLanguageFormBasicExampleComponent } from './natural-language-form-basic/natural-language-form-basic-example';
import { NaturalLanguageFormExtendedExampleComponent } from './natural-language-form-extended/natural-language-form-extended-example';
import { NaturalLanguageFormNegativeExampleComponent } from './natural-language-form-negative/natural-language-form-negative-example';
import { NaturalLanguageFormSizesExampleComponent } from './natural-language-form-sizes/natural-language-form-sizes-example';

const EXAMPLES = [
    NaturalLanguageFormBasicExampleComponent,
    NaturalLanguageFormExtendedExampleComponent,
    NaturalLanguageFormNegativeExampleComponent,
    NaturalLanguageFormSizesExampleComponent,
];

@NgModule({
    imports: [
        NxNaturalLanguageFormModule,
        NxDropdownModule,
        NxInputModule,
        ExamplesSharedModule,
    ],
    declarations: [EXAMPLES],
    exports: [EXAMPLES],
})
export class NaturalExamplesModule {
    static components() {
        return {
            'natural-language-form-basic':
                NaturalLanguageFormBasicExampleComponent,
            'natural-language-form-extended':
                NaturalLanguageFormExtendedExampleComponent,
            'natural-language-form-negative':
                NaturalLanguageFormNegativeExampleComponent,
            'natural-language-form-sizes':
                NaturalLanguageFormSizesExampleComponent,
        };
    }
}
