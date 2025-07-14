import { DEFAULT_ICONS, NxIconComponent } from '@allianz/ng-aquila/icon';
import { Component } from '@angular/core';

/**
 * @title Essential Icons Example
 */
@Component({
  selector: 'icon-essential-icons-example',
  templateUrl: './icon-essential-icons-example.html',
  styleUrls: ['./icon-essential-icons-example.css'],
  imports: [NxIconComponent],
})
export class IconEssentialIconsExampleComponent {
  iconList = Object.keys(DEFAULT_ICONS);
}
