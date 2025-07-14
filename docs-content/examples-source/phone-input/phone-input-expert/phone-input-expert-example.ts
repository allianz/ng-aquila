import { NxCheckboxComponent } from '@allianz/ng-aquila/checkbox';
import {
  NxFormfieldComponent,
  NxFormfieldLabelDirective,
} from '@allianz/ng-aquila/formfield';
import { NxPhoneInputComponent } from '@allianz/ng-aquila/phone-input';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

/**
 * @title Expert variation
 */
@Component({
  selector: 'phone-input-expert-example',
  templateUrl: 'phone-input-expert-example.html',
  styleUrls: ['./phone-input-expert-example.css'],
  imports: [
    NxCheckboxComponent,
    NxFormfieldComponent,
    NxFormfieldLabelDirective,
    NxPhoneInputComponent,
    FormsModule,
  ],
})
export class PhoneInputExpertExampleComponent implements OnInit {
  tel = '+1 123 867593';
  countryCode = 'FR';
  readonly = false;
  disabled = false;

  ngOnInit(): void {
    setTimeout(() => (this.countryCode = 'AT'));
  }
}
