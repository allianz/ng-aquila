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

export class NxDateRangeValidators {
    static min<D>(dateAdapter: NxDateAdapter<D>, min: D): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const controlValue = getValidDateOrNull(dateAdapter, dateAdapter.deserialize(control.value?.start));

            return !min || !controlValue || dateAdapter.compareDate(min, controlValue) <= 0 ? null : { nxDatefieldMin: { min, actual: controlValue } };
        };
    }

    /** The form control validator for the max date. */
    static max<D>(dateAdapter: NxDateAdapter<D>, max: D): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const controlValue = getValidDateOrNull(dateAdapter, dateAdapter.deserialize(control.value?.end));
            return !max || !controlValue || dateAdapter.compareDate(max, controlValue) >= 0 ? null : { nxDatefieldMax: { max, actual: controlValue } };
        };
    }

    /** The form control validator for the date filter. */
    static filter<D>(dateAdapter: NxDateAdapter<D>, dateFilter: (date: D | null) => boolean | null): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if (!dateFilter) {
                return null;
            }
            const controlValueStart = getValidDateOrNull(dateAdapter, dateAdapter.deserialize(control.value?.start));
            const controlValueEnd = getValidDateOrNull(dateAdapter, dateAdapter.deserialize(control.value?.end));

            const startMismatchesFilter = !dateFilter(controlValueStart);
            const endMismatchesFilter = !dateFilter(controlValueEnd);

            const errors: ValidationErrors = {};
            if (startMismatchesFilter) {
                errors.nxDateRangeStartFilter = true;
            }
            if (endMismatchesFilter) {
                errors.nxDateRangeEndFilter = true;
            }

            return startMismatchesFilter || endMismatchesFilter ? errors : null;
        };
    }

    /** The form control validator to check that the start date is before end date. */
    static range<D>(dateAdapter: NxDateAdapter<D>): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const controlValueStart = getValidDateOrNull(dateAdapter, dateAdapter.deserialize(control.value?.start));
            const controlValueEnd = getValidDateOrNull(dateAdapter, dateAdapter.deserialize(control.value?.end));

            if (controlValueStart && controlValueEnd && dateAdapter.compareDate(controlValueStart, controlValueEnd) > 0) {
                return { nxDateRangeInvalid: true };
            }

            return null;
        };
    }

    static complete<D>(dateAdapter: NxDateAdapter<D>): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const controlValueStart = getValidDateOrNull(dateAdapter, dateAdapter.deserialize(control.value?.start));
            const controlValueEnd = getValidDateOrNull(dateAdapter, dateAdapter.deserialize(control.value?.end));

            const partlyMissing = (controlValueStart && !controlValueEnd) || (!controlValueStart && controlValueEnd);
            if (partlyMissing) {
                return { nxDateRangeIncomplete: true };
            }

            return null;
        };
    }

    static required<D>(dateAdapter: NxDateAdapter<D>): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const controlValueStart = getValidDateOrNull(dateAdapter, dateAdapter.deserialize(control.value?.start));
            const controlValueEnd = getValidDateOrNull(dateAdapter, dateAdapter.deserialize(control.value?.end));

            const rangePartsMissing = !controlValueStart && !controlValueEnd;
            if (!control.value || rangePartsMissing) {
                return { required: true };
            }

            return null;
        };
    }
}

function getValidDateOrNull<D>(dateAdapter: NxDateAdapter<D>, obj: any): D | null {
    return dateAdapter.isDateInstance(obj) && dateAdapter.isValid(obj) ? obj : null;
}
