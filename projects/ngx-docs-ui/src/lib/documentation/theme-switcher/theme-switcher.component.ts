import { NxButtonModule } from '@allianz/ng-aquila/button';
import { NxContextMenuModule } from '@allianz/ng-aquila/context-menu';
import { NxIconModule, NxIconRegistry } from '@allianz/ng-aquila/icon';
import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';

import { Theme } from './theme-switcher.service';

@Component({
  selector: 'nxv-theme-switch',
  templateUrl: 'theme-switcher.component.html',
  styleUrls: ['theme-switcher.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxButtonModule, NxContextMenuModule, NxIconModule],
})
export class NxvThemeSwitcherComponent {
  _themeSwitchIsOpened = false;

  readonly themes = input<Theme[]>([]);

  readonly selectedTheme = model.required<Theme>();
  readonly selectedGridType = model<'default' | 'functional'>('default');

  constructor(private readonly iconRegistry: NxIconRegistry) {
    this.iconRegistry.registerFont('fa', 'fas', 'fa-');
    this.iconRegistry.addFontIcon('fill-drip', 'fill-drip', 'fa');
  }

  select(theme: Theme) {
    this.selectedTheme.set(theme);
  }

  selectGridType(gridType: 'default' | 'functional') {
    this.selectedGridType.set(gridType);
  }
}
