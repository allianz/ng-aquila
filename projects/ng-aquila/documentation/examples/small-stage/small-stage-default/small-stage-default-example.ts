import { Component } from '@angular/core';

/**
 * @title Small stage default example
 */
@Component({
    selector: 'small-stage-default-example',
    templateUrl: './small-stage-default-example.html',
    styleUrls: ['./small-stage-default-example.css'],
})
export class SmallStageDefaultExampleComponent {
    items = ['Home', 'Insurance', 'Health Insurance'];

    dynamicItems = this.items;

    goToItem(i: number) {
        this.dynamicItems = this.items.slice(0, i + 1);
    }
}
