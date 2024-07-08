import { Component } from '@angular/core';
import { NxTabComponent, NxTabGroupComponent } from '@aposin/ng-aquila/tabs';

/**
 * @title Tab group appearance
 */
@Component({
    selector: 'tabs-appearance-example',
    templateUrl: './tabs-appearance-example.html',
    styleUrls: ['./tabs-appearance-example.css'],
    standalone: true,
    imports: [NxTabGroupComponent, NxTabComponent],
})
export class TabsAppearanceExampleComponent {
    currentIndex = 0;
}
