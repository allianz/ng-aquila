import { A11yModule } from '@angular/cdk/a11y';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxOverlayContainerComponent } from './overlay-container.component';
import { NxOverlayService } from './overlay-service';
import { NxOverlayPositionBuilder } from './position-builder';

@NgModule({
    imports: [OverlayModule, A11yModule, PortalModule, RouterModule],
    exports: [NxOverlayContainerComponent, OverlayModule],
    declarations: [NxOverlayContainerComponent],
    providers: [NxOverlayService, NxOverlayPositionBuilder],
})
export class NxOverlayModule {}
