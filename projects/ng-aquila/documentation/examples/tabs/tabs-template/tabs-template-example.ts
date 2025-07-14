import { NxIconComponent } from '@allianz/ng-aquila/icon';
import {
  NxTabComponent,
  NxTabGroupComponent,
  NxTabLabelDirective,
} from '@allianz/ng-aquila/tabs';
import { Component } from '@angular/core';

/**
 * @title Using templates for labels
 */
@Component({
  selector: 'tabs-template-example',
  templateUrl: './tabs-template-example.html',
  styleUrls: ['./tabs-template-example.css'],
  imports: [
    NxTabGroupComponent,
    NxTabComponent,
    NxTabLabelDirective,
    NxIconComponent,
  ],
})
export class TabsTemplateExampleComponent {
  currentIndex = 0;
}
