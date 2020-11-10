import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NxVersionSelectComponent } from './version-select.component';
import { NxButtonModule } from '@aposin/ng-aquila/button';
import { NxContextMenuModule } from '@aposin/ng-aquila/context-menu';
import { NxIconModule } from '@aposin/ng-aquila/icon';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    NxButtonModule,
    NxContextMenuModule,
    FormsModule,
    CommonModule,
    NxIconModule
  ],
  exports: [NxVersionSelectComponent],
  declarations: [NxVersionSelectComponent],
  providers: [],
})
export class NxvVersionSelectModule { }
