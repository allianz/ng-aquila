import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { NxBreakpoints, NxViewportService } from '@aposin/ng-aquila/utils';
import { BaseDemoThemingService } from '@aposin/ngx-docs-ui';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

/** @title Intersection example */
@Component({
  selector: 'comparison-table-with-intersection-example',
  templateUrl: './comparison-table-with-intersection-example.html',
  styleUrls: ['./comparison-table-with-intersection-example.css']
})
export class ComparisonTableWithIntersectionExampleComponent implements OnDestroy {
  unselectedClassNames: string;
  private _destroyed = new Subject();
  showOverviewSeparately: boolean;

  constructor(
    private viewportService: NxViewportService,
    private demoService: BaseDemoThemingService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.demoService.unselectedClassNames.pipe(
      takeUntil(this._destroyed)
    ).subscribe((value: string) => {
      this.unselectedClassNames = value;
      this.changeDetectorRef.markForCheck();
    });

    this.viewportService.max(NxBreakpoints.BREAKPOINT_MEDIUM)
    .subscribe(isMaximumMedium => this.showOverviewSeparately = isMaximumMedium);
  }

  ngOnDestroy() {
    this._destroyed.next();
    this._destroyed.complete();
  }
}
