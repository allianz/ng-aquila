import { NxBadgeModule } from '@allianz/ng-aquila/badge';
import { NxIconComponent } from '@allianz/ng-aquila/icon';
import { NxLinkComponent } from '@allianz/ng-aquila/link';
import { NxMessageModule } from '@allianz/ng-aquila/message';
import { NxTabsModule } from '@allianz/ng-aquila/tabs';
import { ThemeSwitcherService } from '@allianz/ngx-docs-ui';
import { AsyncPipe } from '@angular/common';
import { Component, computed, Inject, OnDestroy, Optional } from '@angular/core';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { Subject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';

import { ComponentDescriptor } from '../../../core/manifest';
import { NXV_FEEDBACK_LINKS } from '../../../core/tokens';
import { ComponentService } from '../../../service/component.service';
import { ManifestService } from '../../../service/manifest.service';

export interface DocItem {
  id: string;
  name: string;
  packageName?: string;
  examples?: string[];
}

@Component({
  selector: 'nxv-single-component',
  templateUrl: 'component-page.html',
  styleUrls: ['component-page.scss'],
  imports: [
    NxMessageModule,
    NxBadgeModule,
    NxTabsModule,
    RouterLinkActive,
    RouterLink,
    RouterOutlet,
    AsyncPipe,
    NxLinkComponent,
    NxIconComponent,
  ],
})
export class NxvComponentPage implements OnDestroy {
  protected componentDescriptor: ComponentDescriptor | null | undefined;

  tabs = [
    {
      label: 'overview',
      path: 'overview',
      show: true,
    },
    {
      label: 'api',
      path: 'api',
      show: true,
    },
    {
      label: 'examples',
      path: 'examples',
      show: true,
    },
  ];

  private readonly _destroyed = new Subject<void>();

  protected readonly aquilaThemeActive = computed(() =>
    this.themeSwitcherService.selectedTheme().name.includes('aquila'),
  );

  constructor(
    private readonly _route: ActivatedRoute,
    private readonly router: Router,
    private readonly manifestService: ManifestService,
    readonly componentService: ComponentService,
    readonly themeSwitcherService: ThemeSwitcherService,
    @Optional() @Inject(NXV_FEEDBACK_LINKS) readonly feedbackLinks: any | null,
  ) {
    // Listen to changes on the current route for the doc id (e.g. button/checkbox) and the
    // parent route for the section (material/cdk).
    _route.params
      .pipe(
        map((param) => param.id),
        takeUntil(this._destroyed),
      )
      .subscribe((id) => {
        if (this.manifestService.hasComponent(id)) {
          componentService.current.next(this.manifestService.getComponent(id));
        } else {
          // go to overview if not found
          this.router.navigate(['/']);
        }
      });

    componentService.current
      .pipe(
        filter((current) => Boolean(current)),
        takeUntil(this._destroyed),
      )
      .subscribe((component) => {
        this.componentDescriptor = component;
        const apiTab = this.tabs.find((tab) => tab.label === 'api');
        if (apiTab) {
          apiTab.show = !component?.noApi;
        }
      });
  }

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }

  get activeTabs() {
    return this.tabs.filter((tab) => tab.show);
  }
}
