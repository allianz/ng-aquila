import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Provides a set of file uploader validators that can be used by form controls.
 *
 * Currently `maxFileSize` and `fileType` are available.
 * @dynamic
 */
export class NxFileUploaderValidators {
  /** The form control validator for the max file size. */
  static maxFileSize<D>(max: Number|undefined, file: File): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return (!max || max > file.size) ? null : {
        'NxFileUploadMaxFileSize': {'max': max, 'fileName': file.name, 'actual': file.size}
      };
    };
  }

  /** The form control validator for the accepted file type. */
  static fileType<D>(file: File, accept: string|undefined): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let isValid = false;
      if (accept) {
        isValid =  accept.replace(/\s/g, '').split(',').filter(acc => {
          return new RegExp(acc.replace('*', '.*')).test(file.type);
        }).length > 0;
      } else {
        isValid = true;
      }

      return (isValid) ? null : {
        'NxFileUploadFileTypeNotAccepted': {'fileName': file.name}
      };
    };
  }
}
