import {
  NxIndicatorComponent,
  NxIndicatorPosition,
} from '@allianz/ng-aquila/indicator';
import { Component } from '@angular/core';

/**
 * @title Indicator corner positions and overlap
 */
@Component({
  selector: 'indicator-positions-example',
  templateUrl: './indicator-positions-example.html',
  styleUrls: ['./indicator-positions-example.css'],
  imports: [NxIndicatorComponent],
})
export class IndicatorPositionsExampleComponent {
  readonly positions: NxIndicatorPosition[] = [
    'top-start',
    'top-end',
    'bottom-start',
    'bottom-end',
  ];
}
