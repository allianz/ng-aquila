import { NxButtonModule } from '@allianz/ng-aquila/button';
import { NxContextMenuModule } from '@allianz/ng-aquila/context-menu';
import { NxIconModule } from '@allianz/ng-aquila/icon';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NxvThemeSwitcherComponent } from './theme-switcher.component';

@NgModule({
  imports: [
    CommonModule,
    NxButtonModule,
    NxContextMenuModule,
    NxIconModule,
    FormsModule,
    NxvThemeSwitcherComponent,
  ],
  exports: [NxvThemeSwitcherComponent],
})
export class NxvThemeSwitcherModule {}
