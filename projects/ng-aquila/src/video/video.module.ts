import { NgModule } from '@angular/core';
import { NxVideoComponent } from './video.component';
import { CommonModule } from '@angular/common';
import { NxIconModule } from '@aposin/ng-aquila/icon';

@NgModule({
  declarations: [ NxVideoComponent ],
  exports: [ NxVideoComponent ],
  imports: [ CommonModule, NxIconModule ]
})
export class NxVideoModule {}
