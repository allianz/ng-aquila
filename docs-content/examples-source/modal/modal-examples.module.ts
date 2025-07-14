import { NxButtonModule } from '@allianz/ng-aquila/button';
import { NxCopytextModule } from '@allianz/ng-aquila/copytext';
import { NxDropdownModule } from '@allianz/ng-aquila/dropdown';
import { NxFormfieldModule } from '@allianz/ng-aquila/formfield';
import { NxHeadlineModule } from '@allianz/ng-aquila/headline';
import { NxIconModule } from '@allianz/ng-aquila/icon';
import { NxInputModule } from '@allianz/ng-aquila/input';
import { NxModalModule } from '@allianz/ng-aquila/modal';
import { NxPopoverModule } from '@allianz/ng-aquila/popover';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { ModalAutofocusExampleComponent } from './modal-autofocus/modal-autofocus-example';
import { ModalBasicExampleComponent } from './modal-basic/modal-basic-example';
import { ModalClosingExampleComponent } from './modal-closing/modal-closing-example';
import { ModalClosingBehaviourExampleComponent } from './modal-closing-behaviour/modal-closing-behaviour-example';
import { ModalContentActionsExampleComponent } from './modal-content-actions/modal-content-actions-example';
import { ModalDataInjectionExampleComponent } from './modal-data-injection/modal-data-injection-example';
import { ModalFixedWidthExampleComponent } from './modal-fixed-width/modal-fixed-width-example';
import { ModalFullscreenExampleComponent } from './modal-fullscreen/modal-fullscreen-example';
import { ModalOpeningExampleComponent } from './modal-opening/modal-opening-example';
import { ModalStatusExampleComponent } from './modal-status/modal-status-example';
import { ModalUnsavedExampleComponent } from './modal-unsaved/modal-unsaved-example';
import { ModalWithDirectionExampleComponent } from './modal-with-direction/modal-with-direction-example';

const EXAMPLES = [
  ModalAutofocusExampleComponent,
  ModalStatusExampleComponent,
  ModalUnsavedExampleComponent,
  ModalBasicExampleComponent,
  ModalClosingExampleComponent,
  ModalClosingBehaviourExampleComponent,
  ModalContentActionsExampleComponent,
  ModalDataInjectionExampleComponent,
  ModalFixedWidthExampleComponent,
  ModalOpeningExampleComponent,
  ModalWithDirectionExampleComponent,
  ModalFullscreenExampleComponent,
];

@NgModule({
  imports: [
    NxModalModule.forRoot(),
    NxDropdownModule,
    NxInputModule,
    NxButtonModule,
    NxCopytextModule,
    NxHeadlineModule,
    NxPopoverModule,
    NxIconModule,
    NxFormfieldModule,
    ReactiveFormsModule,
    EXAMPLES,
  ],
  exports: [EXAMPLES],
})
export class ModalExamplesModule {
  static components() {
    return {
      'modal-autofocus': ModalAutofocusExampleComponent,
      'modal-status': ModalStatusExampleComponent,
      'modal-unsaved': ModalUnsavedExampleComponent,
      'modal-basic': ModalBasicExampleComponent,
      'modal-closing': ModalClosingExampleComponent,
      'modal-closing-behaviour': ModalClosingBehaviourExampleComponent,
      'modal-content-actions': ModalContentActionsExampleComponent,
      'modal-data-injection': ModalDataInjectionExampleComponent,
      'modal-fixed-width': ModalFixedWidthExampleComponent,
      'modal-fullscreen': ModalFullscreenExampleComponent,
      'modal-opening': ModalOpeningExampleComponent,
      'modal-with-direction': ModalWithDirectionExampleComponent,
    };
  }
}
