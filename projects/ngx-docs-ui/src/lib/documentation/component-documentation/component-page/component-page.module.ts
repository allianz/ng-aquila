import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxBadgeModule } from '@aposin/ng-aquila/badge';
import { NxMessageModule } from '@aposin/ng-aquila/message';
import { NxTabsModule } from '@aposin/ng-aquila/tabs';

import { DocViewerModule } from '../../../doc-viewer/doc-viewer.module';
import { ExampleLoaderModule } from '../../../example-loader/example-loader.module';
import { NxvTableOfContentsModule } from '../../table-of-contents/table-of-contents.module';
import { ComponentApi } from './component-api';
import { ComponentExamples } from './component-examples';
import { ComponentOverview } from './component-overview';
import { NxvComponentPage } from './component-page';

@NgModule({
    imports: [
        CommonModule,
        DocViewerModule,
        RouterModule,
        ExampleLoaderModule,
        NxvTableOfContentsModule,
        ScrollingModule,
        NxBadgeModule,
        NxTabsModule,
        NxMessageModule,
        NxvComponentPage,
        ComponentOverview,
        ComponentApi,
        ComponentExamples,
        NxvComponentPage,
        ComponentOverview,
        ComponentApi,
        ComponentExamples,
    ],
    providers: [provideHttpClient(withInterceptorsFromDi())],
})
export class ComponentPageModule {}
