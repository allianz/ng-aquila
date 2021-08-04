import { Component, OnInit } from '@angular/core';

type Action = {
  icon: string;
  label: string;
  notification?: boolean;
  notificationCount?: number;
}

/**
* @title Indicator Example
*/
@Component({
  selector: 'action-indicator-example',
  styleUrls: ['./action-indicator-example.css'],
  templateUrl: './action-indicator-example.html'
})
export class ActionIndicatorExampleComponent implements OnInit {
  actions: Action[] = [
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

  selectedAction!: Action;

  ngOnInit() {
    this.selectedAction = this.actions[0];
  }

  onSelect(action: Action) {
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
