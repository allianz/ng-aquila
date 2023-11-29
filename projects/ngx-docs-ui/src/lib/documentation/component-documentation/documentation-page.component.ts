import { Component, OnDestroy } from '@angular/core';
import { ThemeSwitcherService } from '@aposin/ngx-docs-ui';

import { ComponentService } from '../../service/component.service';
import { DocumentationFrameComponent } from '../documentation-frame.component';

@Component({
    selector: 'nxv-documentation',
    templateUrl: 'documentation-page.component.html',
    styleUrls: ['./documentation-page.component.scss'],
})
export class NxvDocumentationComponent implements OnDestroy {
    constructor(
        readonly componentService: ComponentService,
        readonly documentationFrame: DocumentationFrameComponent,
        readonly themeSwitcherService: ThemeSwitcherService,
    ) {}

    ngOnDestroy(): void {
        this.componentService.current.next();
    }

    mainContentClicked() {
        this.documentationFrame.mobileSidebar = false;
    }
}
