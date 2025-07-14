import { NxLabelComponent } from '@allianz/ng-aquila/base';
import { NxButtonComponent } from '@allianz/ng-aquila/button';
import {
  NxFileUploadConfig,
  NxFileUploader,
  NxFileUploaderButtonDirective,
  NxFileUploaderComponent,
  NxFileUploaderHintDirective,
  NxFileUploaderIntl,
  NxFileUploaderTriggerDirective,
} from '@allianz/ng-aquila/file-uploader';
import { NxIconComponent } from '@allianz/ng-aquila/icon';
import {
  NxMessageToastConfig,
  NxMessageToastService,
} from '@allianz/ng-aquila/message';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Injectable, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Injectable()
export class FileUploaderIntl extends NxFileUploaderIntl {
  uploadingLabel = 'Téléchargement';
  deleteLabel = 'Supprimer';
  uploadedStateLabel = 'Téléchargé';
  uploadedListLabel = 'Liste des fichiers téléchargés';
}

export const myCustomConfig: NxMessageToastConfig = {
  duration: 3000,
  context: 'success',
  announcementMessage: 'File was uploaded successfully!',
};

/** @title File uploader internationalization example */
@Component({
  selector: 'file-uploader-intl-example',
  templateUrl: './file-uploader-intl-example.html',
  styleUrls: ['./file-uploader-intl-example.css'],
  providers: [{ provide: NxFileUploaderIntl, useClass: FileUploaderIntl }],
  imports: [
    NxFileUploaderComponent,
    NxLabelComponent,
    NxFileUploaderHintDirective,
    NxButtonComponent,
    NxFileUploaderButtonDirective,
    NxIconComponent,
    NxFileUploaderTriggerDirective,
  ],
})
export class FileUploaderIntlExampleComponent implements OnInit, OnDestroy {
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
