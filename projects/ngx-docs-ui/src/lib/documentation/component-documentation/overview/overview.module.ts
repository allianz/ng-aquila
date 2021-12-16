import { NgModule } from '@angular/core';

import { NxvOverviewComponent } from './overview.component';
import { NxHeadlineModule } from '@aposin/ng-aquila/headline';
import { NxTableModule } from '@aposin/ng-aquila/table';
import { NxIconModule } from '@aposin/ng-aquila/icon';
import { NxGridModule } from '@aposin/ng-aquila/grid';
import { NxBadgeModule } from '@aposin/ng-aquila/badge';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NxvStatusDotComponent } from './status-dot.component';

@NgModule({
    imports: [RouterModule, CommonModule, NxIconModule, NxTableModule, NxHeadlineModule, NxGridModule, NxBadgeModule],
    exports: [],
    declarations: [NxvOverviewComponent, NxvStatusDotComponent],
    providers: [],
})
export class NxvOverviewModule {}
