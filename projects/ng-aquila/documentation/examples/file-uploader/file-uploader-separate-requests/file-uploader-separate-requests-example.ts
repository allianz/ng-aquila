import { Component } from '@angular/core';
import {  NxFileUploadResult, NxFileUploader, NxFileUploadConfig } from '@aposin/ng-aquila/file-uploader';
import { NxMessageToastConfig, NxMessageToastService } from '@aposin/ng-aquila/message';
import { HttpParams, HttpClient } from '@angular/common/http';

export const myCustomConfig: NxMessageToastConfig = {
  duration: 3000,
  context: 'success',
  announcementMessage: 'File was uploaded successfully!'
};

/** @title Example with separate uploading requests */
@Component({
  selector: 'file-uploader-separate-requests-example',
  templateUrl: './file-uploader-separate-requests-example.html',
  styleUrls: ['./file-uploader-separate-requests-example.css']
})
export class FileUploaderSeparateRequestsExampleComponent {
  uploader: NxFileUploader;
  uploadConfig: NxFileUploadConfig = {
    requestUrl: 'file-upload',
    options: {
      params: new HttpParams(),
      reportProgress: true
    },
    uploadSeparately: true
  };
  showUploadError: boolean = false;

  constructor(private messageToastService: NxMessageToastService, private http: HttpClient) {
    this.uploader = new NxFileUploader(this.uploadConfig, this.http);

    this.uploader.response.subscribe((result: NxFileUploadResult) => {
      if (result.allSucessful) {
        // all requests were successful
        this.messageToastService.open('All files were uploaded successfully!', myCustomConfig);
      } else {
        // error handling: at least one request returned an error
        this.showUploadError = true;
      }
    });
  }
}
