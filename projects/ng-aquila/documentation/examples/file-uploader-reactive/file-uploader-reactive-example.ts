import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NxFileUploaderComponent, NxFileUploader, NxFileUploadResult } from '@aposin/ng-aquila/file-uploader';
import { NxMessageToastConfig, NxMessageToastService } from '@aposin/ng-aquila/message';
import { HttpClient, HttpParams } from '@angular/common/http';

export const myCustomConfig: NxMessageToastConfig = {
  duration: 3000,
  context: 'success',
  announcementMessage: 'Yay, you see a success message toast'
};

/** @title File uploader reactive form example */
@Component({
  templateUrl: './file-uploader-reactive-example.html',
  styleUrls: ['./file-uploader-reactive-example.css']
})
export class FileUploaderReactiveExampleComponent {
  testForm: FormGroup;
  uploader: NxFileUploader;
  uploadConfig = {
    requestUrl: 'file-upload',
    options: {
      params: new HttpParams(),
      reportProgress: true
    }
  };

  constructor(
    private fb: FormBuilder,
    private messageToastService: NxMessageToastService,
    private http: HttpClient
  ) {
    this.createForm();

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

  createForm() {
    this.testForm = this.fb.group({
      documents: [[], Validators.required]
    });
  }
}
