import { Component, OnInit, OnDestroy } from '@angular/core';
import { ComponentService } from '../../service/component.service';
import { DocumentationFrameComponent } from '../documentation-frame.component';

@Component({
    selector: 'nxv-documentation',
    templateUrl: 'documentation-page.component.html',
    styleUrls: ['./documentation-page.component.scss'],
})
export class NxvDocumentationComponent implements OnInit, OnDestroy {
    constructor(public componentService: ComponentService, public documentationFrame: DocumentationFrameComponent) {}

    ngOnInit() {}

    ngOnDestroy() {
        this.componentService.current.next();
    }

    mainContentClicked() {
        this.documentationFrame.mobileSidebar = false;
    }
}
