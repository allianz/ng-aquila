import { NxLabelComponent } from '@allianz/ng-aquila/base';
import {
  NxBreadcrumbComponent,
  NxBreadcrumbItemComponent,
  NxBreadcrumbType,
} from '@allianz/ng-aquila/breadcrumb';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * @title Types
 */
@Component({
  selector: 'breadcrumb-type-example',
  templateUrl: './breadcrumb-type-example.html',
  styleUrls: ['./breadcrumb-type-example.css'],
  imports: [
    NxBreadcrumbComponent,
    NxBreadcrumbItemComponent,
    NxLabelComponent,
    RouterLink,
  ],
})
export class BreadcrumbTypeExampleComponent {
  items = ['Home', 'Insurance', 'Health Insurance'];
  readonly schemes: readonly {
    readonly type: NxBreadcrumbType;
    readonly label: string;
  }[] = [
    { type: 'secondary', label: 'Secondary (default)' },
    { type: 'primary', label: 'Primary' },
  ];
}
