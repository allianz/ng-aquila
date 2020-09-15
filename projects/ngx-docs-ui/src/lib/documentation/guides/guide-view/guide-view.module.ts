import { NgModule } from '@angular/core';

import { NxvGuideViewComponent } from './guide-view.component';
import { RouterModule } from '@angular/router';
import { DocViewerModule } from '../../../doc-viewer/public_api';
import { NxvTableOfContentsModule } from '../../table-of-contents/table-of-contents.module';

@NgModule({
  imports: [
    RouterModule,
    DocViewerModule,
    NxvTableOfContentsModule
  ],
  exports: [],
  declarations: [
    NxvGuideViewComponent
  ],
  providers: []
})
export class NxvGuideViewModule { }
