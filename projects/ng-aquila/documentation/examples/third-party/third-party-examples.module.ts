import { TextFieldModule } from '@angular/cdk/text-field';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NxDropdownModule } from '@aposin/ng-aquila/dropdown';
import { NxFormfieldModule } from '@aposin/ng-aquila/formfield';
import { NxIconModule } from '@aposin/ng-aquila/icon';
import { NxInputModule } from '@aposin/ng-aquila/input';
import { NxToolbarModule } from '@aposin/ng-aquila/toolbar';
import { EditorModule } from '@tinymce/tinymce-angular';

import { ExamplesSharedModule } from '../examples-shared.module';
import { RichTextEditorExampleComponent } from './rich-text-editor/rich-text-editor-example';

const EXAMPLES = [RichTextEditorExampleComponent];

@NgModule({
    imports: [
        ExamplesSharedModule,
        NxFormfieldModule,
        NxToolbarModule,
        NxIconModule,
        NxInputModule,
        TextFieldModule,
        NxDropdownModule,
        ReactiveFormsModule,
        EditorModule,
    ],
    declarations: [EXAMPLES],
    exports: [EXAMPLES],
})
export class ThirdpartyExamplesModule {
    static components() {
        return {
            'rich-text-editor': RichTextEditorExampleComponent,
        };
    }
}
