import { NxErrorModule } from '@allianz/ng-aquila/base';
import { NxButtonModule } from '@allianz/ng-aquila/button';
import { NxInputModule } from '@allianz/ng-aquila/input';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

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
    EXAMPLES,
  ],
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
