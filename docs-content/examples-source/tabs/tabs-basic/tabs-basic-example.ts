import { Component } from '@angular/core';
import { NxCopytextComponent } from '@aposin/ng-aquila/copytext';
import { NxHeadlineComponent } from '@aposin/ng-aquila/headline';
import { NxTabComponent, NxTabGroupComponent } from '@aposin/ng-aquila/tabs';

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
