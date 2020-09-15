import { Component, OnDestroy } from '@angular/core';
import { BaseDemoThemingService } from '@aposin/ngx-docs-ui';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

/** @title Add custom form elements to the table */
@Component({
  templateUrl: './comparison-table-form-elements-example.html',
  styleUrls: ['./comparison-table-form-elements-example.css']
})
export class ComparisonTableFormElementsExampleComponent implements OnDestroy {
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
