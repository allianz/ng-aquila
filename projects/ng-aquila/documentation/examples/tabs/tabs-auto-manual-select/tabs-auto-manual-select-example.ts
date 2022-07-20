import { Component } from '@angular/core';

/**
 * @title Auto and manual select
 */
@Component({
    selector: 'tabs-auto-manual-select-example',
    templateUrl: './tabs-auto-manual-select-example.html',
    styleUrls: ['./tabs-auto-manual-select-example.css'],
})
export class TabsAutoManualSelectExampleComponent {
    autoselect = true;

    toggleAutoselect() {
        this.autoselect = !this.autoselect;
    }
}
