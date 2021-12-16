import { NxInputModule } from '@aposin/ng-aquila/input';
import { ReactiveFormsModule } from '@angular/forms';
import { NxFormfieldModule } from '@aposin/ng-aquila/formfield';
import { NxErrorModule } from '@aposin/ng-aquila/base';

import { NgModule } from '@angular/core';
import { ErrorExampleComponent } from './error/error-example';
import { ErrorCustomMatcherFormfieldExampleComponent } from './error-custom-matcher-formfield/error-custom-matcher-formfield-example';

const EXAMPLES = [
    ErrorExampleComponent,
    ErrorCustomMatcherFormfieldExampleComponent,
];

@NgModule({
    imports: [NxErrorModule, NxInputModule, ReactiveFormsModule],
    declarations: [EXAMPLES],
    exports: [EXAMPLES],
})
export class ErrorExamplesModule {
    static components() {
        return {
            error: ErrorExampleComponent,
            'error-custom-matcher-formfield': ErrorCustomMatcherFormfieldExampleComponent,
        };
    }
}
