import { RouterModule } from '@angular/router';
import { NxRadioModule } from '@aposin/ng-aquila/radio-button';
import { NxLinkModule } from '@aposin/ng-aquila/link';
import { NxBadgeModule } from '@aposin/ng-aquila/badge';
import { NxInputModule } from '@aposin/ng-aquila/input';
import { NxPaginationModule } from '@aposin/ng-aquila/pagination';
import { NxCheckboxModule } from '@aposin/ng-aquila/checkbox';
import { NxSwitcherModule } from '@aposin/ng-aquila/switcher';
import { NxTableModule } from '@aposin/ng-aquila/table';
import { NxDropdownModule } from '@aposin/ng-aquila/dropdown';
import { NxDatefieldModule } from '@aposin/ng-aquila/datefield';
import { NxMomentDateModule } from '@aposin/ng-aquila/moment-date-adapter';

import { NgModule } from '@angular/core';
import { TableExampleComponent } from './table/table-example';
import { TableCondensedExampleComponent } from './table-condensed/table-condensed-example';
import { TableExpandableExampleComponent } from './table-expandable/table-expandable-example';
import { TableFilterSortPaginateExampleComponent } from './table-filter-sort-paginate/table-filter-sort-paginate-example';
import { TableSelectingExampleComponent } from './table-selecting/table-selecting-example';
import { TableSingleSelectExampleComponent } from './table-single-select/table-single-select-example';
import { TableSortingExampleComponent } from './table-sorting/table-sorting-example';
import { TableZebraExampleComponent } from './table-zebra/table-zebra-example';
import { ExamplesSharedModule } from '../examples-shared.module';
import { TableFormElementsExampleComponent } from './table-form-elements/table-form-elements-example';
import { NxIconModule } from '@aposin/ng-aquila/icon';

const EXAMPLES = [
  TableExampleComponent,
  TableCondensedExampleComponent,
  TableExpandableExampleComponent,
  TableFilterSortPaginateExampleComponent,
  TableSelectingExampleComponent,
  TableSingleSelectExampleComponent,
  TableSortingExampleComponent,
  TableZebraExampleComponent,
  TableFormElementsExampleComponent
];

 @NgModule({
  imports: [
    NxTableModule,
    NxSwitcherModule,
    NxCheckboxModule,
    NxPaginationModule,
    NxDropdownModule,
    NxDatefieldModule,
    NxMomentDateModule,
    NxInputModule,
    NxBadgeModule,
    NxLinkModule,
    NxRadioModule,
    NxIconModule,
    ExamplesSharedModule,
    RouterModule
  ],
  declarations: [EXAMPLES],
  exports: [EXAMPLES]
})
export class TableExamplesModule {
  static components() {
    return {
      'table': TableExampleComponent,
      'table-condensed': TableCondensedExampleComponent,
      'table-expandable': TableExpandableExampleComponent,
      'table-filter-sort-paginate': TableFilterSortPaginateExampleComponent,
      'table-selecting': TableSelectingExampleComponent,
      'table-single-select': TableSingleSelectExampleComponent,
      'table-sorting': TableSortingExampleComponent,
      'table-zebra': TableZebraExampleComponent,
      'table-form-elements': TableFormElementsExampleComponent
    };
  }
}
