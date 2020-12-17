import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ComponentApi } from './component-api';
import { ComponentExamples } from './component-examples';
import { ComponentOverview } from './component-overview';
import { NxvComponentPage } from './component-page';
import { ExampleLoaderModule } from '../../../example-loader/example-loader.module';
import { DocViewerModule } from '../../../doc-viewer/doc-viewer.module';
import { NxvTableOfContentsModule } from '../../table-of-contents/table-of-contents.module';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NxBadgeModule } from '@aposin/ng-aquila/badge';
import { NxTabsModule } from '@aposin/ng-aquila/tabs';
import { NxvFeedbackModule } from '../../feedback/feedback.module';

@NgModule({
  imports: [
    CommonModule,
    DocViewerModule,
    RouterModule,
    HttpClientModule,
    ExampleLoaderModule,
    NxvTableOfContentsModule,
    ScrollingModule,
    NxBadgeModule,
    NxTabsModule,
    NxvFeedbackModule
  ],
  declarations: [
    NxvComponentPage,
    ComponentOverview,
    ComponentApi,
    ComponentExamples
  ]
})
export class ComponentPageModule { }
