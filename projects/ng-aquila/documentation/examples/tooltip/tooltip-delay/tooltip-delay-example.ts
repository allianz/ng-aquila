import { Component } from '@angular/core';
import { NxButtonComponent } from '@aposin/ng-aquila/button';
import { NxTooltipDirective } from '@aposin/ng-aquila/tooltip';

/**
 * @title Tooltip with delay
 */
@Component({
    selector: 'tooltip-delay-example',
    templateUrl: './tooltip-delay-example.html',
    styleUrls: ['./tooltip-delay-example.css'],
    imports: [NxButtonComponent, NxTooltipDirective],
})
export class TooltipDelayExampleComponent {}
