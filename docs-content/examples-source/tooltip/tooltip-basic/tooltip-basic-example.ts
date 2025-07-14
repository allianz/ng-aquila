import { NxBadgeComponent } from '@allianz/ng-aquila/badge';
import { NxTooltipDirective } from '@allianz/ng-aquila/tooltip';
import { Component } from '@angular/core';

/**
 * @title Tooltip
 */
@Component({
  selector: 'tooltip-basic-example',
  templateUrl: './tooltip-basic-example.html',
  styleUrls: ['./tooltip-basic-example.css'],
  imports: [NxBadgeComponent, NxTooltipDirective],
})
export class TooltipBasicExampleComponent {}
