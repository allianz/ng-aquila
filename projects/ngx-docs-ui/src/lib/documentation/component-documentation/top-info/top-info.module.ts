import { NxLinkModule } from '@allianz/ng-aquila/link';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NxvTopInfoComponent } from './top-info.component';

@NgModule({
  imports: [CommonModule, NxLinkModule, NxvTopInfoComponent],
  exports: [NxvTopInfoComponent],
})
export class NxvTopInfoModule {}
