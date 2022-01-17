import { NgModule } from '@angular/core';
import { NxProgressbarModule } from '@aposin/ng-aquila/progressbar';
import { ProgressbarBasicExampleComponent } from './progressbar-basic/progressbar-basic-example';
import { ProgressbarExampleComponent } from './progressbar/progressbar-example';

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
