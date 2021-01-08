import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { BaseDemoThemingService } from '@aposin/ngx-docs-ui';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

/** @title Row group example */
@Component({
  selector: 'comparison-table-row-group-example',
  templateUrl: './comparison-table-row-group-example.html',
  styleUrls: ['./comparison-table-row-group-example.css']
})
export class ComparisonTableRowGroupExampleComponent implements OnDestroy {
  unselectedClassNames: string;
  private _destroyed = new Subject();

  constructor(
    private demoService: BaseDemoThemingService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.demoService.unselectedClassNames.pipe(
      takeUntil(this._destroyed)
    ).subscribe((value: string) => {
      this.unselectedClassNames = value;
      this.changeDetectorRef.markForCheck();
    });
  }

  ngOnDestroy() {
    this._destroyed.next();
    this._destroyed.complete();
  }
}
