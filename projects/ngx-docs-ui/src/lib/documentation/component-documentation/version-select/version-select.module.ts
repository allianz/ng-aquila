import { NgModule } from '@angular/core';

import { NxVersionSelectComponent } from './version-select.component';
import { NxButtonModule } from '@aposin/ng-aquila/button';
import { NxContextMenuModule } from '@aposin/ng-aquila/context-menu';
import { NxIconModule } from '@aposin/ng-aquila/icon';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    NxButtonModule,
    NxContextMenuModule,
    FormsModule,
    BrowserModule,
    NxIconModule
  ],
  exports: [NxVersionSelectComponent],
  declarations: [NxVersionSelectComponent],
  providers: [],
})
export class NxvVersionSelectModule { }
