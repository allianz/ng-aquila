import { NxLabelComponent } from '@allianz/ng-aquila/base';
import {
  NxToggleButtonComponent,
  NxToggleButtonGroupComponent,
} from '@allianz/ng-aquila/toggle-button';
import { Component, signal } from '@angular/core';

/**
 * @title Toggle Button Readonly and Disabled Example
 */
@Component({
  selector: 'toggle-button-readonly-disabled-example',
  templateUrl: './toggle-button-readonly-disabled-example.html',
  styleUrls: ['./toggle-button-readonly-disabled-example.css'],
  imports: [
    NxToggleButtonGroupComponent,
    NxToggleButtonComponent,
    NxLabelComponent,
  ],
})
export class ToggleButtonReadonlyDisabledExampleComponent {
  intervals = [
    { value: 'monthly', label: 'Monthly' },
    { value: 'quarterly', label: 'Quarterly' },
    { value: 'yearly', label: 'Yearly' },
  ];
  single = signal('monthly');
  readonly = signal('quarterly');
  disabled = signal('yearly');
}
