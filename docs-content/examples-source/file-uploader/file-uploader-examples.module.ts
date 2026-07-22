import { NxButtonModule } from '@allianz/ng-aquila/button';
import { NxFileUploaderModule } from '@allianz/ng-aquila/file-uploader';
import { NxFormfieldModule } from '@allianz/ng-aquila/formfield';
import { NxIconModule } from '@allianz/ng-aquila/icon';
import { NxInputModule } from '@allianz/ng-aquila/input';
import { NxMessageModule } from '@allianz/ng-aquila/message';
import { NxRadioModule } from '@allianz/ng-aquila/radio-button';
import { NxRadioToggleModule } from '@allianz/ng-aquila/radio-toggle';
import { NgModule } from '@angular/core';

import { ExamplesSharedModule } from '../examples-shared.module';
import { FileIconExampleComponent } from './file-icon/file-icon-example';
import { FileUploaderAutoExampleComponent } from './file-uploader-auto/file-uploader-auto-example';
import { FileUploaderAutoNdbxExampleComponent } from './file-uploader-auto-ndbx/file-uploader-auto-ndbx-example';
import { FileUploaderBasicExampleComponent } from './file-uploader-basic/file-uploader-basic-example';
import { FileUploaderBasicNdbxExampleComponent } from './file-uploader-basic-ndbx/file-uploader-basic-ndbx-example';
import { FileUploaderCategoriesExampleComponent } from './file-uploader-categories/file-uploader-categories-example';
import { FileUploaderCategoriesNdbxExampleComponent } from './file-uploader-categories-ndbx/file-uploader-categories-ndbx-example';
import { FileUploaderCustomItemExampleComponent } from './file-uploader-custom-item/file-uploader-custom-item-example';
import { FileUploaderCustomItemNdbxExampleComponent } from './file-uploader-custom-item-ndbx/file-uploader-custom-item-ndbx-example';
import { FileUploadernoBlockingValidatorsExampleComponent } from './file-uploader-disable-common-validators/file-uploader-disable-common-validators-example';
import { FileUploadernoBlockingValidatorsNdbxExampleComponent } from './file-uploader-disable-common-validators-ndbx/file-uploader-disable-common-validators-ndbx-example';
import { FileUploaderDropZoneNdbxExampleComponent } from './file-uploader-drop-zone-ndbx/file-uploader-drop-zone-ndbx-example';
import { FileUploaderErrorListExampleComponent } from './file-uploader-error-list/file-uploader-error-list-example';
import { FileUploaderErrorListNdbxExampleComponent } from './file-uploader-error-list-ndbx/file-uploader-error-list-ndbx-example';
import { FileUploaderExpertNdbxExampleComponent } from './file-uploader-expert-ndbx/file-uploader-expert-ndbx-example';
import { FileUploaderIntlExampleComponent } from './file-uploader-intl/file-uploader-intl-example';
import { FileUploaderIntlNdbxExampleComponent } from './file-uploader-intl-ndbx/file-uploader-intl-ndbx-example';
import { FileUploaderMaxFileNumberExampleComponent } from './file-uploader-max-file-number/file-uploader-max-file-number-example';
import { FileUploaderMaxFileNumberNdbxExampleComponent } from './file-uploader-max-file-number-ndbx/file-uploader-max-file-number-ndbx-example';
import { FileUploaderReactiveExampleComponent } from './file-uploader-reactive/file-uploader-reactive-example';
import { FileUploaderReactiveNdbxExampleComponent } from './file-uploader-reactive-ndbx/file-uploader-reactive-ndbx-example';
import { FileUploaderSeparateRequestsExampleComponent } from './file-uploader-separate-requests/file-uploader-separate-requests-example';
import { FileUploaderSeparateRequestsNdbxExampleComponent } from './file-uploader-separate-requests-ndbx/file-uploader-separate-requests-ndbx-example';
import { FileUploaderStrictTypeValidationExampleComponent } from './file-uploader-strict-type-validation/file-uploader-strict-type-validation-example';
import { FileUploaderStrictTypeValidationNdbxExampleComponent } from './file-uploader-strict-type-validation-ndbx/file-uploader-strict-type-validation-ndbx-example';
import { FileUploaderTemplateDrivenExampleComponent } from './file-uploader-template-driven/file-uploader-template-driven-example';
import { FileUploaderTemplateDrivenNdbxExampleComponent } from './file-uploader-template-driven-ndbx/file-uploader-template-driven-ndbx-example';
import { FileUploaderTypeValidationExampleComponent } from './file-uploader-type-validation/file-uploader-type-validation-example';
import { FileUploaderTypeValidationNdbxExampleComponent } from './file-uploader-type-validation-ndbx/file-uploader-type-validation-ndbx-example';
import { FileUploaderValidationExampleComponent } from './file-uploader-validation/file-uploader-validation-example';
import { FileUploaderValidationNdbxExampleComponent } from './file-uploader-validation-ndbx/file-uploader-validation-ndbx-example';
import { FileUploaderWithRequestExampleComponent } from './file-uploader-with-request/file-uploader-with-request-example';
import { FileUploaderWithRequestNdbxExampleComponent } from './file-uploader-with-request-ndbx/file-uploader-with-request-ndbx-example';

