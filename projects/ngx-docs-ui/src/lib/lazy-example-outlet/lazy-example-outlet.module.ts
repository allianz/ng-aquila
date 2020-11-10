import { CommonModule } from '@angular/common';
import { NxSpinnerModule } from '@aposin/ng-aquila/spinner';
import { NgModule } from '@angular/core';

import { LazyExampleOutletComponent } from './lazy-example-outlet.component';

@NgModule({
  imports: [
    NxSpinnerModule,
    CommonModule
  ],
  exports: [LazyExampleOutletComponent],
  declarations: [LazyExampleOutletComponent],
  providers: [],
})
export class NxvLazyExampleOutletModule { }
