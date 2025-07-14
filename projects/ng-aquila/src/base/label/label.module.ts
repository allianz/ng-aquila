import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NxLabelComponent } from './label.component';

@NgModule({
  imports: [CommonModule, NxLabelComponent],
  exports: [NxLabelComponent],
})
export class NxLabelModule {}
