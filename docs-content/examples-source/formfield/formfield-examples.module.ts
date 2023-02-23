import { NgModule } from '@angular/core';
import {
    NxDatefieldModule,
    NxNativeDateModule,
} from '@aposin/ng-aquila/datefield';
import { NxDropdownModule } from '@aposin/ng-aquila/dropdown';
import { NxFormfieldModule } from '@aposin/ng-aquila/formfield';
import { NxIconModule } from '@aposin/ng-aquila/icon';
import { NxInputModule } from '@aposin/ng-aquila/input';
import { NxMessageModule } from '@aposin/ng-aquila/message';
import { NxPopoverModule } from '@aposin/ng-aquila/popover';

import { ExamplesSharedModule } from '../examples-shared.module';
import { FormfieldAppearanceExampleComponent } from './formfield-appearance/formfield-appearance-example';
import { FormfieldBasicExampleComponent } from './formfield-basic/formfield-basic-example';
import { FormfieldChangedetectionExampleComponent } from './formfield-changedetection/formfield-changedetection-example';
import { FormfieldCharacterCountExampleComponent } from './formfield-character-count/formfield-character-count-example';
import { FormfieldCustomExampleComponent } from './formfield-custom/formfield-custom-example';
import { FormfieldCustomLabelExampleComponent } from './formfield-custom-label/formfield-custom-label-example';
import { FormfieldCustomTelInputExampleComponent } from './formfield-custom-tel-input/formfield-custom-tel-input-example';
import { FormfieldErrorExampleComponent } from './formfield-error/formfield-error-example';
import { FormfieldErrorTwoColumnExampleComponent } from './formfield-error-two-column/formfield-error-two-column-example';
import { FormfieldExpertErrorExampleComponent } from './formfield-expert-error/formfield-expert-error-example';
import { FormfieldFloatingExampleComponent } from './formfield-floating/formfield-floating-example';
import { FormfieldGlobalExampleComponent } from './formfield-global/formfield-global-example';
import { FormfieldHintExampleComponent } from './formfield-hint/formfield-hint-example';
import { FormfieldMultipleErrorsExampleComponent } from './formfield-multiple-errors/formfield-multiple-errors-example';
import { FormfieldNegativeExampleComponent } from './formfield-negative/formfield-negative-example';
import { FormfieldNoteExampleComponent } from './formfield-note/formfield-note-example';
import { FormfieldNoteAndErrorExampleComponent } from './formfield-note-and-error/formfield-note-and-error-example';
import { FormfieldOptionalLabelExampleComponent } from './formfield-optional-label/formfield-optional-label-example';
import { FormfieldPasswordVisibilityExampleComponent } from './formfield-password-visibility/formfield-password-visibility-example';
import { FormfieldPlaceholderExampleComponent } from './formfield-placeholder/formfield-placeholder-example';
import { FormfieldPrefixSuffixAppendixExampleComponent } from './formfield-prefix-suffix-appendix/formfield-prefix-suffix-appendix-example';
import { FormfieldSimpleFormExampleComponent } from './formfield-simple-form/formfield-simple-form-example';

const EXAMPLES = [
    FormfieldAppearanceExampleComponent,
    FormfieldBasicExampleComponent,
    FormfieldCharacterCountExampleComponent,
    FormfieldCustomExampleComponent,
    FormfieldCustomLabelExampleComponent,
    FormfieldCustomTelInputExampleComponent,
    FormfieldErrorExampleComponent,
    FormfieldErrorTwoColumnExampleComponent,
    FormfieldExpertErrorExampleComponent,
    FormfieldFloatingExampleComponent,
    FormfieldGlobalExampleComponent,
    FormfieldHintExampleComponent,
    FormfieldMultipleErrorsExampleComponent,
    FormfieldNegativeExampleComponent,
    FormfieldNoteExampleComponent,
    FormfieldNoteAndErrorExampleComponent,
    FormfieldPasswordVisibilityExampleComponent,
    FormfieldPlaceholderExampleComponent,
    FormfieldPrefixSuffixAppendixExampleComponent,
    FormfieldSimpleFormExampleComponent,
    FormfieldChangedetectionExampleComponent,
    FormfieldOptionalLabelExampleComponent,
];

@NgModule({
    imports: [
        NxFormfieldModule,
        NxPopoverModule,
        NxDropdownModule,
        NxIconModule,
        NxDatefieldModule,
        NxInputModule,
        NxNativeDateModule,
        NxMessageModule,
        ExamplesSharedModule,
    ],
    declarations: [EXAMPLES],
    exports: [EXAMPLES],
})
export class FormfieldExamplesModule {
    static components() {
        return {
            'formfield-appearance': FormfieldAppearanceExampleComponent,
            'formfield-basic': FormfieldBasicExampleComponent,
            'formfield-character-count':
                FormfieldCharacterCountExampleComponent,
            'formfield-custom': FormfieldCustomExampleComponent,
            'formfield-custom-label': FormfieldCustomLabelExampleComponent,
            'formfield-custom-tel-input':
                FormfieldCustomTelInputExampleComponent,
            'formfield-error': FormfieldErrorExampleComponent,
            'formfield-error-two-column':
                FormfieldErrorTwoColumnExampleComponent,
            'formfield-expert-error': FormfieldExpertErrorExampleComponent,
            'formfield-floating': FormfieldFloatingExampleComponent,
            'formfield-global': FormfieldGlobalExampleComponent,
            'formfield-hint': FormfieldHintExampleComponent,
            'formfield-multiple-errors':
                FormfieldMultipleErrorsExampleComponent,
            'formfield-negative': FormfieldNegativeExampleComponent,
            'formfield-note': FormfieldNoteExampleComponent,
            'formfield-note-and-error': FormfieldNoteAndErrorExampleComponent,
            'formfield-password-visibility':
                FormfieldPasswordVisibilityExampleComponent,
            'formfield-placeholder': FormfieldPlaceholderExampleComponent,
            'formfield-prefix-suffix-appendix':
                FormfieldPrefixSuffixAppendixExampleComponent,
            'formfield-simple-form': FormfieldSimpleFormExampleComponent,
            'formfield-changedetection':
                FormfieldChangedetectionExampleComponent,
            'formfield-optional-label': FormfieldOptionalLabelExampleComponent,
        };
    }
}
