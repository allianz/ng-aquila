import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NxDividerComponent } from './divider.component';

@NgModule({
  imports: [CommonModule, NxDividerComponent],
  exports: [NxDividerComponent],
})
export class NxDividerModule {}
