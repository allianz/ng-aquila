import { NxGridModule } from '@aposin/ng-aquila/grid';
import { CommonModule } from '@angular/common';
import { NxInputModule } from '@aposin/ng-aquila/input';
import { NxDatefieldModule, NxNativeDateModule } from '@aposin/ng-aquila/datefield';
import { NxIconModule } from '@aposin/ng-aquila/icon';
import { NxDropdownModule } from '@aposin/ng-aquila/dropdown';
import { NxPopoverModule } from '@aposin/ng-aquila/popover';
import { NxFormfieldModule } from '@aposin/ng-aquila/formfield';
import { NxMessageModule } from '@aposin/ng-aquila/message';

import { NgModule } from '@angular/core';
import { FormfieldAppearanceExampleComponent } from './formfield-appearance/formfield-appearance-example';
import { FormfieldBasicExampleComponent } from './formfield-basic/formfield-basic-example';
import { FormfieldCharacterCountExampleComponent } from './formfield-character-count/formfield-character-count-example';
import { FormfieldCustomExampleComponent } from './formfield-custom/formfield-custom-example';
import { FormfieldCustomLabelExampleComponent } from './formfield-custom-label/formfield-custom-label-example';
import { FormfieldCustomTelInputExampleComponent } from './formfield-custom-tel-input/formfield-custom-tel-input-example';
import { FormfieldErrorExampleComponent } from './formfield-error/formfield-error-example';
import { FormfieldExpertErrorExampleComponent } from './formfield-expert-error/formfield-expert-error-example';
import { FormfieldFloatingExampleComponent } from './formfield-floating/formfield-floating-example';
import { FormfieldGlobalExampleComponent } from './formfield-global/formfield-global-example';
import { FormfieldHintExampleComponent } from './formfield-hint/formfield-hint-example';
import { FormfieldMultipleErrorsExampleComponent } from './formfield-multiple-errors/formfield-multiple-errors-example';
import { FormfieldNegativeExampleComponent } from './formfield-negative/formfield-negative-example';
import { FormfieldNoteExampleComponent } from './formfield-note/formfield-note-example';
import { FormfieldNoteAndErrorExampleComponent } from './formfield-note-and-error/formfield-note-and-error-example';
import { FormfieldPasswordVisibilityExampleComponent } from './formfield-password-visibility/formfield-password-visibility-example';
import { FormfieldPlaceholderExampleComponent } from './formfield-placeholder/formfield-placeholder-example';
import { FormfieldPrefixSuffixAppendixExampleComponent } from './formfield-prefix-suffix-appendix/formfield-prefix-suffix-appendix-example';
import { FormfieldSimpleFormExampleComponent } from './formfield-simple-form/formfield-simple-form-example';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExamplesSharedModule } from '../examples-shared.module';

const EXAMPLES = [
    FormfieldAppearanceExampleComponent,
    FormfieldBasicExampleComponent,
    FormfieldCharacterCountExampleComponent,
    FormfieldCustomExampleComponent,
    FormfieldCustomLabelExampleComponent,
    FormfieldCustomTelInputExampleComponent,
    FormfieldErrorExampleComponent,
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
            'formfield-character-count': FormfieldCharacterCountExampleComponent,
            'formfield-custom': FormfieldCustomExampleComponent,
            'formfield-custom-label': FormfieldCustomLabelExampleComponent,
            'formfield-custom-tel-input': FormfieldCustomTelInputExampleComponent,
            'formfield-error': FormfieldErrorExampleComponent,
            'formfield-expert-error': FormfieldExpertErrorExampleComponent,
            'formfield-floating': FormfieldFloatingExampleComponent,
            'formfield-global': FormfieldGlobalExampleComponent,
            'formfield-hint': FormfieldHintExampleComponent,
            'formfield-multiple-errors': FormfieldMultipleErrorsExampleComponent,
            'formfield-negative': FormfieldNegativeExampleComponent,
            'formfield-note': FormfieldNoteExampleComponent,
            'formfield-note-and-error': FormfieldNoteAndErrorExampleComponent,
            'formfield-password-visibility': FormfieldPasswordVisibilityExampleComponent,
            'formfield-placeholder': FormfieldPlaceholderExampleComponent,
            'formfield-prefix-suffix-appendix': FormfieldPrefixSuffixAppendixExampleComponent,
            'formfield-simple-form': FormfieldSimpleFormExampleComponent,
        };
    }
}
