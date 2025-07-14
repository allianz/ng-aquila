import { NxBadgeModule } from '@allianz/ng-aquila/badge';
import { NxGridModule } from '@allianz/ng-aquila/grid';
import { NxHeadlineModule } from '@allianz/ng-aquila/headline';
import { NxIconModule } from '@allianz/ng-aquila/icon';
import { NxTableModule } from '@allianz/ng-aquila/table';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NxvOverviewComponent } from './overview.component';
import { NxvStatusDotComponent } from './status-dot.component';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    NxIconModule,
    NxTableModule,
    NxHeadlineModule,
    NxGridModule,
    NxBadgeModule,
    NxvOverviewComponent,
    NxvStatusDotComponent,
  ],
  exports: [],
  providers: [],
})
export class NxvOverviewModule {}
