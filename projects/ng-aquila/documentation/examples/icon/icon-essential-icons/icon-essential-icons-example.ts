import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { DEFAULT_ICONS, NxIconComponent } from '@aposin/ng-aquila/icon';

/**
 * @title Essential Icons Example
 */
@Component({
    selector: 'icon-essential-icons-example',
    templateUrl: './icon-essential-icons-example.html',
    styleUrls: ['./icon-essential-icons-example.css'],
    standalone: true,
    imports: [NgFor, NxIconComponent],
})
export class IconEssentialIconsExampleComponent {
    iconList = Object.keys(DEFAULT_ICONS);
}
