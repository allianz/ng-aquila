import { NxLabelComponent } from '@allianz/ng-aquila/base';
import {
  NxToggleButtonComponent,
  NxToggleButtonGroupComponent,
} from '@allianz/ng-aquila/toggle-button';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

/**
 * @title Toggle Button Template-driven Forms Example
 */
@Component({
  selector: 'toggle-button-template-driven-example',
  templateUrl: './toggle-button-template-driven-example.html',
  imports: [
    FormsModule,
    NxToggleButtonGroupComponent,
    NxToggleButtonComponent,
    NxLabelComponent,
  ],
})
export class ToggleButtonTemplateDrivenExampleComponent {
  interval = 'monthly';
}
