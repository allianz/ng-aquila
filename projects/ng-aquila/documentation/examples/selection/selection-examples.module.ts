import {
  NxCheckboxIndicatorComponent,
  NxRadioIndicatorComponent,
} from '@allianz/ng-aquila/selection';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SelectionIndicatorDefaultExampleComponent } from './selection-indicator-default/selection-indicator-default-example';
import { SelectionIndicatorInverseExampleComponent } from './selection-indicator-inverse/selection-indicator-inverse-example';
import { SelectionIndicatorOnSelectionExampleComponent } from './selection-indicator-on-selection/selection-indicator-on-selection-example';

const EXAMPLES = [
  SelectionIndicatorDefaultExampleComponent,
  SelectionIndicatorInverseExampleComponent,
  SelectionIndicatorOnSelectionExampleComponent,
];

@NgModule({
  imports: [
    CommonModule,
    NxCheckboxIndicatorComponent,
    NxRadioIndicatorComponent,
    EXAMPLES,
  ],
  exports: [EXAMPLES],
})
export class SelectionExamplesModule {
  static components() {
    return {
      'selection-indicator-default': SelectionIndicatorDefaultExampleComponent,
      'selection-indicator-inverse': SelectionIndicatorInverseExampleComponent,
      'selection-indicator-on-selection':
        SelectionIndicatorOnSelectionExampleComponent,
    };
  }
}
