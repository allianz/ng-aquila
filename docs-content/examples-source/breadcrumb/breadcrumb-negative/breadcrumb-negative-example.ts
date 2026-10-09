import { NxLabelComponent } from '@allianz/ng-aquila/base';
import {
  NxBreadcrumbComponent,
  NxBreadcrumbItemComponent,
} from '@allianz/ng-aquila/breadcrumb';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * @title Negative styling example
 */
@Component({
  selector: 'breadcrumb-negative-example',
  templateUrl: './breadcrumb-negative-example.html',
  styleUrls: ['./breadcrumb-negative-example.css'],
  imports: [
    NxBreadcrumbComponent,
    NxBreadcrumbItemComponent,
    NxLabelComponent,
    RouterLink,
  ],
})
export class BreadcrumbNegativeExampleComponent {
  items = ['Home', 'Insurance', 'Health Insurance'];
}
