import { Component } from '@angular/core';
import { NxButtonComponent } from '@aposin/ng-aquila/button';
import { NxTabComponent, NxTabGroupComponent } from '@aposin/ng-aquila/tabs';

/**
 * @title Dynamically adding and removing tabs
 */
@Component({
    selector: 'tabs-dynamic-example',
    templateUrl: './tabs-dynamic-example.html',
    styleUrls: ['./tabs-dynamic-example.css'],
    standalone: true,
    imports: [NxTabGroupComponent, NxTabComponent, NxButtonComponent],
})
export class TabsDynamicExampleComponent {
    tabs = ['one', 'two', 'three'];

    addTab(text: string) {
        this.tabs = [...this.tabs, text];
    }

    removeTab(index: number) {
        this.tabs.splice(index, 1);
    }
}
