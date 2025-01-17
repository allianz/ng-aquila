import { Component } from '@angular/core';
import { NxCopytextComponent } from '@aposin/ng-aquila/copytext';
import { NxHeadlineComponent } from '@aposin/ng-aquila/headline';
import {
    NxTabComponent,
    NxTabContentDirective,
    NxTabGroupComponent,
} from '@aposin/ng-aquila/tabs';

/** @title Lazy loading content */
@Component({
    selector: 'tabs-lazy-example',
    templateUrl: './tabs-lazy-example.html',
    styleUrls: ['./tabs-lazy-example.css'],
    imports: [
        NxTabGroupComponent,
        NxTabComponent,
        NxTabContentDirective,
        NxHeadlineComponent,
        NxCopytextComponent,
    ],
})
export class TabsLazyExampleComponent {}
