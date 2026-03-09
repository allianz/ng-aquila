import { NgModule } from '@angular/core';

import { NxVirtualFor } from './virtual-for';
import { NxVirtualViewportComponent } from './virtual-scroll-viewport';

@NgModule({
  imports: [NxVirtualViewportComponent, NxVirtualFor],
  exports: [NxVirtualViewportComponent, NxVirtualFor],
})
export class NxVirtualScrollModule {}
