import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';

import { ComponentDescriptor } from '../../../core/manifest';
import { ExampleLoaderComponent } from '../../../example-loader/example-loader.component';
import { ComponentService } from '../../../service/component.service';
import { NxvTableOfContentsComponent } from '../../table-of-contents/table-of-contents';

@Component({
  selector: 'nxv-component-overview',
  templateUrl: 'component-overview.html',
  styleUrls: ['component-overview.scss'],
  imports: [ExampleLoaderComponent, NxvTableOfContentsComponent, AsyncPipe],
})
export class ComponentOverview {
  componentDescriptor!: ComponentDescriptor;

  constructor(readonly componentService: ComponentService) {}
}
