import { Component } from '@angular/core';

/**
 * @title Disabled tooltip
 */
@Component({
  styleUrls: ['./tooltip-disabled-example.css'],
  templateUrl: './tooltip-disabled-example.html'
})
export class TooltipDisabledExampleComponent {
  disabled: boolean = false;

  toggle() {
    this.disabled = !this.disabled;
  }
}
