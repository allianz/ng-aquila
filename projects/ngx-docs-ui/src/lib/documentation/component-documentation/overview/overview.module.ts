import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxBadgeModule } from '@aposin/ng-aquila/badge';
import { NxGridModule } from '@aposin/ng-aquila/grid';
import { NxHeadlineModule } from '@aposin/ng-aquila/headline';
import { NxIconModule } from '@aposin/ng-aquila/icon';
import { NxTableModule } from '@aposin/ng-aquila/table';

import { NxvOverviewComponent } from './overview.component';
import { NxvStatusDotComponent } from './status-dot.component';

@NgModule({
    imports: [RouterModule, CommonModule, NxIconModule, NxTableModule, NxHeadlineModule, NxGridModule, NxBadgeModule],
    exports: [],
    declarations: [NxvOverviewComponent, NxvStatusDotComponent],
    providers: [],
})
export class NxvOverviewModule {}
