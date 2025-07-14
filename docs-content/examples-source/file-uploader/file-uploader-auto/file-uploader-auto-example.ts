import { NxLabelComponent } from '@allianz/ng-aquila/base';
import { NxButtonComponent } from '@allianz/ng-aquila/button';
import {
  FileItem,
  NxFileUploadConfig,
  NxFileUploader,
  NxFileUploaderButtonDirective,
  NxFileUploaderComponent,
  NxFileUploaderComponent as NxFileUploaderComponent_1,
  NxFileUploaderHintDirective,
} from '@allianz/ng-aquila/file-uploader';
import { NxIconComponent } from '@allianz/ng-aquila/icon';
import {
  NxMessageToastConfig,
  NxMessageToastService,
} from '@allianz/ng-aquila/message';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export const myCustomConfig: NxMessageToastConfig = {
  duration: 3000,
  context: 'success',
  announcementMessage: 'File was uploaded successfully!',
};

/** @title File uploader auto uploading example */
@Component({
  selector: 'file-uploader-auto-example',
  templateUrl: './file-uploader-auto-example.html',
  styleUrls: ['./file-uploader-auto-example.css'],
  imports: [
    NxFileUploaderComponent_1,
    FormsModule,
    NxLabelComponent,
    NxFileUploaderHintDirective,
    NxButtonComponent,
    NxFileUploaderButtonDirective,
    NxIconComponent,
  ],
})
export class FileUploaderAutoExampleComponent implements OnInit, OnDestroy {
  readonly uploadConfig: NxFileUploadConfig = {
    requestUrl: 'file-upload',
    options: {
      params: new HttpParams(),
      headers: new HttpHeaders({
        'My-Custom-Header': 'custom-header-value',
      }),
      reportProgress: true,
    },
  };

  myFiles: FileItem[] = [];

  readonly uploader = new NxFileUploader(this.uploadConfig, this.http);

  @ViewChild('documentUpload', { static: false })
  documentUpload!: NxFileUploaderComponent;

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

  onFilesAddedChange(files: FileItem[]) {
    if (files) {
      this.documentUpload.uploadFiles();
    }
  }
}
