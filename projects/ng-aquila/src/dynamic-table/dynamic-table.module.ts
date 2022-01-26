import { ScrollingModule } from '@angular/cdk/scrolling';
import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NxDynamicTableComponent } from './dynamic-table.component';

@NgModule({
    declarations: [NxDynamicTableComponent],
    exports: [NxDynamicTableComponent],
    imports: [CommonModule, CdkTableModule, ScrollingModule],
})
export class NxDynamicTableModule {}
