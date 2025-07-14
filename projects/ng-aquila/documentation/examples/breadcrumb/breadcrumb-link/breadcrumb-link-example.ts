import {
  NxBreadcrumbComponent,
  NxBreadcrumbItemComponent,
} from '@allianz/ng-aquila/breadcrumb';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * @title Appearance link
 */
@Component({
  selector: 'breadcrumb-link-example',
  templateUrl: './breadcrumb-link-example.html',
  styleUrls: ['./breadcrumb-link-example.css'],
  imports: [NxBreadcrumbComponent, NxBreadcrumbItemComponent, RouterLink],
})
export class BreadcrumbLinkExampleComponent {
  items = ['Home', 'Insurance', 'Health Insurance'];
}
