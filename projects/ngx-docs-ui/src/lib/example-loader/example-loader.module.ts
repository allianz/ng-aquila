import { PortalModule } from '@angular/cdk/portal';
import { NgModule } from '@angular/core';

import { DocViewerModule } from '../doc-viewer/doc-viewer.module';
import { ExampleViewerModule } from '../example-viewer/example-viewer.module';
import { ExampleLoaderComponent } from './example-loader.component';

@NgModule({
  imports: [DocViewerModule, PortalModule, ExampleViewerModule, ExampleLoaderComponent],
  exports: [ExampleLoaderComponent, ExampleViewerModule],
  providers: [],
})
export class ExampleLoaderModule {}
