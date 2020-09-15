import { NxGridModule } from '@aposin/ng-aquila/grid';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NxSliderComponent } from './slider.component';

@NgModule({
  imports: [ CommonModule, NxGridModule ],
  declarations: [ NxSliderComponent ],
  exports: [ NxSliderComponent ]
})
export class NxSliderModule { }
