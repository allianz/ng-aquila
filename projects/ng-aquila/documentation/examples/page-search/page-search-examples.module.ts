import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NxAutocompleteModule } from '@aposin/ng-aquila/autocomplete';
import { NxIconModule } from '@aposin/ng-aquila/icon';
import { NxInputModule } from '@aposin/ng-aquila/input';
import { NxPageSearchModule } from '@aposin/ng-aquila/page-search';

import { ExamplesSharedModule } from '../examples-shared.module';
import { PageSearchAutocompleteExampleComponent } from './page-search-autocomplete/page-search-autocomplete-example';
import { PageSearchClickExampleComponent } from './page-search-click/page-search-click-example';
import { PageSearchHiddenExampleComponent } from './page-search-hidden/page-search-hidden-example';
import { PageSearchInputExampleComponent } from './page-search-input/page-search-input-example';

const EXAMPLES = [
    PageSearchAutocompleteExampleComponent,
    PageSearchClickExampleComponent,
    PageSearchHiddenExampleComponent,
    PageSearchInputExampleComponent,
];

@NgModule({
    imports: [
        NxPageSearchModule,
        NxInputModule,
        NxAutocompleteModule,
        NxIconModule,
        ExamplesSharedModule,
        HttpClientJsonpModule,
        HttpClientModule,
    ],
    declarations: [EXAMPLES],
    exports: [EXAMPLES],
})
export class PageExamplesModule {
    static components() {
        return {
            'page-search-autocomplete': PageSearchAutocompleteExampleComponent,
            'page-search-click': PageSearchClickExampleComponent,
            'page-search-hidden': PageSearchHiddenExampleComponent,
            'page-search-input': PageSearchInputExampleComponent,
        };
    }
}
