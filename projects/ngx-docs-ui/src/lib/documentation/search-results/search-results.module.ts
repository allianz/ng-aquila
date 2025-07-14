import { NxBadgeModule } from '@allianz/ng-aquila/badge';
import { NxGridModule } from '@allianz/ng-aquila/grid';
import { NxIconModule } from '@allianz/ng-aquila/icon';
import { NxLinkModule } from '@allianz/ng-aquila/link';
import { NxMessageModule } from '@allianz/ng-aquila/message';
import { NxSidebarModule } from '@allianz/ng-aquila/sidebar';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
    NxvSearchResultsComponent,
  ],
  exports: [NxvSearchResultsComponent],
  providers: [],
})
export class SearchResultsModule {}
