import { Component, ViewChild } from '@angular/core';

import { ComponentService } from '../../../service/component.service';
import { NxvTableOfContentsComponent } from '../../table-of-contents/table-of-contents';

@Component({
    selector: 'nxv-component-api',
    templateUrl: 'component-api.html',
    styleUrls: ['./component-api.scss'],
})
export class ComponentApi {
    @ViewChild(NxvTableOfContentsComponent, { static: true }) tableOfContents!: NxvTableOfContentsComponent;
    constructor(readonly componentService: ComponentService) {}

    onAPIloaded() {
        // update the toc when the api table is loaded
        this.tableOfContents.refresh();
    }
}
