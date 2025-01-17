import { Component } from '@angular/core';
import { NxIconComponent } from '@aposin/ng-aquila/icon';
import {
    NxTabComponent,
    NxTabGroupComponent,
    NxTabLabelDirective,
} from '@aposin/ng-aquila/tabs';

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
