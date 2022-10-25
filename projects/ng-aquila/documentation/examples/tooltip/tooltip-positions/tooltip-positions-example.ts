import { Component } from '@angular/core';
import { TooltipPosition } from '@aposin/ng-aquila/tooltip';

/**
 * @title Tooltip positions
 */
@Component({
    selector: 'tooltip-positions-example',
    templateUrl: './tooltip-positions-example.html',
    styleUrls: ['./tooltip-positions-example.css'],
})
export class TooltipPositionsExampleComponent {
    positions: TooltipPosition[];

    constructor() {
        this.positions = ['top', 'right', 'bottom', 'left'];
    }
}
