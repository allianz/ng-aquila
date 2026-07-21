import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NxLabelInfoDirective } from './label-info.directive';
import { NxLabelComponent } from './label.component';

@NgModule({
  imports: [CommonModule, NxLabelComponent, NxLabelInfoDirective],
  exports: [NxLabelComponent, NxLabelInfoDirective],
})
export class NxLabelModule {}
