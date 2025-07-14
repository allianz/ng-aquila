import { NxErrorModule, NxLabelModule } from '@allianz/ng-aquila/base';
import { NxButtonModule } from '@allianz/ng-aquila/button';
import { NxIconModule } from '@allianz/ng-aquila/icon';
import { NxSpinnerModule } from '@allianz/ng-aquila/spinner';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NxFileUploaderComponent } from './file-uploader.component';
import { NxFileUploaderButtonDirective } from './file-uploader-button.directive';
import { NxFileUploaderDropZoneComponent } from './file-uploader-drop-zone.component';
import { NxFileUploaderHintDirective } from './file-uploader-hint.directive';
import { NxFileUploaderTriggerDirective } from './file-uploader-trigger.directive';
import { NxFileUploaderItemDelete } from './item/file-uploader-delete.component';
import { NxFileUploaderItemName } from './item/file-uploader-name.component';
import { NxFileUploaderItemSize } from './item/file-uploader-size.component';
import { NxFileUploaderItemStatus } from './item/file-uploader-status.component';

@NgModule({
  imports: [
    CommonModule,
    NxIconModule,
    NxButtonModule,
    NxSpinnerModule,
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
})
export class NxFileUploaderModule {}
