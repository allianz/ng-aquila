import { NxErrorModule } from '@allianz/ng-aquila/base';
import { NxInputModule } from '@allianz/ng-aquila/input';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

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
