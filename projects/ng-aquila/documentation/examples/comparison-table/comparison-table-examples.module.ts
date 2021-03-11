import { NxAccordionModule } from '@aposin/ng-aquila/accordion';
import { NxListModule } from '@aposin/ng-aquila/list';
import { NxFormfieldModule } from '@aposin/ng-aquila/formfield';
import { NxDropdownModule } from '@aposin/ng-aquila/dropdown';
import { NxRadioToggleModule } from '@aposin/ng-aquila/radio-toggle';
import { NxPopoverModule } from '@aposin/ng-aquila/popover';
import { NxIconModule } from '@aposin/ng-aquila/icon';
import { NxComparisonTableModule } from '@aposin/ng-aquila/comparison-table';

import { NgModule } from '@angular/core';
import { ComparisonTableExampleComponent } from './comparison-table/comparison-table-example';
import { ComparisonTableDisabledColumnsExampleComponent } from './comparison-table-disabled-columns/comparison-table-disabled-columns-example';
import { ComparisonTableDynamicExampleComponent } from './comparison-table-dynamic/comparison-table-dynamic-example';
import { ComparisonTableFormElementsExampleComponent } from './comparison-table-form-elements/comparison-table-form-elements-example';
import { ComparisonTableModifyThemingExampleComponent } from './comparison-table-modify-theming/comparison-table-modify-theming-example';
import { ComparisonTableRowGroupExampleComponent } from './comparison-table-row-group/comparison-table-row-group-example';
import { ComparisonTableWithIntersectionExampleComponent } from './comparison-table-with-intersection/comparison-table-with-intersection-example';
import { ComparisonTableWithToggleSectionsExampleComponent } from './comparison-table-with-toggle-sections/comparison-table-with-toggle-sections-example';
import { ComparisonTableExpandableAreaExampleComponent } from './comparison-table-expandable-area/comparison-table-expandable-area-example';
import { ExamplesSharedModule } from '../examples-shared.module';

const EXAMPLES = [
  ComparisonTableExampleComponent,
  ComparisonTableDisabledColumnsExampleComponent,
  ComparisonTableDynamicExampleComponent,
  ComparisonTableFormElementsExampleComponent,
  ComparisonTableModifyThemingExampleComponent,
  ComparisonTableRowGroupExampleComponent,
  ComparisonTableWithIntersectionExampleComponent,
  ComparisonTableWithToggleSectionsExampleComponent,
  ComparisonTableExpandableAreaExampleComponent
];

 @NgModule({
  imports: [
    NxComparisonTableModule,
    NxIconModule,
    NxPopoverModule,
    NxRadioToggleModule,
    NxDropdownModule,
    NxFormfieldModule,
    NxListModule,
    ExamplesSharedModule,
    NxAccordionModule
  ],
  declarations: [EXAMPLES],
  exports: [EXAMPLES]
})
export class ComparisonExamplesModule {
  static components() {
    return {
      'comparison-table': ComparisonTableExampleComponent,
      'comparison-table-disabled-columns': ComparisonTableDisabledColumnsExampleComponent,
      'comparison-table-dynamic': ComparisonTableDynamicExampleComponent,
      'comparison-table-form-elements': ComparisonTableFormElementsExampleComponent,
      'comparison-table-modify-theming': ComparisonTableModifyThemingExampleComponent,
      'comparison-table-row-group': ComparisonTableRowGroupExampleComponent,
      'comparison-table-with-intersection': ComparisonTableWithIntersectionExampleComponent,
      'comparison-table-with-toggle-sections': ComparisonTableWithToggleSectionsExampleComponent,
      'comparison-table-expandable-area': ComparisonTableExpandableAreaExampleComponent
    };
  }
}
