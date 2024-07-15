import { Component } from '@angular/core';
import { NxBadgeComponent } from '@aposin/ng-aquila/badge';
import { NxTooltipDirective } from '@aposin/ng-aquila/tooltip';

/**
 * @title Tooltip
 */
@Component({
    selector: 'tooltip-basic-example',
    templateUrl: './tooltip-basic-example.html',
    styleUrls: ['./tooltip-basic-example.css'],
    standalone: true,
    imports: [NxBadgeComponent, NxTooltipDirective],
})
export class TooltipBasicExampleComponent {}
