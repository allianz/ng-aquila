import { Component, ViewChild } from '@angular/core';
import { NxFileUploaderComponent, FileItem } from '@aposin/ng-aquila/file-uploader';
import { NxMessageToastConfig, NxMessageToastService } from '@aposin/ng-aquila/message';
import { HttpParams, HttpClient } from '@angular/common/http';

const myCustomConfig: NxMessageToastConfig = {
  duration: 3000,
  context: 'success',
  announcementMessage: 'File was uploaded successfully!'
};

/** @title Custom uploading implementation */
@Component({
  selector: 'file-uploader-with-request-example',
  templateUrl: './file-uploader-with-request-example.html',
  styleUrls: ['./file-uploader-with-request-example.css']
})
export class FileUploaderWithRequestExampleComponent {
  @ViewChild('documentUpload',  { static: false }) documentUpload: NxFileUploaderComponent;
  public showUploadError: boolean = false;

  constructor(
    private messageToastService: NxMessageToastService,
    private http: HttpClient
  ) {}

  upload(url: string) {
    this.showUploadError = false;

    if (!this.documentUpload.value) {
      return;
    }

    const formData = new FormData();

    this.documentUpload.value.forEach((fileItem: FileItem) => {
      if (!fileItem.isUploaded) {
        fileItem.setUploadingState();
        formData.append('uploads[]', fileItem.file, fileItem.name);
      }
    });

    const params = new HttpParams();
    const options = {
      params,
      reportProgress: true,
    };

    this.http.post(url, formData, options).subscribe(
      data => {
        this.documentUpload.value.forEach((fileItem: FileItem) => {
          fileItem.setUploadedState();
        });
        this.messageToastService.open('All files were uploaded successfully!', myCustomConfig);
      },
      error => {
        this.documentUpload.value.forEach((fileItem: FileItem) => {
          if (!fileItem.isUploaded) {
            fileItem.setErrorState();
          }
        });
        this.showUploadError = true;
      }
    );
  }
}
