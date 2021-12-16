import { PortalModule } from '@angular/cdk/portal';
import { NgModule } from '@angular/core';

import { DocViewerModule } from '../doc-viewer/doc-viewer.module';
import { ExampleViewerComponent } from '../example-viewer/example-viewer.component';
import { ExampleViewerModule } from '../example-viewer/example-viewer.module';
import { ExampleLoaderComponent } from './example-loader.component';
@NgModule({
    imports: [DocViewerModule, PortalModule, ExampleViewerModule],
    exports: [ExampleLoaderComponent, ExampleViewerModule],
    declarations: [ExampleLoaderComponent],
    providers: [],
    entryComponents: [ExampleViewerComponent],
})
export class ExampleLoaderModule {}
