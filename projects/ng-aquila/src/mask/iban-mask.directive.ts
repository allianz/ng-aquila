import { Directive, ElementRef, forwardRef, Inject, OnInit } from '@angular/core';
import { NG_VALIDATORS, Validator } from '@angular/forms';
import * as IBAN from 'iban';
import { NxMaskDirective } from './mask.directive';

export const NX_IBAN_MASK_VALIDATORS: any = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => NxIbanMaskDirective),
    multi: true,
};

/**
 * To use the `NxIbanMaskDirective`, you have to install the **peer dependency** `iban.js`.
 */
@Directive({
    selector: 'input[nxIbanMask]',
    exportAs: 'nxIbanMaskDirective',
    providers: [NX_IBAN_MASK_VALIDATORS],
})
export class NxIbanMaskDirective implements OnInit, Validator {
    private _countryCode!: string | null;

    constructor(private _elementRef: ElementRef, @Inject(forwardRef(() => NxMaskDirective)) private maskDirective: NxMaskDirective) {
        this.maskDirective.registerAfterInputHook(this._afterInputHook);
        this.maskDirective.registerBeforePasteHook(this._beforePasteHook);

        this.maskDirective.cvaModelChange.subscribe((value: string) => {
            const enteredCountryCode = this.maskDirective.getMaskedString(value).substr(0, 2);
            this._setCountryCode(enteredCountryCode);
        });
    }

    private _afterInputHook = (event: KeyboardEvent) => {
        const input = event.target as HTMLInputElement;
        this._setCountryCode(input.value.substr(0, 2));
    };

    private _beforePasteHook = (event: ClipboardEvent) => {
        // change the country code here if necessary
        const input: HTMLInputElement = event.target as HTMLInputElement;
        const pastedData = (event.clipboardData || (window as any).clipboardData).getData('text');

        const enteredCountryCode = (
            this.maskDirective.elementRefValue.substr(0, input.selectionStart as number) +
            this.maskDirective.getMaskedString(pastedData, input.selectionStart as number)
        ).substr(0, 2);

        this._setCountryCode(enteredCountryCode);
    };

    private _setCountryCode(code: string): void {
        code = code.toUpperCase();
        if (code.length === 2 && this._countryCode !== code) {
            if (this._countryCodeExists(code)) {
                this._countryCode = code;
                this.maskDirective.setMask(this._getMask(this._countryCode));
            } else {
                this._countryCode = null;
                this.maskDirective.setMask('SS');
            }
        }
    }

    ngOnInit(): void {
        // set only first two letters as I don't know a country yet
        this.maskDirective.mask = 'SS';
        this.maskDirective.convertTo = 'upper';
    }

    private _getMask(countryCode: string) {
        // the countrySpecs of a country contain: countryCode ("DE"), length (22), structure ("F08F10")
        // and an example belonging to each country
        const countrySpecs = IBAN['countries'][countryCode];

        // 'SS' for country code + '00' for IBAN checksum
        let mask = 'SS00';

        // split up after every third character
        const characterDefs = countrySpecs['structure'].match(/.{1,3}/g);

        characterDefs!.forEach((charDef: any) => {
            const character = charDef[0];
            const count = Number(charDef.substring(1, 3));

            switch (character) {
                // [0-9]
                case 'F':
                    mask = mask + '0'.repeat(count);
                    break;
                // [0-9A-Za-z]
                case 'A':
                    mask = mask + 'A'.repeat(count);
                    break;
                // [A-Z]
                // 'S' in nxMask does accept also [a-z].
                // There is no option for only accepting capital letters at the moment.
                case 'U':
                    mask = mask + 'S'.repeat(count);
                    break;
            }
        });

        // insert whitespaces after every 4 characters
        mask = mask.match(/.{1,4}/g)!.join(' ');

        return mask;
    }

    private _countryCodeExists(countryCode: string): boolean {
        return !!IBAN['countries'][countryCode];
    }

    private _validateFn() {
        const enteredCountryCode = this._elementRef.nativeElement.value.substr(0, 2);
        if (enteredCountryCode.length === 2 && !this._countryCodeExists(enteredCountryCode)) {
            // immediately show error to user
            this.maskDirective._touch();
            return { nxIbanInvalidCountryError: 'no valid country code' };
        }
        if (!IBAN.isValid(this.maskDirective.getUnmaskedValue())) {
            return { nxIbanParseError: 'no valid iban' };
        }
        return null;
    }

    /** @docs-private */
    validate() {
        return this.maskDirective.validateMask ? this._validateFn() : null;
    }
}
