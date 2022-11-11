import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NxBadgeModule } from '@aposin/ng-aquila/badge';
import { NxGridModule } from '@aposin/ng-aquila/grid';
import { NxIconModule } from '@aposin/ng-aquila/icon';
import { NxLinkModule } from '@aposin/ng-aquila/link';
import { NxMessageModule } from '@aposin/ng-aquila/message';
import { NxSidebarModule } from '@aposin/ng-aquila/sidebar';

import { NxvSearchResultsComponent } from './search-results.component';

const routes: Routes = [
    {
        path: ':term',
        component: NxvSearchResultsComponent,
    },
];

@NgModule({
    imports: [
        CommonModule,
        NxSidebarModule,
        NxGridModule,
        ScrollingModule,
        NxLinkModule,
        NxBadgeModule,
        NxGridModule,
        NxIconModule,
        NxMessageModule,
        RouterModule.forChild(routes),
    ],
    exports: [NxvSearchResultsComponent],
    declarations: [NxvSearchResultsComponent],
    providers: [],
})
export class SearchResultsModule {}
