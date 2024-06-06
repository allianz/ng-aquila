import { NgModule } from '@angular/core';
import { NxDataDisplayModule } from '@aposin/ng-aquila/data-display';
import { NxSpinnerModule } from '@aposin/ng-aquila/spinner';
import { NxSwitcherModule } from '@aposin/ng-aquila/switcher';

import { ExamplesSharedModule } from '../examples-shared.module';
import { SpinnerAriaAnnouncementExampleComponent } from './spinner-aria-announcement/spinner-aria-announcement-example';
import { SpinnerNegativeExampleComponent } from './spinner-negative/spinner-negative-example';
import { SpinnerSizesExampleComponent } from './spinner-sizes/spinner-sizes-example';

const EXAMPLES = [
    SpinnerNegativeExampleComponent,
    SpinnerSizesExampleComponent,
    SpinnerAriaAnnouncementExampleComponent,
];

@NgModule({
    imports: [
        NxSpinnerModule,
        NxDataDisplayModule,
        NxSwitcherModule,
        ExamplesSharedModule,
    ],
    declarations: [EXAMPLES],
    exports: [EXAMPLES],
})
export class SpinnerExamplesModule {
    static components() {
        return {
            'spinner-negative': SpinnerNegativeExampleComponent,
            'spinner-sizes': SpinnerSizesExampleComponent,
            'spinner-aria-announcement':
                SpinnerAriaAnnouncementExampleComponent,
        };
    }
}
