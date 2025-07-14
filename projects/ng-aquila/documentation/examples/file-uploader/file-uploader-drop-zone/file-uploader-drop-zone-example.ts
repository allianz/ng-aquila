import { NxLabelComponent } from '@allianz/ng-aquila/base';
import { NxButtonComponent } from '@allianz/ng-aquila/button';
import { NxCopytextComponent } from '@allianz/ng-aquila/copytext';
import {
  NxFileUploadConfig,
  NxFileUploader,
  NxFileUploaderButtonDirective,
  NxFileUploaderComponent,
  NxFileUploaderDropZoneComponent,
  NxFileUploaderHintDirective,
  NxFileUploaderTriggerDirective,
} from '@allianz/ng-aquila/file-uploader';
import { NxIconComponent } from '@allianz/ng-aquila/icon';
import {
  NxMessageToastConfig,
  NxMessageToastService,
} from '@allianz/ng-aquila/message';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export const myCustomConfig: NxMessageToastConfig = {
  duration: 3000,
  context: 'success',
  announcementMessage: 'File was uploaded successfully!',
};

/** @title File uploader drop zone example */
@Component({
  selector: 'file-uploader-drop-zone-example',
  templateUrl: './file-uploader-drop-zone-example.html',
  styleUrls: ['./file-uploader-drop-zone-example.css'],
  imports: [
    NxFileUploaderComponent,
    NxLabelComponent,
    NxFileUploaderHintDirective,
    NxFileUploaderDropZoneComponent,
    NxCopytextComponent,
    NxButtonComponent,
    NxFileUploaderButtonDirective,
    NxIconComponent,
    NxFileUploaderTriggerDirective,
  ],
})
export class FileUploaderDropZoneExampleComponent implements OnInit, OnDestroy {
  readonly uploadConfig: NxFileUploadConfig = {
    requestUrl: 'file-upload',
    options: {
      params: new HttpParams(),
      reportProgress: true,
    },
  };

  readonly uploader = new NxFileUploader(this.uploadConfig, this.http);

  private readonly _destroyed = new Subject<void>();

  constructor(
    private readonly messageToastService: NxMessageToastService,
    private readonly http: HttpClient,
  ) {}

  ngOnInit(): void {
    this.uploader.response
      .pipe(takeUntil(this._destroyed))
      .subscribe((result) => {
        if (result.success) {
          this.messageToastService.open(
            'All files were uploaded successfully!',
            myCustomConfig,
          );
        } else if (result.error) {
          // error handling
          console.log(result.error);
        }
      });
  }

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }
}
