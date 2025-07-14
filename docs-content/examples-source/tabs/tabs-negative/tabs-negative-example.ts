import { NxTabComponent, NxTabGroupComponent } from '@allianz/ng-aquila/tabs';
import { Component } from '@angular/core';

/**
 * @title Negative styling
 */
@Component({
  selector: 'tabs-negative-example',
  templateUrl: './tabs-negative-example.html',
  styleUrls: ['./tabs-negative-example.css'],
  imports: [NxTabGroupComponent, NxTabComponent],
})
export class TabsNegativeExampleComponent {}
