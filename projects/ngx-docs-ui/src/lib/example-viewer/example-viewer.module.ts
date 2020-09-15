import { PortalModule } from '@angular/cdk/portal';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ExampleViewerComponent } from './example-viewer.component';
import { DocViewerModule } from '../doc-viewer/public_api';
import { CopyService } from '../core/copy.service';

import { NxButtonModule } from '@aposin/ng-aquila/button';
import { NxTabsModule } from '@aposin/ng-aquila/tabs';
import { NxIconModule } from '@aposin/ng-aquila/icon';
import { NxLinkModule } from '@aposin/ng-aquila/link';
import { NxTooltipModule } from '@aposin/ng-aquila/tooltip';

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
    NxTooltipModule
  ],
  exports: [ExampleViewerComponent],
  declarations: [ExampleViewerComponent],
  providers: [CopyService],
  entryComponents: []
})
export class ExampleViewerModule {}
