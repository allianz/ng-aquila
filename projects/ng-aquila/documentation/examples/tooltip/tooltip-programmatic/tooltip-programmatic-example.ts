import { Component, ViewChild } from '@angular/core';
import { NxBadgeComponent } from '@aposin/ng-aquila/badge';
import { NxButtonComponent } from '@aposin/ng-aquila/button';
import {
    NxTooltipDirective,
    NxTooltipDirective as NxTooltipDirective_1,
} from '@aposin/ng-aquila/tooltip';

/**
 * @title Tooltip programmatic toggling
 */
@Component({
    selector: 'tooltip-programmatic-example',
    templateUrl: './tooltip-programmatic-example.html',
    styleUrls: ['./tooltip-programmatic-example.css'],
    standalone: true,
    imports: [NxButtonComponent, NxBadgeComponent, NxTooltipDirective_1],
})
export class TooltipProgrammaticExampleComponent {
    @ViewChild(NxTooltipDirective, { static: true })
    tooltip!: NxTooltipDirective;

    toggle() {
        this.tooltip.toggle();
    }
}
