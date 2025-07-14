import { NxLabelComponent } from '@allianz/ng-aquila/base';
import {
  NxCheckboxComponent,
  NxCheckboxGroupComponent,
} from '@allianz/ng-aquila/checkbox';
import { NxGridModule } from '@allianz/ng-aquila/grid';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

/** @title Checkbox Group horizontal layout  */
@Component({
  selector: 'checkbox-group-layout-example',
  templateUrl: './checkbox-group-layout-example.html',
  styleUrls: ['./checkbox-group-layout-example.css'],
  imports: [
    NxCheckboxGroupComponent,
    FormsModule,
    NxLabelComponent,
    NxCheckboxComponent,
    NxGridModule,
  ],
})
export class CheckboxGroupLayoutExampleComponent {
  checkboxes = [
    'Espresso',
    'Americano',
    'Iced Caramel Macchiato',
    'Latte',
    'Nitro Cold Brew',
    'Iced Hazelnut Coffee',
    'Mocha',
  ];
}
