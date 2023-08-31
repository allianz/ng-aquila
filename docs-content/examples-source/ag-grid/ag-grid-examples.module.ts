import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NxButtonModule } from '@aposin/ng-aquila/button';
import { AgGridModule } from 'ag-grid-angular';

import { AgGridExampleComponent } from './ag-grid/ag-grid-example';
import { AgGridOpensourceExampleComponent } from './ag-grid-opensource/ag-grid-opensource-example';

const EXAMPLES = [AgGridExampleComponent, AgGridOpensourceExampleComponent];

@NgModule({
    imports: [AgGridModule, CommonModule, HttpClientModule, NxButtonModule],
    declarations: [EXAMPLES],
    exports: [EXAMPLES],
})
export class HeadlineExamplesModule {
    static components() {
        return {
            'ag-grid': AgGridExampleComponent,
            'ag-grid-opensource': AgGridOpensourceExampleComponent,
        };
    }
}
