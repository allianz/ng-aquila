import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Verifies the file type against the accepted types.
 */
export function isFileTypeValid(file: File, accept: string, strict: boolean): boolean {
    if (!accept || (!file.type && !strict)) {
        return true;
    }

    const fileExtension = getFileExtension(file.name);

    return (
        accept
            .replace(/\s/g, '')
            .split(',')
            .filter(acc => {
                const testExp = new RegExp(acc);
                return testExp.test(file.type) || acc === fileExtension;
            }).length > 0
    );
}

/**
 * Verifies the file size against the max file size allow.
 */
export function isMaxFileSizeValid(file: File, maxFileSize: number): boolean {
    return !maxFileSize || file.size <= maxFileSize;
}

/** Returns the file extension including the dot or empty string if filename has no extension */
export function getFileExtension(filename: string) {
    const parts = filename.split('.');

    if (parts.length === 1) {
        return '';
    }

    return '.' + parts.pop();
}

export function isMaxFileNumberValid(numFile: number, max: number | undefined) {
    return !numFile || !max || numFile <= max;
}

/**
 * Provides a set of file uploader validators that can be used by form controls.
 *
 * Currently `maxFileSize` and `fileType` are available.
 * @dynamic
 */
export class NxFileUploaderValidators {
    /** The form control validator for the max file size. */
    static maxFileSize<D>(max: number | undefined, file: File): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if (!max || max > file.size) {
                return null;
            }
            return { NxFileUploadMaxFileSize: { max, fileName: file.name, actual: file.size } };
        };
    }

    /** The form control validator for the accepted file type. */
    static fileType<D>(file: File, accept: string | undefined, strict: boolean): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if (isFileTypeValid(file, accept!, strict)) {
                return null;
            }
            return { NxFileUploadFileTypeNotAccepted: { fileName: file.name } };
        };
    }

    /** The form control validator for the max file number that is accepted. */
    static maxFileNumber<D>(filesNum: number, max: number | undefined): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if (isMaxFileNumberValid(filesNum, max)) {
                return null;
            }
            return {
                NxFileUploadMaxFileNumber: { max, actual: filesNum },
            };
        };
    }
}

export interface BaseFileUploadError {
    filename: string;
}
export type FileUploadError = NxFileTypeError | NxFileSizeError | NxFileNumberError | NxFileUploadTypeError;

export interface NxFileTypeError extends BaseFileUploadError {
    type: 'fileType';
    extension: string;
    actual: string;
}

export interface NxFileSizeError extends BaseFileUploadError {
    type: 'fileNumber';
    max: number;
    actual: number;
}

export interface NxFileNumberError extends BaseFileUploadError {
    type: 'fileSize';
    max: number;
    actual: number;
}

export interface NxFileUploadTypeError extends BaseFileUploadError {
    type: 'upload';
    reason: string;
}
