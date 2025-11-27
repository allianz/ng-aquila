import { NxBadgeComponent } from '@allianz/ng-aquila/badge';
import {
  NxBreadcrumbComponent,
  NxBreadcrumbItemComponent,
} from '@allianz/ng-aquila/breadcrumb';
import { NxAnchorButtonComponent } from '@allianz/ng-aquila/button';
import { NxCopytextComponent } from '@allianz/ng-aquila/copytext';
import { NxHeadlineComponent } from '@allianz/ng-aquila/headline';
import { NxLinkComponent } from '@allianz/ng-aquila/link';
import {
  NxSmallStageComponent,
  NxSmallStageHeaderDirective,
} from '@allianz/ng-aquila/small-stage';
import {
  NxHeaderCellDirective,
  NxTableCellComponent,
  NxTableComponent,
  NxTableRowComponent,
} from '@allianz/ng-aquila/table';
import { ViewportScroller } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

/**
 * @title Skip to Data Description example
 */
@Component({
  selector: 'nx-a11y-skip-to-data-description',
  imports: [
    NxSmallStageComponent,
    NxSmallStageHeaderDirective,
    NxBreadcrumbComponent,
    NxBreadcrumbItemComponent,
    NxHeadlineComponent,
    NxCopytextComponent,
    NxLinkComponent,
    NxAnchorButtonComponent,
    NxBadgeComponent,
    NxTableComponent,
    NxTableRowComponent,
    NxHeaderCellDirective,
    NxTableCellComponent,
    RouterLink,
  ],
  templateUrl: './a11y-skip-to-data-description-example.html',
  styleUrl: './a11y-skip-to-data-description-example.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class A11ySkipToDataDescriptionComponent implements AfterViewInit {
  items = ['Home', 'Insurance', 'Health Insurance'];

  dynamicItems = this.items;

  tableElements = [
    {
      product: 'Car',
      contractNumber: 1234,
      desc: 'This is a contract',
      website: 'www.example.com',
      endingAt: '1/3/2020',
      status: 'negative',
      statusText: 'open',
    },
    {
      product: 'Health',
      contractNumber: 2423,
      desc: 'This is another contract',
      website: 'www.allianz.com',
      endingAt: '4/2/2020',
      status: 'active',
      statusText: 'accepted',
    },
    {
      product: 'Car',
      contractNumber: 353455,
      desc: 'Lorem ipsum dolor sit amet, csis libero. ',
      website: 'www.example.com',
      endingAt: '6/2/2020',
      status: 'positive',
      statusText: 'accepted',
    },
    {
      product: 'Home',
      contractNumber: 22344,
      desc: 'This is a description of a contract',
      website: 'www.example.org',
      endingAt: '1/2/2027',
      status: 'critical',
      statusText: 'rejected',
    },
    {
      product: 'Car',
      contractNumber: 1234,
      desc: 'This is a contract',
      website: 'www.example.com',
      endingAt: '1/3/2020',
      status: 'negative',
      statusText: 'open',
    },
    {
      product: 'Health',
      contractNumber: 2423,
      desc: 'This is another contract',
      website: 'www.allianz.com',
      endingAt: '4/2/2020',
      status: 'active',
      statusText: 'accepted',
    },
    {
      product: 'Car',
      contractNumber: 353455,
      desc: 'Lorem ipsum dolor sit amet, csis libero. ',
      website: 'www.example.com',
      endingAt: '6/2/2020',
      status: 'positive',
      statusText: 'accepted',
    },
    {
      product: 'Home',
      contractNumber: 22344,
      desc: 'This is a description of a contract',
      website: 'www.example.org',
      endingAt: '1/2/2027',
      status: 'critical',
      statusText: 'rejected',
    },
  ];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly viewportScroller: ViewportScroller,
  ) {}

  ngAfterViewInit() {
    this.route.fragment.subscribe((fragment) => {
      if (fragment) {
        this.focusElement(fragment);
      }
    });
  }
  private focusElement(elementId: string) {
    const element = document.getElementById(elementId);
    if (element) {
      element.focus();
      // Optional: scroll to element as well
      this.viewportScroller.scrollToAnchor(elementId);
    }
  }
  goToItem(i: number) {
    this.dynamicItems = this.items.slice(0, i + 1);
  }
}
