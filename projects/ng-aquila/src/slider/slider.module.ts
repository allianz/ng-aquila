import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NxSliderAppendixDirective } from './appendix.directive';
import { NxSliderComponent } from './slider.component';

@NgModule({
  imports: [CommonModule, NxSliderComponent, NxSliderAppendixDirective],
  exports: [NxSliderComponent, NxSliderAppendixDirective],
})
export class NxSliderModule {}
