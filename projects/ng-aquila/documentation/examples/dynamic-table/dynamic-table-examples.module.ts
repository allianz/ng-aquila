import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgModule } from '@angular/core';
import { NxCheckboxModule } from '@aposin/ng-aquila/checkbox';
import { NxContextMenuModule } from '@aposin/ng-aquila/context-menu';
import { NxDynamicTableModule } from '@aposin/ng-aquila/dynamic-table';
import { NxIconModule } from '@aposin/ng-aquila/icon';
import { NxModalModule } from '@aposin/ng-aquila/modal';

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
        DragDropModule,
        ExamplesSharedModule,
    ],
    declarations: [EXAMPLES],
    exports: [EXAMPLES],
})
export class DynamicExamplesModule {
    static components() {
        return {
            'dynamic-table': DynamicTableExampleComponent,
            'dynamic-table-data': DynamicTableDataExampleComponent,
            'dynamic-table-event': DynamicTableEventExampleComponent,
            'dynamic-table-without-data':
                DynamicTableWithoutDataExampleComponent,
            'dynamic-table-column-options':
                DynamicTableColumnOptionsExampleComponent,
        };
    }
}
