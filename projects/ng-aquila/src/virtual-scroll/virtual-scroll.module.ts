import { NgModule } from '@angular/core';

import { NxVirtualFor, NxVirtualGroupOutlet } from './virtual-for';
import { NxVirtualViewportComponent } from './virtual-scroll-viewport';

@NgModule({
  imports: [NxVirtualViewportComponent, NxVirtualFor, NxVirtualGroupOutlet],
  exports: [NxVirtualViewportComponent, NxVirtualFor, NxVirtualGroupOutlet],
})
export class NxVirtualScrollModule {}
