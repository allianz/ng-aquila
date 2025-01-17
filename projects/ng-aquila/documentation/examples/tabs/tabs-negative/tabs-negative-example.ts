import { Component } from '@angular/core';
import { NxTabComponent, NxTabGroupComponent } from '@aposin/ng-aquila/tabs';

/**
 * @title Negative styling
 */
@Component({
    selector: 'tabs-negative-example',
    templateUrl: './tabs-negative-example.html',
    styleUrls: ['./tabs-negative-example.css'],
    imports: [NxTabGroupComponent, NxTabComponent],
})
export class TabsNegativeExampleComponent {}
