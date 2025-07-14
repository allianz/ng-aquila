import { NxLabelComponent } from '@allianz/ng-aquila/base';
import {
  NxRadioComponent,
  NxRadioGroupComponent,
} from '@allianz/ng-aquila/radio-button';
import { Component } from '@angular/core';

/**
 * @title Radio button group label size Example
 */
@Component({
  selector: 'radio-button-group-label-size-example',
  templateUrl: './radio-button-group-label-size-example.html',
  styleUrls: ['./radio-button-group-label-size-example.css'],
  imports: [NxRadioGroupComponent, NxLabelComponent, NxRadioComponent],
})
export class RadioButtonGroupLabelSizeExampleComponent {}
