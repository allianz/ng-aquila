import {
  NxCheckboxIndicatorComponent,
  NxRadioIndicatorComponent,
} from '@allianz/ng-aquila/selection';
import { Component } from '@angular/core';

/**
 * @title Selection Indicator Default Appearance
 */
@Component({
  selector: 'selection-indicator-default-example',
  templateUrl: './selection-indicator-default-example.html',
  styleUrls: ['./selection-indicator-default-example.css'],
  standalone: true,
  imports: [NxCheckboxIndicatorComponent, NxRadioIndicatorComponent],
})
export class SelectionIndicatorDefaultExampleComponent {}
