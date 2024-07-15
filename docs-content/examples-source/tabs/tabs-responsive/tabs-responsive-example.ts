import { Component } from '@angular/core';
import { NxHeadlineComponent } from '@aposin/ng-aquila/headline';
import { NxTabComponent, NxTabGroupComponent } from '@aposin/ng-aquila/tabs';

/**
 * @title Responsive behavior
 */
@Component({
    selector: 'tabs-responsive-example',
    templateUrl: './tabs-responsive-example.html',
    styleUrls: ['./tabs-responsive-example.css'],
    standalone: true,
    imports: [NxHeadlineComponent, NxTabGroupComponent, NxTabComponent],
})
export class TabsResponsiveExampleComponent {}
