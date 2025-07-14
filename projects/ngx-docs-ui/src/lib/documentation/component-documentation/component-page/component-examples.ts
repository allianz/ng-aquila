import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';

import { ExampleViewerComponent } from '../../../example-viewer/example-viewer.component';
import { ComponentService } from '../../../service/component.service';

@Component({
  selector: 'nxv-component-examples',
  templateUrl: 'component-examples.html',
  imports: [ExampleViewerComponent, AsyncPipe],
})
export class ComponentExamples {
  constructor(readonly componentService: ComponentService) {}
}
