import { NgModule } from '@angular/core';
import { NxCopytextModule } from '@aposin/ng-aquila/copytext';

import { CopytextNegativeExampleComponent } from './copytext-negative/copytext-negative-example';
import { CopytextSizesExampleComponent } from './copytext-sizes/copytext-sizes-example';

const EXAMPLES = [
    CopytextNegativeExampleComponent,
    CopytextSizesExampleComponent,
];

@NgModule({
    imports: [NxCopytextModule],
    declarations: [EXAMPLES],
    exports: [EXAMPLES],
})
export class CopytextExamplesModule {
    static components() {
        return {
            'copytext-negative': CopytextNegativeExampleComponent,
            'copytext-sizes': CopytextSizesExampleComponent,
        };
    }
}
