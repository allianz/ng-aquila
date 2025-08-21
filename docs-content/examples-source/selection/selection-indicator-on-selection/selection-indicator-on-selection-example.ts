import {
  NxCheckboxIndicatorComponent,
  NxRadioIndicatorComponent,
} from '@allianz/ng-aquila/selection';
import { Component } from '@angular/core';

/**
 * @title Selection Indicator On-selection Appearance
 */
@Component({
  selector: 'selection-indicator-on-selection-example',
  templateUrl: './selection-indicator-on-selection-example.html',
  styleUrls: ['./selection-indicator-on-selection-example.css'],
  standalone: true,
  imports: [NxCheckboxIndicatorComponent, NxRadioIndicatorComponent],
})
export class SelectionIndicatorOnSelectionExampleComponent {}
