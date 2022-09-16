import { NxBadgeModule } from '@allianz/ng-aquila/badge';
import { NxTabsModule } from '@allianz/ng-aquila/tabs';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

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
        HttpClientModule,
        ExampleLoaderModule,
        NxvTableOfContentsModule,
        ScrollingModule,
        NxBadgeModule,
        NxTabsModule,
    ],
    declarations: [NxvComponentPage, ComponentOverview, ComponentApi, ComponentExamples],
})
export class ComponentPageModule {}
