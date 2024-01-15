import { Directive, ElementRef, forwardRef, Inject, OnDestroy, OnInit } from '@angular/core';
import { NG_VALIDATORS, Validator } from '@angular/forms';
import * as IBAN from 'iban';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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
export class NxIbanMaskDirective implements OnInit, OnDestroy, Validator {
    private _countryCode!: string | null;

    private readonly _destroyed = new Subject<void>();

    constructor(
        private readonly _elementRef: ElementRef,
        @Inject(forwardRef(() => NxMaskDirective)) private readonly maskDirective: NxMaskDirective,
    ) {
        // this is a needed workaround for browser autofill values. these are sent as one
        // input event with the full value, and not as the input handler of the mask assumes
        // one character at a time. in this case we need to find the country code and set the mask
        // before the rest of the onInputChange handler is executed.
        this.maskDirective.registerBeforeInputHook(this._setCountryCodeFromInputValue);
        this.maskDirective.registerAfterInputHook(this._setCountryCodeFromInputValue);
        this.maskDirective.registerBeforePasteHook(this._beforePasteHook);

        this.maskDirective.cvaModelChange.pipe(takeUntil(this._destroyed)).subscribe((value: string) => {
            const enteredCountryCode = this.maskDirective.getMaskedString(value).substr(0, 2);
            this._setCountryCode(enteredCountryCode);
        });
    }

    private _setCountryCodeFromInputValue = (event: Event) => {
        const input = event.target as HTMLInputElement;
        this._setCountryCode(input.value.substr(0, 2));
    };

    private _beforePasteHook = (event: ClipboardEvent) => {
        // change the country code here if necessary
        const input: HTMLInputElement = event.target as HTMLInputElement;
        const pastedData = (event.clipboardData || (window as any).clipboardData).getData('text');

        const enteredCountryCode = (
            this.maskDirective.elementRefValue.substr(0, input.selectionStart!) + this.maskDirective.getMaskedString(pastedData, input.selectionStart!)
        ).substr(0, 2);

        this._setCountryCode(enteredCountryCode);
    };

    private _setCountryCode(code: string): void {
        code = code.toUpperCase();
        if (code.length === 2 && this._countryCode !== code) {
            if (IBAN.countries[code]) {
                this._countryCode = code;
                // we need to run withUpdate = false here or it will mess with the current mask logic.
                // in the beforeInput hook it would already set the input value too early which will mess
                // with the cursor logic
                this.maskDirective.setMask(this._getMask(this._countryCode), false);
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

    ngOnDestroy(): void {
        this._destroyed.next();
        this._destroyed.complete();
    }

    private _getMask(countryCode: string) {
        // the countrySpecs of a country contain: countryCode ("DE"), length (22), structure ("F08F10")
        // and an example belonging to each country
        const countrySpecs = IBAN.countries[countryCode];

        // 'SS' for country code + '00' for IBAN checksum
        let mask = 'SS00';

        // split up after every third character
        const characterDefs = countrySpecs.structure.match(/.{1,3}/g);

        characterDefs!.forEach((charDef: any) => {
            const character = charDef[0];
            const count = Number(charDef.substring(1, 3));

            switch (character) {
                // [0-9]
                case 'F':
                    mask += '0'.repeat(count);
                    break;
                // [0-9A-Za-z]
                case 'A':
                    mask += 'A'.repeat(count);
                    break;
                // [A-Z]
                // 'S' in nxMask does accept also [a-z].
                // There is no option for only accepting capital letters at the moment.
                case 'U':
                    mask += 'S'.repeat(count);
                    break;
            }
        });

        // insert whitespaces after every 4 characters
        mask = mask.match(/.{1,4}/g)!.join(' ');

        return mask;
    }

    private _validateFn() {
        if (this._countryCodeInvalid()) {
            return { nxIbanInvalidCountryError: 'no valid country code' };
        }
        if (!IBAN.isValid(this.maskDirective.getUnmaskedValue())) {
            return { nxIbanParseError: 'no valid iban' };
        }
        return null;
    }

    /** @docs-private */
    validate() {
        return this.maskDirective.validateMask && this.maskDirective.elementRefValue ? this._validateFn() : null;
    }

    private _countryCodeInvalid(): boolean {
        const enteredCountryCode = this._elementRef.nativeElement.value.substr(0, 2);
        return enteredCountryCode.length !== 2 || !IBAN.countries[enteredCountryCode];
    }
}
