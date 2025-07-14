import { NxIconButtonComponent } from '@allianz/ng-aquila/button';
import { NxIconComponent } from '@allianz/ng-aquila/icon';
import { NxIndicatorComponent } from '@allianz/ng-aquila/indicator';
import { Component } from '@angular/core';

/**
 * @title Icon button with indicators
 */
@Component({
  selector: 'button-icon-indicator-example',
  templateUrl: './button-icon-indicator-example.html',
  styleUrls: ['./button-icon-indicator-example.css'],
  imports: [NxIconButtonComponent, NxIconComponent, NxIndicatorComponent],
})
export class ButtonIconIndicatorExampleComponent {}
