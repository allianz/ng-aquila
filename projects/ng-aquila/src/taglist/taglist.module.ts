import { NxIconModule } from '@allianz/ng-aquila/icon';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NxTagComponent, NxTagGroupComponent } from './tag.component';
import { NxTaglistComponent } from './taglist.component';

@NgModule({
  exports: [NxTaglistComponent, NxTagComponent, NxTagGroupComponent],
  imports: [CommonModule, NxIconModule, NxTaglistComponent, NxTagComponent, NxTagGroupComponent],
})
export class NxTaglistModule {}
