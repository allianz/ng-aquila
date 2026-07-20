import { NxButtonModule } from '@allianz/ng-aquila/button';
import { NxContextMenuModule } from '@allianz/ng-aquila/context-menu';
import { NxIconModule, NxIconRegistry } from '@allianz/ng-aquila/icon';
import { ChangeDetectionStrategy, Component, inject, input, model } from '@angular/core';

import { Theme, ThemeSwitcherService } from './theme-switcher.service';

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

  private readonly _themeSwitcherService = inject(ThemeSwitcherService);
  readonly isThemeLoading = this._themeSwitcherService.isThemeLoading;

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
