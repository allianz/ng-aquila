import { CommonModule } from '@angular/common';
import {
    provideHttpClient,
    withInterceptorsFromDi,
} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NxButtonModule } from '@aposin/ng-aquila/button';
import { AgGridModule } from 'ag-grid-angular';

import { AgGridExampleComponent } from './ag-grid/ag-grid-example';
import { AgGridOpensourceExampleComponent } from './ag-grid-opensource/ag-grid-opensource-example';
import { AgGridOpensourceThemingAPIExampleComponent } from './ag-grid-opensource-theming-api/ag-grid-opensource-theming-api-example';
import { AgGridThemingAPIExampleComponent } from './ag-grid-theming-api/ag-grid-theming-api-example';

const EXAMPLES = [
    AgGridExampleComponent,
    AgGridThemingAPIExampleComponent,
    AgGridOpensourceExampleComponent,
    AgGridOpensourceThemingAPIExampleComponent,
];

@NgModule({
    imports: [AgGridModule, CommonModule, NxButtonModule, EXAMPLES],
    exports: [EXAMPLES],
    providers: [provideHttpClient(withInterceptorsFromDi())],
})
export class HeadlineExamplesModule {
    constructor() {}
    static components() {
        return {
            'ag-grid': AgGridExampleComponent,
            'ag-grid-theming-api': AgGridThemingAPIExampleComponent,
            'ag-grid-opensource-theming-api':
                AgGridOpensourceThemingAPIExampleComponent,
            'ag-grid-opensource': AgGridOpensourceExampleComponent,
        };
    }
}
