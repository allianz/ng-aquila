import { AsyncPipe } from '@angular/common';
import { Component, ViewChild } from '@angular/core';

import { DocViewerComponent } from '../../../doc-viewer/doc-viewer.component';
import { ComponentService } from '../../../service/component.service';
import { NxvTableOfContentsComponent } from '../../table-of-contents/table-of-contents';

@Component({
    selector: 'nxv-component-api',
    templateUrl: 'component-api.html',
    styleUrls: ['./component-api.scss'],
    imports: [DocViewerComponent, NxvTableOfContentsComponent, AsyncPipe],
})
export class ComponentApi {
    @ViewChild(NxvTableOfContentsComponent, { static: true }) tableOfContents!: NxvTableOfContentsComponent;
    constructor(readonly componentService: ComponentService) {}

    onAPIloaded() {
        // update the toc when the api table is loaded
        this.tableOfContents.refresh();
    }
}
