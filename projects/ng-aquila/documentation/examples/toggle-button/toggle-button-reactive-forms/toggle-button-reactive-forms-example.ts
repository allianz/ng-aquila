import { NxLabelComponent } from '@allianz/ng-aquila/base';
import {
  NxToggleButtonComponent,
  NxToggleButtonGroupComponent,
} from '@allianz/ng-aquila/toggle-button';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

/**
 * @title Toggle Button Reactive Forms Example
 */
@Component({
  selector: 'toggle-button-reactive-forms-example',
  templateUrl: './toggle-button-reactive-forms-example.html',
  imports: [
    ReactiveFormsModule,
    NxToggleButtonGroupComponent,
    NxToggleButtonComponent,
    NxLabelComponent,
  ],
})
export class ToggleButtonReactiveFormsExampleComponent {
  form = new FormGroup({
    interval: new FormControl('monthly'),
  });
}
