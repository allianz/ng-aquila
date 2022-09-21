import { NxTooltipDirective } from '@allianz/ng-aquila/tooltip';
import { Component, ViewChild } from '@angular/core';

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
