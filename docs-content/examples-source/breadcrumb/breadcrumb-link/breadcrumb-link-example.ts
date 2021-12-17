import { Component } from '@angular/core';

/**
 * @title Appearance link
 */
@Component({
    selector: 'breadcrumb-link-example',
    templateUrl: './breadcrumb-link-example.html',
    styleUrls: ['./breadcrumb-link-example.css'],
})
export class BreadcrumbLinkExampleComponent {
    items = ['Home', 'Insurance', 'Health Insurance'];

    goToItem(i: number) {
        this.items = this.items.slice(0, i + 1);
    }
}
