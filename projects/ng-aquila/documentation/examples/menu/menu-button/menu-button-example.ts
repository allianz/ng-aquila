import { Component } from '@angular/core';
import { NxIconComponent } from '@aposin/ng-aquila/icon';
import {
    NxMenuButtonComponent,
    NxMenuButtonIconDirective,
} from '@aposin/ng-aquila/menu';

/**
 * @title Menu button variations
 */
@Component({
    selector: 'menu-button-example',
    templateUrl: 'menu-button-example.html',
    styleUrls: ['menu-button-example.css'],
    imports: [
        NxMenuButtonComponent,
        NxIconComponent,
        NxMenuButtonIconDirective,
    ],
})
export class MenuButtonExampleComponent {
    primaryExpanded = false;
    secondaryExpanded = false;
}
