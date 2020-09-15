import { PortalModule } from '@angular/cdk/portal';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocViewerComponent } from './doc-viewer.component';

@NgModule({
  imports: [
    PortalModule,
    CommonModule
  ],
  exports: [
    DocViewerComponent

  ],
  declarations: [
    DocViewerComponent
  ]
})
export class DocViewerModule { }
