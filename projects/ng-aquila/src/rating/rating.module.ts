import { NgModule } from '@angular/core';
import { NxRatingComponent } from './rating.component';
import { NxIconModule } from '@aposin/ng-aquila/icon';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [CommonModule, NxIconModule],
    declarations: [NxRatingComponent],
    exports: [NxRatingComponent],
})
export class NxRatingModule {}
