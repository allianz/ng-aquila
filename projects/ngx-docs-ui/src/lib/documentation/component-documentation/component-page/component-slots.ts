import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';

import { DocViewerComponent } from '../../../doc-viewer/doc-viewer.component';
import { ComponentService } from '../../../service/component.service';
import { NxvTableOfContentsComponent } from '../../table-of-contents/table-of-contents';

@Component({
  selector: 'nxv-component-slots',
  templateUrl: 'component-slots.html',
  styleUrls: ['./component-api.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [DocViewerComponent, NxvTableOfContentsComponent, AsyncPipe],
})
export class ComponentSlots {
  @ViewChild(NxvTableOfContentsComponent, { static: true })
  tableOfContents!: NxvTableOfContentsComponent;
  constructor(readonly componentService: ComponentService) {}

  onSlotsLoaded() {
    // update the toc when the slot list is loaded
    this.tableOfContents.refresh();
  }
}
