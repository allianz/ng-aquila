import { NxBadgeComponent } from '@allianz/ng-aquila/badge';
import {
  NxTooltipDirective,
  TooltipPosition,
} from '@allianz/ng-aquila/tooltip';
import { Component } from '@angular/core';

/**
 * @title Tooltip positions
 */
@Component({
  selector: 'tooltip-positions-example',
  templateUrl: './tooltip-positions-example.html',
  styleUrls: ['./tooltip-positions-example.css'],
  imports: [NxBadgeComponent, NxTooltipDirective],
})
export class TooltipPositionsExampleComponent {
  positions: TooltipPosition[];

  constructor() {
    this.positions = ['top', 'right', 'bottom', 'left'];
  }
}
