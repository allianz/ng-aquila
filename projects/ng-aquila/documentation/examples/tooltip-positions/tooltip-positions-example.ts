import { Component } from '@angular/core';
import { TooltipPosition } from '@aposin/ng-aquila/tooltip';

/**
 * @title Tooltip positions
 */
@Component({
  styleUrls: ['./tooltip-positions-example.css'],
  templateUrl: './tooltip-positions-example.html'
})
export class TooltipPositionsExampleComponent {
  positions: TooltipPosition[];

  constructor() {
    this.positions = ['top', 'right', 'bottom', 'left'];
  }
}
