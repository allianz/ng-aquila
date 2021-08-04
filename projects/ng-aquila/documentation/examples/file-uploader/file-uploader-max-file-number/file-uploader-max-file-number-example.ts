import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileItem, NxFileUploadResult, NxFileUploader, NxFileUploadConfig } from '@aposin/ng-aquila/file-uploader';
import { NxMessageToastConfig, NxMessageToastService } from '@aposin/ng-aquila/message';
import { HttpParams, HttpClient } from '@angular/common/http';

const myCustomConfig: NxMessageToastConfig = {
  duration: 3000,
  context: 'success',
  announcementMessage: 'File was uploaded successfully!'
};

/** @title File uploader with max number of files example */
@Component({
  selector: 'file-uploader-max-file-number-example',
  templateUrl: './file-uploader-max-file-number-example.html',
  styleUrls: ['./file-uploader-max-file-number-example.css']
})
export class FileUploaderMaxFileNumberExampleComponent {
  testForm!: FormGroup;
  uploader: NxFileUploader;
  uploadConfig: NxFileUploadConfig = {
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

  onChange($event: FileItem[]) {
    console.log($event);
  }

  onDelete($event: FileItem) {
    console.log($event);
  }
}
