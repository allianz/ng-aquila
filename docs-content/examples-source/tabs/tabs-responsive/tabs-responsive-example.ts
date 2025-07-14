import { NxHeadlineComponent } from '@allianz/ng-aquila/headline';
import { NxTabComponent, NxTabGroupComponent } from '@allianz/ng-aquila/tabs';
import { Component } from '@angular/core';

/**
 * @title Responsive behavior
 */
@Component({
  selector: 'tabs-responsive-example',
  templateUrl: './tabs-responsive-example.html',
  styleUrls: ['./tabs-responsive-example.css'],
  imports: [NxHeadlineComponent, NxTabGroupComponent, NxTabComponent],
})
export class TabsResponsiveExampleComponent {}
