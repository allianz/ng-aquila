import { NxOverlayPositionBuilder } from './position-builder';
import { RouterModule } from '@angular/router';
import { PortalModule } from '@angular/cdk/portal';
import { A11yModule } from '@angular/cdk/a11y';
import { OverlayModule } from '@angular/cdk/overlay';
import { NxOverlayContainerComponent } from './overlay-container.component';
import { NgModule } from '@angular/core';
import { NxOverlayService } from './overlay-service';

@NgModule({
    imports: [OverlayModule, A11yModule, PortalModule, RouterModule],
    exports: [NxOverlayContainerComponent, OverlayModule],
    declarations: [NxOverlayContainerComponent],
    entryComponents: [NxOverlayContainerComponent],
    providers: [NxOverlayService, NxOverlayPositionBuilder],
})
export class NxOverlayModule {}
