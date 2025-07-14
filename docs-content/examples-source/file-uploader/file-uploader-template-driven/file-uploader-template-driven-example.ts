import { NxLabelComponent } from '@allianz/ng-aquila/base';
import { NxButtonComponent } from '@allianz/ng-aquila/button';
import {
  FileItem,
  NxFileUploadConfig,
  NxFileUploader,
  NxFileUploaderButtonDirective,
  NxFileUploaderComponent,
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
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export const myCustomConfig: NxMessageToastConfig = {
  duration: 3000,
  context: 'success',
  announcementMessage: 'File was uploaded successfully!',
};

/** @title File uploader template-driven example */
@Component({
  selector: 'file-uploader-template-driven-example',
  templateUrl: './file-uploader-template-driven-example.html',
  styleUrls: ['./file-uploader-template-driven-example.css'],
  imports: [
    NxFileUploaderComponent,
    FormsModule,
    NxLabelComponent,
    NxFileUploaderHintDirective,
    NxButtonComponent,
    NxFileUploaderButtonDirective,
    NxIconComponent,
    NxFileUploaderTriggerDirective,
  ],
})
export class FileUploaderTemplateDrivenExampleComponent
  implements OnInit, OnDestroy
{
  readonly uploadConfig: NxFileUploadConfig = {
    requestUrl: 'file-upload',
    options: {
      params: new HttpParams(),
      reportProgress: true,
    },
  };

  readonly uploader = new NxFileUploader(this.uploadConfig, this.http);

  myFiles: FileItem[] = [];

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
