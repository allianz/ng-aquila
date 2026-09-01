import { NxLabelComponent } from '@allianz/ng-aquila/base';
import {
  NxToggleButtonComponent,
  NxToggleButtonGroupComponent,
} from '@allianz/ng-aquila/toggle-button';
import { Component, signal } from '@angular/core';

/**
 * @title Toggle Button Layout Example
 */
@Component({
  selector: 'toggle-button-layout-example',
  templateUrl: './toggle-button-layout-example.html',
  styleUrls: ['./toggle-button-layout-example.css'],
  imports: [
    NxToggleButtonGroupComponent,
    NxToggleButtonComponent,
    NxLabelComponent,
  ],
})
export class ToggleButtonLayoutExampleComponent {
  countries = [
    { value: 'de', label: 'Germany' },
    { value: 'at', label: 'Austria' },
    { value: 'ch', label: 'Switzerland' },
    { value: 'it', label: 'Italy' },
    { value: 'fr', label: 'France' },
    { value: 'lu', label: 'Luxembourg' },
  ];
  hugging = signal('de');
  equal = signal('de');
  custom = signal('de');
}
