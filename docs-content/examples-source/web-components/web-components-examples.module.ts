import { NxButtonModule } from '@allianz/ng-aquila/button';
import { NxCopytextModule } from '@allianz/ng-aquila/copytext';
import { NxFormfieldModule } from '@allianz/ng-aquila/formfield';
import { NxHeadlineModule } from '@allianz/ng-aquila/headline';
import { NxInputModule } from '@allianz/ng-aquila/input';
import { NxModalModule } from '@allianz/ng-aquila/modal';
import { NgModule } from '@angular/core';

import { WebComponentsModalShadowDomExampleComponent } from './web-components-modal-shadow-dom/web-components-modal-shadow-dom-example';

const EXAMPLES = [WebComponentsModalShadowDomExampleComponent];

@NgModule({
  imports: [
    NxModalModule.forRoot(),
    NxButtonModule,
    NxCopytextModule,
    NxHeadlineModule,
    NxFormfieldModule,
    NxInputModule,
    EXAMPLES,
  ],
  exports: [EXAMPLES],
})
export class WebComponentsExamplesModule {
  static components() {
    return {
      'web-components-modal-shadow-dom':
        WebComponentsModalShadowDomExampleComponent,
    };
  }
}
