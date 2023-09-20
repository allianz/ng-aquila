import { NgModule } from '@angular/core';
import { NxButtonModule } from '@aposin/ng-aquila/button';
import { NxFileUploaderModule } from '@aposin/ng-aquila/file-uploader';
import { NxFormfieldModule } from '@aposin/ng-aquila/formfield';
import { NxIconModule } from '@aposin/ng-aquila/icon';
import { NxInputModule } from '@aposin/ng-aquila/input';
import { NxMessageModule } from '@aposin/ng-aquila/message';
import { NxRadioModule } from '@aposin/ng-aquila/radio-button';
import { NxRadioToggleModule } from '@aposin/ng-aquila/radio-toggle';

import { ExamplesSharedModule } from '../examples-shared.module';
import { FileUploaderAutoExampleComponent } from './file-uploader-auto/file-uploader-auto-example';
import { FileUploaderBasicExampleComponent } from './file-uploader-basic/file-uploader-basic-example';
import { FileUploaderCustomItemExampleComponent } from './file-uploader-custom-item/file-uploader-custom-item-example';
import { FileUploadernoBlockingValidatorsExampleComponent } from './file-uploader-disable-common-validators/file-uploader-disable-common-validators-example';
import { FileUploaderDropZoneExampleComponent } from './file-uploader-drop-zone/file-uploader-drop-zone-example';
import { FileUploaderErrorListExampleComponent } from './file-uploader-error-list/file-uploader-error-list-example';
import { FileUploaderExpertExampleComponent } from './file-uploader-expert/file-uploader-expert-example';
import { FileUploaderIntlExampleComponent } from './file-uploader-intl/file-uploader-intl-example';
import { FileUploaderMaxFileNumberExampleComponent } from './file-uploader-max-file-number/file-uploader-max-file-number-example';
import { FileUploaderReactiveExampleComponent } from './file-uploader-reactive/file-uploader-reactive-example';
import { FileUploaderSeparateRequestsExampleComponent } from './file-uploader-separate-requests/file-uploader-separate-requests-example';
import { FileUploaderStrictTypeValidationExampleComponent } from './file-uploader-strict-type-validation/file-uploader-strict-type-validation-example';
import { FileUploaderTemplateDrivenExampleComponent } from './file-uploader-template-driven/file-uploader-template-driven-example';
import { FileUploaderTypeValidationExampleComponent } from './file-uploader-type-validation/file-uploader-type-validation-example';
import { FileUploaderValidationExampleComponent } from './file-uploader-validation/file-uploader-validation-example';
import { FileUploaderWithRequestExampleComponent } from './file-uploader-with-request/file-uploader-with-request-example';

const EXAMPLES = [
    FileUploaderErrorListExampleComponent,
    FileUploaderAutoExampleComponent,
    FileUploaderBasicExampleComponent,
    FileUploaderDropZoneExampleComponent,
    FileUploaderIntlExampleComponent,
    FileUploaderReactiveExampleComponent,
    FileUploaderSeparateRequestsExampleComponent,
    FileUploaderTemplateDrivenExampleComponent,
    FileUploaderTypeValidationExampleComponent,
    FileUploaderValidationExampleComponent,
    FileUploaderWithRequestExampleComponent,
    FileUploaderMaxFileNumberExampleComponent,
    FileUploaderCustomItemExampleComponent,
    FileUploaderExpertExampleComponent,
    FileUploaderStrictTypeValidationExampleComponent,
    FileUploadernoBlockingValidatorsExampleComponent,
];

@NgModule({
    imports: [
        NxFileUploaderModule,
        NxIconModule,
        NxRadioModule,
        NxButtonModule,
        NxRadioToggleModule,
        ExamplesSharedModule,
        NxFormfieldModule,
        NxInputModule,
        NxMessageModule,
    ],
    declarations: [EXAMPLES],
    exports: [EXAMPLES],
})
export class FileExamplesModule {
    static components() {
        return {
            'file-uploader-error-list': FileUploaderErrorListExampleComponent,
            'file-uploader-auto': FileUploaderAutoExampleComponent,
            'file-uploader-basic': FileUploaderBasicExampleComponent,
            'file-uploader-drop-zone': FileUploaderDropZoneExampleComponent,
            'file-uploader-intl': FileUploaderIntlExampleComponent,
            'file-uploader-reactive': FileUploaderReactiveExampleComponent,
            'file-uploader-separate-requests':
                FileUploaderSeparateRequestsExampleComponent,
            'file-uploader-template-driven':
                FileUploaderTemplateDrivenExampleComponent,
            'file-uploader-type-validation':
                FileUploaderTypeValidationExampleComponent,
            'file-uploader-validation': FileUploaderValidationExampleComponent,
            'file-uploader-with-request':
                FileUploaderWithRequestExampleComponent,
            'file-uploader-max-file-number':
                FileUploaderMaxFileNumberExampleComponent,
            'file-uploader-custom-item': FileUploaderCustomItemExampleComponent,
            'file-uploader-expert': FileUploaderExpertExampleComponent,
            'file-uploader-strict-type-validation':
                FileUploaderStrictTypeValidationExampleComponent,
            'file-uploader-disable-common-validators':
                FileUploadernoBlockingValidatorsExampleComponent,
        };
    }
}
