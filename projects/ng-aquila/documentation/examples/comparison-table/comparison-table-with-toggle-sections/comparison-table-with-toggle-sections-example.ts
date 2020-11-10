import { Component, OnDestroy } from '@angular/core';
import { BaseDemoThemingService } from '@aposin/ngx-docs-ui';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

/** @title Toggle section example */
@Component({
  templateUrl: './comparison-table-with-toggle-sections-example.html',
  styleUrls: ['./comparison-table-with-toggle-sections-example.css']
})
export class ComparisonTableWithToggleSectionsExampleComponent implements OnDestroy {
  unselectedClassNames: string;
  private _destroyed = new Subject();

  constructor(private demoService: BaseDemoThemingService) {
    this.demoService.unselectedClassNames.pipe(
      takeUntil(this._destroyed)
    ).subscribe((value: string) => {
      this.unselectedClassNames = value;
    });
  }

  ngOnDestroy() {
    this._destroyed.next();
    this._destroyed.complete();
  }
}
