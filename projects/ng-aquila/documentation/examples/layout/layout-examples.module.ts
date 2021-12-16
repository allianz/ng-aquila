import { CommonModule } from '@angular/common';
import { NxTableModule } from '@aposin/ng-aquila/table';

import { NgModule } from '@angular/core';
import { MarginSizesExampleComponent } from './margin-sizes/margin-sizes-example';
import { MarginUsageExampleComponent } from './margin-usage/margin-usage-example';
import { HiddenClassesExampleComponent } from './hidden-classes/hidden-classes-example';

const EXAMPLES = [MarginSizesExampleComponent, MarginUsageExampleComponent, HiddenClassesExampleComponent];

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
