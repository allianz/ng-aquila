import { NxButtonComponent } from '@allianz/ng-aquila/button';
import { NxTooltipDirective } from '@allianz/ng-aquila/tooltip';
import { Component } from '@angular/core';

/**
 * @title Tooltip with delay
 */
@Component({
  selector: 'tooltip-delay-example',
  templateUrl: './tooltip-delay-example.html',
  styleUrls: ['./tooltip-delay-example.css'],
  imports: [NxButtonComponent, NxTooltipDirective],
})
export class TooltipDelayExampleComponent {}
