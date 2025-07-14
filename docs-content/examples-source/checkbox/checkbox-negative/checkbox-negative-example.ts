import { NxLabelComponent } from '@allianz/ng-aquila/base';
import {
  NxCheckboxComponent,
  NxCheckboxGroupComponent,
} from '@allianz/ng-aquila/checkbox';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

/**
 * @title Negative styling example
 */
@Component({
  selector: 'checkbox-negative-example',
  templateUrl: './checkbox-negative-example.html',
  styleUrls: ['./checkbox-negative-example.css'],
  imports: [
    NxCheckboxComponent,
    NxCheckboxGroupComponent,
    FormsModule,
    NxLabelComponent,
  ],
})
export class CheckboxNegativeExampleComponent {
  checkboxes = ['checkbox 1'];
}
