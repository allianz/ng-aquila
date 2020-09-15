import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NxFileUploaderComponent } from './file-uploader.component';
import { NxFileUploaderButtonDirective } from './file-uploader-button.directive';
import { NxIconModule } from '@aposin/ng-aquila/icon';
import { NxButtonModule } from '@aposin/ng-aquila/button';
import { NxSpinnerModule } from '@aposin/ng-aquila/spinner';
import { NxFileUploaderHintDirective } from './file-uploader-hint.directive';
import { NxErrorModule, NxLabelModule } from '@aposin/ng-aquila/base';
import { NxFileUploaderIntl } from './file-uploader-intl';
import { NxFileUploaderDropZoneComponent } from './file-uploader-drop-zone.component';
import { NxFileUploaderTriggerDirective } from './file-uploader-trigger.directive';

@NgModule({
  imports: [
    CommonModule,
    NxIconModule,
    NxButtonModule,
    NxSpinnerModule
  ],
  declarations: [
    NxFileUploaderComponent,
    NxFileUploaderButtonDirective,
    NxFileUploaderHintDirective,
    NxFileUploaderDropZoneComponent,
    NxFileUploaderTriggerDirective
  ],
  exports: [
    NxFileUploaderComponent,
    NxFileUploaderButtonDirective,
    NxFileUploaderHintDirective,
    NxFileUploaderDropZoneComponent,
    NxErrorModule,
    NxLabelModule,
    NxFileUploaderTriggerDirective
  ],
  providers: [
    NxFileUploaderIntl
  ]
})
export class NxFileUploaderModule {

}
