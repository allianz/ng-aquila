import { FormsModule } from '@angular/forms';
import { NxvThemeSwitcherComponent } from './theme-switcher.component';
import { NgModule } from '@angular/core';
import { NxButtonModule } from '@aposin/ng-aquila/button';
import { NxContextMenuModule } from '@aposin/ng-aquila/context-menu';
import { NxIconModule } from '@aposin/ng-aquila/icon';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    BrowserModule,
    NxButtonModule,
    NxContextMenuModule,
    NxIconModule,
    FormsModule
  ],
  exports: [NxvThemeSwitcherComponent],
  declarations: [NxvThemeSwitcherComponent],
})
export class NxvThemeSwitcherModule { }
