import { Component } from '@angular/core';
import { NxCopytextComponent } from '@aposin/ng-aquila/copytext';
import { NxHeadlineComponent } from '@aposin/ng-aquila/headline';
import { NxTabComponent, NxTabGroupComponent } from '@aposin/ng-aquila/tabs';

/**
 * @title Changing the styles
 */
@Component({
    selector: 'tabs-styling-example',
    templateUrl: './tabs-styling-example.html',
    styleUrls: ['./tabs-styling-example.css'],
    standalone: true,
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
