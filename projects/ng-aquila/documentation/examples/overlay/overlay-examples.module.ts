import { NxOverlayModule } from '@allianz/ng-aquila/overlay';
import { NgModule } from '@angular/core';

import { ExamplesSharedModule } from '../examples-shared.module';
import { OverlayLimitingFallbacksExampleComponent } from './overlay-limiting-fallbacks/overlay-limiting-fallbacks-example';
import { OverlayPositioningExampleComponent } from './overlay-positioning/overlay-positioning-example';

const EXAMPLES = [
    OverlayLimitingFallbacksExampleComponent,
    OverlayPositioningExampleComponent,
];

@NgModule({
    imports: [NxOverlayModule, ExamplesSharedModule],
    declarations: [EXAMPLES],
    exports: [EXAMPLES],
})
export class OverlayExamplesModule {
    static components() {
        return {
            'overlay-limiting-fallbacks':
                OverlayLimitingFallbacksExampleComponent,
            'overlay-positioning': OverlayPositioningExampleComponent,
        };
    }
}
