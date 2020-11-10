import { Component } from '@angular/core';
import { TabNavBarDefaultOptions, TAB_NAV_BAR_DEFAULT_OPTIONS } from '@aposin/ng-aquila/tabs';

const myDefaultOptions: TabNavBarDefaultOptions = {
  appearance: 'expert'
};

/**
 * @title Injection Token in Tabs Navbar
 */
@Component({
  templateUrl: './tabs-nav-bar-injection-token-example.html',
  providers: [
    { provide: TAB_NAV_BAR_DEFAULT_OPTIONS, useValue: myDefaultOptions }
  ]
})
export class TabsNavBarInjectionTokenExampleComponent {

  links = [
    {
      label: 'Subpage 1',
      path: '...',
      disabled: false
    },
    {
      label: 'Subpage 2',
      path: '...',
      disabled: false
    },
    {
      label: 'Subpage 3',
      path: '...',
      disabled: true
    }
  ];

  currentLink = this.links[0];

  setActiveLink(link) {
    if (!link.disabled) {
      this.currentLink = link;
    }
  }
}
