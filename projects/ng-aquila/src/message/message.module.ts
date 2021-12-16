import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NxIconModule } from '@aposin/ng-aquila/icon';
import { NxMessageComponent } from './message/message.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { NxMessageToastComponent } from './message-toast/message-toast.component';
import { NxMessageBannerComponent } from './message-banner/message-banner.component';

@NgModule({
    imports: [CommonModule, NxIconModule, OverlayModule, PortalModule],
    declarations: [NxMessageComponent, NxMessageToastComponent, NxMessageBannerComponent],
    exports: [NxMessageComponent, NxMessageBannerComponent],
    entryComponents: [NxMessageToastComponent],
})
export class NxMessageModule {}
