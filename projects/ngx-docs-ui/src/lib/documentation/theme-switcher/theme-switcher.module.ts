import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NxvThemeSwitcherComponent } from './theme-switcher.component';
import { NgModule } from '@angular/core';
import { NxButtonModule } from '@aposin/ng-aquila/button';
import { NxContextMenuModule } from '@aposin/ng-aquila/context-menu';
import { NxIconModule } from '@aposin/ng-aquila/icon';

@NgModule({
  imports: [
    CommonModule,
    NxButtonModule,
    NxContextMenuModule,
    NxIconModule,
    FormsModule
  ],
  exports: [NxvThemeSwitcherComponent],
  declarations: [NxvThemeSwitcherComponent],
})
export class NxvThemeSwitcherModule { }
