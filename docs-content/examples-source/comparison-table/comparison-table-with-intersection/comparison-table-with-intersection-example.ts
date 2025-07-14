import {
  NxExpansionPanelComponent,
  NxExpansionPanelHeaderComponent,
  NxExpansionPanelTitleDirective,
} from '@allianz/ng-aquila/accordion';
import { NxPlainButtonComponent } from '@allianz/ng-aquila/button';
import {
  NxComparisonTableCell,
  NxComparisonTableComponent,
  NxComparisonTableDescriptionCell,
  NxComparisonTableIntersectionCell,
  NxComparisonTablePopularCell,
  NxComparisonTableRowDirective,
  NxComparisonTableRowGroupDirective,
  NxComparisonTableSelectButton,
} from '@allianz/ng-aquila/comparison-table';
import { NxIconComponent } from '@allianz/ng-aquila/icon';
import { NxListComponent, NxListIconComponent } from '@allianz/ng-aquila/list';
import {
  NxPopoverComponent,
  NxPopoverTriggerDirective,
} from '@allianz/ng-aquila/popover';
import { NxBreakpoints, NxViewportService } from '@allianz/ng-aquila/utils';
import { NgTemplateOutlet } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

/** @title Intersection example */
@Component({
  selector: 'comparison-table-with-intersection-example',
  templateUrl: './comparison-table-with-intersection-example.html',
  styleUrls: ['./comparison-table-with-intersection-example.css'],
  imports: [
    NxExpansionPanelComponent,
    NxExpansionPanelHeaderComponent,
    NxExpansionPanelTitleDirective,
    NgTemplateOutlet,
    NxComparisonTableComponent,
    NxComparisonTableRowDirective,
    NxComparisonTablePopularCell,
    NxPlainButtonComponent,
    NxPopoverTriggerDirective,
    NxIconComponent,
    NxPopoverComponent,
    NxComparisonTableCell,
    NxComparisonTableSelectButton,
    NxComparisonTableDescriptionCell,
    NxComparisonTableIntersectionCell,
    NxComparisonTableRowGroupDirective,
    NxListComponent,
    NxListIconComponent,
  ],
})
export class ComparisonTableWithIntersectionExampleComponent
  implements OnInit, OnDestroy
{
  showOverviewSeparately = false;

  private readonly _destroyed = new Subject<void>();

  constructor(private readonly viewportService: NxViewportService) {}

  ngOnInit(): void {
    this.viewportService
      .max(NxBreakpoints.BREAKPOINT_MEDIUM)
      .pipe(takeUntil(this._destroyed))
      .subscribe((mobileBP) => {
        this.showOverviewSeparately = mobileBP;
      });
  }

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }
}
