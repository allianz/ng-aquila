import { NxGridModule } from '@allianz/ng-aquila/grid';
import { NxMessageModule } from '@allianz/ng-aquila/message';
import { NgModule } from '@angular/core';

import { AccessibilityHighContrastSvgExampleComponent } from './accessibility-high-contrast-svg/accessibility-high-contrast-svg-example';

const EXAMPLES = [AccessibilityHighContrastSvgExampleComponent];

@NgModule({
  imports: [NxMessageModule, NxGridModule, EXAMPLES],
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
