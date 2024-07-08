import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NxIndicatorComponent } from './indicator.component';

@NgModule({
    imports: [CommonModule, NxIndicatorComponent],
    exports: [NxIndicatorComponent],
})
export class NxIndicatorModule {}
