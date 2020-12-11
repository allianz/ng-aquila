import { Component } from '@angular/core';

/**
 * @title Tabs Navbar with Indicators
 */
@Component({
  styleUrls: ['./tabs-nav-bar-with-indicator-example.css'],
  templateUrl: './tabs-nav-bar-with-indicator-example.html',
})
export class TabsNavBarWithIndicatorExampleComponent {

  links = [
    {
      label: 'First tab',
      path: '...',
      notification: false
    },
    {
      label: 'Second tab',
      path: '...',
      notification: true
    },
    {
      label: 'Third tab',
      path: '...',
      notification: true,
      notificationCount: 5
    }
  ];

  currentLink = this.links[0];

  setActiveLink(link) {
    this.currentLink = link;
    this.currentLink.notification = false;
    if (this.currentLink.notificationCount) {
      this.currentLink.notificationCount = 0;
    }
  }

  getAriaLabel(notificationCount: number) {
    if (!notificationCount) {
      return 'new notifications available';
    }
    return `${notificationCount} new notifications available`;
  }
}
