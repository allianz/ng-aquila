import { Component } from '@angular/core';
import { NxHeadlineComponent } from '@aposin/ng-aquila/headline';
import { NxTabComponent, NxTabGroupComponent } from '@aposin/ng-aquila/tabs';

/**
 * @title Disabled tabs and tab groups
 */
@Component({
    selector: 'tabs-disabled-example',
    templateUrl: './tabs-disabled-example.html',
    styleUrls: ['./tabs-disabled-example.css'],
    imports: [NxHeadlineComponent, NxTabGroupComponent, NxTabComponent],
})
export class TabsDisabledExampleComponent {}
