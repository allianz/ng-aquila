import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DocViewerComponent } from './doc-viewer.component';

@NgModule({
    imports: [PortalModule, CommonModule, DocViewerComponent],
    exports: [DocViewerComponent],
})
export class DocViewerModule {}
