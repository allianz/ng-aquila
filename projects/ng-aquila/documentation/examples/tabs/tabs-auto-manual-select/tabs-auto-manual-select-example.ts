import { NxButtonComponent } from '@allianz/ng-aquila/button';
import { NxHeadlineComponent } from '@allianz/ng-aquila/headline';
import { NxTabComponent, NxTabGroupComponent } from '@allianz/ng-aquila/tabs';
import { Component } from '@angular/core';

/**
 * @title Auto and manual select
 */
@Component({
  selector: 'tabs-auto-manual-select-example',
  templateUrl: './tabs-auto-manual-select-example.html',
  styleUrls: ['./tabs-auto-manual-select-example.css'],
  imports: [
    NxTabGroupComponent,
    NxTabComponent,
    NxHeadlineComponent,
    NxButtonComponent,
  ],
})
export class TabsAutoManualSelectExampleComponent {
  autoselect = true;

  toggleAutoselect() {
    this.autoselect = !this.autoselect;
  }
}
