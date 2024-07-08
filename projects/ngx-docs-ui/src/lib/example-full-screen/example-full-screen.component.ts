import { Location, NgIf } from '@angular/common';
import { Component, HostBinding } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NxButtonModule } from '@aposin/ng-aquila/button';

import { ThemeSwitcherService } from '../documentation/theme-switcher/theme-switcher.service';
import { LazyExampleOutletComponent } from '../lazy-example-outlet/lazy-example-outlet.component';

type ExampleBackgroundType = '' | 'blank';

@Component({
    templateUrl: './example-full-screen.component.html',
    styleUrls: ['./example-full-screen.component.scss'],
    standalone: true,
    imports: [NgIf, NxButtonModule, LazyExampleOutletComponent],
})
export class ExampleFullScreenComponent {
    example: string;

    showNav = true;

    @HostBinding('class') background: ExampleBackgroundType = '';

    constructor(
        _route: ActivatedRoute,
        _themeSwitcherService: ThemeSwitcherService,
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
    }
}
