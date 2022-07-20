import { NgModule } from '@angular/core';
import { NxAccordionModule } from '@aposin/ng-aquila/accordion';
import { NxComparisonTableModule } from '@aposin/ng-aquila/comparison-table';
import { NxContextMenuModule } from '@aposin/ng-aquila/context-menu';
import { NxDropdownModule } from '@aposin/ng-aquila/dropdown';
import { NxFormfieldModule } from '@aposin/ng-aquila/formfield';
import { NxIconModule } from '@aposin/ng-aquila/icon';
import { NxListModule } from '@aposin/ng-aquila/list';
import { NxPopoverModule } from '@aposin/ng-aquila/popover';
import { NxRadioToggleModule } from '@aposin/ng-aquila/radio-toggle';
import { NxSpinnerModule } from '@aposin/ng-aquila/spinner';
import { NxSwipebarModule } from '@aposin/ng-aquila/swipebar';

import { ExamplesSharedModule } from '../examples-shared.module';
import { ComparisonTableExampleComponent } from './comparison-table/comparison-table-example';
import { ComparisonTableDisabledColumnsExampleComponent } from './comparison-table-disabled-columns/comparison-table-disabled-columns-example';
import { ComparisonTableDynamicExampleComponent } from './comparison-table-dynamic/comparison-table-dynamic-example';
import { ComparisonTableExpandableAreaExampleComponent } from './comparison-table-expandable-area/comparison-table-expandable-area-example';
import { ComparisonTableFormElementsExampleComponent } from './comparison-table-form-elements/comparison-table-form-elements-example';
import { ComparisonTableHiddenColumnsExampleComponent } from './comparison-table-hidden-columns/comparison-table-hidden-columns-example';
import { ComparisonTableNonStickyHeaderExampleComponent } from './comparison-table-non-sticky-header/comparison-table-non-sticky-header-example';
import { ComparisonTableRowGroupExampleComponent } from './comparison-table-row-group/comparison-table-row-group-example';
import { ComparisonTableWithIntersectionExampleComponent } from './comparison-table-with-intersection/comparison-table-with-intersection-example';
import { ComparisonTableWithToggleSectionsExampleComponent } from './comparison-table-with-toggle-sections/comparison-table-with-toggle-sections-example';

const EXAMPLES = [
    ComparisonTableExampleComponent,
    ComparisonTableDisabledColumnsExampleComponent,
    ComparisonTableDynamicExampleComponent,
    ComparisonTableFormElementsExampleComponent,
    ComparisonTableRowGroupExampleComponent,
    ComparisonTableWithIntersectionExampleComponent,
    ComparisonTableWithToggleSectionsExampleComponent,
    ComparisonTableExpandableAreaExampleComponent,
    ComparisonTableHiddenColumnsExampleComponent,
    ComparisonTableNonStickyHeaderExampleComponent,
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
        NxAccordionModule,
        NxContextMenuModule,
        NxSpinnerModule,
        NxSwipebarModule,
    ],
    declarations: [EXAMPLES],
    exports: [EXAMPLES],
})
export class ComparisonExamplesModule {
    static components() {
        return {
            'comparison-table': ComparisonTableExampleComponent,
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
        };
    }
}
