import { Component, OnDestroy } from '@angular/core';
import { BaseDemoThemingService } from '@aposin/ngx-docs-ui';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

/** @title Modify theming of examples */
@Component({
  selector: 'nx-comparison-table-modify-theming-example',
  templateUrl: './comparison-table-modify-theming-example.html',
  styleUrls: ['./comparison-table-modify-theming-example.css']
})
export class ComparisonTableModifyThemingExampleComponent implements OnDestroy {
  headerTheme: string = 'default';
  headerThemeAvailable: boolean = true;
  private _destroyed = new Subject();

  constructor(private demoService: BaseDemoThemingService) {
    this.demoService.headerThemeAvailable.pipe(
      takeUntil(this._destroyed)
    ).subscribe((value: boolean) => {
      this.headerThemeAvailable = value;

      if (!this.headerThemeAvailable) {
        this.changeHeaderTheme('default');
      }
    });
  }

  changeHeaderTheme(theme: string) {
    this.headerTheme = theme;
    this.demoService.changeComparisonTableTheme(theme);
  }

  ngOnDestroy() {
    this._destroyed.next();
    this._destroyed.complete();
  }
}
