import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NxIconModule } from '@aposin/ng-aquila/icon';

import { NxRatingComponent } from './rating.component';

@NgModule({
    imports: [CommonModule, NxIconModule],
    declarations: [NxRatingComponent],
    exports: [NxRatingComponent],
})
export class NxRatingModule {}
