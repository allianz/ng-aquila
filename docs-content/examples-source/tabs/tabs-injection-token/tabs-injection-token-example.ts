import { Component } from '@angular/core';
import {
    NxTabComponent,
    NxTabGroupComponent,
    TAB_GROUP_DEFAULT_OPTIONS,
    TabGroupDefaultOptions,
} from '@aposin/ng-aquila/tabs';

const myDefaultOptions: TabGroupDefaultOptions = {
    appearance: 'expert',
};

/**
 * @title Injection token for tab group
 */
@Component({
    selector: 'tabs-injection-token-example',
    templateUrl: './tabs-injection-token-example.html',
    styleUrls: ['./tabs-injection-token-example.css'],
    providers: [
        { provide: TAB_GROUP_DEFAULT_OPTIONS, useValue: myDefaultOptions },
    ],
    standalone: true,
    imports: [NxTabGroupComponent, NxTabComponent],
})
export class TabsInjectionTokenExampleComponent {
    currentIndex = 0;
}
