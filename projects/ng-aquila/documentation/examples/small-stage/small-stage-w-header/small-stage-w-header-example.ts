import { Component } from '@angular/core';

/**
 * @title Small stage with header example
 */
@Component({
    selector: 'small-stage-w-header-example',
    templateUrl: './small-stage-w-header-example.html',
    styleUrls: ['./small-stage-w-header-example.css'],
})
export class SmallStageWithHeaderExampleComponent {
    items = ['Home', 'Insurance', 'Health Insurance'];

    dynamicItems = this.items;

    goToItem(i: number) {
        this.dynamicItems = this.items.slice(0, i + 1);
    }
}
