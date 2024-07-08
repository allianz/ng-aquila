import { Component } from '@angular/core';
import {
    NxColComponent,
    NxLayoutComponent,
    NxRowComponent,
} from '@aposin/ng-aquila/grid';
import { NxMessageComponent } from '@aposin/ng-aquila/message';

/**
 * @title High contrast svg example
 */
@Component({
    selector: 'accessibility-high-contrast-svg-example',
    templateUrl: './accessibility-high-contrast-svg-example.html',
    styleUrls: ['./accessibility-high-contrast-svg-example.css'],
    standalone: true,
    imports: [
        NxMessageComponent,
        NxLayoutComponent,
        NxRowComponent,
        NxColComponent,
    ],
})
export class AccessibilityHighContrastSvgExampleComponent {}
