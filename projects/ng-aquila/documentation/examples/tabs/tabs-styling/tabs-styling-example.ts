import { NxCopytextComponent } from '@allianz/ng-aquila/copytext';
import { NxHeadlineComponent } from '@allianz/ng-aquila/headline';
import { NxTabComponent, NxTabGroupComponent } from '@allianz/ng-aquila/tabs';
import { Component } from '@angular/core';

/**
 * @title Changing the styles
 */
@Component({
  selector: 'tabs-styling-example',
  templateUrl: './tabs-styling-example.html',
  styleUrls: ['./tabs-styling-example.css'],
  imports: [
    NxTabGroupComponent,
    NxTabComponent,
    NxHeadlineComponent,
    NxCopytextComponent,
  ],
})
export class TabsStylingExampleComponent {
  currentIndex = 0;
}
