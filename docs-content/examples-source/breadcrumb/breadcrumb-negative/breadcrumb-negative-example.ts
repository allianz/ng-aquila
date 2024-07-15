import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
    NxBreadcrumbComponent,
    NxBreadcrumbItemComponent,
} from '@aposin/ng-aquila/breadcrumb';

/**
 * @title Negative styling example
 */
@Component({
    selector: 'breadcrumb-negative-example',
    templateUrl: './breadcrumb-negative-example.html',
    styleUrls: ['./breadcrumb-negative-example.css'],
    standalone: true,
    imports: [NxBreadcrumbComponent, NxBreadcrumbItemComponent, RouterLink],
})
export class BreadcrumbNegativeExampleComponent {
    items = ['Home', 'Insurance', 'Health Insurance'];
}
