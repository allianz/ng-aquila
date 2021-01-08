import { Component, OnInit } from '@angular/core';

/**
* @title Indicator Example
*/
@Component({
  selector: 'action-indicator-example',
  styleUrls: ['./action-indicator-example.css'],
  templateUrl: './action-indicator-example.html'
})
export class ActionIndicatorExampleComponent implements OnInit {
  actions = [
    {
      icon: 'file-text',
      label: 'All Files',
      notification: false
    },
    {
      icon: 'calendar',
      label: 'Calendar',
      notification: true
    },
    {
      icon: 'mail-o',
      label: 'Email',
      notification: true,
      notificationCount: 105
    },
    {
      icon: 'user-o',
      label: 'My Profile',
      notification: true,
      notificationCount: 4
    },
    {
      icon: 'file',
      label: 'Recent Downloads'
    }
  ];

  selectedAction;

  ngOnInit() {
    this.selectedAction = this.actions[0];
  }

  onSelect(action) {
    this.selectedAction = action;
    if (this.selectedAction.notification) {
      this.selectedAction.notification = false;
    }
    if (this.selectedAction.notificationCount) {
      this.selectedAction.notificationCount = 0;
    }
  }

  getIndicatorText(notificationCount: number) {
    if (!notificationCount) {
      return '';
    }
    return notificationCount > 99 ? '99+' : notificationCount;
  }

  getAriaLabel(notificationCount: number) {
    if (!notificationCount) {
      return 'new notifications available';
    }
    return `${notificationCount} new notifications available`;
  }
}
