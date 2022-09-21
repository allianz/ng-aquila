import { NxButtonModule } from '@allianz/ng-aquila/button';
import { NxCopytextModule } from '@allianz/ng-aquila/copytext';
import { NxDropdownModule } from '@allianz/ng-aquila/dropdown';
import { NxHeadlineModule } from '@allianz/ng-aquila/headline';
import { NxInputModule } from '@allianz/ng-aquila/input';
import { NxModalModule } from '@allianz/ng-aquila/modal';
import { NgModule } from '@angular/core';

import { ModalBasicExampleComponent } from './modal-basic/modal-basic-example';
import { ModalClosingExampleComponent } from './modal-closing/modal-closing-example';
import { ModalClosingBehaviourExampleComponent } from './modal-closing-behaviour/modal-closing-behaviour-example';
import { ModalContentActionsExampleComponent } from './modal-content-actions/modal-content-actions-example';
import { ModalDataInjectionExampleComponent } from './modal-data-injection/modal-data-injection-example';
import { ModalFixedWidthExampleComponent } from './modal-fixed-width/modal-fixed-width-example';
import { ModalOpeningExampleComponent } from './modal-opening/modal-opening-example';
import { ModalWithDirectionExampleComponent } from './modal-with-direction/modal-with-direction-example';

const EXAMPLES = [
    ModalBasicExampleComponent,
    ModalClosingExampleComponent,
    ModalClosingBehaviourExampleComponent,
    ModalContentActionsExampleComponent,
    ModalDataInjectionExampleComponent,
    ModalFixedWidthExampleComponent,
    ModalOpeningExampleComponent,
    ModalWithDirectionExampleComponent,
];

@NgModule({
    imports: [
        NxModalModule.forRoot(),
        NxDropdownModule,
        NxInputModule,
        NxButtonModule,
        NxCopytextModule,
        NxHeadlineModule,
    ],
    declarations: [EXAMPLES],
    exports: [EXAMPLES],
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
            'modal-with-direction': ModalWithDirectionExampleComponent,
        };
    }
}
