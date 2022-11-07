import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NxTableModule } from '@aposin/ng-aquila/table';

import { UtilsTypeGuardsExampleComponent } from './utils-type-guards/utils-type-guards-example';

const EXAMPLES = [UtilsTypeGuardsExampleComponent];

@NgModule({
    imports: [CommonModule, NxTableModule],
    declarations: [EXAMPLES],
    exports: [EXAMPLES],
})
export class UtilsExamplesModule {
    static components() {
        return {
            'utils-type-guards': UtilsTypeGuardsExampleComponent,
        };
    }
}
