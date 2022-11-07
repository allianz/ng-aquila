import { NgModule } from '@angular/core';
import { NxSpinnerModule } from '@aposin/ng-aquila/spinner';

import { SpinnerNegativeExampleComponent } from './spinner-negative/spinner-negative-example';
import { SpinnerSizesExampleComponent } from './spinner-sizes/spinner-sizes-example';

const EXAMPLES = [
    SpinnerNegativeExampleComponent,
    SpinnerSizesExampleComponent,
];

@NgModule({
    imports: [NxSpinnerModule],
    declarations: [EXAMPLES],
    exports: [EXAMPLES],
})
export class SpinnerExamplesModule {
    static components() {
        return {
            'spinner-negative': SpinnerNegativeExampleComponent,
            'spinner-sizes': SpinnerSizesExampleComponent,
        };
    }
}
