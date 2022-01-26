import { BidiModule } from '@angular/cdk/bidi';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NxSpinnerModule } from '@aposin/ng-aquila/spinner';

import { LazyExampleOutletComponent } from './lazy-example-outlet.component';

@NgModule({
    imports: [NxSpinnerModule, CommonModule, BidiModule],
    exports: [LazyExampleOutletComponent],
    declarations: [LazyExampleOutletComponent],
    providers: [],
})
export class NxvLazyExampleOutletModule {}
