import { Component } from '@angular/core';
import {
    NxFormfieldComponent,
    NxFormfieldLabelDirective,
} from '@aposin/ng-aquila/formfield';
import { NxPhoneInputComponent } from '@aposin/ng-aquila/phone-input';

/**
 * @title Selected country example
 */
@Component({
    selector: 'phone-input-country-code-example',
    templateUrl: 'phone-input-country-code-example.html',
    styleUrls: ['./phone-input-country-code-example.css'],
    standalone: true,
    imports: [
        NxFormfieldComponent,
        NxFormfieldLabelDirective,
        NxPhoneInputComponent,
    ],
})
export class PhoneInputCountryCodeExampleComponent {
    value = '';
}
