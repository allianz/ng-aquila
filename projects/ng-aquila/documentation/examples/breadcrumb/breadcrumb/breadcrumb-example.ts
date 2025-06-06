import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
    NxBreadcrumbComponent,
    NxBreadcrumbItemComponent,
} from '@aposin/ng-aquila/breadcrumb';

/**
 * @title Basic usage
 */
@Component({
    selector: 'breadcrumb-example',
    templateUrl: './breadcrumb-example.html',
    styleUrls: ['./breadcrumb-example.css'],
    imports: [NxBreadcrumbComponent, NxBreadcrumbItemComponent, RouterLink],
})
export class BreadcrumbExampleComponent {
    items = ['Home', 'Insurance', 'Health Insurance'];
}
