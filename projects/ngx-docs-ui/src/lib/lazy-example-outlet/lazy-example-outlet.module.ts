import { CommonModule } from '@angular/common';
import { NxSpinnerModule } from '@aposin/ng-aquila/spinner';
import { NgModule } from '@angular/core';

import { LazyExampleOutletComponent } from './lazy-example-outlet.component';
import { BidiModule } from '@angular/cdk/bidi';

@NgModule({
  imports: [
    NxSpinnerModule,
    CommonModule,
    BidiModule,
  ],
  exports: [LazyExampleOutletComponent],
  declarations: [LazyExampleOutletComponent],
  providers: [],
})
export class NxvLazyExampleOutletModule { }
