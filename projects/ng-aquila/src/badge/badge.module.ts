import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NxBadgeComponent } from './badge.component';

@NgModule({
  imports: [ CommonModule ],
  declarations: [NxBadgeComponent],
  exports: [NxBadgeComponent]
})
export class NxBadgeModule {}
