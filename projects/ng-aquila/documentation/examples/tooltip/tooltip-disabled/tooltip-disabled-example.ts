import { Component } from '@angular/core';
import { NxButtonComponent } from '@aposin/ng-aquila/button';
import { NxTooltipDirective } from '@aposin/ng-aquila/tooltip';

/**
 * @title Disabled tooltip
 */
@Component({
    selector: 'tooltip-disabled-example',
    templateUrl: './tooltip-disabled-example.html',
    styleUrls: ['./tooltip-disabled-example.css'],
    standalone: true,
    imports: [NxButtonComponent, NxTooltipDirective],
})
export class TooltipDisabledExampleComponent {
    disabled = false;

    toggle() {
        this.disabled = !this.disabled;
    }
}
