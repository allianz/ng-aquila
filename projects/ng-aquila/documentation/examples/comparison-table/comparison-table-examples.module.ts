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
import { ComparisonTableDisabledColumnsExampleComponent } from './comparison-table-disabled-columns/comparison-table-disabled-columns-example';
import { ComparisonTableDynamicExampleComponent } from './comparison-table-dynamic/comparison-table-dynamic-example';
import { ComparisonTableErrorExampleComponent } from './comparison-table-error/comparison-table-error-example';
import { ComparisonTableExpandableAreaExampleComponent } from './comparison-table-expandable-area/comparison-table-expandable-area-example';
import { ComparisonTableFormElementsExampleComponent } from './comparison-table-form-elements/comparison-table-form-elements-example';
import { ComparisonTableHiddenColumnsExampleComponent } from './comparison-table-hidden-columns/comparison-table-hidden-columns-example';
import { ComparisonTableNonStickyHeaderExampleComponent } from './comparison-table-non-sticky-header/comparison-table-non-sticky-header-example';
import { ComparisonTableRowGroupExampleComponent } from './comparison-table-row-group/comparison-table-row-group-example';
import { ComparisonTableStaticExampleComponent } from './comparison-table-static/comparison-table-static-example';
import { ComparisonTableWithIntersectionExampleComponent } from './comparison-table-with-intersection/comparison-table-with-intersection-example';
import { ComparisonTableWithToggleSectionsExampleComponent } from './comparison-table-with-toggle-sections/comparison-table-with-toggle-sections-example';
import { RecommendationTableExampleComponent } from './recommendation-table/recommendation-table-example';
import { RecommendationTableExpertExampleComponent } from './recommendation-table-expert/recommendation-table-expert-example';

const EXAMPLES = [
  ComparisonTableErrorExampleComponent,
  ComparisonTableExampleComponent,
  ComparisonTableStaticExampleComponent,
  ComparisonTableDisabledColumnsExampleComponent,
  ComparisonTableDynamicExampleComponent,
  ComparisonTableFormElementsExampleComponent,
  ComparisonTableRowGroupExampleComponent,
  ComparisonTableWithIntersectionExampleComponent,
  ComparisonTableWithToggleSectionsExampleComponent,
  ComparisonTableExpandableAreaExampleComponent,
  ComparisonTableHiddenColumnsExampleComponent,
  ComparisonTableNonStickyHeaderExampleComponent,
  BreakdownTableExampleComponent,
  BreakdownTableExpertExampleComponent,
  RecommendationTableExampleComponent,
  RecommendationTableExpertExampleComponent,
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
      'comparison-table-error': ComparisonTableErrorExampleComponent,
      'comparison-table': ComparisonTableExampleComponent,
      'comparison-table-static': ComparisonTableStaticExampleComponent,
      'comparison-table-disabled-columns':
        ComparisonTableDisabledColumnsExampleComponent,
      'comparison-table-dynamic': ComparisonTableDynamicExampleComponent,
      'comparison-table-form-elements':
        ComparisonTableFormElementsExampleComponent,
      'comparison-table-row-group': ComparisonTableRowGroupExampleComponent,
      'comparison-table-with-intersection':
        ComparisonTableWithIntersectionExampleComponent,
      'comparison-table-with-toggle-sections':
        ComparisonTableWithToggleSectionsExampleComponent,
      'comparison-table-expandable-area':
        ComparisonTableExpandableAreaExampleComponent,
      'comparison-table-hidden-columns':
        ComparisonTableHiddenColumnsExampleComponent,
      'comparison-table-non-sticky-header':
        ComparisonTableNonStickyHeaderExampleComponent,
      'breakdown-table': BreakdownTableExampleComponent,
      'breakdown-table-expert': BreakdownTableExpertExampleComponent,
      'recommendation-table': RecommendationTableExampleComponent,
      'recommendation-table-expert': RecommendationTableExpertExampleComponent,
    };
  }
}
