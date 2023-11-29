import { Component } from '@angular/core';
import {
    AbstractControl,
    FormControl,
    ValidatorFn,
    Validators,
} from '@angular/forms';
import { NumberType, parsePhoneNumber } from 'libphonenumber-js/max';

export type PhoneNumberType = 'landline' | 'mobile';

const MOBILE_TYPES: NumberType[] = ['MOBILE', 'FIXED_LINE_OR_MOBILE'];

const LANDLINE_TYPES: NumberType[] = [
    'FIXED_LINE',
    'FIXED_LINE_OR_MOBILE',
    'PERSONAL_NUMBER',
];

/**
 * Validates phone numbers. International numbers are accepted if they contain a country code.
 * @param type (optional) Type of number, can be `mobile` or `landline`
 */
export function phoneNumberValidator(type?: PhoneNumberType): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        let valid = false;
        // if the number is packed in an object, the entered value is the `original`field
        const value =
            typeof control.value === 'object'
                ? control.value.original
                : control.value;
        let typeValid = true;

        try {
            if (value != null) {
                const parsed = parsePhoneNumber(value);
                const parsedType = parsed.getType();

                if (type === 'mobile') {
                    typeValid = MOBILE_TYPES.includes(parsedType);
                } else if (type === 'landline') {
                    typeValid = LANDLINE_TYPES.includes(parsedType);
                }

                valid = parsed.isValid() && typeValid;
            }
        } catch (e) {}

        return valid
            ? null
            : {
                  phoneNumber: { value, typeValid },
              };
    };
}

/** @title Phone input validation */
@Component({
    selector: 'phone-input-validation-example',
    templateUrl: 'phone-input-validation-example.html',
    styleUrls: ['./phone-input-validation-example.css'],
})
export class PhoneInputValidationExampleComponent {
    phoneControl = new FormControl('', [
        Validators.required,
        phoneNumberValidator('landline'),
    ]);
    mobilePhoneControl = new FormControl('', [
        Validators.required,
        phoneNumberValidator('mobile'),
    ]);
}
