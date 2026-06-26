import { NxGridModule } from '@allianz/ng-aquila/grid';
import { NxSidebarModule } from '@allianz/ng-aquila/sidebar';
import { ThemeSwitcherService } from '@allianz/ngx-docs-ui';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ComponentService } from '../../service/component.service';
import { DocumentationFrameComponent } from '../documentation-frame.component';
import { NxvFooterComponent } from './footer/footer.component';
import { NavigationComponent } from './navigation/navigation.component';

@Component({
  selector: 'nxv-documentation',
  templateUrl: 'documentation-page.component.html',
  styleUrls: ['./documentation-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    NxSidebarModule,
    NavigationComponent,
    CdkScrollable,
    NxGridModule,
    RouterOutlet,
    NxvFooterComponent,
  ],
})
export class NxvDocumentationComponent implements OnDestroy {
  constructor(
    readonly componentService: ComponentService,
    readonly documentationFrame: DocumentationFrameComponent,
    readonly themeSwitcherService: ThemeSwitcherService,
  ) {}

  ngOnDestroy(): void {
    this.componentService.current.next(null);
  }

  mainContentClicked() {
    this.documentationFrame.mobileSidebar = false;
  }
}
