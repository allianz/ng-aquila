import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NxErrorModule } from '@aposin/ng-aquila/base';
import { NxInputModule } from '@aposin/ng-aquila/input';

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
            'error-custom-matcher-formfield':
                ErrorCustomMatcherFormfieldExampleComponent,
        };
    }
}
