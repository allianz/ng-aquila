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
import { NxFileUploaderItemName } from './item/file-uploader-name.component';
import { NxFileUploaderItemSize } from './item/file-uploader-size.component';
import { NxFileUploaderItemStatus } from './item/file-uploader-status.component';
import { NxFileUploaderItemDelete } from './item/file-uploader-delete.component';

@NgModule({
  imports: [CommonModule, NxIconModule, NxButtonModule, NxSpinnerModule],
  declarations: [
    NxFileUploaderComponent,
    NxFileUploaderButtonDirective,
    NxFileUploaderHintDirective,
    NxFileUploaderDropZoneComponent,
    NxFileUploaderTriggerDirective,
    NxFileUploaderItemName,
    NxFileUploaderItemSize,
    NxFileUploaderItemStatus,
    NxFileUploaderItemDelete,
  ],
  exports: [
    NxFileUploaderComponent,
    NxFileUploaderButtonDirective,
    NxFileUploaderHintDirective,
    NxFileUploaderDropZoneComponent,
    NxErrorModule,
    NxLabelModule,
    NxFileUploaderTriggerDirective,
    NxFileUploaderItemName,
    NxFileUploaderItemSize,
    NxFileUploaderItemStatus,
    NxFileUploaderItemDelete,
  ],
  providers: [NxFileUploaderIntl],
})
export class NxFileUploaderModule {}
