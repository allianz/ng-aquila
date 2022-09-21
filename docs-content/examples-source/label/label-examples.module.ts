import { NxLabelModule } from '@allianz/ng-aquila/base';
import { NgModule } from '@angular/core';

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
