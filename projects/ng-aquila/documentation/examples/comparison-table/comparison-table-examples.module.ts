import { NxAccordionModule } from '@allianz/ng-aquila/accordion';
import { NxCheckboxModule } from '@allianz/ng-aquila/checkbox';
import { NxComparisonTableModule } from '@allianz/ng-aquila/comparison-table';
import { NxContextMenuModule } from '@allianz/ng-aquila/context-menu';
import { NxDataDisplayModule } from '@allianz/ng-aquila/data-display';
import { NxDropdownModule } from '@allianz/ng-aquila/dropdown';
import { NxFormfieldModule } from '@allianz/ng-aquila/formfield';
import { NxIconModule } from '@allianz/ng-aquila/icon';
import { NxInputModule } from '@allianz/ng-aquila/input';
import { NxListModule } from '@allianz/ng-aquila/list';
import { NxPopoverModule } from '@allianz/ng-aquila/popover';
import { NxRadioToggleModule } from '@allianz/ng-aquila/radio-toggle';
import { NxSpinnerModule } from '@allianz/ng-aquila/spinner';
import { NgModule } from '@angular/core';

import { ExamplesSharedModule } from '../examples-shared.module';
import { BreakdownTableExampleComponent } from './breakdown-table/breakdown-table-example';
import { BreakdownTableExpertExampleComponent } from './breakdown-table-expert/breakdown-table-expert-example';
import { ComparisonTableExampleComponent } from './comparison-table/comparison-table-example';
import { ComparisonTableBreakpointPlaygroundExampleComponent } from './comparison-table-breakpoint-playground/comparison-table-breakpoint-playground-example';
import { ComparisonTableColumnsExampleComponent } from './comparison-table-columns/comparison-table-columns-example';
import { ComparisonTableDynamicExampleComponent } from './comparison-table-dynamic/comparison-table-dynamic-example';
import { ComparisonTableErrorExampleComponent } from './comparison-table-error/comparison-table-error-example';
import { ComparisonTableExpandableAreaExampleComponent } from './comparison-table-expandable-area/comparison-table-expandable-area-example';
import { ComparisonTableFormElementsExampleComponent } from './comparison-table-form-elements/comparison-table-form-elements-example';
import { ComparisonTableHeaderLegacyExampleComponent } from './comparison-table-header-legacy/comparison-table-header-legacy-example';
import { ComparisonTableNonStickyHeaderExampleComponent } from './comparison-table-non-sticky-header/comparison-table-non-sticky-header-example';
import { ComparisonTableOverflowExampleComponent } from './comparison-table-overflow/comparison-table-overflow-example';
import { ComparisonTableRowsExampleComponent } from './comparison-table-rows/comparison-table-rows-example';
import { ComparisonTableStaticExampleComponent } from './comparison-table-static/comparison-table-static-example';
import { RecommendationTableExampleComponent } from './recommendation-table/recommendation-table-example';
import { RecommendationTableExpertExampleComponent } from './recommendation-table-expert/recommendation-table-expert-example';

const EXAMPLES = [
  ComparisonTableExampleComponent,
  ComparisonTableOverflowExampleComponent,
  ComparisonTableBreakpointPlaygroundExampleComponent,
  ComparisonTableNonStickyHeaderExampleComponent,
  ComparisonTableRowsExampleComponent,
  ComparisonTableExpandableAreaExampleComponent,
  ComparisonTableColumnsExampleComponent,
  ComparisonTableErrorExampleComponent,
  ComparisonTableDynamicExampleComponent,
  ComparisonTableFormElementsExampleComponent,
  BreakdownTableExampleComponent,
  BreakdownTableExpertExampleComponent,
  RecommendationTableExampleComponent,
  RecommendationTableExpertExampleComponent,
  ComparisonTableHeaderLegacyExampleComponent,
  ComparisonTableStaticExampleComponent,
];

@NgModule({
  imports: [
    NxComparisonTableModule,
    NxIconModule,
    NxInputModule,
    NxCheckboxModule,
    NxPopoverModule,
    NxRadioToggleModule,
    NxDropdownModule,
    NxFormfieldModule,
    NxListModule,
    NxAccordionModule,
    NxContextMenuModule,
    NxDataDisplayModule,
    NxSpinnerModule,
    ExamplesSharedModule,
    EXAMPLES,
  ],
  exports: [EXAMPLES],
})
export class ComparisonExamplesModule {
  static components() {
    return {
      'comparison-table': ComparisonTableExampleComponent,
      'comparison-table-overflow': ComparisonTableOverflowExampleComponent,
      'comparison-table-breakpoint-playground':
        ComparisonTableBreakpointPlaygroundExampleComponent,
      'comparison-table-non-sticky-header':
        ComparisonTableNonStickyHeaderExampleComponent,
      'comparison-table-rows': ComparisonTableRowsExampleComponent,
      'comparison-table-expandable-area':
        ComparisonTableExpandableAreaExampleComponent,
      'comparison-table-columns': ComparisonTableColumnsExampleComponent,
      'comparison-table-error': ComparisonTableErrorExampleComponent,
      'comparison-table-dynamic': ComparisonTableDynamicExampleComponent,
      'comparison-table-form-elements':
        ComparisonTableFormElementsExampleComponent,
      'breakdown-table': BreakdownTableExampleComponent,
      'breakdown-table-expert': BreakdownTableExpertExampleComponent,
      'recommendation-table': RecommendationTableExampleComponent,
      'recommendation-table-expert': RecommendationTableExpertExampleComponent,
      'comparison-table-header-legacy':
        ComparisonTableHeaderLegacyExampleComponent,
      'comparison-table-static': ComparisonTableStaticExampleComponent,
    };
  }
}
