import { Component, OnDestroy } from '@angular/core';

import { ComponentService } from '../../service/component.service';
import { DocumentationFrameComponent } from '../documentation-frame.component';

@Component({
    selector: 'nxv-documentation',
    templateUrl: 'documentation-page.component.html',
    styleUrls: ['./documentation-page.component.scss'],
})
export class NxvDocumentationComponent implements OnDestroy {
    constructor(public componentService: ComponentService, public documentationFrame: DocumentationFrameComponent) {}

    ngOnDestroy() {
        this.componentService.current.next();
    }

    mainContentClicked() {
        this.documentationFrame.mobileSidebar = false;
    }
}
