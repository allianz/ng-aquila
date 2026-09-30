import { NxActionComponent } from '@allianz/ng-aquila/action';
import {
  NxSidebarComponent,
  NxSidebarFooterComponent,
  NxSidebarToggleComponent,
} from '@allianz/ng-aquila/sidebar';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { PLAYGROUND_PAGES, PlaygroundGroup } from './playground-pages';

interface NavGroup {
  readonly group: PlaygroundGroup;
  readonly title: string;
  readonly pages: readonly { readonly id: string; readonly title: string }[];
}

@Component({
  selector: 'ssr-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    NxSidebarComponent,
    NxSidebarFooterComponent,
    NxSidebarToggleComponent,
    NxActionComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  protected readonly _navGroups: readonly NavGroup[] = [
    { group: 'form-controls', title: 'Form controls' },
    { group: 'components', title: 'Other components' },
  ].map(({ group, title }) => ({
    group: group as PlaygroundGroup,
    title,
    pages: PLAYGROUND_PAGES.filter((page) => page.group === group).map(({ id, title: t }) => ({
      id,
      title: t,
    })),
  }));
}
