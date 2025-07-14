import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NxBadgeComponent } from './badge.component';

@NgModule({
  imports: [CommonModule, NxBadgeComponent],
  exports: [NxBadgeComponent],
})
export class NxBadgeModule {}
