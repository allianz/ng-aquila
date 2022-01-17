import { NgModule } from '@angular/core';
import { NxDynamicTableModule } from '@aposin/ng-aquila/dynamic-table';
import { NxModalModule } from '@aposin/ng-aquila/modal';
import { ExamplesSharedModule } from '../examples-shared.module';
import { DynamicTableDataExampleComponent } from './dynamic-table-data/dynamic-table-data-example';
import { DynamicTableEventExampleComponent } from './dynamic-table-event/dynamic-table-event-example';
import { DynamicTableWithoutDataExampleComponent } from './dynamic-table-without-data/dynamic-table-without-data-example';
import { DynamicTableExampleComponent } from './dynamic-table/dynamic-table-example';

const EXAMPLES = [
    DynamicTableExampleComponent,
    DynamicTableDataExampleComponent,
    DynamicTableEventExampleComponent,
    DynamicTableWithoutDataExampleComponent,
];

@NgModule({
    imports: [
        NxDynamicTableModule,
        NxModalModule.forRoot(),
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
        };
    }
}
