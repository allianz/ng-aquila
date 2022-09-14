import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NxTableModule } from '@aposin/ng-aquila/table';

import { HiddenClassesExampleComponent } from './hidden-classes/hidden-classes-example';
import { MarginSizesExampleComponent } from './margin-sizes/margin-sizes-example';
import { MarginUsageExampleComponent } from './margin-usage/margin-usage-example';

const EXAMPLES = [
    MarginSizesExampleComponent,
    MarginUsageExampleComponent,
    HiddenClassesExampleComponent,
];

@NgModule({
    imports: [CommonModule, NxTableModule],
    declarations: [EXAMPLES],
    exports: [EXAMPLES],
})
export class LayoutExamplesModule {
    static components() {
        return {
            'margin-sizes': MarginSizesExampleComponent,
            'hidden-classes': HiddenClassesExampleComponent,
            'margin-usage': MarginUsageExampleComponent,
        };
    }
}
