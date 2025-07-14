import { NxIconComponent } from '@allianz/ng-aquila/icon';
import {
  NxMenuButtonComponent,
  NxMenuButtonIconDirective,
} from '@allianz/ng-aquila/menu';
import { Component } from '@angular/core';

/**
 * @title Menu button variations
 */
@Component({
  selector: 'menu-button-example',
  templateUrl: 'menu-button-example.html',
  styleUrls: ['menu-button-example.css'],
  imports: [NxMenuButtonComponent, NxIconComponent, NxMenuButtonIconDirective],
})
export class MenuButtonExampleComponent {
  primaryExpanded = false;
  secondaryExpanded = false;
}
