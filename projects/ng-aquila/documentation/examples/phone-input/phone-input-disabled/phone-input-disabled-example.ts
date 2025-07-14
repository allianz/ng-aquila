import {
  NxFormfieldComponent,
  NxFormfieldLabelDirective,
} from '@allianz/ng-aquila/formfield';
import { NxPhoneInputComponent } from '@allianz/ng-aquila/phone-input';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

/**
 * @title Disabled example
 */
@Component({
  templateUrl: 'phone-input-disabled-example.html',
  styleUrls: ['./phone-input-disabled-example.css'],
  selector: 'phone-input-disabled-example',
  imports: [
    NxFormfieldComponent,
    NxFormfieldLabelDirective,
    NxPhoneInputComponent,
    FormsModule,
  ],
})
export class PhoneInputDisabledExampleComponent {
  value = '+4989123456';
}
