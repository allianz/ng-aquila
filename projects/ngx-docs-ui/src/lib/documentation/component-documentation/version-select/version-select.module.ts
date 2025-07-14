import { NxButtonModule } from '@allianz/ng-aquila/button';
import { NxContextMenuModule } from '@allianz/ng-aquila/context-menu';
import { NxIconModule } from '@allianz/ng-aquila/icon';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NxVersionSelectComponent } from './version-select.component';

@NgModule({
  imports: [
    NxButtonModule,
    NxContextMenuModule,
    FormsModule,
    CommonModule,
    NxIconModule,
    NxVersionSelectComponent,
  ],
  exports: [NxVersionSelectComponent],
  providers: [],
})
export class NxvVersionSelectModule {}
