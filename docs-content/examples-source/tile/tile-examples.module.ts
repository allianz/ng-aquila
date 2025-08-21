import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TileGroupAutoGridExampleComponent } from './tile-group-auto-grid/tile-group-auto-grid-example';
import { TileGroupCustomGridExampleComponent } from './tile-group-custom-grid/tile-group-custom-grid-example';
import { TileGroupMultiSelectExampleComponent } from './tile-group-multi-select/tile-group-multi-select-example';
import { TileGroupSingleSelectExampleComponent } from './tile-group-single-select/tile-group-single-select-example';
import { TileLayoutsExampleComponent } from './tile-layouts/tile-layouts-example';
import { TileReactiveFormsExampleComponent } from './tile-reactive-forms/tile-reactive-forms-example';
import { TileReadonlyDisabledExampleComponent } from './tile-readonly-disabled/tile-readonly-disabled-example';
import { TileTemplateDrivenExampleComponent } from './tile-template-driven/tile-template-driven-example';
import { TileValidationErrorStateExample } from './tile-validation-error-state/tile-validation-error-state-example';

const EXAMPLES = [
  TileGroupMultiSelectExampleComponent,
  TileGroupSingleSelectExampleComponent,
  TileLayoutsExampleComponent,
  TileReadonlyDisabledExampleComponent,
  TileTemplateDrivenExampleComponent,
  TileReactiveFormsExampleComponent,
  TileValidationErrorStateExample,
  TileGroupAutoGridExampleComponent,
  TileGroupCustomGridExampleComponent,
];

@NgModule({
  imports: [CommonModule, ...EXAMPLES],
  exports: [...EXAMPLES],
})
export class TileExamplesModule {
  static components() {
    return {
      'tile-group-multi-select': TileGroupMultiSelectExampleComponent,
      'tile-group-single-select': TileGroupSingleSelectExampleComponent,
      'tile-layouts': TileLayoutsExampleComponent,
      'tile-readonly-disabled': TileReadonlyDisabledExampleComponent,
      'tile-template-driven': TileTemplateDrivenExampleComponent,
      'tile-reactive-forms': TileReactiveFormsExampleComponent,
      'tile-validation-error-state': TileValidationErrorStateExample,
      'tile-group-auto-grid': TileGroupAutoGridExampleComponent,
      'tile-group-custom-grid': TileGroupCustomGridExampleComponent,
    };
  }
}
