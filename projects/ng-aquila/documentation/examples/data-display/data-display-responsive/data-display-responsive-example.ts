import {
  DATA_DISPLAY_DEFAULT_OPTIONS,
  DataDisplayDefaultOptions,
  NxDataDisplayComponent,
  NxDataDisplayLabelComponent,
  NxDataDisplayOrientation,
} from '@allianz/ng-aquila/data-display';
import {
  NxColComponent,
  NxLayoutComponent,
  NxRowComponent,
} from '@allianz/ng-aquila/grid';
import { NxLinkComponent } from '@allianz/ng-aquila/link';
import { NxListComponent } from '@allianz/ng-aquila/list';
import { NxBreakpoints, NxViewportService } from '@allianz/ng-aquila/utils';
import { AsyncPipe, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const options: DataDisplayDefaultOptions = {
  size: 'medium', // expert mode default size
};

/**
 * @title Responsive data display example
 */
@Component({
  selector: 'data-display-responsive-example',
  templateUrl: './data-display-responsive-example.html',
  styleUrls: ['./data-display-responsive-example.css'],
  providers: [
    {
      provide: DATA_DISPLAY_DEFAULT_OPTIONS,
      useValue: options,
    },
  ],
  imports: [
    NxLayoutComponent,
    NxRowComponent,
    NxColComponent,
    NgClass,
    NxDataDisplayComponent,
    NxDataDisplayLabelComponent,
    NxLinkComponent,
    NxListComponent,
    AsyncPipe,
  ],
})
export class DataDisplayResponsiveExampleComponent {
  readonly mobileViewport$ = this.viewportService.max(
    NxBreakpoints.BREAKPOINT_MEDIUM,
    100,
  );

  readonly orientation$: Observable<NxDataDisplayOrientation> =
    this.mobileViewport$.pipe(
      map((mobile) => (mobile ? 'horizontal-columns' : 'vertical')),
    );

  readonly marginClass$: Observable<string> = this.mobileViewport$.pipe(
    map((mobile) => (mobile ? '' : 'nx-margin-bottom-s')),
  );

  constructor(private readonly viewportService: NxViewportService) {}
}
