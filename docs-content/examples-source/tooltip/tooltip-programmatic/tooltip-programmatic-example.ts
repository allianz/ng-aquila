import { Component, ViewChild } from '@angular/core';
import { NxTooltipDirective } from '@aposin/ng-aquila/tooltip';

/**
 * @title Tooltip programmatic toggling
 */
@Component({
    selector: 'tooltip-programmatic-example',
    templateUrl: './tooltip-programmatic-example.html',
    styleUrls: ['./tooltip-programmatic-example.css'],
})
export class TooltipProgrammaticExampleComponent {
    @ViewChild(NxTooltipDirective, { static: true })
    tooltip!: NxTooltipDirective;

    toggle() {
        this.tooltip.toggle();
    }
}
