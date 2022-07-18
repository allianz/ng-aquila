import { Component } from '@angular/core';

/** @title Phone Input Formatting */
@Component({
    selector: 'phone-input-formatting-example',
    templateUrl: 'phone-input-formatting-example.html',
    styleUrls: ['./phone-input-formatting-example.css'],
})
export class PhoneInputFormattingExampleComponent {
    value = '+49891234567';

    whitespaceFormatter(value: string, countryCode: string) {
        return value.match(/.{1,2}/g)?.join(' ') || '';
    }
}
