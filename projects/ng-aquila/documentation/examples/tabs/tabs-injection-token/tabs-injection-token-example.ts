import { Component } from '@angular/core';
import { TabGroupDefaultOptions, TAB_GROUP_DEFAULT_OPTIONS } from '@aposin/ng-aquila/tabs';

const myDefaultOptions: TabGroupDefaultOptions = {
  appearance: 'expert'
};

/**
 * @title Injection token for tab group
 */
@Component({
  templateUrl: './tabs-injection-token-example.html',
  styleUrls: ['./tabs-injection-token-example.css'],
  providers: [
    { provide: TAB_GROUP_DEFAULT_OPTIONS, useValue: myDefaultOptions },
  ]
})
export class TabsInjectionTokenExampleComponent {
  currentIndex: number;
}
