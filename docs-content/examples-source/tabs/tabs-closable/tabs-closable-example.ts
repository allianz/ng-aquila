import { NxButtonComponent } from '@allianz/ng-aquila/button';
import { NxTabComponent, NxTabGroupComponent } from '@allianz/ng-aquila/tabs';
import { Component } from '@angular/core';

/**
 * @title Closable tabs
 */
@Component({
  selector: 'tabs-closable-example',
  templateUrl: './tabs-closable-example.html',
  styleUrls: ['./tabs-closable-example.css'],
  imports: [NxTabGroupComponent, NxTabComponent, NxButtonComponent],
})
export class TabsClosableExampleComponent {
  tabs = [
    { label: 'First tab', disabled: false },
    { label: 'Second tab', disabled: false },
    { label: 'Third tab', disabled: true },
  ];

  closeTab(index: number) {
    this.tabs = this.tabs.filter((_, i) => i !== index);
  }

  resetTabs() {
    this.tabs = [
      { label: 'First tab', disabled: false },
      { label: 'Second tab', disabled: false },
      { label: 'Third tab', disabled: true },
    ];
  }
}
