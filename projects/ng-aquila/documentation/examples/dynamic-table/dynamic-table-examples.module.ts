import { NxCheckboxModule } from '@allianz/ng-aquila/checkbox';
import { NxContextMenuModule } from '@allianz/ng-aquila/context-menu';
import { NxDynamicTableModule } from '@allianz/ng-aquila/dynamic-table';
import { NxIconModule } from '@allianz/ng-aquila/icon';
import { NxModalModule } from '@allianz/ng-aquila/modal';
import { NgModule } from '@angular/core';

import { ExamplesSharedModule } from '../examples-shared.module';
import { DynamicTableExampleComponent } from './dynamic-table/dynamic-table-example';
import { DynamicTableColumnOptionsExampleComponent } from './dynamic-table-column-options/dynamic-table-column-options-example';
import { DynamicTableDataExampleComponent } from './dynamic-table-data/dynamic-table-data-example';
import { DynamicTableEventExampleComponent } from './dynamic-table-event/dynamic-table-event-example';
import { DynamicTableWithoutDataExampleComponent } from './dynamic-table-without-data/dynamic-table-without-data-example';

const EXAMPLES = [
  DynamicTableExampleComponent,
  DynamicTableDataExampleComponent,
  DynamicTableEventExampleComponent,
  DynamicTableWithoutDataExampleComponent,
  DynamicTableColumnOptionsExampleComponent,
];

@NgModule({
  imports: [
    NxDynamicTableModule,
    NxModalModule.forRoot(),
    NxCheckboxModule,
    NxContextMenuModule,
    NxIconModule,
    ExamplesSharedModule,
    EXAMPLES,
  ],
  exports: [EXAMPLES],
})
export class DynamicExamplesModule {
  static components() {
    return {
      'dynamic-table': DynamicTableExampleComponent,
      'dynamic-table-data': DynamicTableDataExampleComponent,
      'dynamic-table-event': DynamicTableEventExampleComponent,
      'dynamic-table-without-data': DynamicTableWithoutDataExampleComponent,
      'dynamic-table-column-options': DynamicTableColumnOptionsExampleComponent,
    };
  }
}
