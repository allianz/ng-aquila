import { NxDropdownModule } from '@allianz/ng-aquila/dropdown';
import { NxGridModule } from '@allianz/ng-aquila/grid';
import { NxInputModule } from '@allianz/ng-aquila/input';
import { TextFieldModule } from '@angular/cdk/text-field';
import { NgModule } from '@angular/core';

import { ExamplesSharedModule } from '../examples-shared.module';
import { InputExampleComponent } from './input/input-example';
import { InputAutoresizeExampleComponent } from './input-autoresize/input-autoresize-example';
import { InputModeExampleComponent } from './input-mode/input-mode-example';
import { InputReactiveExampleComponent } from './input-reactive/input-reactive-example';
import { InputStandaloneExampleComponent } from './input-standalone/input-standalone-example';
import { InputTemplateDrivenExampleComponent } from './input-template-driven/input-template-driven-example';
import { InputWithoutFormfieldExampleComponent } from './input-without-formfield/input-without-formfield-example';

const EXAMPLES = [
  InputExampleComponent,
  InputAutoresizeExampleComponent,
  InputReactiveExampleComponent,
  InputStandaloneExampleComponent,
  InputTemplateDrivenExampleComponent,
  InputWithoutFormfieldExampleComponent,
  InputModeExampleComponent,
];

@NgModule({
  imports: [
    NxInputModule,
    ExamplesSharedModule,
    TextFieldModule,
    NxDropdownModule,
    NxGridModule,
    EXAMPLES,
  ],
  exports: [EXAMPLES],
})
export class InputExamplesModule {
  static components() {
    return {
      input: InputExampleComponent,
      'input-autoresize': InputAutoresizeExampleComponent,
      'input-reactive': InputReactiveExampleComponent,
      'input-standalone': InputStandaloneExampleComponent,
      'input-template-driven': InputTemplateDrivenExampleComponent,
      'input-without-formfield': InputWithoutFormfieldExampleComponent,
      'input-mode': InputModeExampleComponent,
    };
  }
}
