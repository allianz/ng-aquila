import {
    TAB_GROUP_DEFAULT_OPTIONS,
    TabGroupDefaultOptions,
} from '@allianz/ng-aquila/tabs';
import { Component } from '@angular/core';

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
})
export class TabsInjectionTokenExampleComponent {
    currentIndex = 0;
}
