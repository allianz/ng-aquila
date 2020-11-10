import { NxCopytextModule } from '@aposin/ng-aquila/copytext';
import { NxButtonModule } from '@aposin/ng-aquila/button';
import { NxFormfieldModule } from '@aposin/ng-aquila/formfield';
import { NxDropdownModule } from '@aposin/ng-aquila/dropdown';
import { NxModalModule } from '@aposin/ng-aquila/modal';
import { NxHeadlineModule } from '@aposin/ng-aquila/headline';

import { NgModule } from '@angular/core';
import { ModalBasicExampleComponent } from './modal-basic/modal-basic-example';
import { ModalClosingExampleComponent } from './modal-closing/modal-closing-example';
import { ModalClosingBehaviourExampleComponent } from './modal-closing-behaviour/modal-closing-behaviour-example';
import { ModalContentActionsExampleComponent } from './modal-content-actions/modal-content-actions-example';
import { ModalDataInjectionExampleComponent } from './modal-data-injection/modal-data-injection-example';
import { ModalFixedWidthExampleComponent } from './modal-fixed-width/modal-fixed-width-example';
import { ModalOpeningExampleComponent } from './modal-opening/modal-opening-example';

const EXAMPLES = [
  ModalBasicExampleComponent,
  ModalClosingExampleComponent,
  ModalClosingBehaviourExampleComponent,
  ModalContentActionsExampleComponent,
  ModalDataInjectionExampleComponent,
  ModalFixedWidthExampleComponent,
  ModalOpeningExampleComponent
];

 @NgModule({
  imports: [
    NxModalModule.forRoot(),
    NxDropdownModule,
    NxFormfieldModule,
    NxButtonModule,
    NxCopytextModule,
    NxHeadlineModule
  ],
  declarations: [EXAMPLES],
  exports: [EXAMPLES]
})
export class ModalExamplesModule {
  static components() {
    return {
      'modal-basic': ModalBasicExampleComponent,
      'modal-closing': ModalClosingExampleComponent,
      'modal-closing-behaviour': ModalClosingBehaviourExampleComponent,
      'modal-content-actions': ModalContentActionsExampleComponent,
      'modal-data-injection': ModalDataInjectionExampleComponent,
      'modal-fixed-width': ModalFixedWidthExampleComponent,
      'modal-opening': ModalOpeningExampleComponent,
    };
  }
}
