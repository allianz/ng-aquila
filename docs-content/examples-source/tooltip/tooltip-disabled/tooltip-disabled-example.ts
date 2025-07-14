import { NxButtonComponent } from '@allianz/ng-aquila/button';
import { NxTooltipDirective } from '@allianz/ng-aquila/tooltip';
import { Component } from '@angular/core';

/**
 * @title Disabled tooltip
 */
@Component({
  selector: 'tooltip-disabled-example',
  templateUrl: './tooltip-disabled-example.html',
  styleUrls: ['./tooltip-disabled-example.css'],
  imports: [NxButtonComponent, NxTooltipDirective],
})
export class TooltipDisabledExampleComponent {
  disabled = false;

  toggle() {
    this.disabled = !this.disabled;
  }
}
