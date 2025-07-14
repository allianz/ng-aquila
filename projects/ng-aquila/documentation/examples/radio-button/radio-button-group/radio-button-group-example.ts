import { NxLabelComponent } from '@allianz/ng-aquila/base';
import {
  NxRadioComponent,
  NxRadioGroupComponent,
} from '@allianz/ng-aquila/radio-button';
import { Component } from '@angular/core';

/**
 * @title Group Examples
 */
@Component({
  selector: 'radio-button-group-example',
  templateUrl: './radio-button-group-example.html',
  styleUrls: ['./radio-button-group-example.css'],
  imports: [NxRadioGroupComponent, NxLabelComponent, NxRadioComponent],
})
export class RadioButtonGroupExampleComponent {}
