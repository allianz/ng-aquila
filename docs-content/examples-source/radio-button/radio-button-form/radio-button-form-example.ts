import { NxLabelComponent } from '@allianz/ng-aquila/base';
import {
  NxRadioComponent,
  NxRadioGroupComponent,
} from '@allianz/ng-aquila/radio-button';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

/**
 * @title Template Driven Examples
 */
@Component({
  selector: 'radio-button-form-example',
  templateUrl: './radio-button-form-example.html',
  styleUrls: ['./radio-button-form-example.css'],
  imports: [
    FormsModule,
    NxRadioGroupComponent,
    NxLabelComponent,
    NxRadioComponent,
  ],
})
export class RadioButtonFormExampleComponent {
  templateModel = 'apples';
}
