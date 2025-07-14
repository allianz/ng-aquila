import { NxCopytextComponent } from '@allianz/ng-aquila/copytext';
import { NxHeadlineComponent } from '@allianz/ng-aquila/headline';
import { NxTabComponent, NxTabGroupComponent } from '@allianz/ng-aquila/tabs';
import { Component } from '@angular/core';

/**
 * @title Basic tab group
 */
@Component({
  selector: 'tabs-basic-example',
  templateUrl: './tabs-basic-example.html',
  styleUrls: ['./tabs-basic-example.css'],
  imports: [
    NxTabGroupComponent,
    NxTabComponent,
    NxHeadlineComponent,
    NxCopytextComponent,
  ],
})
export class TabsBasicExampleComponent {
  currentIndex = 0;
}
