import { NgModule } from '@angular/core';
import { NxProgressbarModule } from '@aposin/ng-aquila/progressbar';

import { ProgressbarExampleComponent } from './progressbar/progressbar-example';
import { ProgressbarBasicExampleComponent } from './progressbar-basic/progressbar-basic-example';
import { ProgressbarCustomRangeExampleComponent } from './progressbar-custom-range/progressbar-custom-range-example';

const EXAMPLES = [
    ProgressbarExampleComponent,
    ProgressbarBasicExampleComponent,
    ProgressbarCustomRangeExampleComponent,
];

@NgModule({
    imports: [NxProgressbarModule, EXAMPLES],
    exports: [EXAMPLES],
})
export class ProgressbarExamplesModule {
    static components() {
        return {
            progressbar: ProgressbarExampleComponent,
            'progressbar-basic': ProgressbarBasicExampleComponent,
            'progressbar-custom-range': ProgressbarCustomRangeExampleComponent,
        };
    }
}
