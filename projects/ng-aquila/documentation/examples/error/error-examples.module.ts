import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NxErrorModule } from '@aposin/ng-aquila/base';
import { NxButtonModule } from '@aposin/ng-aquila/button';
import { NxInputModule } from '@aposin/ng-aquila/input';

import { ErrorExampleComponent } from './error/error-example';
import { ErrorCustomMatcherFormfieldExampleComponent } from './error-custom-matcher-formfield/error-custom-matcher-formfield-example';
import { ErrorResetExampleComponent } from './error-reset/error-reset-example';

const EXAMPLES = [
    ErrorExampleComponent,
    ErrorCustomMatcherFormfieldExampleComponent,
    ErrorResetExampleComponent,
];

@NgModule({
    imports: [
        NxErrorModule,
        NxInputModule,
        NxButtonModule,
        ReactiveFormsModule,
    ],
    declarations: [EXAMPLES],
    exports: [EXAMPLES],
})
export class ErrorExamplesModule {
    static components() {
        return {
            error: ErrorExampleComponent,
            'error-custom-matcher-formfield':
                ErrorCustomMatcherFormfieldExampleComponent,
            'error-reset': ErrorResetExampleComponent,
        };
    }
}
