import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { FileItem } from './file-uploader.model';

/**
 * Verifies the file type against the accepted types
 */
export function isFileTypeValid(file: File, accept: string): boolean {
    if (!accept || !file.type) {
        return true;
    }

    return (
        accept
            .replace(/\s/g, '')
            .split(',')
            .filter(acc => {
                const testExp = new RegExp(acc);
                return testExp.test(file.type) || testExp.test(file.name);
            }).length > 0
    );
}

/**
 * Provides a set of file uploader validators that can be used by form controls.
 *
 * Currently `maxFileSize` and `fileType` are available.
 * @dynamic
 */
export class NxFileUploaderValidators {
    /** The form control validator for the max file size. */
    static maxFileSize<D>(max: Number | undefined, file: File): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            return !max || max > file.size
                ? null
                : {
                      NxFileUploadMaxFileSize: { max, fileName: file.name, actual: file.size },
                  };
        };
    }

    /** The form control validator for the accepted file type. */
    static fileType<D>(file: File, accept: string | undefined): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            return isFileTypeValid(file, accept as string)
                ? null
                : {
                      NxFileUploadFileTypeNotAccepted: { fileName: file.name },
                  };
        };
    }

    /** The form control validator for the max file number that is accepted. */
    static maxFileNumber<D>(files: FileItem[], max: number | undefined): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            return !files || !files.length || !max || files.length <= max
                ? null
                : {
                      NxFileUploadMaxFileNumber: { max, actual: files.length },
                  };
        };
    }
}
