import { Component } from '@angular/core';
import { DEFAULT_ICONS } from '@aposin/ng-aquila/icon';

/**
 * @title Essential Icons Example
 */
@Component({
    selector: 'icon-essential-icons-example',
    templateUrl: './icon-essential-icons-example.html',
    styleUrls: ['./icon-essential-icons-example.css'],
})
export class IconEssentialIconsExampleComponent {
    iconList = Object.keys(DEFAULT_ICONS);
}
