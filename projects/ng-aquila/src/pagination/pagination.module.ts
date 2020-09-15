import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NxPaginationComponent } from './pagination.component';
import { NxIconModule } from '@aposin/ng-aquila/icon';
import { NxPaginationUtils } from './pagination-utils';

@NgModule({
  imports: [
    CommonModule, NxIconModule
  ],
  declarations: [
    NxPaginationComponent
  ],
  exports: [
    NxPaginationComponent
  ],
  providers: [
    NxPaginationUtils
  ]
})
export class NxPaginationModule { }
