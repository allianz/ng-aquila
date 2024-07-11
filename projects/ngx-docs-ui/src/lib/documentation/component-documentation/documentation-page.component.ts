import { CdkScrollable } from '@angular/cdk/scrolling';
import { Component, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NxGridModule } from '@aposin/ng-aquila/grid';
import { NxSidebarModule } from '@aposin/ng-aquila/sidebar';
import { ThemeSwitcherService } from '@aposin/ngx-docs-ui';

import { ComponentService } from '../../service/component.service';
import { DocumentationFrameComponent } from '../documentation-frame.component';
import { NxvFooterComponent } from './footer/footer.component';
import { NavigationComponent } from './navigation/navigation.component';

@Component({
    selector: 'nxv-documentation',
    templateUrl: 'documentation-page.component.html',
    styleUrls: ['./documentation-page.component.scss'],
    standalone: true,
    imports: [NxSidebarModule, NavigationComponent, CdkScrollable, NxGridModule, RouterOutlet, NxvFooterComponent],
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
