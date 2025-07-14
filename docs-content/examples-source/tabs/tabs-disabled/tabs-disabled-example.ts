import { NxHeadlineComponent } from '@allianz/ng-aquila/headline';
import { NxTabComponent, NxTabGroupComponent } from '@allianz/ng-aquila/tabs';
import { Component } from '@angular/core';

/**
 * @title Disabled tabs and tab groups
 */
@Component({
  selector: 'tabs-disabled-example',
  templateUrl: './tabs-disabled-example.html',
  styleUrls: ['./tabs-disabled-example.css'],
  imports: [NxHeadlineComponent, NxTabGroupComponent, NxTabComponent],
})
export class TabsDisabledExampleComponent {}
