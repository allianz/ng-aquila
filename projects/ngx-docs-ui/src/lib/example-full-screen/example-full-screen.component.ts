import { NxButtonModule } from '@allianz/ng-aquila/button';
import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NxvThemeSwitcherComponent } from '../documentation/theme-switcher/theme-switcher.component';
import {
  GridType,
  ThemeSwitcherService,
} from '../documentation/theme-switcher/theme-switcher.service';
import { LazyExampleOutletComponent } from '../lazy-example-outlet/lazy-example-outlet.component';

type ExampleBackgroundType = '' | 'blank';

@Component({
  templateUrl: './example-full-screen.component.html',
  styleUrls: ['./example-full-screen.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxButtonModule, LazyExampleOutletComponent, NxvThemeSwitcherComponent],
})
export class ExampleFullScreenComponent {
  example: string;

  showNav = true;

  @HostBinding('class') background: ExampleBackgroundType = '';

  constructor(
    _route: ActivatedRoute,
    protected readonly _themeSwitcherService: ThemeSwitcherService,
    readonly _location: Location,
  ) {
    const routeSnapshot = _route.snapshot;
    this.example = routeSnapshot.params.id;

    if (routeSnapshot.queryParamMap.has('nav')) {
      this.showNav = routeSnapshot.queryParamMap.get('nav') === 'true';
    }

    if (routeSnapshot.queryParamMap.has('bg')) {
      this.background = routeSnapshot.queryParamMap.get('bg') as ExampleBackgroundType;
    }

    const themeName = routeSnapshot.queryParamMap.get('theme');
    const selectedTheme = _themeSwitcherService.get(themeName!);
    if (selectedTheme) {
      _themeSwitcherService.switchTheme(selectedTheme);
    }

    const gridTypeQuery = routeSnapshot.queryParamMap.get('gridType') as GridType | null;
    const gridTypeFromQuery =
      gridTypeQuery === 'default' || gridTypeQuery === 'functional' ? gridTypeQuery : undefined;
    if (gridTypeFromQuery) {
      _themeSwitcherService.switchGridType(gridTypeFromQuery);
    }
  }
}
