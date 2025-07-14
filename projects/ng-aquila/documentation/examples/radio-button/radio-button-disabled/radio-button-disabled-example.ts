import { NxLabelComponent } from '@allianz/ng-aquila/base';
import {
  NxRadioComponent,
  NxRadioGroupComponent,
} from '@allianz/ng-aquila/radio-button';
import { Component } from '@angular/core';

/**
 * @title Disabled Example
 */
@Component({
  selector: 'radio-button-disabled-example',
  templateUrl: './radio-button-disabled-example.html',
  styleUrls: ['./radio-button-disabled-example.css'],
  imports: [NxRadioGroupComponent, NxLabelComponent, NxRadioComponent],
})
export class RadioButtonDisabledExampleComponent {}
