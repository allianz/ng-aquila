import { NxButtonModule } from '@aposin/ng-aquila/button';
import { NxSidebarToggleComponent } from './sidebar-toggle';
import { NxIconModule } from '@aposin/ng-aquila/icon';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NxSidebarComponent } from './sidebar.component';
import { NxSidebarFooterComponent } from './sidebar-footer';

@NgModule({
  imports: [ CommonModule, NxIconModule, NxButtonModule ],
  declarations: [ NxSidebarComponent, NxSidebarFooterComponent, NxSidebarToggleComponent ],
  exports: [ NxSidebarComponent, NxSidebarFooterComponent, NxSidebarToggleComponent ]
})
export class NxSidebarModule { }
