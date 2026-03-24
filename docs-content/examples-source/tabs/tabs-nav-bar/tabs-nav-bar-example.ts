import {
  NxTabLinkDirective,
  NxTabNavBarComponent,
} from '@allianz/ng-aquila/tabs';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * @title Tabs Navbar
 */
@Component({
  selector: 'tabs-nav-bar-example',
  templateUrl: './tabs-nav-bar-example.html',
  styleUrls: ['./tabs-nav-bar-example.css'],
  imports: [NxTabNavBarComponent, NxTabLinkDirective, RouterLink],
})
export class TabsNavBarExampleComponent {
  links = [
    {
      label: 'Subpage 1',
      path: '...',
      disabled: false,
    },
    {
      label: 'Subpage 2',
      path: '...',
      disabled: false,
    },
    {
      label: 'Subpage 3',
      path: '...',
      disabled: true,
    },
    {
      label: 'Subpage 4',
      path: '...',
      disabled: false,
    },
    {
      label: 'Subpage 5',
      path: '...',
      disabled: false,
    },
    {
      label: 'Subpage 6',
      path: '...',
      disabled: true,
    },
    {
      label: 'Subpage 7',
      path: '...',
      disabled: false,
    },
    {
      label: 'Subpage 8',
      path: '...',
      disabled: false,
    },
  ];

  currentLink = this.links[0];

  setActiveLink(link: any) {
    if (!link.disabled) {
      this.currentLink = link;
    }
  }
}
