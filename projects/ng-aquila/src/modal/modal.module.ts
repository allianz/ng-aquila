import { NxIconModule } from '@allianz/ng-aquila/icon';
import { A11yModule } from '@angular/cdk/a11y';
/* new modal implementation */
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { NX_MODAL_SCROLL_STRATEGY_PROVIDER, NxDialogService } from './dialog/dialog.service';
import { NxModalCloseDirective } from './dialog/modal-close.directive';
import { NxModalContainer } from './dialog/modal-container.component';
import { NxModalActionsDirective, NxModalComponent, NxModalContentDirective } from './modal.component';
import { NxModalService } from './modal.service';
import { NxOpenModalOnClickDirective } from './modal-open-on-click.directive';

@NgModule({
    imports: [A11yModule, OverlayModule, PortalModule, CommonModule, NxIconModule],
    declarations: [
        NxModalComponent,
        NxOpenModalOnClickDirective,
        NxModalActionsDirective,
        NxModalContentDirective,
        /* new modal implementation */
        NxModalContainer,
        NxModalCloseDirective,
    ],
    exports: [
        NxModalComponent,
        NxOpenModalOnClickDirective,
        NxModalActionsDirective,
        NxModalContentDirective,
        /* new modal implementation */
        NxModalContainer,
        NxModalCloseDirective,
    ],
    providers: [NxDialogService, NX_MODAL_SCROLL_STRATEGY_PROVIDER],
})
export class NxModalModule {
    // define the modal service on root level as an application wide singleton,
    // assuming that we only display one modal at a time, which seems quite reasonable
    // this is static and named "forRoot" by convention
    static forRoot(): ModuleWithProviders<NxModalModule> {
        return {
            ngModule: NxModalModule,
            providers: [NxModalService],
        };
    }
}
