import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NxIconModule } from '@aposin/ng-aquila/icon';

import { NxMessageComponent } from './message/message.component';
import { NxMessageBannerComponent } from './message-banner/message-banner.component';
import { NxMessageToastComponent } from './message-toast/message-toast.component';

@NgModule({
    imports: [CommonModule, NxIconModule, OverlayModule, PortalModule],
    declarations: [NxMessageComponent, NxMessageToastComponent, NxMessageBannerComponent],
    exports: [NxMessageComponent, NxMessageBannerComponent],
})
export class NxMessageModule {}
