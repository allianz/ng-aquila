import { NxLabelComponent } from '@allianz/ng-aquila/base';
import {
  NxColComponent,
  NxLayoutComponent,
  NxRowComponent,
} from '@allianz/ng-aquila/grid';
import {
  NxRadioComponent,
  NxRadioGroupComponent,
} from '@allianz/ng-aquila/radio-button';
import { Component } from '@angular/core';

/** @title Radio Button Group Horizontal Example */
@Component({
  selector: 'radio-button-group-horizontal-example',
  templateUrl: './radio-button-group-horizontal-example.html',
  styleUrls: ['./radio-button-group-horizontal-example.css'],
  imports: [
    NxRadioGroupComponent,
    NxLabelComponent,
    NxLayoutComponent,
    NxRowComponent,
    NxColComponent,
    NxRadioComponent,
  ],
})
export class RadioButtonGroupHorizontalExampleComponent {
  data = [
    'Espresso',
    'Americano',
    'Caramel Macchiato',
    'Latte',
    'Nitro Cold Brew',
    'Iced Hazelnut Coffee',
    'Mocha',
  ];
}
