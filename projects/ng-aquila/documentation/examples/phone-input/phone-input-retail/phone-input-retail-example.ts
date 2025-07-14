import {
  NxFormfieldComponent,
  NxFormfieldLabelDirective,
} from '@allianz/ng-aquila/formfield';
import { NxPhoneInputComponent } from '@allianz/ng-aquila/phone-input';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

/** @title Retail variation */
@Component({
  selector: 'phone-input-retail-example',
  templateUrl: 'phone-input-retail-example.html',
  styleUrls: ['./phone-input-retail-example.css'],
  imports: [
    NxFormfieldComponent,
    NxFormfieldLabelDirective,
    NxPhoneInputComponent,
    FormsModule,
  ],
})
export class PhoneInputRetailExampleComponent {
  value = '';
}
