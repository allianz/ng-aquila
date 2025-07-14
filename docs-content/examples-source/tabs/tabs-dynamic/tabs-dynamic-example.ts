import { NxButtonComponent } from '@allianz/ng-aquila/button';
import { NxTabComponent, NxTabGroupComponent } from '@allianz/ng-aquila/tabs';
import { Component } from '@angular/core';

/**
 * @title Dynamically adding and removing tabs
 */
@Component({
  selector: 'tabs-dynamic-example',
  templateUrl: './tabs-dynamic-example.html',
  styleUrls: ['./tabs-dynamic-example.css'],
  imports: [NxTabGroupComponent, NxTabComponent, NxButtonComponent],
})
export class TabsDynamicExampleComponent {
  tabs = ['one', 'two', 'three'];

  addTab(text: string) {
    this.tabs = [...this.tabs, text];
  }

  removeTab(index: number) {
    this.tabs.splice(index, 1);
  }
}
