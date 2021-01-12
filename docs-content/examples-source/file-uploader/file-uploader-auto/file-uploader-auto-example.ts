import { Component, ViewChild } from '@angular/core';
import { FileItem, NxFileUploaderComponent, NxFileUploadResult, NxFileUploader, NxFileUploadConfig } from '@aposin/ng-aquila/file-uploader';
import { NxMessageToastConfig, NxMessageToastService } from '@aposin/ng-aquila/message';
import { HttpParams, HttpClient } from '@angular/common/http';

export const myCustomConfig: NxMessageToastConfig = {
  duration: 3000,
  context: 'success',
  announcementMessage: 'File was uploaded successfully!'
};

/** @title File uploader auto uploading example */
@Component({
  selector: 'file-uploader-auto-example',
  templateUrl: './file-uploader-auto-example.html',
  styleUrls: ['./file-uploader-auto-example.css']
})
export class FileUploaderAutoExampleComponent {
  @ViewChild('documentUpload', {static: false}) documentUpload: NxFileUploaderComponent;
  myFiles: FileItem[] = [];
  uploader: NxFileUploader;
  uploadConfig: NxFileUploadConfig = {
    requestUrl: 'file-upload',
    options: {
      params: new HttpParams(),
      reportProgress: true
    }
  };

  constructor(private messageToastService: NxMessageToastService, private http: HttpClient) {
    this.uploader = new NxFileUploader(this.uploadConfig, this.http);

    this.uploader.response.subscribe((result: NxFileUploadResult) => {
      if (result.success) {
        this.messageToastService.open('All files were uploaded successfully!', myCustomConfig);
      } else if (result.error) {
        // error handling
        console.log(result.error);
      }
    });
  }

  onFilesAddedChange(files: FileItem[]) {
    if (files) {
      this.documentUpload.uploadFiles();
    }
  }
}
