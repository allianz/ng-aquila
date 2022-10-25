import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NxButtonModule } from '@aposin/ng-aquila/button';
import { NxIconModule } from '@aposin/ng-aquila/icon';

import { NxSidebarComponent } from './sidebar.component';
import { NxSidebarFooterComponent } from './sidebar-footer';
import { NxSidebarToggleComponent } from './sidebar-toggle';

@NgModule({
    imports: [CommonModule, NxIconModule, NxButtonModule],
    declarations: [NxSidebarComponent, NxSidebarFooterComponent, NxSidebarToggleComponent],
    exports: [NxSidebarComponent, NxSidebarFooterComponent, NxSidebarToggleComponent],
})
export class NxSidebarModule {}
