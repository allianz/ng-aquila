import { AbstractControl } from '@angular/forms';

import { NxLicencePlateType, nxLicensePlateValidator } from './licence-plate.validator';

const EXAMPLE_LICENCE_PLATE_NUMBERS = {
    de_standard: {
        valid: ['M-AB 1234', 'M-AB 1234E', 'M-AB 1234H', 'ABC-XY 123'],
        invalid: ['', '1-XY 1234', 'M-ABC 1234', 'M-1234 XY', 'S-ÄÜ 43'],
    },
    de_special: {
        valid: ['M-07234', 'S-06438', 'KA-04401', 'B-123X'],
        invalid: ['', 'AÜÖ123-XY 1234', 'S 123 123$'],
    },
    other: {
        valid: ['abcABC123%&/- '],
        invalid: [''],
    },
    euro: {
        valid: ['abcABC123%&/- '],
        invalid: [''],
    },
};

describe('NxLicencePlateValidator', () => {
    for (const [type, numbers] of Object.entries(EXAMPLE_LICENCE_PLATE_NUMBERS)) {
        describe(`type ${type}`, () => {
            for (const validNumber of numbers.valid) {
                it(`allows valid licence plate number "${validNumber}"`, () => {
                    expect(
                        nxLicensePlateValidator(type as NxLicencePlateType)({
                            value: validNumber,
                        } as AbstractControl),
                    ).toBeNull();
                });
            }

            for (const invalidNumber of numbers.invalid) {
                it(`does not allow invalid licence plate number "${invalidNumber}"`, () => {
                    expect(
                        nxLicensePlateValidator(type as NxLicencePlateType)({
                            value: invalidNumber,
                        } as AbstractControl),
                    ).toEqual({ nxLicensePlateError: true });
                });
            }
        });
    }
});
