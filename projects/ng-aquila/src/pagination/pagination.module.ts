import { NxIconModule } from '@allianz/ng-aquila/icon';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NxPaginationComponent } from './pagination.component';

@NgModule({
  imports: [CommonModule, NxIconModule, NxPaginationComponent],
  exports: [NxPaginationComponent],
  providers: [],
})
export class NxPaginationModule {}
