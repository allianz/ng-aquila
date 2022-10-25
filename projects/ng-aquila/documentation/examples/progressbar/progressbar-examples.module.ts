import { NgModule } from '@angular/core';
import { NxProgressbarModule } from '@aposin/ng-aquila/progressbar';

import { ProgressbarExampleComponent } from './progressbar/progressbar-example';
import { ProgressbarBasicExampleComponent } from './progressbar-basic/progressbar-basic-example';

const EXAMPLES = [
    ProgressbarExampleComponent,
    ProgressbarBasicExampleComponent,
];

@NgModule({
    imports: [NxProgressbarModule],
    declarations: [EXAMPLES],
    exports: [EXAMPLES],
})
export class ProgressbarExamplesModule {
    static components() {
        return {
            progressbar: ProgressbarExampleComponent,
            'progressbar-basic': ProgressbarBasicExampleComponent,
        };
    }
}
