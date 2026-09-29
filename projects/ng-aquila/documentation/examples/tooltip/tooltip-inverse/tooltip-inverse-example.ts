import { NxButtonModule } from '@allianz/ng-aquila/button';
import { NxTooltipDirective } from '@allianz/ng-aquila/tooltip';
import { Component } from '@angular/core';

/**
 * @title Inverse styling example
 */
@Component({
  selector: 'tooltip-inverse-example',
  templateUrl: './tooltip-inverse-example.html',
  styleUrls: ['./tooltip-inverse-example.css'],
  imports: [NxButtonModule, NxTooltipDirective],
})
export class TooltipInverseExampleComponent {}
