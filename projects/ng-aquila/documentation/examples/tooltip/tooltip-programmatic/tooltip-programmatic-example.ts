import { NxBadgeComponent } from '@allianz/ng-aquila/badge';
import { NxButtonComponent } from '@allianz/ng-aquila/button';
import {
  NxTooltipDirective,
  NxTooltipDirective as NxTooltipDirective_1,
} from '@allianz/ng-aquila/tooltip';
import { Component, ViewChild } from '@angular/core';

/**
 * @title Tooltip programmatic toggling
 */
@Component({
  selector: 'tooltip-programmatic-example',
  templateUrl: './tooltip-programmatic-example.html',
  styleUrls: ['./tooltip-programmatic-example.css'],
  imports: [NxButtonComponent, NxBadgeComponent, NxTooltipDirective_1],
})
export class TooltipProgrammaticExampleComponent {
  @ViewChild(NxTooltipDirective, { static: true })
  tooltip!: NxTooltipDirective;

  toggle() {
    this.tooltip.toggle();
  }
}
