import { Component, ViewChild } from '@angular/core';
import { NxTooltipDirective } from '@aposin/ng-aquila/tooltip';

/**
 * @title Tooltip programmatic toggling
 */
@Component({
  styleUrls: ['./tooltip-programmatic-example.css'],
  templateUrl: './tooltip-programmatic-example.html'
})
export class TooltipProgrammaticExampleComponent {
  @ViewChild(NxTooltipDirective, { static: true }) tooltip: NxTooltipDirective;

  toggle() {
    this.tooltip.toggle();
  }
}
