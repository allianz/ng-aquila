import { NxLabelComponent } from '@allianz/ng-aquila/base';
import {
  NxToggleButtonComponent,
  NxToggleButtonGroupComponent,
} from '@allianz/ng-aquila/toggle-button';
import { Component, signal } from '@angular/core';

/**
 * @title Toggle Button Basic Example
 */
@Component({
  selector: 'toggle-button-basic-example',
  templateUrl: './toggle-button-basic-example.html',
  imports: [
    NxToggleButtonGroupComponent,
    NxToggleButtonComponent,
    NxLabelComponent,
  ],
})
export class ToggleButtonBasicExampleComponent {
  intervals = [
    { value: 'monthly', label: 'Monthly' },
    { value: 'quarterly', label: 'Quarterly' },
    { value: 'yearly', label: 'Yearly' },
  ];
  interval = signal('monthly');
}
