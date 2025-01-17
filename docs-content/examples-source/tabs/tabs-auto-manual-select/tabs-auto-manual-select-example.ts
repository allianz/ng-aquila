import { Component } from '@angular/core';
import { NxButtonComponent } from '@aposin/ng-aquila/button';
import { NxHeadlineComponent } from '@aposin/ng-aquila/headline';
import { NxTabComponent, NxTabGroupComponent } from '@aposin/ng-aquila/tabs';

/**
 * @title Auto and manual select
 */
@Component({
    selector: 'tabs-auto-manual-select-example',
    templateUrl: './tabs-auto-manual-select-example.html',
    styleUrls: ['./tabs-auto-manual-select-example.css'],
    imports: [
        NxTabGroupComponent,
        NxTabComponent,
        NxHeadlineComponent,
        NxButtonComponent,
    ],
})
export class TabsAutoManualSelectExampleComponent {
    autoselect = true;

    toggleAutoselect() {
        this.autoselect = !this.autoselect;
    }
}
