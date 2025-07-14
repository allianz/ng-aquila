import { NxIconModule } from '@allianz/ng-aquila/icon';
import { NgModule } from '@angular/core';

import { NxListComponent } from './list.component';
import { NxListIconComponent } from './list-icon.component';

@NgModule({
  imports: [NxIconModule, NxListComponent, NxListIconComponent],
  exports: [NxListComponent, NxListIconComponent],
})
export class NxListModule {}
