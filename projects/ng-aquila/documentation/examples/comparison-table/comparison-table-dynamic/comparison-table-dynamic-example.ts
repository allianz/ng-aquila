import { NxComparisonTableRowType } from '@aposin/ng-aquila/comparison-table';
import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { BaseDemoThemingService } from '@aposin/ngx-docs-ui';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

type ContentCell = { type: NxComparisonTableRowType, description?: string, cells: string[]};
type ToggleSection = { type: 'toggleSection', header: string, content: ContentCell[]};
type TableData = (ContentCell | ToggleSection)[];

/** @title Dynamically filled table */
@Component({
  selector: 'comparison-table-dynamic-example',
  templateUrl: './comparison-table-dynamic-example.html',
  styleUrls: ['./comparison-table-dynamic-example.css']
})
export class ComparisonTableDynamicExampleComponent implements OnDestroy {
  data: TableData = [
    { type: 'header', cells: [ 'This is a header cell', 'This is a header cell' ] },
    { type: 'content', description: 'This is a description cell', cells: [ 'This is a cell', 'This is a cell' ]},
    {
      type: 'toggleSection', header: 'Toggle Section',
      content: [
        { type: 'content', description: 'This is a description cell', cells: [ 'This is a cell', 'This is a cell' ]},
        { type: 'content', description: 'This is a description cell', cells: [ 'This is a cell', 'This is a cell' ]},
      ]
    },
    { type: 'footer', cells: [ 'This is a footer cell', 'This is a footer cell'] },
  ];

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
