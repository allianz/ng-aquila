import { NxIconComponent } from '@allianz/ng-aquila/icon';
import {
  NxIndicatorComponent,
  NxIndicatorSize,
} from '@allianz/ng-aquila/indicator';
import { Component } from '@angular/core';

/**
 * @title Indicator sizes
 */
@Component({
  selector: 'indicator-sizes-example',
  templateUrl: './indicator-sizes-example.html',
  styleUrls: ['./indicator-sizes-example.css'],
  imports: [NxIndicatorComponent, NxIconComponent],
})
export class IndicatorSizesExampleComponent {
  readonly sizes: NxIndicatorSize[] = [
    's',
    'm',
    '800',
    '1000',
    '1200',
    '1400',
    '1600',
    '1800',
    '2000',
  ];
}
