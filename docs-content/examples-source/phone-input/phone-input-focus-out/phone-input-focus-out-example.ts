import {
  NxFormfieldComponent,
  NxFormfieldLabelDirective,
  NxFormfieldNoteDirective,
} from '@allianz/ng-aquila/formfield';
import { NxPhoneInputComponent } from '@allianz/ng-aquila/phone-input';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

/** @title Focus in/out example */
@Component({
  selector: 'phone-input-focus-out-example',
  templateUrl: 'phone-input-focus-out-example.html',
  styleUrls: ['./phone-input-focus-out-example.css'],
  imports: [
    NxFormfieldComponent,
    NxFormfieldLabelDirective,
    NxPhoneInputComponent,
    FormsModule,
    NxFormfieldNoteDirective,
  ],
})
export class PhoneInputFocusOutExampleComponent {
  value = '';

  focusing = false;

  onFocusOut() {
    this.focusing = false;
  }

  onFocusIn() {
    this.focusing = true;
  }
}
