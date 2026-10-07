import { NxButtonModule } from '@allianz/ng-aquila/button';
import { NxIconModule } from '@allianz/ng-aquila/icon';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NxSidebarComponent } from './sidebar.component';
import { NxSidebarFooterComponent } from './sidebar-footer';
import { NxSidebarGroupComponent } from './sidebar-group.component';
import { NxSidebarToggleComponent } from './sidebar-toggle';

@NgModule({
  imports: [
    CommonModule,
    NxIconModule,
    NxButtonModule,
    NxSidebarComponent,
    NxSidebarFooterComponent,
    NxSidebarGroupComponent,
    NxSidebarToggleComponent,
  ],
  exports: [
    NxSidebarComponent,
    NxSidebarFooterComponent,
    NxSidebarGroupComponent,
    NxSidebarToggleComponent,
  ],
})
export class NxSidebarModule {}
