import {
  NxFormfieldComponent,
  NxFormfieldLabelDirective,
  NxFormfieldNoteDirective,
} from '@allianz/ng-aquila/formfield';
import { NxMessageComponent } from '@allianz/ng-aquila/message';
import { NxPhoneInputComponent } from '@allianz/ng-aquila/phone-input';
import { JsonPipe } from '@angular/common';
import { Component, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

/** @title Parsed value example */
@Component({
  selector: 'phone-input-parsed-value-example',
  templateUrl: 'phone-input-parsed-value-example.html',
  styleUrls: ['./phone-input-parsed-value-example.css'],
  imports: [
    NxFormfieldComponent,
    NxFormfieldLabelDirective,
    NxFormfieldNoteDirective,
    NxMessageComponent,
    NxPhoneInputComponent,
    FormsModule,
    JsonPipe,
  ],
})
export class PhoneInputParsedValueExampleComponent {
  readonly phoneInput = viewChild.required(NxPhoneInputComponent);

  value = '+4989123456';
}
