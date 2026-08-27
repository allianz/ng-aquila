import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ToggleButtonBasicExampleComponent } from './toggle-button-basic/toggle-button-basic-example';
import { ToggleButtonErrorStateExampleComponent } from './toggle-button-error-state/toggle-button-error-state-example';
import { ToggleButtonLayoutExampleComponent } from './toggle-button-layout/toggle-button-layout-example';
import { ToggleButtonNegativeExampleComponent } from './toggle-button-negative/toggle-button-negative-example';
import { ToggleButtonReactiveFormsExampleComponent } from './toggle-button-reactive-forms/toggle-button-reactive-forms-example';
import { ToggleButtonReadonlyDisabledExampleComponent } from './toggle-button-readonly-disabled/toggle-button-readonly-disabled-example';
import { ToggleButtonSignalFormsExampleComponent } from './toggle-button-signal-forms/toggle-button-signal-forms-example';
import { ToggleButtonTemplateDrivenExampleComponent } from './toggle-button-template-driven/toggle-button-template-driven-example';
import { ToggleButtonValidationErrorStateExampleComponent } from './toggle-button-validation-error-state/toggle-button-validation-error-state-example';

const EXAMPLES = [
  ToggleButtonBasicExampleComponent,
  ToggleButtonLayoutExampleComponent,
  ToggleButtonReadonlyDisabledExampleComponent,
  ToggleButtonNegativeExampleComponent,
  ToggleButtonSignalFormsExampleComponent,
  ToggleButtonTemplateDrivenExampleComponent,
  ToggleButtonReactiveFormsExampleComponent,
  ToggleButtonErrorStateExampleComponent,
  ToggleButtonValidationErrorStateExampleComponent,
];

@NgModule({
  imports: [CommonModule, ...EXAMPLES],
  exports: [...EXAMPLES],
})
export class ToggleButtonExamplesModule {
  static components() {
    return {
      'toggle-button-basic': ToggleButtonBasicExampleComponent,
      'toggle-button-layout': ToggleButtonLayoutExampleComponent,
      'toggle-button-readonly-disabled':
        ToggleButtonReadonlyDisabledExampleComponent,
      'toggle-button-negative': ToggleButtonNegativeExampleComponent,
      'toggle-button-signal-forms': ToggleButtonSignalFormsExampleComponent,
      'toggle-button-template-driven':
        ToggleButtonTemplateDrivenExampleComponent,
      'toggle-button-reactive-forms': ToggleButtonReactiveFormsExampleComponent,
      'toggle-button-error-state': ToggleButtonErrorStateExampleComponent,
      'toggle-button-validation-error-state':
        ToggleButtonValidationErrorStateExampleComponent,
    };
  }
}
