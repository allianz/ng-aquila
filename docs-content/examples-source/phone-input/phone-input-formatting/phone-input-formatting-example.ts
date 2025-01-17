import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
    NxFormfieldComponent,
    NxFormfieldLabelDirective,
} from '@aposin/ng-aquila/formfield';
import { NxPhoneInputComponent } from '@aposin/ng-aquila/phone-input';

/** @title Phone Input Formatting */
@Component({
    selector: 'phone-input-formatting-example',
    templateUrl: 'phone-input-formatting-example.html',
    styleUrls: ['./phone-input-formatting-example.css'],
    imports: [
        NxFormfieldComponent,
        NxFormfieldLabelDirective,
        NxPhoneInputComponent,
        FormsModule,
    ],
})
export class PhoneInputFormattingExampleComponent {
    value = '+49891234567';

    whitespaceFormatter(value: string, countryCode: string) {
        return value.match(/.{1,2}/g)?.join(' ') || '';
    }
}
