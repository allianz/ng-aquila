import { NgModule } from '@angular/core';
import { NxInputModule } from '@aposin/ng-aquila/input';
import { NxMaskModule } from '@aposin/ng-aquila/mask';
import { NxRadioModule } from '@aposin/ng-aquila/radio-button';

import { ExamplesSharedModule } from '../examples-shared.module';
import { IbanMaskExampleComponent } from './iban-mask/iban-mask-example';
import { MaskExampleComponent } from './mask/mask-example';
import { MaskCaseExampleComponent } from './mask-case/mask-case-example';
import { MaskDeactivateExampleComponent } from './mask-deactivate/mask-deactivate-example';
import { MaskDropCharactersExampleComponent } from './mask-drop-characters/mask-drop-characters-example';
import { MaskSeparatorsExampleComponent } from './mask-separators/mask-separators-example';
import { MaskValidationExampleComponent } from './mask-validation/mask-validation-example';

const EXAMPLES = [
    MaskExampleComponent,
    MaskCaseExampleComponent,
    MaskDeactivateExampleComponent,
    MaskDropCharactersExampleComponent,
    MaskSeparatorsExampleComponent,
    MaskValidationExampleComponent,
    IbanMaskExampleComponent,
];

@NgModule({
    imports: [NxMaskModule, NxRadioModule, NxInputModule, ExamplesSharedModule],
    declarations: [EXAMPLES],
    exports: [EXAMPLES],
})
export class MaskExamplesModule {
    static components() {
        return {
            mask: MaskExampleComponent,
            'mask-case': MaskCaseExampleComponent,
            'mask-deactivate': MaskDeactivateExampleComponent,
            'mask-drop-characters': MaskDropCharactersExampleComponent,
            'mask-separators': MaskSeparatorsExampleComponent,
            'mask-validation': MaskValidationExampleComponent,
            'iban-mask': IbanMaskExampleComponent,
        };
    }
}
