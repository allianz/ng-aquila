import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxButtonModule } from '@aposin/ng-aquila/button';
import { NxIconModule } from '@aposin/ng-aquila/icon';
import { NxLinkModule } from '@aposin/ng-aquila/link';
import { NxTabsModule } from '@aposin/ng-aquila/tabs';
import { NxTooltipModule } from '@aposin/ng-aquila/tooltip';

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
    ],
    exports: [ExampleViewerComponent],
    declarations: [ExampleViewerComponent],
    providers: [CopyService],
})
export class ExampleViewerModule {}
