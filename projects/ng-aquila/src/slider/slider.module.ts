import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NxGridModule } from '@aposin/ng-aquila/grid';
import { NxSliderComponent } from './slider.component';

@NgModule({
    imports: [CommonModule, NxGridModule],
    declarations: [NxSliderComponent],
    exports: [NxSliderComponent],
})
export class NxSliderModule {}
