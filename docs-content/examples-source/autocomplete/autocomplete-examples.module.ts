import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NxAutocompleteModule } from '@aposin/ng-aquila/autocomplete';
import { NxInputModule } from '@aposin/ng-aquila/input';
import { NxNaturalLanguageFormModule } from '@aposin/ng-aquila/natural-language-form';

import { ExamplesSharedModule } from './../examples-shared.module';
import { AutocompleteBasicExampleComponent } from './autocomplete-basic/autocomplete-basic-example';
import { AutocompleteDataBindingExampleComponent } from './autocomplete-data-binding/autocomplete-data-binding-example';
import { AutocompleteDefaultRenderingExampleComponent } from './autocomplete-default-rendering/autocomplete-default-rendering-example';
import { AutocompleteFilteringExampleComponent } from './autocomplete-filtering/autocomplete-filtering-example';
import { AutocompleteOutlineExampleComponent } from './autocomplete-outline/autocomplete-outline-example';
import { AutocompleteScrollStrategyProviderExampleComponent } from './autocomplete-scroll-strategy-provider/autocomplete-scroll-strategy-provider-example';

const EXAMPLES = [
    AutocompleteBasicExampleComponent,
    AutocompleteDataBindingExampleComponent,
    AutocompleteDefaultRenderingExampleComponent,
    AutocompleteFilteringExampleComponent,
    AutocompleteOutlineExampleComponent,
    AutocompleteScrollStrategyProviderExampleComponent,
];

@NgModule({
    imports: [
        NxAutocompleteModule,
        NxInputModule,
        NxNaturalLanguageFormModule,
        ExamplesSharedModule,
        HttpClientJsonpModule,
        HttpClientModule,
    ],
    declarations: [EXAMPLES],
    exports: [EXAMPLES],
})
export class AutocompleteExamplesModule {
    static components() {
        return {
            'autocomplete-basic': AutocompleteBasicExampleComponent,
            'autocomplete-data-binding':
                AutocompleteDataBindingExampleComponent,
            'autocomplete-default-rendering':
                AutocompleteDefaultRenderingExampleComponent,
            'autocomplete-filtering': AutocompleteFilteringExampleComponent,
            'autocomplete-outline': AutocompleteOutlineExampleComponent,
            'autocomplete-scroll-strategy-provider':
                AutocompleteScrollStrategyProviderExampleComponent,
        };
    }
}
