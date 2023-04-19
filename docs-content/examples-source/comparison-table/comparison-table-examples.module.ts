import { NgModule } from '@angular/core';
import { NxAccordionModule } from '@aposin/ng-aquila/accordion';
import { NxCheckboxModule } from '@aposin/ng-aquila/checkbox';
import { NxComparisonTableModule } from '@aposin/ng-aquila/comparison-table';
import { NxContextMenuModule } from '@aposin/ng-aquila/context-menu';
import { NxDataDisplayModule } from '@aposin/ng-aquila/data-display';
import { NxDropdownModule } from '@aposin/ng-aquila/dropdown';
import { NxFormfieldModule } from '@aposin/ng-aquila/formfield';
import { NxIconModule } from '@aposin/ng-aquila/icon';
import { NxInputModule } from '@aposin/ng-aquila/input';
import { NxListModule } from '@aposin/ng-aquila/list';
import { NxPopoverModule } from '@aposin/ng-aquila/popover';
import { NxRadioToggleModule } from '@aposin/ng-aquila/radio-toggle';
import { NxSpinnerModule } from '@aposin/ng-aquila/spinner';
import { NxSwipebarModule } from '@aposin/ng-aquila/swipebar';

import { ExamplesSharedModule } from '../examples-shared.module';
import { BreakdownTableExampleComponent } from './breakdown-table/breakdown-table-example';
import { BreakdownTableExpertExampleComponent } from './breakdown-table-expert/breakdown-table-expert-example';
import { ComparisonTableExampleComponent } from './comparison-table/comparison-table-example';
import { ComparisonTableDisabledColumnsExampleComponent } from './comparison-table-disabled-columns/comparison-table-disabled-columns-example';
import { ComparisonTableDynamicExampleComponent } from './comparison-table-dynamic/comparison-table-dynamic-example';
import { ComparisonTableErrorExample } from './comparison-table-error/comparison-table-error-example';
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
    ComparisonTableErrorExample,
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
        NxSwipebarModule,
        ExamplesSharedModule,
    ],
    declarations: [EXAMPLES],
    exports: [EXAMPLES],
})
export class ComparisonExamplesModule {
    static components() {
        return {
            'comparison-table-error': ComparisonTableErrorExample,
            'comparison-table': ComparisonTableExampleComponent,
            'comparison-table-static': ComparisonTableStaticExampleComponent,
            'comparison-table-disabled-columns':
                ComparisonTableDisabledColumnsExampleComponent,
            'comparison-table-dynamic': ComparisonTableDynamicExampleComponent,
            'comparison-table-form-elements':
                ComparisonTableFormElementsExampleComponent,
            'comparison-table-row-group':
                ComparisonTableRowGroupExampleComponent,
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
            'recommendation-table-expert':
                RecommendationTableExpertExampleComponent,
        };
    }
}
