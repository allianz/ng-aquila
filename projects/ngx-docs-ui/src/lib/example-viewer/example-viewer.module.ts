import { NxButtonModule } from '@allianz/ng-aquila/button';
import { NxIconModule } from '@allianz/ng-aquila/icon';
import { NxLinkModule } from '@allianz/ng-aquila/link';
import { NxTabsModule } from '@allianz/ng-aquila/tabs';
import { NxTooltipModule } from '@allianz/ng-aquila/tooltip';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CopyService } from '../core/copy.service';
import { DocViewerModule } from '../doc-viewer/public_api';
import { NxvLazyExampleOutletModule } from './../lazy-example-outlet/lazy-example-outlet.module';
import { StackBlitzButtonModule } from './../stack-blitz/stack-blitz-button';
import { ExampleViewerComponent } from './example-viewer.component';

@NgModule({
  imports: [
    PortalModule,
    CommonModule,
    DocViewerModule,
    NxButtonModule,
    NxTabsModule,
    NxIconModule,
    RouterModule,
    NxLinkModule,
    NxTooltipModule,
    NxvLazyExampleOutletModule,
    StackBlitzButtonModule,
    ExampleViewerComponent,
  ],
  exports: [ExampleViewerComponent],
  providers: [CopyService],
})
export class ExampleViewerModule {}
