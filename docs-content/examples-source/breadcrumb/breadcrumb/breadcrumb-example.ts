import { Component } from '@angular/core';

/**
 * @title Basic usage
 */
@Component({
    selector: 'breadcrumb-example',
    templateUrl: './breadcrumb-example.html',
    styleUrls: ['./breadcrumb-example.css'],
})
export class BreadcrumbExampleComponent {
    items = ['Home', 'Insurance', 'Health Insurance'];
}
