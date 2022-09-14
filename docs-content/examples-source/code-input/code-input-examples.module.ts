import { NgModule } from '@angular/core';
import { NxErrorModule } from '@aposin/ng-aquila/base';
import { NxCodeInputModule } from '@aposin/ng-aquila/code-input';

import { ExamplesSharedModule } from '../examples-shared.module';
import { CodeInputDisabledExampleComponent } from './code-input-disabled/code-input-disabled-example';
import { CodeInputFourCharExampleComponent } from './code-input-four-char/code-input-four-char-example';
import { CodeInputLocalizeExampleComponent } from './code-input-localize/code-input-localize-example';
import { CodeInputModelExampleComponent } from './code-input-model/code-input-model-example';
import { CodeInputNegativeExampleComponent } from './code-input-negative/code-input-negative-example';
import { CodeInputSevenCharExampleComponent } from './code-input-seven-char/code-input-seven-char-example';
import { CodeInputSixCharExampleComponent } from './code-input-six-char/code-input-six-char-example';
import { CodeInputTypeExampleComponent } from './code-input-type/code-input-type-example';

const EXAMPLES = [
    CodeInputDisabledExampleComponent,
    CodeInputFourCharExampleComponent,
    CodeInputLocalizeExampleComponent,
    CodeInputModelExampleComponent,
    CodeInputNegativeExampleComponent,
    CodeInputSevenCharExampleComponent,
    CodeInputSixCharExampleComponent,
    CodeInputTypeExampleComponent,
];

@NgModule({
    imports: [NxCodeInputModule, NxErrorModule, ExamplesSharedModule],
    declarations: [EXAMPLES],
    exports: [EXAMPLES],
})
export class CodeExamplesModule {
    static components() {
        return {
            'code-input-disabled': CodeInputDisabledExampleComponent,
            'code-input-four-char': CodeInputFourCharExampleComponent,
            'code-input-localize': CodeInputLocalizeExampleComponent,
            'code-input-model': CodeInputModelExampleComponent,
            'code-input-negative': CodeInputNegativeExampleComponent,
            'code-input-seven-char': CodeInputSevenCharExampleComponent,
            'code-input-six-char': CodeInputSixCharExampleComponent,
            'code-input-type': CodeInputTypeExampleComponent,
        };
    }
}
