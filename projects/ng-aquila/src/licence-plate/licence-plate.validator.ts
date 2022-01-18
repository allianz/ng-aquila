import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';

/**
 * Type of supported license plates.
 */
export type NxLicencePlateType = 'de_standard' | 'de_season' | 'de_special' | 'other' | 'euro';

const DE_SPECIAL_PATTERN = /^[a-zäöüA-ZÄÖÜ0-9]{1,3}[- ]{0,1}[0-9a-zA-Z]{1,5}[- ]{0,1}[0-9a-zA-Z]{1,5}$/;
const DE_STANDARD_PATTERN = /^[a-zäöüA-ZÄÖÜ]{1,3}-[a-zA-Z]{1,2} [0-9]{1,4}[ehEH]{0,1}$/;
const OTHER_PATTERN = /^.+$/;

const LICENCE_PLATE_PATTERNS: { [key in NxLicencePlateType]: RegExp } = {
    de_standard: DE_STANDARD_PATTERN,
    de_special: DE_SPECIAL_PATTERN,
    de_season: DE_STANDARD_PATTERN,
    other: OTHER_PATTERN,
    euro: OTHER_PATTERN,
};

/**
 * Licence plate validator.
 * Supports validation for german standard and special plate numbers.
 * Choose `other` to allow all values.
 */
export function nxLicensePlateValidator(type: NxLicencePlateType): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const valid = LICENCE_PLATE_PATTERNS[type].test(control.value);

        if (valid) {
            return null;
        }
        return { nxLicensePlateError: true };
    };
}

@Directive({
    selector: '[nxLicensePlate]',
    providers: [
        {
            provide: NG_VALIDATORS,
            useExisting: NxLicencePlateValidatorDirective,
            multi: true,
        },
    ],
})
export class NxLicencePlateValidatorDirective implements Validator {
    /**
     * Licence plate type.
     * Supports validation for german standard and special plate numbers.
     * Choose `other` to allow all values.
     */
    @Input('nxLicensePlate')
    type: NxLicencePlateType = 'other';

    validate(control: AbstractControl): ValidationErrors | null {
        return nxLicensePlateValidator(this.type)(control);
    }
}
