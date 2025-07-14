import { NxTabComponent, NxTabGroupComponent } from '@allianz/ng-aquila/tabs';
import { Component } from '@angular/core';

/**
 * @title Tab group appearance
 */
@Component({
  selector: 'tabs-appearance-example',
  templateUrl: './tabs-appearance-example.html',
  styleUrls: ['./tabs-appearance-example.css'],
  imports: [NxTabGroupComponent, NxTabComponent],
})
export class TabsAppearanceExampleComponent {
  currentIndex = 0;
}
