import { NxIconComponent } from '@allianz/ng-aquila/icon';
import {
  NxIndicatorComponent,
  NxIndicatorType,
} from '@allianz/ng-aquila/indicator';
import { Component } from '@angular/core';

/**
 * @title Indicator color types and variants
 */
@Component({
  selector: 'indicator-types-example',
  templateUrl: './indicator-types-example.html',
  styleUrls: ['./indicator-types-example.css'],
  imports: [NxIndicatorComponent, NxIconComponent],
})
export class IndicatorTypesExampleComponent {
  readonly types: NxIndicatorType[] = [
    'critical',
    'warning',
    'positive',
    'info',
  ];
}
