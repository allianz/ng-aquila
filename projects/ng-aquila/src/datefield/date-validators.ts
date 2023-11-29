import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

import { NxDateAdapter, NxDateFormats } from './adapter';

/**
 * Provides a set of date validators that can be used by form controls.
 * @dynamic
 */
export class NxDateValidators {
    /** The form control validator for whether the input parses. */
    static parse<D>(
        dateAdapter: NxDateAdapter<D>,
        dateFormats: NxDateFormats,
        input: HTMLInputElement,
        strict: boolean,
        customParseFormat: string | string[],
    ): ValidatorFn {
        return (): ValidationErrors | null => {
            if (!input.value) {
                return null;
            }
            const parsedValue = dateAdapter.parse(input.value, customParseFormat || dateFormats.parse.dateInput, strict);
            const valid = parsedValue && dateAdapter.isValid(parsedValue);
            return valid ? null : { nxDatefieldParse: { text: input } };
        };
    }

    /** The form control validator for the min date. */
    static min<D>(dateAdapter: NxDateAdapter<D>, min: D): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const controlValue = getValidDateOrNull(dateAdapter, dateAdapter.deserialize(control.value));
            return !min || !controlValue || dateAdapter.compareDate(min, controlValue) <= 0 ? null : { nxDatefieldMin: { min, actual: controlValue } };
        };
    }

    /** The form control validator for the max date. */
    static max<D>(dateAdapter: NxDateAdapter<D>, max: D): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const controlValue = getValidDateOrNull(dateAdapter, dateAdapter.deserialize(control.value));
            return !max || !controlValue || dateAdapter.compareDate(max, controlValue) >= 0 ? null : { nxDatefieldMax: { max, actual: controlValue } };
        };
    }

    /** The form control validator for the date filter. */
    static filter<D>(dateAdapter: NxDateAdapter<D>, dateFilter: (date: D | null) => boolean): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const controlValue = getValidDateOrNull(dateAdapter, dateAdapter.deserialize(control.value));
            return !dateFilter || !controlValue || dateFilter(controlValue) ? null : { nxDatefieldFilter: true };
        };
    }
}

function getValidDateOrNull<D>(dateAdapter: NxDateAdapter<D>, obj: any): D | null {
    return dateAdapter.isDateInstance(obj) && dateAdapter.isValid(obj) ? obj : null;
}
