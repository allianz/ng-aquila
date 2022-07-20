import { Component } from '@angular/core';

/**
 * @title Disabled tooltip
 */
@Component({
    selector: 'tooltip-disabled-example',
    templateUrl: './tooltip-disabled-example.html',
    styleUrls: ['./tooltip-disabled-example.css'],
})
export class TooltipDisabledExampleComponent {
    disabled = false;

    toggle() {
        this.disabled = !this.disabled;
    }
}
