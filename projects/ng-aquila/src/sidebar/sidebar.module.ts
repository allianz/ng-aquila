import { NxButtonModule } from '@allianz/ng-aquila/button';
import { NxIconModule } from '@allianz/ng-aquila/icon';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NxSidebarComponent } from './sidebar.component';
import { NxSidebarFooterComponent } from './sidebar-footer';
import { NxSidebarToggleComponent } from './sidebar-toggle';

@NgModule({
    imports: [CommonModule, NxIconModule, NxButtonModule],
    declarations: [NxSidebarComponent, NxSidebarFooterComponent, NxSidebarToggleComponent],
    exports: [NxSidebarComponent, NxSidebarFooterComponent, NxSidebarToggleComponent],
})
export class NxSidebarModule {}