const EXAMPLES = [
  FileIconExampleComponent,
  FileUploaderErrorListExampleComponent,
  FileUploaderErrorListNdbxExampleComponent,
  FileUploaderAutoExampleComponent,
  FileUploaderAutoNdbxExampleComponent,
  FileUploaderBasicExampleComponent,
  FileUploaderBasicNdbxExampleComponent,
  FileUploaderDropZoneNdbxExampleComponent,
  FileUploaderIntlExampleComponent,
  FileUploaderIntlNdbxExampleComponent,
  FileUploaderReactiveExampleComponent,
  FileUploaderReactiveNdbxExampleComponent,
  FileUploaderSeparateRequestsExampleComponent,
  FileUploaderSeparateRequestsNdbxExampleComponent,
  FileUploaderTemplateDrivenExampleComponent,
  FileUploaderTemplateDrivenNdbxExampleComponent,
  FileUploaderTypeValidationExampleComponent,
  FileUploaderTypeValidationNdbxExampleComponent,
  FileUploaderValidationExampleComponent,
  FileUploaderValidationNdbxExampleComponent,
  FileUploaderWithRequestExampleComponent,
  FileUploaderWithRequestNdbxExampleComponent,
  FileUploaderMaxFileNumberExampleComponent,
  FileUploaderMaxFileNumberNdbxExampleComponent,
  FileUploaderCustomItemExampleComponent,
  FileUploaderCustomItemNdbxExampleComponent,
  FileUploaderExpertNdbxExampleComponent,
  FileUploaderStrictTypeValidationExampleComponent,
  FileUploaderStrictTypeValidationNdbxExampleComponent,
  FileUploadernoBlockingValidatorsExampleComponent,
  FileUploadernoBlockingValidatorsNdbxExampleComponent,
  FileUploaderCategoriesExampleComponent,
  FileUploaderCategoriesNdbxExampleComponent,
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
    EXAMPLES,
  ],
  exports: [EXAMPLES],
})
export class FileExamplesModule {
  static components() {
    return {
      'file-icon': FileIconExampleComponent,
      'file-uploader-error-list': FileUploaderErrorListExampleComponent,
      'file-uploader-error-list-ndbx':
        FileUploaderErrorListNdbxExampleComponent,
      'file-uploader-auto': FileUploaderAutoExampleComponent,
      'file-uploader-auto-ndbx': FileUploaderAutoNdbxExampleComponent,
      'file-uploader-basic': FileUploaderBasicExampleComponent,
      'file-uploader-basic-ndbx': FileUploaderBasicNdbxExampleComponent,
      'file-uploader-drop-zone-ndbx': FileUploaderDropZoneNdbxExampleComponent,
      'file-uploader-intl': FileUploaderIntlExampleComponent,
      'file-uploader-intl-ndbx': FileUploaderIntlNdbxExampleComponent,
      'file-uploader-reactive': FileUploaderReactiveExampleComponent,
      'file-uploader-reactive-ndbx': FileUploaderReactiveNdbxExampleComponent,
      'file-uploader-separate-requests':
        FileUploaderSeparateRequestsExampleComponent,
      'file-uploader-separate-requests-ndbx':
        FileUploaderSeparateRequestsNdbxExampleComponent,
      'file-uploader-template-driven':
        FileUploaderTemplateDrivenExampleComponent,
      'file-uploader-template-driven-ndbx':
        FileUploaderTemplateDrivenNdbxExampleComponent,
      'file-uploader-type-validation':
        FileUploaderTypeValidationExampleComponent,
      'file-uploader-type-validation-ndbx':
        FileUploaderTypeValidationNdbxExampleComponent,
      'file-uploader-validation': FileUploaderValidationExampleComponent,
      'file-uploader-validation-ndbx':
        FileUploaderValidationNdbxExampleComponent,
      'file-uploader-with-request': FileUploaderWithRequestExampleComponent,
      'file-uploader-with-request-ndbx':
        FileUploaderWithRequestNdbxExampleComponent,
      'file-uploader-max-file-number':
        FileUploaderMaxFileNumberExampleComponent,
      'file-uploader-max-file-number-ndbx':
        FileUploaderMaxFileNumberNdbxExampleComponent,
      'file-uploader-custom-item': FileUploaderCustomItemExampleComponent,
      'file-uploader-custom-item-ndbx':
        FileUploaderCustomItemNdbxExampleComponent,
      'file-uploader-expert-ndbx': FileUploaderExpertNdbxExampleComponent,
      'file-uploader-strict-type-validation':
        FileUploaderStrictTypeValidationExampleComponent,
      'file-uploader-strict-type-validation-ndbx':
        FileUploaderStrictTypeValidationNdbxExampleComponent,
      'file-uploader-disable-common-validators':
        FileUploadernoBlockingValidatorsExampleComponent,
      'file-uploader-disable-common-validators-ndbx':
        FileUploadernoBlockingValidatorsNdbxExampleComponent,
      'file-uploader-categories': FileUploaderCategoriesExampleComponent,
      'file-uploader-categories-ndbx':
        FileUploaderCategoriesNdbxExampleComponent,
    };
  }
}
