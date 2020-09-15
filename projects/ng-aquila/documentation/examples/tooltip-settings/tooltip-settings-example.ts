import { Component } from '@angular/core';
import {
  NX_TOOLTIP_DEFAULT_OPTIONS,
  NxTooltipDefaultOptions
} from '@aposin/ng-aquila/tooltip';

const myDefaultOptions: NxTooltipDefaultOptions = {
  position: 'right',
  showDelay: 500,
  hideDelay: 0,
  touchendHideDelay: 1500
};

/**
 * @title Tooltip global settings
 */
@Component({
  styleUrls: ['./tooltip-settings-example.css'],
  templateUrl: './tooltip-settings-example.html',
  providers: [
    { provide: NX_TOOLTIP_DEFAULT_OPTIONS, useValue: myDefaultOptions }
  ]
})
export class TooltipSettingsExampleComponent {
}
