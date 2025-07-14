import {
  NxFormfieldComponent,
  NxFormfieldLabelDirective,
} from '@allianz/ng-aquila/formfield';
import { NxPhoneInputComponent } from '@allianz/ng-aquila/phone-input';
import { Component } from '@angular/core';

/**
 * @title Selected country example
 */
@Component({
  selector: 'phone-input-country-code-example',
  templateUrl: 'phone-input-country-code-example.html',
  styleUrls: ['./phone-input-country-code-example.css'],
  imports: [
    NxFormfieldComponent,
    NxFormfieldLabelDirective,
    NxPhoneInputComponent,
  ],
})
export class PhoneInputCountryCodeExampleComponent {
  value = '';
}
