import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable, of, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { FileItem } from './file-uploader.model';

export interface NxFileUploadConfig {
    /** Sets the url for uploading requests. */
    requestUrl: string;
    /** Sets the options for http upload requests. HttpParams */
    options?: object;
    /** Whether the files should be uploaded separately. Default: false. */
    uploadSeparately?: boolean;
}

export class NxFileUploadSuccess {
    constructor(
        /** The files that were successfully uploaded. */
        readonly files: FileItem[],
        /** The results of the request(s). */
        readonly requests: object[],
    ) {}
}

export class NxFileUploadError {
    constructor(
        /** The files that had an error while uploading. */
        readonly files: FileItem[],
        /** The returned errors of the request(s). */
        readonly requests: object[],
    ) {}
}

export interface NxFileUploadResult {
    /** Whether all files were successfully uploaded. */
    allSucessful?: boolean;
    /** All successfully uploaded results. */
    success?: NxFileUploadSuccess;
    /** All results with errors. */
    error?: NxFileUploadError;
}

export class NxFileUploader {
    private _config: NxFileUploadConfig;
    private readonly _httpClient: HttpClient;

    /** Stream that emits the result of an upload request. */
    readonly response = new Subject<NxFileUploadResult>();

    /** Sets the config options for http requests for uploading the files. */
    set config(options: NxFileUploadConfig) {
        if (this._config !== options) {
            this._config = options;
        }
    }
    get config(): NxFileUploadConfig {
        return this._config;
    }

    constructor(config: NxFileUploadConfig, http: HttpClient) {
        this._config = config;
        this._httpClient = http;
    }

    /** Uploads the files to the url specified in config. */
    uploadFiles(files: FileItem[]) {
        if (this.config.uploadSeparately) {
            this._uploadFilesSeparately(files);
        } else {
            this._uploadFilesCollectively(files);
        }
    }

    /** Uploads all files with a POST request to the url specified in config. */
    private _uploadFilesCollectively(files: FileItem[]) {
        // get a list of all files; if there is no one: return
        if (!files || files.length === 0) {
            return;
        }

        const formData = new FormData();

        // save value here in case that it changes while request is running
        const valuesToUpload = files.filter(file => !file.isUploaded);
        valuesToUpload.forEach((file: FileItem) => {
            file.setUploadingState();
            formData.append('uploads[]', file.file as Blob, file.name);
        });

        this._httpClient.post(this.config.requestUrl, formData, this.config.options).subscribe(
            data => {
                valuesToUpload.forEach((file: FileItem) => file.setUploadedState());
                this.response.next({ allSucessful: true, success: new NxFileUploadSuccess(valuesToUpload, [data]) });
            },
            error => {
                valuesToUpload.forEach((file: FileItem) => file.setErrorState());
                this.response.next({ error: new NxFileUploadError(valuesToUpload, [error]) });
            },
        );
    }

    /**
     * Uploads all files with a POST request to the url specified in config.
     *
     * Each file is uploaded with an individual request.
     */
    private _uploadFilesSeparately(files: FileItem[]) {
        // get a list of all files; if there is no one: return
        if (!files) {
            return;
        }

        const responses: Observable<NxFileUploadResult>[] = [];

        const filesToUpload = files.filter(file => !file.isUploaded);

        filesToUpload.forEach((file: FileItem) => {
            responses.push(this._uploadFile(file).pipe(catchError(error => of(error))));
        });

        forkJoin(responses).subscribe(results => {
            const mergedResults = results.reduce((acc, result: NxFileUploadResult) => {
                if (result.success) {
                    if (!acc.success) {
                        acc.success = new NxFileUploadSuccess([], []);
                    }
                    acc.success.files.push(...result.success.files);
                    acc.success.requests.push(...result.success.requests);
                } else if (result.error) {
                    if (!acc.error) {
                        acc.error = new NxFileUploadError([], []);
                    }
                    acc.error.files.push(...result.error.files);
                    acc.error.requests.push(...result.error.requests);
                }

                return acc;
            }, {});

            if (!mergedResults.error) {
                mergedResults.allSucessful = true;
            }

            this.response.next(mergedResults);
        });
    }

    /** Uploads one file with a POST request to the url specified in config. */
    private _uploadFile(file: FileItem): Subject<NxFileUploadResult> {
        const fileReturnVal = new Subject<NxFileUploadResult>();

        const formData = new FormData();
        if (!file.isUploaded) {
            file.setUploadingState();
            formData.append('uploads[]', file.file as Blob, file.name);
        }

        this._httpClient.post(this.config.requestUrl, formData, this.config.options).subscribe(
            data => {
                file.setUploadedState();
                fileReturnVal.next({ success: new NxFileUploadSuccess([file], [data]) });
                fileReturnVal.complete();
            },
            error => {
                file.setErrorState();
                fileReturnVal.next({ error: new NxFileUploadError([file], [error]) });
                fileReturnVal.complete();
            },
        );

        return fileReturnVal;
    }
}
