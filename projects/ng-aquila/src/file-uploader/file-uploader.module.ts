import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NxErrorModule, NxLabelModule } from '@aposin/ng-aquila/base';
import { NxButtonModule } from '@aposin/ng-aquila/button';
import { NxIconModule } from '@aposin/ng-aquila/icon';
import { NxSpinnerModule } from '@aposin/ng-aquila/spinner';

import { NxFileUploaderComponent } from './file-uploader.component';
import { NxFileUploaderButtonDirective } from './file-uploader-button.directive';
import { NxFileUploaderDropZoneComponent } from './file-uploader-drop-zone.component';
import { NxFileUploaderHintDirective } from './file-uploader-hint.directive';
import { NxFileUploaderIntl } from './file-uploader-intl';
import { NxFileUploaderTriggerDirective } from './file-uploader-trigger.directive';
import { NxFileUploaderItemDelete } from './item/file-uploader-delete.component';
import { NxFileUploaderItemName } from './item/file-uploader-name.component';
import { NxFileUploaderItemSize } from './item/file-uploader-size.component';
import { NxFileUploaderItemStatus } from './item/file-uploader-status.component';

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
