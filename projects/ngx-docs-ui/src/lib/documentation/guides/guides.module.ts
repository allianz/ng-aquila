import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxActionModule } from '@aposin/ng-aquila/action';
import { NxGridModule } from '@aposin/ng-aquila/grid';
import { NxSidebarModule } from '@aposin/ng-aquila/sidebar';

import { NxvFooterModule } from '../component-documentation/footer/footer.module';
import { NxvTopInfoModule } from '../component-documentation/top-info/top-info.module';
import { NxvGuidesComponent } from './guides.component';

@NgModule({
    imports: [CommonModule, RouterModule, NxGridModule, NxvFooterModule, NxSidebarModule, NxActionModule, NxvTopInfoModule],
    exports: [],
    declarations: [NxvGuidesComponent],
    providers: [],
})
export class NxvGuidesModule {}
