import { NxIndicatorComponent } from '@allianz/ng-aquila/indicator';
import {
  NxTabComponent,
  NxTabGroupComponent,
  NxTabLabelDirective,
} from '@allianz/ng-aquila/tabs';
import { Component } from '@angular/core';

/**
 * @title Tab group with indicators
 */
@Component({
  selector: 'tabs-with-indicator-example',
  templateUrl: './tabs-with-indicator-example.html',
  styleUrls: ['./tabs-with-indicator-example.css'],
  imports: [
    NxTabGroupComponent,
    NxTabComponent,
    NxTabLabelDirective,
    NxIndicatorComponent,
  ],
})
export class TabsWithIndicatorExampleComponent {
  tabs = [
    {
      label: 'First tab',
      notification: false,
    },
    {
      label: 'Second tab',
      notification: true,
    },
    {
      label: 'Third tab',
      notification: true,
      notificationCount: 2,
    },
    {
      label: 'Fourth tab',
      notification: true,
      notificationCount: 105,
      disabled: true,
    },
  ];

  setSelectedTab(selectedTab: number) {
    this.tabs[selectedTab];
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
    return notificationCount > 99
      ? 'more than 99 new notifications available'
      : notificationCount + ' new notifications available';
  }
}
