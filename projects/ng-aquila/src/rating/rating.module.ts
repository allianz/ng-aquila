import { NxIconModule } from '@allianz/ng-aquila/icon';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NxRatingComponent } from './rating.component';

@NgModule({
    imports: [CommonModule, NxIconModule],
    declarations: [NxRatingComponent],
    exports: [NxRatingComponent],
})
export class NxRatingModule {}
