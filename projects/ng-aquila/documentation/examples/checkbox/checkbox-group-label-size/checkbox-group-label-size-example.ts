import { NxLabelComponent } from '@allianz/ng-aquila/base';
import {
  NxCheckboxComponent,
  NxCheckboxGroupComponent,
} from '@allianz/ng-aquila/checkbox';
import { Component } from '@angular/core';

/**
 * @title Checkbox group label size example
 */
@Component({
  selector: 'checkbox-group-label-size-example',
  templateUrl: './checkbox-group-label-size-example.html',
  styleUrls: ['./checkbox-group-label-size-example.css'],
  imports: [NxCheckboxGroupComponent, NxLabelComponent, NxCheckboxComponent],
})
export class CheckboxGroupLabelSizeExampleComponent {}
