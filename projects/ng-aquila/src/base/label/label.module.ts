import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NxLabelComponent } from './label.component';
import { NxLabelInfoDirective } from './label-info.directive';

@NgModule({
  imports: [CommonModule, NxLabelComponent, NxLabelInfoDirective],
  exports: [NxLabelComponent, NxLabelInfoDirective],
})
export class NxLabelModule {}
