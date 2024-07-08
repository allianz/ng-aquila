import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
    NxBreadcrumbComponent,
    NxBreadcrumbItemComponent,
} from '@aposin/ng-aquila/breadcrumb';

/**
 * @title Appearance link
 */
@Component({
    selector: 'breadcrumb-link-example',
    templateUrl: './breadcrumb-link-example.html',
    styleUrls: ['./breadcrumb-link-example.css'],
    standalone: true,
    imports: [
        NxBreadcrumbComponent,
        NgFor,
        NxBreadcrumbItemComponent,
        RouterLink,
    ],
})
export class BreadcrumbLinkExampleComponent {
    items = ['Home', 'Insurance', 'Health Insurance'];
}
