import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NxColComponent } from './col.component';
import { NxLayoutComponent } from './layout.component';
import { NxRowComponent } from './row.component';

@NgModule({
  exports: [NxLayoutComponent, NxRowComponent, NxColComponent],
  imports: [CommonModule, NxLayoutComponent, NxRowComponent, NxColComponent],
})
export class NxGridModule {}
