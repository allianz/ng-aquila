import { NgModule } from '@angular/core';

import { NxvGuidesComponent } from './guides.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NxGridModule } from '@aposin/ng-aquila/grid';
import { NxvFooterModule } from '../component-documentation/footer/footer.module';
import { NxSidebarModule } from '@aposin/ng-aquila/sidebar';
import { NxActionModule } from '@aposin/ng-aquila/action';
import { NxvTopInfoModule } from '../component-documentation/top-info/top-info.module';

@NgModule({
    imports: [CommonModule, RouterModule, NxGridModule, NxvFooterModule, NxSidebarModule, NxActionModule, NxvTopInfoModule],
    exports: [],
    declarations: [NxvGuidesComponent],
    providers: [],
})
export class NxvGuidesModule {}
