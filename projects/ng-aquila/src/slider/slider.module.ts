import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NxSliderComponent } from './slider.component';

@NgModule({
    imports: [CommonModule],
    declarations: [NxSliderComponent],
    exports: [NxSliderComponent],
})
export class NxSliderModule {}
