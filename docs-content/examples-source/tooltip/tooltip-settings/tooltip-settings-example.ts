import { Component } from '@angular/core';
import { NxBadgeComponent } from '@aposin/ng-aquila/badge';
import {
    NX_TOOLTIP_DEFAULT_OPTIONS,
    NxTooltipDefaultOptions,
    NxTooltipDirective,
} from '@aposin/ng-aquila/tooltip';

const myDefaultOptions: NxTooltipDefaultOptions = {
    position: 'right',
    showDelay: 500,
    hideDelay: 0,
    touchendHideDelay: 1500,
};

/**
 * @title Tooltip global settings
 */
@Component({
    selector: 'tooltip-settings-example',
    templateUrl: './tooltip-settings-example.html',
    styleUrls: ['./tooltip-settings-example.css'],
    providers: [
        { provide: NX_TOOLTIP_DEFAULT_OPTIONS, useValue: myDefaultOptions },
    ],
    imports: [NxBadgeComponent, NxTooltipDirective],
})
export class TooltipSettingsExampleComponent {}
