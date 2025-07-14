import {
  NxBreadcrumbComponent,
  NxBreadcrumbItemComponent,
} from '@allianz/ng-aquila/breadcrumb';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

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
