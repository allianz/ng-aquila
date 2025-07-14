import { NxSpinnerModule } from '@allianz/ng-aquila/spinner';
import { BidiModule } from '@angular/cdk/bidi';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LazyExampleOutletComponent } from './lazy-example-outlet.component';

@NgModule({
  imports: [NxSpinnerModule, CommonModule, BidiModule, LazyExampleOutletComponent],
  exports: [LazyExampleOutletComponent],
  providers: [],
})
export class NxvLazyExampleOutletModule {}
