import { NxIconModule } from '@aposin/ng-aquila/icon';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { NxModalComponent, NxModalActionsDirective, NxModalContentDirective } from './modal.component';
import { CommonModule } from '@angular/common';
import { NxOpenModalOnClickDirective } from './modal-open-on-click.directive';
import { NxModalService } from './modal.service';
import { A11yModule } from '@angular/cdk/a11y';

/* new modal implementation */
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { NxModalContainer } from './dialog/modal-container.component';
import { NxModalCloseDirective } from './dialog/modal-close.directive';
import { NxDialogService, NX_MODAL_SCROLL_STRATEGY_PROVIDER } from './dialog/dialog.service';

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
    entryComponents: [NxModalContainer],
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
