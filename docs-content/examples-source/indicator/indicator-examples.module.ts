import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NxIndicatorModule } from '@aposin/ng-aquila/indicator';

import { IndicatorExampleComponent } from './indicator/indicator-example';

const EXAMPLES = [IndicatorExampleComponent];

@NgModule({
    imports: [NxIndicatorModule, CommonModule],
    declarations: [EXAMPLES],
    exports: [EXAMPLES],
})
export class IndicatorExamplesModule {
    static components() {
        return {
            indicator: IndicatorExampleComponent,
        };
    }
}
