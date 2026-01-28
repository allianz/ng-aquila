import { NxButtonBase } from '@allianz/ng-aquila/button';
import { NxIconModule } from '@allianz/ng-aquila/icon';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { NxSidebarComponent } from './sidebar.component';

@Component({
  selector: 'button[nxSidebarToggle]',
  templateUrl: './sidebar-toggle.html',
  styleUrls: ['../button/button.scss', './sidebar-toggle.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'nx-sidebar__toggle-button',
    '(click)': 'toggle()',
  },
  imports: [NxIconModule],
})
export class NxSidebarToggleComponent extends NxButtonBase {
  private readonly _sidebar = inject(NxSidebarComponent, { optional: true, host: true });

  // eslint-disable-next-line @angular-eslint/prefer-inject
  constructor(...args: unknown[]);
  constructor() {
    super();
    this.classNames = 'tertiary small-medium';
  }

  toggle() {
    if (this._sidebar) {
      this._sidebar.toggle();
    }
  }
}
