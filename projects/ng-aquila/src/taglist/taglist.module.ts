import { NxTagComponent } from './tag.component';
import { NxIconModule } from '@aposin/ng-aquila/icon';
import { NgModule } from '@angular/core';
import { NxTaglistComponent } from './taglist.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [ NxTaglistComponent, NxTagComponent ],
  exports: [ NxTaglistComponent, NxTagComponent ],
  imports: [ CommonModule, NxIconModule ]
})
export class NxTaglistModule {}
