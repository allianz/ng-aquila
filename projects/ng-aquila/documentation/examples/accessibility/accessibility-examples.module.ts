import { NgModule } from '@angular/core';
import { NxGridModule } from '@aposin/ng-aquila/grid';
import { NxMessageModule } from '@aposin/ng-aquila/message';

import { AccessibilityHighContrastSvgExampleComponent } from './accessibility-high-contrast-svg/accessibility-high-contrast-svg-example';

const EXAMPLES = [AccessibilityHighContrastSvgExampleComponent];

@NgModule({
    imports: [NxMessageModule, NxGridModule],
    declarations: [EXAMPLES],
    exports: [EXAMPLES],
})
export class AccessibilityExamplesModule {
    static components() {
        return {
            'accessibility-high-contrast-svg':
                AccessibilityHighContrastSvgExampleComponent,
        };
    }
}
