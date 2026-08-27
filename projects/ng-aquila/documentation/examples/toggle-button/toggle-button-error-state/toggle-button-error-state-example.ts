import { NxErrorComponent, NxLabelComponent } from '@allianz/ng-aquila/base';
import {
  NxToggleButtonComponent,
  NxToggleButtonGroupComponent,
} from '@allianz/ng-aquila/toggle-button';
import { Component, signal } from '@angular/core';

/**
 * @title Toggle Button Error State Example
 */
@Component({
  selector: 'toggle-button-error-state-example',
  templateUrl: './toggle-button-error-state-example.html',
  imports: [
    NxToggleButtonGroupComponent,
    NxToggleButtonComponent,
    NxLabelComponent,
    NxErrorComponent,
  ],
})
export class ToggleButtonErrorStateExampleComponent {
  intervals = [
    { value: 'monthly', label: 'Monthly' },
    { value: 'quarterly', label: 'Quarterly' },
    { value: 'yearly', label: 'Yearly' },
  ];
  interval = signal('quarterly');
}
