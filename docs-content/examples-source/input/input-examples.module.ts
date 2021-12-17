import { NxInputModule } from '@aposin/ng-aquila/input';

import { NgModule } from '@angular/core';
import { InputExampleComponent } from './input/input-example';
import { InputAutoresizeExampleComponent } from './input-autoresize/input-autoresize-example';
import { InputReactiveExampleComponent } from './input-reactive/input-reactive-example';
import { InputStandaloneExampleComponent } from './input-standalone/input-standalone-example';
import { InputTemplateDrivenExampleComponent } from './input-template-driven/input-template-driven-example';
import { InputWithoutFormfieldExampleComponent } from './input-without-formfield/input-without-formfield-example';
import { ExamplesSharedModule } from '../examples-shared.module';
import { TextFieldModule } from '@angular/cdk/text-field';

const EXAMPLES = [
    InputExampleComponent,
    InputAutoresizeExampleComponent,
    InputReactiveExampleComponent,
    InputStandaloneExampleComponent,
    InputTemplateDrivenExampleComponent,
    InputWithoutFormfieldExampleComponent,
];

@NgModule({
    imports: [NxInputModule, ExamplesSharedModule, TextFieldModule],
    declarations: [EXAMPLES],
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
        };
    }
}
