import {
  NxColComponent,
  NxLayoutComponent,
  NxRowComponent,
} from '@allianz/ng-aquila/grid';
import { NxMessageComponent } from '@allianz/ng-aquila/message';
import { Component } from '@angular/core';

/**
 * @title High contrast svg example
 */
@Component({
  selector: 'accessibility-high-contrast-svg-example',
  templateUrl: './accessibility-high-contrast-svg-example.html',
  styleUrls: ['./accessibility-high-contrast-svg-example.css'],
  imports: [
    NxMessageComponent,
    NxLayoutComponent,
    NxRowComponent,
    NxColComponent,
  ],
})
export class AccessibilityHighContrastSvgExampleComponent {}
