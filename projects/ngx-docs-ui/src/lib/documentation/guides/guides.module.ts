import { NxActionModule } from '@allianz/ng-aquila/action';
import { NxGridModule } from '@allianz/ng-aquila/grid';
import { NxSidebarModule } from '@allianz/ng-aquila/sidebar';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NxvFooterModule } from '../component-documentation/footer/footer.module';
import { NxvGuidesComponent } from './guides.component';

@NgModule({
    imports: [CommonModule, RouterModule, NxGridModule, NxvFooterModule, NxSidebarModule, NxActionModule],
    exports: [],
    declarations: [NxvGuidesComponent],
    providers: [],
})
export class NxvGuidesModule {}
