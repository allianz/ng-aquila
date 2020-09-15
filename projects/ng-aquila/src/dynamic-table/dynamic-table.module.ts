import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NxDynamicTableComponent } from './dynamic-table.component';
import { CdkTableModule } from '@angular/cdk/table';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
  declarations: [ NxDynamicTableComponent ],
  exports: [ NxDynamicTableComponent ],
  imports: [ CommonModule, CdkTableModule, ScrollingModule ]
})
export class NxDynamicTableModule { }
