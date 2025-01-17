import { Component } from '@angular/core';
import {
    NxAnchorButtonComponent,
    NxAnchorIconButtonComponent,
} from '@aposin/ng-aquila/button';
import { NxIconComponent } from '@aposin/ng-aquila/icon';

/**
 * @title Anchor Button Example
 */
@Component({
    selector: 'anchor-button-example',
    templateUrl: './anchor-button-example.html',
    styleUrls: ['./anchor-button-example.css'],
    imports: [
        NxAnchorButtonComponent,
        NxIconComponent,
        NxAnchorIconButtonComponent,
    ],
})
export class AnchorButtonExampleComponent {}
