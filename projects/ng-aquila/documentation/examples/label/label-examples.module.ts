import { NgModule } from '@angular/core';
import { NxLabelModule } from '@aposin/ng-aquila/base';

import { LabelExampleComponent } from './label/label-example';

const EXAMPLES = [LabelExampleComponent];

@NgModule({
    imports: [NxLabelModule],
    declarations: [EXAMPLES],
    exports: [EXAMPLES],
})
export class LabelExamplesModule {
    static components() {
        return {
            label: LabelExampleComponent,
        };
    }
}
